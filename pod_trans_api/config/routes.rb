Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    namespace :v1 do

      resources :users
      post 'users/current' => 'users#current'

      resources :sessions, only: [:create]
      delete 'sessions' => 'sessions#destroy'

      resources :documents
      get 'download/:id' => 'documents#download'
      get 'transcription/:id' => 'documents#transcription'
      get 'summarize/:id' => 'documents#summarize'
    end
  end

end
