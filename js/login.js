// ================= LOGIN SYSTEM =================
// Vị trí: js/login.js



// ================= HIỆN / ẨN MẬT KHẨU =================


const showPassword =
document.getElementById("showPassword");


const password =
document.getElementById("password");



if(showPassword && password){


showPassword.onclick=function(){



    if(password.type==="password"){


        password.type="text";


        showPassword.classList
        .remove("fa-eye");


        showPassword.classList
        .add("fa-eye-slash");


    }

    else{


        password.type="password";


        showPassword.classList
        .remove("fa-eye-slash");


        showPassword.classList
        .add("fa-eye");


    }



};


}








// ================= LOGIN =================



const loginForm =
document.getElementById("loginForm");





if(loginForm){



loginForm.addEventListener(

"submit",

function(e){



e.preventDefault();





const email =

document
.getElementById("email")
.value
.trim();





const pass =

document
.getElementById("password")
.value
.trim();






const remember =

document
.getElementById("rememberMe")
.checked;









if(
email==="" ||
pass===""
){


alert(

"Vui lòng nhập đầy đủ thông tin"

);


return;


}









// ================= KIỂM TRA TÀI KHOẢN =================
// SỬA: bỏ API localhost, lấy dữ liệu từ localStorage



const users =

JSON.parse(

localStorage.getItem("users")

)

|| [];







const user =

users.find(

item =>

item.email === email

&&

item.password === pass

);








if(!user){


alert(

"Sai email hoặc mật khẩu"

);


return;


}









// ================= LƯU PHIÊN ĐĂNG NHẬP =================



localStorage.setItem(

"currentUser",

JSON.stringify(user)

);





localStorage.setItem(

"isLogin",

"true"

);








if(remember){



localStorage.setItem(

"rememberLogin",

"true"

);



}

else{



localStorage.removeItem(

"rememberLogin"

);



}







alert(

"Đăng nhập thành công"

);






window.location.href =

"dashboard.html";




}

);



}










// ================= AUTO LOGIN =================



document.addEventListener(

"DOMContentLoaded",

()=>{



const remember =

localStorage.getItem(

"rememberLogin"

);



const user =

localStorage.getItem(

"currentUser"

);





if(

remember==="true"

&&

user

){



window.location.href =

"dashboard.html";


}



}

);
