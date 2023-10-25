class Api::V1::UploadedFilesController < ApplicationController

    def create

        require 'streamio-ffmpeg'
        
        # extract audio from the incoming data
        uploadedFile = params[:file]


        data = JSON.parse(file_params)
        file = UploadedFile.new(name: data["name"])

        # convert the audio to flac format with specific sample rate and channels and then save it in a temporary folder
        uploaded_audio = FFMPEG::Movie.new(uploadedFile.tempfile.path)
        convertedFile = uploaded_audio.transcode("tmp/#{data['name']}.flac", {audio_codec: 'flac', audio_sample_rate: 48000, audio_channels: 1})

        # attach the converted file to the file object
        file.audio.attach(io: File.open(convertedFile.path), filename: "#{data['name']}.flac" )

        # save the object in database and it was successfull, send back a success message to frontend
        if file.save
            File.delete(convertedFile.path)
            render json: {message: 'File saved successfully', status: 200}
        else
            render json: {message: file.errors.messages}
        end

    end

    

    # find the required object in the databse and send it back to frontend
    def download
        file = UploadedFile.find session[:user_id]
        audio = file.audio
        send_data audio.download , type: audio.content_type, disposition: "inline"
    end

    # find the required file and send its data to frontend
    def show
        file = UploadedFile.find params[:id]
        render json: {file: file}
    end


    def transcript

        require "google/cloud/speech"

        # find the audio file in the database
        file = UploadedFile.find params[:id]
        audio = file.audio #linear16 or FLAC

        # if the file's transcript is nil, then get the transcript from google speech api and save it in the database
        if file.transcript == nil
            # create a client for google speech api
            client = Google::Cloud::Speech.speech do |config|
                config.credentials = 'config/key/credentials.json'
            end

            client  = Google::Cloud::Speech.speech
            # set the file's configurations
            config = {
                language_code: "en-US",
                sample_rate_hertz: 48_000,
                encoding: :FLAC
            }
            # attach the audio file to the config
            audio = {
                content: audio.download
            }

            response = client.recognize config: config, audio: audio
            result = response.results

            # separate the transcript text from the response
            transcript = result.map do |res|
                alternative = res.alternatives.first
                alternative.transcript
            end

            # join the transcript texts and save the one text file in the database
            trans = transcript.join(".")
            file.update(transcript: trans)
            render json: { transcript: trans }
        else
          render json: { message: "The file's transcript has already been existed." }
        end
        
    end

    # action to send the transcript text to AI and get its summary
    def summarize

        file = UploadedFile.find params[:id]

        # check wether the file has transcript or not
        if file.transcript != nil
            # create the AI prompt
            content = "please summarize below text: \n'#{file.transcript}'"

            # check wether the file has summary or not
            if file.main_points == nil
                require 'openai'
                # making the open AI client
                client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
                response = client.chat(
                    parameters: {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: "user", content: content }]
                })
                content = response["choices"][0]['message']['content']
                file.update(main_points: content)
                render json: content
            else
                render json: { message: "The file has been already summarized." }
            end
        else
            render json: { message: 'You need to get the transcript first.' }
        end

    end

    # action for files which are longer than 1 minute.
    def split

        require 'streamio-ffmpeg'

        uploaded_file = UploadedFile.find params[:id]
        
        # create a temporary file and write the audio file in it
        file = Tempfile.new(['audio', '.flac'])
        file.binmode
        file.write(uploaded_file.audio.download)

        # use streamio-ffmpeg to create a new audio file with 20 seconds duration
        audio = FFMPEG::Movie.new(file.path)
        duration = audio.duration
        

        new = audio.transcode("tmp/new.flac", {seek_time: 0, duration: 20})
        # new_length = new.duration
        new_file = File.open(new.path)
        send_data new_file.read , type: 'audio/flac', disposition: "inline"
        File.delete(new.path)

        # render json: new_length

    end

    private

    def file_params
        params.require(:data)
    end

    def google_speech(audio)
        client = Google::Cloud::Speech.speech do |config|
            config.credentials = 'config/key/credentials.json'
        end

        client  = Google::Cloud::Speech.speech

        config = {
            language_code: "en-US",
            sample_rate_hertz: 48_000,
            encoding: :FLAC
        }
        audio = {
            content: audio.download
        }

        response = client.recognize config: config, audio: audio
        result = response.results

        transcript = result.map do |res|
            alternative = res.alternatives.first
            alternative.transcript
        end

        trans = transcript.join(".")

        return trans
    end

end
