class HomeController < ApplicationController

  def publish
    ChatCore.instance.client.publish("/messages", { test: "hello:P" })
    render nothing: true
  end
end
