// ================= SETTINGS PAGE =================


document.addEventListener("DOMContentLoaded", () => {


    loadUserProfile();

    loadSettings();

    setupAvatar();

    setupEvents();


});






// ================= PROFILE =================



function getUserProfile() {


    return JSON.parse(

        localStorage.getItem(
            "userProfile"
        )

    )

        ||

    {

        name: "Lữ Thị Trúc Sang",

        email: "sang@gmail.com",

        password: "123456",

        avatar: "images/avatar.png"

    };


}







function loadUserProfile() {


    const user =
        getUserProfile();



    const name =
        document.getElementById(
            "userName"
        );


    const email =
        document.getElementById(
            "userEmail"
        );


    const password =
        document.getElementById(
            "userPassword"
        );


    const avatar =
        document.getElementById(
            "avatarPreview"
        );




    if (name)

        name.value =
            user.name;



    if (email)

        email.value =
            user.email;



    if (password)

        password.value =
            user.password;



    if (avatar)

        avatar.src =
            user.avatar;



}








function saveUserProfile() {



    const oldUser =
        getUserProfile();




    const user = {



        name:

            document.getElementById(
                "userName"
            ).value,



        email:

            document.getElementById(
                "userEmail"
            ).value,



        password:

            document.getElementById(
                "userPassword"
            ).value,



        avatar:

            oldUser.avatar



    };





    localStorage.setItem(

        "userProfile",

        JSON.stringify(user)

    );



    updateAnimation();



}








// ================= AVATAR =================



function setupAvatar() {



    const input =
        document.getElementById(
            "avatarInput"
        );



    const preview =
        document.getElementById(
            "avatarPreview"
        );



    if (!input || !preview)

        return;





    input.addEventListener(
        "change",
        function () {



            const file =
                this.files[0];



            if (!file)

                return;





            const reader =
                new FileReader();






            reader.onload = function (e) {



                preview.src =
                    e.target.result;





                const user =
                    getUserProfile();





                user.avatar =
                    e.target.result;





                localStorage.setItem(

                    "userProfile",

                    JSON.stringify(user)

                );





                updateAnimation();



            };





            reader.readAsDataURL(file);




        }
    );



}








// ================= SETTINGS =================



function loadSettings() {



    const settings =

        JSON.parse(

            localStorage.getItem(
                "settings"
            )

        )

        ||

        {

            theme: "light",

            language: "vi",

            volume: 50,

            notification: false

        };





    const theme =
        document.getElementById(
            "themeSelect"
        );



    const language =
        document.getElementById(
            "languageSelect"
        );



    const volume =
        document.getElementById(
            "volume"
        );



    const volumeValue =
        document.getElementById(
            "volumeValue"
        );



    const notification =
        document.getElementById(
            "notification"
        );





    if (theme)

        theme.value =
            settings.theme;




    if (language)

        language.value =
            settings.language;




    if (volume)

        volume.value =
            settings.volume;




    if (volumeValue)

        volumeValue.innerHTML =
            settings.volume;




    if (notification)

        notification.checked =
            settings.notification;



    applyTheme(
        settings.theme
    );


    applyLanguage(
        settings.language
    );


}









function saveSettings() {



    const data = {



        theme:

            document.getElementById(
                "themeSelect"
            ).value,



        language:

            document.getElementById(
                "languageSelect"
            ).value,



        volume:

            document.getElementById(
                "volume"
            ).value,



        notification:

            document.getElementById(
                "notification"
            ).checked



    };





    localStorage.setItem(

        "settings",

        JSON.stringify(data)

    );





    localStorage.setItem(

        "theme",

        data.theme

    );





    localStorage.setItem(

        "language",

        data.language

    );





    applyTheme(
        data.theme
    );



    applyLanguage(
        data.language
    );



}








// ================= THEME =================



function applyTheme(theme) {



    document.body.classList.remove(

        "light",

        "dark"

    );



    document.body.classList.add(

        theme

    );


}









// ================= LANGUAGE =================



function applyLanguage(lang) {



    document
        .querySelectorAll("[data-vn]")
        .forEach(el => {



            if (lang === "en") {


                el.innerHTML =
                    el.dataset.en;


            }

            else {


                el.innerHTML =
                    el.dataset.vn;


            }



        });


}








// ================= EVENTS =================



function setupEvents() {



    const saveProfile =
        document.getElementById(
            "saveProfile"
        );



    const saveSettingsBtn =
        document.getElementById(
            "saveSettings"
        );



    const volume =
        document.getElementById(
            "volume"
        );




    if (saveProfile)


        saveProfile.onclick =
            saveUserProfile;






    if (saveSettingsBtn)


        saveSettingsBtn.onclick =
            saveSettings;






    if (volume) {



        volume.oninput = function () {



            const value =
                document.getElementById(
                    "volumeValue"
                );



            if (value)

                value.innerHTML =
                    this.value;



        };



    }



}








// ================= ANIMATION =================



function updateAnimation() {



    const card =
        document.querySelector(
            ".card"
        );



    if (!card)

        return;




    card.classList.add(
        "updated"
    );




    setTimeout(() => {


        card.classList.remove(
            "updated"
        );


    }, 500);



}