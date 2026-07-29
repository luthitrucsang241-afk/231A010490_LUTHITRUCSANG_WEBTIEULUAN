// ===============================
// CONTACT EMAILJS
// File: js/contact.js
// ===============================


document.addEventListener("DOMContentLoaded", function () {


    // EmailJS Public Key

    emailjs.init({
        publicKey: "Xj_bGg8CkOkgIJn3j"
    });



    const contactForm = document.getElementById("contact-form");



    if (!contactForm) {

        console.log("Không tìm thấy form contact");

        return;

    }





    contactForm.addEventListener("submit", function (event) {


        event.preventDefault();



        emailjs.sendForm(

            "service_wj4d57l",

            "template_o14yqkq",

            contactForm

        )

        .then(function(response){


            console.log("SUCCESS", response);


            alert("Gửi liên hệ thành công!");

            contactForm.reset();



        })


        .catch(function(error){


            console.log("FAILED", error);


            alert(
                "Gửi liên hệ thất bại! Kiểm tra lại EmailJS."
            );


        });



    });



});
