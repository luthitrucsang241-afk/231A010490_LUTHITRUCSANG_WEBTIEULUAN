// ================= PROFILE =================


document.addEventListener("DOMContentLoaded", () => {


    loadProfile();

    loadAvatar();

    loadStudyData();


});





// ================= USER DATA =================


// Dùng chung với settings + dashboard

function getUserProfile(){


    return JSON.parse(
        localStorage.getItem("userProfile")
    )
    ||
    {

        name:"Lữ Thị Trúc Sang",

        avatar:"images/avatar.png",

        email:"sang@gmail.com",

        username:"studyfocus",

        password:"123456"

    };


}





function saveUserProfile(data){


    localStorage.setItem(

        "userProfile",

        JSON.stringify(data)

    );


    // báo cho các trang khác cập nhật

    window.dispatchEvent(
        new Event("userUpdated")
    );


}







// ================= LOAD PROFILE =================



function loadProfile(){


    const user =
    getUserProfile();




    const name =
    document.getElementById(
        "profileName"
    );


    const email =
    document.getElementById(
        "profileEmail"
    );


    const username =
    document.getElementById(
        "profileUsername"
    );




    if(name)

        name.value =
        user.name;




    if(email)

        email.value =
        user.email;




    if(username)

        username.value =
        user.username;



}








// ================= SAVE PROFILE =================



function saveProfile(){



    let user =
    getUserProfile();




    const name =
    document.getElementById(
        "profileName"
    );


    const email =
    document.getElementById(
        "profileEmail"
    );


    const username =
    document.getElementById(
        "profileUsername"
    );




    if(name)

        user.name =
        name.value;




    if(email)

        user.email =
        email.value;




    if(username)

        user.username =
        username.value;





    saveUserProfile(user);




    showMessage(
        "Cập nhật thành công",
        "Updated successfully"
    );


}









// ================= AVATAR =================



const avatarInput =
document.getElementById(
    "avatarInput"
);




if(avatarInput){



    avatarInput.addEventListener(

        "change",

        function(){



            const file =
            this.files[0];



            if(!file)

                return;





            const reader =
            new FileReader();





            reader.onload=function(e){



                let user =
                getUserProfile();




                user.avatar =
                e.target.result;




                saveUserProfile(user);




                const img =
                document.getElementById(
                    "avatarImage"
                );



                if(img)

                    img.src =
                    e.target.result;




            };





            reader.readAsDataURL(file);



        }

    );


}









// ================= LOAD AVATAR =================



function loadAvatar(){



    const user =
    getUserProfile();




    const img =
    document.getElementById(
        "avatarImage"
    );




    if(img)


        img.src =
        user.avatar;



}










// ================= LISTEN UPDATE =================



window.addEventListener(

"userUpdated",

()=>{


    loadProfile();

    loadAvatar();


}

);









// ================= SECURITY =================



function updateSecurity(){



    let user =
    getUserProfile();




    const email =
    document.getElementById(
        "newEmail"
    );



    const password =
    document.getElementById(
        "newPassword"
    );





    if(email.value){


        user.email =
        email.value;


        document.getElementById(
            "profileEmail"
        ).value =
        email.value;


    }






    if(password.value){


        user.password =
        password.value;


    }







    saveUserProfile(user);





    email.value="";

    password.value="";





    showMessage(

        "Cập nhật thành công",

        "Updated successfully"

    );



}










// ================= STUDY DATA =================



function loadStudyData(){



    const user =
    localStorage.getItem(
        "currentUser"
    )
    ||
    "guest";




    const pomodoro =

    Number(

        localStorage.getItem(
            "pomodoroCount_" + user
        )

        ||

        0

    );





    const calendar =

    JSON.parse(

        localStorage.getItem(

            "studyCalendar_" + user

        )

    )

    ||

    {

        schedules:[]

    };







    let days =
    new Set();



    let hours=0;





    calendar.schedules.forEach(

        item=>{


            days.add(
                item.date
            );



            hours +=

            Number(

                item.studyTime

                ||

                0

            );



        }

    );







    const pomodoroEl =
    document.getElementById(
        "pomodoroCount"
    );


    const daysEl =
    document.getElementById(
        "studyDays"
    );


    const hoursEl =
    document.getElementById(
        "studyHours"
    );






    if(pomodoroEl)

        pomodoroEl.innerHTML =
        pomodoro;



    if(daysEl)

        daysEl.innerHTML =
        days.size;



    if(hoursEl)

        hoursEl.innerHTML =
        hours+"h";



}










// ================= MESSAGE =================



function showMessage(vn,en){



    const lang =

    localStorage.getItem(
        "language"
    )

    ||

    "vi";




    alert(

        lang==="en"

        ?

        en

        :

        vn

    );


}