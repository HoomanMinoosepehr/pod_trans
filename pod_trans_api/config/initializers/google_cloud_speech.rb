require 'google/cloud/speech'

Google::Cloud::Speech.configure do |config|
    config.credentials = "config/key/credentials.json"
end

# speech = Google::Cloud::Speech.speech