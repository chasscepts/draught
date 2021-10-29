class AuthenticationController < ApiController
  skip_before_action :authenticate_user!, only: [:create], raise: false

  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      res = {
        id: user.id,
        email: user.email,
        token: JsonWebToken.encode(sub: user.id)
      }
      json_response(res, :created)
    else
      json_response({ message: 'Wrong Email or password' }, :unauthorized)
    end
  end

  def fetch
    user = {
      id: current_user.id,
      email: current_user.email,
      token: JsonWebToken.encode(sub: current_user.id)
    }
    json_response(user)
  end
end
