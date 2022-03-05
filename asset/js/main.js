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

  //   Phone number validation
  (function ($) {
    $.fn.inputFilter = function (inputFilter) {
      return this.on(
        "input keydown keyup mousedown mouseup select contextmenu drop",
        function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          }
        }
      );
    };
  })(jQuery);

  $("#phone").inputFilter(function (value) {
    return (
      /^\d*$/.test(value) && (value === "" || parseInt(value) <= 9999999999)
    );
  });

  //   Form validation
  $("#contatcForm").validate({
    rules: {
      name: "required",
      email: "required",
      phone: "required",
      message: "required",
    },
    messages: {
      name: "Name field cannot be empty",
      email: "Email field cannot be empty",
      phone: "Phone field cannot be empty",
      message: "Message field cannot be empty",
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
      // Add the `invalid-feedback` class to the error element
      error.addClass("invalid-feedback");
      error.insertAfter(element);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).addClass("is-valid").removeClass("is-invalid");
    },
  });
});
