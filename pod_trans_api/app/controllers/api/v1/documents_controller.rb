class Api::V1::DocumentsController < ApplicationController

    # find the user and send all of his saved files to the front
    def index
        user = User.find(session[:user_id])
        if user
            files = user.documents
            render json: {files: files, status: 200}
        else
            render json: { message: "No user found.", status: 404 }
        end
    end

    def show
        file = Document.find params[:id]
        render json: file
    end

    def create
        
        require 'streamio-ffmpeg'
        
        # extract audio from the incoming data
        uploadedFile = params[:file]

        data = JSON.parse(file_params)
        file = Document.new(name: data["name"], description: data["description"])
        file.user_id = session[:user_id]
        # convert the audio to flac format with specific sample rate and channels and then save it in a temporary folder
        uploaded_audio = FFMPEG::Movie.new(uploadedFile.tempfile.path)
        convertedFile = uploaded_audio.transcode("tmp/#{data['name']}.flac", {audio_codec: 'flac', audio_sample_rate: 48000, audio_channels: 1})

        # attach the converted file to the file object
        file.audio.attach(io: File.open(convertedFile.path), filename: "#{data['name']}.flac" )

        # save the object in database and it was successfull, send back a success message to frontend
        if file.save
            File.delete(convertedFile.path)
            render json: {id: file.id, message: 'File saved successfully', status: 200}
        else
            render json: {message: file.errors.full_messages, status: 402}
        end

    end

    def download
        document = Document.find params[:id]
        audio = document.audio
        send_data audio.download, type: audio.content_type, disposition: 'inline'
    end

    def transcription

        require "google/cloud/speech"

        # find the specific file and extract its audio from the active storage table
        document = Document.find params[:id]
        audio = document.audio # file was converted to flac format before saving

        # create a client for google could api
        client = Google::Cloud::Speech.speech do |config|
            config.credentials = 'config/key/credentials.json'
        end

        client = Google::Cloud::Speech.speech
        # set the client's configs
        config = {
            language_code: 'en-US',
            sample_rate_hertz: 48_000,
            encoding: :FLAC
        }
        # attach the audio file to config
        audio = {
            content: audio.download
        }

        # getting the transcription
        response = client.recognize config: config, audio: audio
        result = response.results

        # extracting required text from response
        transcript = result.map do |res|
            alternative = res.alternatives.first
            alternative.transcript
        end

        # joining all the transcript texts together and creating one complete text
        text = transcript.join('.')

        # if updating database was successfull, then backend sends the text to front with the successfull status
        if document.update(text: text)
            render json: { text: text, status: 200 }
        else
            render json: { message: 'Something went wrong! Please try again later.', status: 402}
        end

    end
    
    # sending transcripted text to the
    def summarize
        require 'openai'

        # getting the file's text
        document = Document.find params[:id]
        content = "please summarize the below text as short as possible: \n'#{document.text}'"

        # creating the openai client
        client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
        response = client.chat(
            parameters: {
                model: 'gpt-3.5-turbo',
                messages: [{ role: "user", content: content }]
            }
        )
        summarized = response["choices"][0]['message']['content']

        # if updating database was successfull, then backend sends the text to front with the successfull status
        if document.update(summarize: summarized)
            render json: { summarize: summarized, status: 200 }
        else
            render json: { message: 'Something went Wrong! Please try again later.', status: 402}
        end

    end


    private

    def file_params
        params.require(:data)
    end
    
end


# # action for files which are longer than 1 minute. this part has not completed yet
# def split

#     require 'streamio-ffmpeg'

#     uploaded_file = UploadedFile.find params[:id]
    
#     # create a temporary file and write the audio file in it
#     file = Tempfile.new(['audio', '.flac'])
#     file.binmode
#     file.write(uploaded_file.audio.download)

#     # use streamio-ffmpeg to create a new audio file with 20 seconds duration
#     audio = FFMPEG::Movie.new(file.path)
#     duration = audio.duration
    

#     new = audio.transcode("tmp/new.flac", {seek_time: 0, duration: 20})
#     # new_length = new.duration
#     new_file = File.open(new.path)
#     send_data new_file.read , type: 'audio/flac', disposition: "inline"
#     File.delete(new.path)

#     # render json: new_length

# end
