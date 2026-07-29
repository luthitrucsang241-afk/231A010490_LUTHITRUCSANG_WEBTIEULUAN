// ===============================
// CONTACT EMAILJS
// File: js/contact.js
// ===============================


// Kiểm tra file đã chạy
console.log("CONTACT JS RUNNING");



document.addEventListener("DOMContentLoaded", function () {



    // Khởi tạo EmailJS bằng Public Key

    emailjs.init({
        publicKey: "Xj_bGg8CkOkgIJn3j"
    });





    // Lấy form liên hệ

    const contactForm = document.getElementById("contact-form");





    // Kiểm tra có form không

    if (!contactForm) {


        console.log("Không tìm thấy form contact");


        return;


    }







    // Xử lý khi bấm gửi

    contactForm.addEventListener("submit", function (event) {



        event.preventDefault();





        console.log("Đang gửi EmailJS...");






        emailjs.sendForm(

            "service_wj4d57l",

            "template_o14yqkq",

            contactForm

        )



            .then(function (response) {



                console.log("SUCCESS:", response);



                alert("Gửi liên hệ thành công!");



                contactForm.reset();





            })



            .catch(function (error) {



                console.log("FAILED FULL ERROR:", error);



                alert(
                    "Gửi liên hệ thất bại: " + error.text
                );



            });




    });




});
