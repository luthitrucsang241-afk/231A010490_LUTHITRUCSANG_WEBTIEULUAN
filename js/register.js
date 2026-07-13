const registerForm = document.getElementById("registerForm");


// ================= HIỆN MẬT KHẨU =================

const showPassword = document.getElementById("showPassword");

if(showPassword){

    showPassword.onclick=function(){

        let pass =
        document.getElementById("password");


        let confirm =
        document.getElementById("confirmPassword");



        if(this.checked){

            pass.type="text";
            confirm.type="text";

        }

        else{

            pass.type="password";
            confirm.type="password";

        }

    };

}



// ================= ĐĂNG KÝ =================


registerForm.addEventListener(
"submit",
function(e){


    e.preventDefault();



    let fullname =
    document.getElementById("fullname").value;



    let username =
    document.getElementById("username").value;



    let email =
    document.getElementById("email").value;



    let password =
    document.getElementById("password").value;



    let confirmPassword =
    document.getElementById("confirmPassword").value;



    // kiểm tra mật khẩu

    if(password !== confirmPassword){

        alert(
        "Mật khẩu không trùng khớp"
        );

        return;

    }



    // lấy user cũ

    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];



    // kiểm tra email tồn tại

    let check =
    users.find(
        user=>user.email===email
    );



    if(check){

        alert(
        "Email đã được đăng ký"
        );

        return;

    }



    // tạo user mới

    let user={

        fullname:fullname,

        username:username,

        email:email,

        password:password

    };



    users.push(user);



    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );



    alert(
    "Đăng ký thành công"
    );



    window.location.href=
    "login.html";


});