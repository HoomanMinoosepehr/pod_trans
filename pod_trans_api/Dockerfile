FROM ruby:3.0.2

WORKDIR ./app

COPY Gemfile ./Gemfile
COPY Gemfile.lock ./Gemfile.lock

RUN apt-get update -qq && apt-get install -y node.js
RUN apt -y update && apt -y install ffmpeg

RUN bundle install

COPY . ./

RUN chmod +x ./entrypoint.sh

EXPOSE 3030

# CMD [ "rails", "s"]