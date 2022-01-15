class Api::V1::InvitesController < ApiController
  def create
    id = params[:id]
    invites = Friendship.where(initiator_id: current_user.id, invitee_id: id).or(Friendship.where(initiator_id: id, invitee_id: current_user.id))
    if invites.size.zero?
      invite = Friendship.create!(initiator_id: current_user.id, invitee_id: id)
      json_response(invite, :created)
    else
      json_response({ message: 'An identical friend request already exists!' }, :unauthorized)
    end
  end

  def update
    invites = Friendship.where(initiator_id: params[:id], invitee_id: current_user.id)
    if invites.size.zero?
      json_response({ message: 'You do not have any friend request from the given user' }, :unauthorized)
    else
      invites[0].update!(confirmed: true)
      json_response(invites[0])
    end
  end

  def destroy
    invites = Friendship.where(initiator_id: params[:id], invitee_id: current_user.id)
    if invites.size.zero?
      json_response({ message: 'You do not have any friend request from the given user' }, :unauthorized)
    else
      invites[0].destroy!
      json_response({ message: 'Friend request rejected' })
    end
  end
end
