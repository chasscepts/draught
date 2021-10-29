FactoryBot.define do
  factory :user do
    email { 'test222@exp.com' }
    username { 'ofchass' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
