$(document).ready(function() {
  "use strict";
  function navScroll() {
    var window_top = $(window).scrollTop();
    var div_top = $("body").offset().top;
    if (window_top > div_top) {
      $(".header").addClass("header--sticky");
      $(".header__menu ul ul").addClass("submenu-header-sticky");
    } else {
      $(".header").removeClass("header--sticky");
      $(".header__menu ul ul").removeClass("submenu-header-sticky");
    }
  }
  $(window).scroll(function() {
    navScroll();
  });
  navScroll();

  $.fn.menumaker = function(options) {
    var cssmenu = $(this),
      settings = $.extend(
        {
          title: "Menu",
          format: "dropdown",
          sticky: false
        },
        options
      );

    return this.each(function() {
      cssmenu.prepend('<div class="menu-button"></div>');
      $(this)
        .find(".menu-button")
        .on("click", function() {
          var $parent = $(this)
            .parent()
            .parent()
            .parent();
          $parent.toggleClass("menu-open");
          if ($parent.hasClass("menu-open")) {
            $parent.addClass("header--sticky");
          } else {
            navScroll();
          }

          var mainmenu = $(this).next("ul");
          mainmenu.toggleClass("open");
          if (mainmenu.hasClass("open")) {
            mainmenu.show();
          } else {
            mainmenu.hide();
          }
          $('.header__menu ul a[href^="#"]').on("click", function(e) {
            $(".header__menu ul").removeClass("open");
            $(".header__menu ul").hide();
            $(".header").removeClass("menu-open");
          });
        });

      var multiTg = function() {
        cssmenu
          .find(".menu-item-has-children")
          .prepend('<span class="submenu-button"></span>');
        cssmenu.find(".submenu-button").on("click", function() {
          $(this).toggleClass("submenu-opened");
          if (
            $(this)
              .siblings("ul")
              .hasClass("open")
          ) {
            $(this)
              .siblings("ul")
              .removeClass("open")
              .hide();
          } else {
            $(this)
              .siblings("ul")
              .addClass("open")
              .show();
          }
        });
      };

      if (settings.format === "multitoggle") multiTg();
      else cssmenu.addClass("dropdown");

      if (settings.sticky === true) cssmenu.addClass("sticky");
    });
  };

  $(".header__menu").menumaker({
    format: "multitoggle",
    sticky: true
  });
});
