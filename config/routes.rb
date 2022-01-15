Rails.application.routes.draw do
  devise_for :users,
    controllers: { registrations: 'registrations', sessions: 'authentication' },
    path: '/auth',
    path_names: { sign_in: '', sign_out: 'logout', registration: 'register' }
  root 'home#index'
  namespace :api do
    namespace :v1 do
      get '/friends' => 'friends#index'
      get '/friends/pending' => 'friends#pending'
      get '/friends/users' => 'friends#users'
      get '/friends/suggestions' => 'friends#suggestions'
      post '/friends' => 'friends#confirm'
      resource :invite, only: [:create, :update, :destroy]
    end
  end

  get '*path' => redirect('/')
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
