 // ================= REGISTER SYSTEM =================
// Vị trí: js/register.js



const registerForm =
document.getElementById("registerForm");




// ================= HIỆN MẬT KHẨU =================


const showPassword =
document.getElementById("showPassword");



if(showPassword){


    showPassword.onclick=function(){


        const pass =
        document.getElementById("password");


        const confirm =
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



if(registerForm){


registerForm.addEventListener(

"submit",

function(e){



e.preventDefault();





const fullname =

document
.getElementById("fullname")
.value
.trim();





const username =

document
.getElementById("username")
.value
.trim();





const email =

document
.getElementById("email")
.value
.trim();





const password =

document
.getElementById("password")
.value
.trim();





const confirmPassword =

document
.getElementById("confirmPassword")
.value
.trim();









if(
    fullname==="" ||
    username==="" ||
    email==="" ||
    password===""
){


    alert(
        "Vui lòng nhập đầy đủ thông tin"
    );


    return;


}







if(password !== confirmPassword){


    alert(
        "Mật khẩu không trùng khớp"
    );


    return;


}









// ================= LƯU TÀI KHOẢN LOCALSTORAGE =================
// SỬA: bỏ gọi API localhost, lưu trực tiếp trên trình duyệt



let users =

JSON.parse(

localStorage.getItem("users")

)

|| [];







// kiểm tra email đã tồn tại


const emailExist =

users.find(

user => user.email === email

);






if(emailExist){


    alert(

        "Email đã được đăng ký"

    );


    return;


}








// kiểm tra username đã tồn tại


const usernameExist =

users.find(

user => user.username === username

);






if(usernameExist){


    alert(

        "Tên tài khoản đã tồn tại"

    );


    return;


}









const newUser = {


    fullname: fullname,


    username: username,


    email: email,


    password: password,


    avatar:"images/avatar.png"


};







users.push(newUser);







localStorage.setItem(

"users",

JSON.stringify(users)

);







alert(

"Đăng ký thành công"

);







window.location.href =

"login.html";





}

);



}
