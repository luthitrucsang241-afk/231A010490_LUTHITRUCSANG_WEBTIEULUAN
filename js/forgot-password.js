let otpCode = "";


// ================= GỬI OTP GMAIL =================


const otpBtn = document.getElementById("otpBtn");


if(otpBtn){


otpBtn.onclick = function(){



let email =
document.getElementById("email").value;



if(email===""){


alert(
"Vui lòng nhập email"
);


return;


}




// kiểm tra email đã đăng ký

let users =
JSON.parse(
localStorage.getItem("users")
) || [];



let check =
users.find(
u => u.email === email
);



if(!check){


alert(
"Email chưa đăng ký"
);


return;


}




// tạo OTP 6 số

otpCode =
Math.floor(
100000 + Math.random()*900000
);





localStorage.setItem(
"otp",
otpCode
);



localStorage.setItem(
"resetEmail",
email
);





// gửi OTP Gmail bằng EmailJS


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
"Gửi OTP thất bại: "
+
error.text
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
document.getElementById("email").value;



let otp =
document.getElementById("otp").value;



let pass =
document.getElementById("newPassword").value;



let confirm =
document.getElementById("confirmPassword").value;






// kiểm tra OTP


if(
otp !==
localStorage.getItem("otp").toString()

){


alert(
"OTP không đúng"
);


return;


}




// kiểm tra mật khẩu


if(
pass !== confirm
){


alert(
"Mật khẩu không trùng khớp"
);


return;


}





// cập nhật mật khẩu


let users =
JSON.parse(
localStorage.getItem("users")
) || [];




users =
users.map(
user => {


if(user.email === email){


user.password = pass;


}


return user;


}

);




localStorage.setItem(

"users",

JSON.stringify(users)

);




alert(

"Đổi mật khẩu thành công"

);



window.location.href =

"login.html";



}

);



}