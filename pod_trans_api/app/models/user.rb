class User < ApplicationRecord
    has_secure_password
    validates :email, uniqueness:{case_sensitive: false} , format: { with:/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i, multiline: true }

    has_many :documents
    def full_name
        return first_name.capitalize + ' ' + last_name.capitalize
    end
end
