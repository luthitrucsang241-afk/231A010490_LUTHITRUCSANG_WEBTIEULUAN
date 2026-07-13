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






// ================= ĐĂNG NHẬP =================



const loginForm =
document.getElementById("loginForm");



if(loginForm){



loginForm.addEventListener(

"submit",

function(e){



e.preventDefault();





let email =

document
.getElementById("email")
.value
.trim();




let pass =

document
.getElementById("password")
.value
.trim();






// kiểm tra nhập trống


if(email==="" || pass===""){


alert(

"Vui lòng nhập đầy đủ thông tin"

);


return;


}





// lấy danh sách tài khoản đăng ký


let users =

JSON.parse(

localStorage.getItem("users")

) || [];






// tìm email


let user =

users.find(

u =>

u.email === email

);







// email không tồn tại


if(!user){


alert(

"Email chưa được đăng ký"

);


return;


}






// kiểm tra mật khẩu


if(user.password !== pass){


alert(

"Sai mật khẩu"

);


return;


}







// lưu tài khoản đang đăng nhập


localStorage.setItem(

"currentUser",

JSON.stringify(user)

);



localStorage.setItem(

"isLogin",

"true"

);






alert(

"Đăng nhập thành công"

);






window.location.href =

"dashboard.html";



}

);



}