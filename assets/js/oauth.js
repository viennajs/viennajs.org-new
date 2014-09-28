var authenticate, state;
OAuth.initialize(oauthio);
state = "";

$.ajax({
  url: "/oauth/state_token",
  method: "GET",
  success: function (data, status) {
    return state = data.token;
  }
});

$(".login-button").click(function (e) {
  return authenticate(e.currentTarget.name);
});

authenticate = function (provider) {
  return OAuth.popup(provider, {
    state: state
  }).done(function (r) {
    return $.ajax({
      url: "/login?provider=" + provider,
      type: "POST",
      data: {
        code: r.code
      }
    }).done(function (data, status) {
      $("#username").text(data.name);
      $("#profile-link").attr("href", data.link);
      $("#user-image").attr("src", data.image);
      $('.signup-button').hide();
      if(!data.email) {
          $("#modal-uuid").val(data.uuid);
          $('.md-trigger').trigger("click");
      }
      return $('.profile_menu').removeClass("hidden");
    }).fail(function (error) {
      return console.log("Login Error");
    });
  }).fail(function (error) {
    return console.log("OAuthio Error");
  });
};
