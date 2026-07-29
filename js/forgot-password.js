let otpCode = "";


// ================= GỬI OTP =================


const otpBtn = document.getElementById("otpBtn");


if(otpBtn){


otpBtn.onclick = function(){



let email =

document

.getElementById("email")

.value

.trim();





if(email===""){


alert(

"Vui lòng nhập email"

);


return;


}







// ================= KIỂM TRA EMAIL ĐÃ ĐĂNG KÝ =================
// SỬA: dùng chung dữ liệu với register.js bằng localStorage.users



let users =

JSON.parse(

localStorage.getItem("users")

)

|| [];






let check =

users.find(

user =>

user.email === email

);







if(!check){


alert(

"Email chưa đăng ký"

);


return;


}








// ================= TẠO OTP =================



otpCode =

Math.floor(

100000 +

Math.random() * 900000

);







localStorage.setItem(

"otp",

otpCode

);







localStorage.setItem(

"resetEmail",

email

);








// ================= GỬI EMAIL QUA EMAILJS =================



emailjs.send(

"service_wj4d57l",

"template_yvwmscq",

{


to_email: email,


otp: otpCode



}

)

.then(function(response){


console.log(

"SUCCESS:",

response

);



alert(

"OTP đã được gửi tới Gmail"

);



})



.catch(function(error){


console.log(

"EMAILJS ERROR:",

error

);



alert(

"Gửi OTP thất bại"

);



});



};


}








// ================= ĐỔI MẬT KHẨU =================



const forgotForm =

document.getElementById("forgotForm");





if(forgotForm){



forgotForm.addEventListener(

"submit",

function(e){


e.preventDefault();






let email =

document

.getElementById("email")

.value

.trim();






let otp =

document

.getElementById("otp")

.value

.trim();






let pass =

document

.getElementById("newPassword")

.value

.trim();






let confirm =

document

.getElementById("confirmPassword")

.value

.trim();











// ================= KIỂM TRA OTP =================



if(

otp !==

String(

localStorage.getItem("otp")

)

){


alert(

"OTP không đúng"

);


return;


}








// ================= KIỂM TRA MẬT KHẨU =================



if(

pass !== confirm

){


alert(

"Mật khẩu không trùng khớp"

);


return;


}








// ================= CẬP NHẬT MẬT KHẨU =================
// SỬA: cập nhật trực tiếp users thay vì dữ liệu cũ không đồng bộ



let users =

JSON.parse(

localStorage.getItem("users")

)

|| [];








users =

users.map(

user => {



if(

user.email === email

){



user.password = pass;



}



return user;



}

);







localStorage.setItem(

"users",

JSON.stringify(users)

);








// xóa dữ liệu reset sau khi hoàn thành


localStorage.removeItem(

"otp"

);


localStorage.removeItem(

"resetEmail"

);








alert(

"Đổi mật khẩu thành công"

);







window.location.href =

"login.html";



}

);



}
