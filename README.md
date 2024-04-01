# Pod Trans
## Version: v1.0.0

## Frameworks:
  ### Backend:
  - Ruby on Rails
  ### Frontend:
  - React
  - Tailwind CSS
  ### Database:
  - PostgreSQL

## Introduction:
"Pod Trans" is an efficient and straightforward application. We've all experienced the challenges of sifting through lengthy podcast episodes in search of specific content, often consuming precious time. Fortunately, this application offers a solution by transcribing audio files and subsequently summarizing the transcriptions. This concise summary empowers us to quickly determine the relevance and suitability of a podcast, saving valuable time and ensuring we find precisely what we're looking for.

## How to run:
This application is dockerized, so to run the application, after cloning the repo, make sure that you are at the root directory(where the docker-compose file is placed), run this command on your terminal "docker-compose build" and after creating images, using command "docker-compose run" run the containers and afterward by going to 'localhost:5050' on your browser, you can enter the application.
### - But for now, the application can only transcribe files that are shorter than 1 minute because of the Google Cloud Speech's limit.
## I also need to add, that because of security purposes, the API keys have been removed from the repo, so the application is not able to communicate with the Google Cloud server and openAI API.


## Features:
### Transcribing:
- For transcribing audio files, this application uses Google Cloud Speech API

### Summarizing:
- To summarize the transcribed text, it uses OpenAI API and easily summarizes it.

### Docker:
- The application is Dockerized, so it's really easy to develop or deploy. 
