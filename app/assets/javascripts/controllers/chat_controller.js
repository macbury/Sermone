Sermone.ChatController = Ember.Controller.extend({
  loggedIn: false,
  isProcessingLogin: false,
  loginError: false,
  nick: "",

  init: function() {
    this._super();
    this.configureFaye();
  },

  signInAction: function() {
    this.setProperties({
      loggedIn: false,
      isProcessingLogin: true
    });

    var request = $.post("/auth", this.getProperties("nick"));
    request.then(this.onLoginSuccess.bind(this), this.onLoginFailure.bind(this));
  },

  onLoginSuccess: function(response) {
    console.log(arguments);
    this.reset();
    this.set('loggedIn', true);
  },

  onLoginFailure: function(response) {
    this.reset();
    this.set("loginError", I18n.t("chat.login.failure"));
    //console.log(arguments);
  },

  configureFaye: function() {
    this.faye = new Faye.Client('/remote/faye', {
      timeout: 20
    });

    this.faye.bind('transport:down', function() {
      console.log("offline");
    });

    this.faye.bind('transport:up', function() {
      console.log("online");
    });

    this.faye.connect();

    var self = this;
    this.faye.subscribe('/messages', function (data) { self.onMessage(data); });
  },

  onMessage: function(data) {
    console.log(data);
  },

  reset: function() {
    this.setProperties({
      nick: "",
      loginError: false,
      loggedIn: false,
      isProcessingLogin: false
    });
  }
});
