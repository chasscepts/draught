Rails.application.routes.draw do
  devise_for :users,
    controllers: { registrations: 'registrations', sessions: 'authentication' },
    path: '/auth',
    path_names: { sign_in: '', sign_out: 'logout', registration: 'register' }
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
