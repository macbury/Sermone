Sermone::Application.routes.draw do
  get "/test" => "home#publish"
  root to: "home#index"
end
