class RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user!, only: [:create], raise: false
  respond_to :json

  def create
    # @user = User.new(sign_up_params)
    json_response(params, :created)
    # if @user.save
    #   json_response(@user, :created)
    # else
    #   msg = 'Something went wrong. Please make sure all fields are correctly filled.'
    #   json_response({ message: msg }, :unprocessable_entity)
    # end
  end

  private

  def sign_up_params
    params.permit(:email, :username, :password, :password_confirmation)
  end
end
