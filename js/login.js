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







// ================= LẤY TÀI KHOẢN =================


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







// ================= ĐẢM BẢO USER CÓ ID =================


if(

!user.id

){


    user.id =

    "USER_" +

    Date.now() +

    "_" +

    Math.random()
    .toString(36)
    .substring(2, 8);







    const userIndex =

    users.findIndex(

        item =>

        item.email === email

    );







    if(

        userIndex !== -1

    ){


        users[userIndex] =

        user;


        localStorage.setItem(

            "users",

            JSON.stringify(users)

        );


    }


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







// ================= TẠO STUDY DATA NẾU CHƯA CÓ =================


const studyDataKey =

"studyData_" +

user.id;







const existingStudyData =

localStorage.getItem(

studyDataKey

);







if(

!existingStudyData

){


    const initialStudyData = {


        currentStreak:

        0,


        bestStreak:

        0,


        lastStudyDate:

        null,


        todayCompleted:

        false,


        updatedAt:

        new Date()
        .toISOString(),


        totalStudyMinutes:

        0,


        dailyStudy:

        {},


        pomodoroSessions:

        []

    };







    localStorage.setItem(

        studyDataKey,

        JSON.stringify(

            initialStudyData

        )

    );


}







// ================= NHỚ ĐĂNG NHẬP =================


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


