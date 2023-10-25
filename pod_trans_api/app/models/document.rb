class Document < ApplicationRecord
  belongs_to :user

  has_one_attached :audio

  validates :name,presence: true, uniqueness: { scope: :user, case_sensitive: false }
end
