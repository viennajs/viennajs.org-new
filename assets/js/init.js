(function () {
  var button, duration, offset, showMenu, tool;
  showMenu = function (_this, e) {
    var head, left, menu, top;
    if (($("#cl-wrapper").hasClass("sb-collapsed") || ($(window).width() > 755 && $(window).width() < 963)) && $("ul", _this).length > 0) {
      $(_this).removeClass("ocult");
      menu = $("ul", _this);
      if (!$(".dropdown-header", _this).length) {
        head = "<li class=\"dropdown-header\">" + $(_this).children().html() + "</li>";
        menu.prepend(head);
      }
      tool.appendTo("body");
      top = ($(_this).offset().top + 8) - $(window).scrollTop();
      left = $(_this).width();
      tool.css({
        top: top,
        left: left + 8
      });
      tool.html("<ul class=\"sub-menu\">" + menu.html() + "</ul>");
      tool.show();
      menu.css("top", top);
    } else {
      tool.hide();
    }
  };
  $(".cl-vnavigation li ul").each(function () {
    $(this).parent().addClass("parent");
  });
  $(".cl-vnavigation li ul li.active").each(function () {
    $(this).parent().show().parent().addClass("open");
  });
  $(".cl-vnavigation").delegate(".parent > a", "click", function (e) {
    var ul;
    $(".cl-vnavigation .parent.open > ul").not($(this).parent().find("ul")).slideUp(300, "swing", function () {
      $(this).parent().removeClass("open");
    });
    ul = $(this).parent().find("ul");
    ul.slideToggle(300, "swing", function () {
      var p;
      p = $(this).parent();
      if (p.hasClass("open")) {
        p.removeClass("open");
      } else {
        p.addClass("open");
      }
      $("#cl-wrapper .nano").nanoScroller({
        preventPageScrolling: true
      });
    });
    e.preventDefault();
  });
  $(".cl-toggle").click(function (e) {
    var ul;
    ul = $(".cl-vnavigation");
    ul.slideToggle(300, "swing", function () {
    });
    e.preventDefault();
  });
  $("#sidebar-collapse").click(function () {
    toggleSideBar();
  });
  $(".nano").nanoScroller();
  tool = $("<div id='sub-menu-nav' style='position:fixed;z-index:9999;'></div>");
  $(".cl-vnavigation li").hover((function (e) {
    showMenu(this, e);
  }), function (e) {
    tool.removeClass("over");
    setTimeout((function () {
      if (!tool.hasClass("over") && !$(".cl-vnavigation li:hover").length > 0) {
        tool.hide();
      }
    }), 500);
  });
  tool.hover((function (e) {
    $(this).addClass("over");
  }), function () {
    $(this).removeClass("over");
    setTimeout((function () {
      if (!tool.hasClass("over") && !$(".cl-vnavigation li:hover").length > 0) {
        tool.fadeOut("fast");
      }
    }), 500);
  });
  $(document).click(function () {
    tool.hide();
  });
  $(document).on("touchstart click", function (e) {
    tool.fadeOut("fast");
  });
  tool.click(function (e) {
    e.stopPropagation();
  });
  $(".cl-vnavigation li").click(function (e) {
    if ((($("#cl-wrapper").hasClass("sb-collapsed") || ($(window).width() > 755 && $(window).width() < 963)) && $("ul", this).length > 0) && !($(window).width() < 755)) {
      showMenu(this, e);
      e.stopPropagation();
    }
  });
  offset = 220;
  duration = 500;
  button = $("<a href=\"#\" class=\"back-to-top\"><i class=\"fa fa-angle-up\"></i></a>");
  button.appendTo("body");
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".back-to-top").fadeIn(duration);
    } else {
      jQuery(".back-to-top").fadeOut(duration);
    }
  });
  jQuery(".back-to-top").click(function (event) {
    event.preventDefault();
    jQuery("html, body").animate({
      scrollTop: 0
    }, duration);
    return false;
  });
  return $("body").css({
    opacity: 1,
    "margin-left": 0
  });
}());
