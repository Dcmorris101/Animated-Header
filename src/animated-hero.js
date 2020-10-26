$(document).ready(function () {
  $('.hero-large2').each(function() {
    var mobileOpacity = $('.color',this).attr('data-mobile-opacity') * .01;
    $('.color',this).css('opacity',mobileOpacity);
  });

  LHAnimation();
});

var LHAnimation = function() {
  require.config({
    baseUrl: '/repository/configfiles/templates/Modules/resourcemodules/2019_12_21_GSAP/',
  });

  require(['js/gsap.min'],
          function (_gsap) {

      $('.hero-large2').each(function() {
        var attempts = 0;
        attempts = $(this).attr("data-attempts") || 0;
        attempts++;
        $(this).attr("data-attempts", attempts);
        if ($(this).isMostlyInViewport() && $(this).is(":visible") && !$(this).hasClass("animation-executed") || (attempts==5 && !$(this).hasClass("animation-executed"))) {
          $(this).addClass("animation-executed");
          var tl = gsap.timeline({paused: false});
          tl.set("#theSquare", {visibility:"visible", immediateRender:false})
            .fromTo(".has-animation.motionPathMask", {rotation:90, transformOrigin:"100% 100%"}, {duration: 3, ease: "power2.out", rotation:0}, 1)
            .to(".has-animation.motionPathMask", {duration: 5, ease: "power2.out", strokeWidth:399})
            .to(".has-animation.motionPathMask", {duration: 1, ease: "power1.out", strokeDasharray: "50, 0"}, 4)
          //.to("#theSquare", {duration: 15, scaleX:1.15, scaleY:1.15}, '-=5')
            .to(".dashed", {duration: 3, rotation:-90, transformOrigin:"50% 50%"}, 5)
            .fromTo(".dashed", {opacity:0}, {duration: 3, ease: "power3.out", opacity:.5}, 5)
            .to(".dashed", {duration: 3, opacity: 0});
          var tl2 = gsap.timeline({paused: false});
          tl2.fromTo("#theSquare2", {opacity:1}, {duration: 5, ease: "power3.out", opacity:0}, 4);
          var tl3 = gsap.timeline({paused: false});
          tl3.to("#theSquare", {duration: 20, scaleX:1.15, scaleY:1.15});
        } else {
          if (!$(this).hasClass("animation-executed")) {
            var delayID = uniqueid();
            $(this).attr("data-delayed-action", delayID);
            RegisterDelayedAction(delayID,LHAnimation);
          }
        }
      });

  });
}

//Add on Scroll bindingssss
$(window).on("scroll", LHAnimation);
