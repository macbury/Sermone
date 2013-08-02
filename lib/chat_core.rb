class ChatCore
  include Singleton

  def initialize
    Rails.logger.info "Initializing chat core"
    setup_faye
  end

  def setup_faye
    @faye = Faye::RackAdapter.new(mount: "/faye", timeout: 30, ping: 5)
    @faye.bind(:unsubscribe) { |client_id| unsubscribe(client_id) }

    client.set_header('Authorization', 'OAuth abcd-1234')
  end

  def unsubscribe(client_id)
    
  end

  def client
    @faye.get_client
  end

  def faye
    @faye
  end
end