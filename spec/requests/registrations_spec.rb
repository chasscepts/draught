# spec/requests/users_spec.rb
require 'rails_helper'

RSpec.describe 'Registrations', type: :request do
  let(:user) { build(:user) }
  let(:headers) { valid_headers.except('Authorization') }
  let(:valid_attributes) { { email: user.email, username: user.username, password: user.password } }

  # User signup test suite
  describe 'POST /auth/register' do
    context 'when valid request' do
      before do
        post '/auth/register', params: valid_attributes.to_json, headers: headers
      end

      it 'creates a new user' do
        expect(response).to have_http_status(201)
      end

      it 'does not return authentication token' do
        expect(json['auth_token']).to be_nil
      end

      it 'returns user email' do
        expect(json['email']).to eq(user.email)
      end

      it 'returns username' do
        expect(json['username']).to eq(user.username)
      end
    end

    context 'when request is invalid' do
      context 'when email is not provided' do
        before { post '/auth/register', params: {username: user.username, password: user.password}.to_json, headers: headers }

        it 'does not create a new user' do
          expect(response).to have_http_status(422)
        end

        it 'returns failure message' do
          expect(json['message'])
            .to match(/Something went wrong. Please make sure all fields are correctly filled./)
        end
      end

      context 'when username is not provided' do
        before { post '/auth/register', params: {email: user.email, password: user.password}.to_json, headers: headers }

        it 'does not create a new user' do
          expect(response).to have_http_status(422)
        end

        it 'returns failure message' do
          expect(json['message'])
            .to match(/Something went wrong. Please make sure all fields are correctly filled./)
        end
      end
    end
  end
end
