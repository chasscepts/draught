class Api::V1::FriendsController < ApiController
  skip_before_action :authenticate_user!, only: [:users], raise: false

  def index
    json_response(current_user.friends.map { |user| trim_user(user) })
  end

  def pending
    ids = current_user.pending_friendships.pluck(:initiator_id)
    json_response(User.where(id: ids).map { |u| trim_user(u) })
  end

  def confirm
    friend = User.find(params[:friend])
    friendship = current_user.invited_friendships.where(initiator_id, params[:friend]).first
    json_response({ message: 'Friend request not found' }, :not_found) if friendship.nil?
    friendship.confirmed = true
    friendship.save!
    json_response(trim_user(friend))
  end

  def users
    users_per_page = 20
    offset = params[:page] ? users_per_page * params[:page].to_i : 0
    users = User.offset(offset).limit(users_per_page).map { |user| trim_user(user) }
    json_response(users)
  end

  def suggestions
    users_per_page = 20
    offset = params[:page] ? users_per_page * params[:page].to_i : 0
    users = current_user.suggestions(offset, users_per_page).map { |user| trim_user(user) };
    json_response(users)
  end

  private

  def trim_user(user)
    { id: user.id, username: user.username }
  end
end
