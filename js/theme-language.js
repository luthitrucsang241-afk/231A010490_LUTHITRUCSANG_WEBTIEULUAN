// ================= THEME =================


function changeTheme(theme){


    document.body.className = theme;



    localStorage.setItem(
        "theme",
        theme
    );


}



// load theme khi mở trang

let savedTheme =
localStorage.getItem("theme");



if(savedTheme){

    document.body.className =
    savedTheme;

}

else{

    document.body.className =
    "light";

}






// ================= LANGUAGE =================


function changeLanguage(lang){



    localStorage.setItem(
        "language",
        lang
    );



    applyLanguage();



}




function applyLanguage(){



    let lang =
    localStorage.getItem("language")
    || "vi";




    document
    .querySelectorAll("[data-vn]")
    .forEach(function(element){



        if(lang==="vi"){



            element.innerHTML =
            element.getAttribute(
                "data-vn"
            );



        }

        else{



            element.innerHTML =
            element.getAttribute(
                "data-en"
            );



        }



    });






    document
    .querySelectorAll("[data-vn-placeholder]")
    .forEach(function(input){



        if(lang==="vi"){


            input.placeholder =
            input.getAttribute(
                "data-vn-placeholder"
            );


        }

        else{


            input.placeholder =
            input.getAttribute(
                "data-en-placeholder"
            );


        }



    });



}





applyLanguage();