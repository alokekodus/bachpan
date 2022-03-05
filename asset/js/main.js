$(document).ready(function () {
  $(".testimonial-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  // This will create a single gallery from all elements that have class "gallery-item"
  $(".gallery-item").magnificPopup({
    delegate: "a",
    type: "image",
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true, // By default it's false, so don't forget to enable it
      duration: 300, // duration of the effect, in milliseconds
      easing: "ease-in-out", // CSS transition
      opener: function (openerElement) {
        return openerElement.is("img")
          ? openerElement
          : openerElement.find("img");
      },
    },
  });
});
