$(document).ready(function () {
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
      admissionFor: "required",
      parentsName: "required",
      studentsName: "required",
      email: "required",
      phone: "required",
      address: "required",
      message: "required",
    },
    messages: {
      admissionFor: "Please select one option",
      parentsName: "Parent's name field cannot be empty",
      studentsName: "Student's name field cannot be empty",
      email: "Email field cannot be empty",
      phone: "Phone field cannot be empty",
      address: "Address field cannot be empty",
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

    submitHandler: function (form, e) {
      e.preventDefault();
      $("#formSubmitBtn").text("Sending...");
      $("#formSubmitBtn").attr("disabled", true);
      var formData = {
        admission_for: $("#admissionFor").val(),
        parents_name: $("#parentsName").val(),
        students_name: $("#studentsName").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        address: $("#address").val(),
        message: $("#message").val(),
      };

      $.ajax({
        cache: false,
        dataType: "json",
        method: "post",
        url: "mailscript.php",
        data: formData,
        async: false,
        encode: true,
      }).done(function (data) {
        if (data["msgType"] == true) {
          Swal.fire({
            icon: data["icon"],
            title: data["title"],
            text: data["msg"],
          }).then(() => {
            $("#formSubmitBtn").text("Submit");
            $("#formSubmitBtn").attr("disabled", false);
            $("#contatcForm")[0].reset();
          });
        } else {
          Swal.fire({
            icon: data["icon"],
            title: data["title"],
            text: data["msg"],
          }).then(() => {
            $("#formSubmitBtn").text("Submit");
            $("#formSubmitBtn").attr("disabled", false);
          });
        }
        console.log(data);
      });
    },
  });
});
