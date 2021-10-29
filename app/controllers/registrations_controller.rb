class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    @user = User.new(sign_up_params)
    if @user.save
      json_response(@user, :created)
    else
      msg = 'Something went wrong. Please make sure all fields are correctly filled.'
      json_response({ message: msg }, :unprocessable_entity)
    end
  end

  private

  def sign_up_params
    params.permit(:email, :username, :password, :password_confirmation)
  end
end
