// ================= AUTH SYSTEM =================

// lấy user
function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || [];
}


// lưu user
function saveUsers(users){
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}


// đăng nhập
function loginUser(email,password){

    let users=getUsers();

    let user=users.find(
        u =>
        u.email===email &&
        u.password===password
    );


    if(user){

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        localStorage.setItem(
            "isLogin",
            "true"
        );


        return true;

    }


    return false;
}



// đăng ký
function registerUser(data){

    let users=getUsers();


    let exists=users.find(
        u=>u.email===data.email
    );


    if(exists){

        return false;

    }


    users.push(data);


    saveUsers(users);


    return true;

}



// kiểm tra đăng nhập
function checkLogin(){


    let status=
    localStorage.getItem("isLogin");


    if(status==="true"){

        return true;

    }


    return false;

}



// đăng xuất

function logout(){


    localStorage.removeItem(
        "currentUser"
    );


    localStorage.removeItem(
        "isLogin"
    );


    location.href="login.html";

}



// lấy user hiện tại

function currentUser(){


    return JSON.parse(
        localStorage.getItem("currentUser")
    );


}