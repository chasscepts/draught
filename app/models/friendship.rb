class Friendship < ApplicationRecord
  belongs_to :invitee, class_name: 'User'
  belongs_to :initiator, class_name: 'User'

  scope :confirmed, -> { where(confirmed: true) }
  scope :pending, -> { where(confirmed: false) }
end
