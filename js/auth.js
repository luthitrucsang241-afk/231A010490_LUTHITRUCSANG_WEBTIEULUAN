// ================= AUTH SYSTEM =================
// Vị trí: js/auth.js



// ================= LOGIN =================



function loginUser(email, password) {



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

                item.password === password

        );







    if (!user) {


        return false;


    }







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








// ================= REGISTER =================



function registerUser(data) {



    const users =

        JSON.parse(

            localStorage.getItem("users")

        )

        || [];








    const emailExist =

        users.find(

            user =>

                user.email === data.email

        );







    if (emailExist) {


        return false;


    }







    users.push(data);







    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );







    return true;



}








// ================= CHECK LOGIN =================



function checkLogin() {



    return (

        localStorage.getItem(

            "isLogin"

        )

        ===

        "true"

    );



}








// ================= LOGOUT =================



function logout() {



    localStorage.removeItem(

        "currentUser"

    );



    localStorage.removeItem(

        "isLogin"

    );



    localStorage.removeItem(

        "rememberLogin"

    );



    window.location.href =

        "login.html";



}








// ================= CURRENT USER =================



function currentUser() {



    return JSON.parse(

        localStorage.getItem(

            "currentUser"

        )

    );



}
