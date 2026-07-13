// ================= SETTING MENU =================


document.addEventListener("DOMContentLoaded", () => {


    const btn = document.querySelector(".setting-btn");

    const dropdown = document.querySelector(".setting-dropdown");



    if (btn && dropdown) {


        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            dropdown.classList.toggle("show");

        });


        document.addEventListener("click", () => {

            dropdown.classList.remove("show");

        });


    }



});




// ================= THEME =================


function changeTheme(theme) {


    if (theme === "dark") {


        document.body.classList.add("dark");

        localStorage.setItem(
            "theme",
            "dark"
        );


    } else {


        document.body.classList.remove("dark");

        localStorage.setItem(
            "theme",
            "light"
        );


    }



}




// ================= LANGUAGE =================


function changeLanguage(lang) {


    localStorage.setItem(
        "language",
        lang
    );



    document.querySelectorAll("[data-vn]")
        .forEach(el => {


            if (lang === "en") {


                el.innerHTML =
                    el.dataset.en;


            } else {


                el.innerHTML =
                    el.dataset.vn;


            }


        });



}





// LOAD SETTING


window.addEventListener(
    "load",
    () => {


        let theme =
            localStorage.getItem("theme");


        if (theme === "dark") {

            document.body.classList.add("dark");

        }



        let lang =
            localStorage.getItem("language");


        if (lang) {

            changeLanguage(lang);

        }



    });
