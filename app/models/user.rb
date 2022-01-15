class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :friendships, as: :initiator, dependent: :destroy
  has_many :pending_friendships, -> { where confirmed: false }, class_name: 'Friendship', foreign_key: :invitee_id

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :username, presence: true

  def friends
    invited = Friendship.where(invitee_id: id, confirmed: true).pluck(:initiator_id)
    initiated = Friendship.where(initiator_id: id, confirmed: true).pluck(:invitee_id)
    ids = invited + initiated
    User.where(id: ids)
  end

  def suggestions(offset, limit)
    invited = Friendship.where(invitee_id: id).pluck(:initiator_id)
    initiated = Friendship.where(initiator_id: id).pluck(:invitee_id)
    ids = invited + initiated
    ids << id
    User.where.not(id: ids).order(:id).offset(offset).limit(limit)
  end

  def pending_requests
    friends_as_invitee.merge(Friendship.pending)
  end
end
