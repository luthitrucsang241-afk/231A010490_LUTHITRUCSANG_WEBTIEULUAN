// =====================================================
// SETTING MENU
// Dùng chung cho Dashboard, Calendar và các trang khác
// =====================================================


document.addEventListener("DOMContentLoaded", () => {


    const settingMenus =
        document.querySelectorAll(".setting-menu");


    // =================================================
    // ĐỒNG BỘ GIAO DIỆN MENU CÀI ĐẶT
    // =================================================

    const style = document.createElement("style");

    style.id = "study-focus-setting-menu-style";

    style.textContent = `

        .setting-menu {
            position: relative !important;
            z-index: 9999 !important;
        }


        .setting-btn {
            cursor: pointer !important;
        }


        .setting-dropdown {
            position: absolute !important;
            top: calc(100% + 10px) !important;
            right: 0 !important;

            width: 190px !important;
            min-width: 190px !important;

            padding: 12px !important;

            background: #ffffff !important;

            border-radius: 12px !important;

            box-shadow:
                0 8px 25px rgba(0, 0, 0, 0.15) !important;

            border: 1px solid rgba(0, 0, 0, 0.08) !important;

            display: none !important;

            flex-direction: column !important;

            gap: 5px !important;

            z-index: 10000 !important;
        }


        .setting-dropdown.show {
            display: flex !important;
        }


        .setting-dropdown h4,
        .setting-dropdown .dropdown-title {
            margin: 4px 5px 6px !important;

            font-size: 14px !important;

            font-weight: 700 !important;

            text-align: left !important;
        }


        .setting-dropdown button {
            width: 100% !important;

            min-height: 38px !important;

            padding: 8px 10px !important;

            border: none !important;

            border-radius: 8px !important;

            background: transparent !important;

            cursor: pointer !important;

            text-align: left !important;

            font-size: 14px !important;

            transition:
                background 0.2s ease,
                transform 0.2s ease !important;
        }


        .setting-dropdown button:hover {
            background: rgba(100, 149, 237, 0.12) !important;

            transform: translateX(2px) !important;
        }


        .setting-dropdown hr {
            width: 100% !important;

            margin: 6px 0 !important;

            border: none !important;

            border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
        }


        body.dark .setting-dropdown {
            background: #1f2937 !important;

            border-color: rgba(255, 255, 255, 0.1) !important;

            box-shadow:
                0 8px 25px rgba(0, 0, 0, 0.35) !important;
        }


        body.dark .setting-dropdown button {
            color: #ffffff !important;
        }


        body.dark .setting-dropdown h4,
        body.dark .setting-dropdown .dropdown-title {
            color: #ffffff !important;
        }


        body.dark .setting-dropdown button:hover {
            background: rgba(255, 255, 255, 0.1) !important;
        }


        body.dark .setting-dropdown hr {
            border-top-color:
                rgba(255, 255, 255, 0.15) !important;
        }

    `;


    if (!document.getElementById(
        "study-focus-setting-menu-style"
    )) {

        document.head.appendChild(style);

    }



    // =================================================
    // XỬ LÝ MỞ / ĐÓNG MENU
    // =================================================

    settingMenus.forEach(menu => {


        const btn =
            menu.querySelector(".setting-btn");


        const dropdown =
            menu.querySelector(".setting-dropdown");



        if (!btn || !dropdown) {

            return;

        }



        btn.addEventListener(
            "click",
            (event) => {


                event.preventDefault();

                event.stopPropagation();



                // Đóng các menu khác

                settingMenus.forEach(otherMenu => {

                    if (otherMenu !== menu) {

                        const otherDropdown =
                            otherMenu.querySelector(
                                ".setting-dropdown"
                            );


                        const otherButton =
                            otherMenu.querySelector(
                                ".setting-btn"
                            );



                        if (otherDropdown) {

                            otherDropdown.classList.remove(
                                "show"
                            );

                        }



                        if (otherButton) {

                            otherButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }

                });



                // Mở / đóng menu hiện tại

                const isOpen =
                    dropdown.classList.toggle("show");



                btn.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );


            }
        );


    });



    // =================================================
    // CLICK RA NGOÀI ĐỂ ĐÓNG MENU
    // =================================================

    document.addEventListener(
        "click",
        () => {


            settingMenus.forEach(menu => {


                const dropdown =
                    menu.querySelector(
                        ".setting-dropdown"
                    );


                const btn =
                    menu.querySelector(
                        ".setting-btn"
                    );



                if (dropdown) {

                    dropdown.classList.remove(
                        "show"
                    );

                }



                if (btn) {

                    btn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


            });


        }
    );



    // =================================================
    // KHÔNG ĐÓNG MENU KHI CLICK BÊN TRONG
    // =================================================

    settingMenus.forEach(menu => {


        const dropdown =
            menu.querySelector(
                ".setting-dropdown"
            );



        if (dropdown) {


            dropdown.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                }
            );


        }


    });


});




// =====================================================
// THEME
// =====================================================


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




// =====================================================
// LANGUAGE
// =====================================================


function changeLanguage(lang) {


    localStorage.setItem(
        "language",
        lang
    );



    document.querySelectorAll(
        "[data-vn]"
    ).forEach(el => {


        if (lang === "en") {


            if (el.dataset.en !== undefined) {

                el.innerHTML =
                    el.dataset.en;

            }


        } else {


            if (el.dataset.vn !== undefined) {

                el.innerHTML =
                    el.dataset.vn;

            }


        }


    });



    // Xử lý placeholder cho input / textarea

    document.querySelectorAll(
        "[data-vn-placeholder]"
    ).forEach(el => {


        if (lang === "en") {


            if (
                el.dataset.enPlaceholder !==
                undefined
            ) {

                el.placeholder =
                    el.dataset.enPlaceholder;

            }


        } else {


            if (
                el.dataset.vnPlaceholder !==
                undefined
            ) {

                el.placeholder =
                    el.dataset.vnPlaceholder;

            }


        }


    });


}




// =====================================================
// LOAD SETTING ĐÃ LƯU
// =====================================================


window.addEventListener(
    "load",
    () => {


        const theme =
            localStorage.getItem(
                "theme"
            );



        if (theme === "dark") {


            document.body.classList.add(
                "dark"
            );


        } else {


            document.body.classList.remove(
                "dark"
            );


        }



        const lang =
            localStorage.getItem(
                "language"
            );



        if (lang) {


            changeLanguage(
                lang
            );


        }


    }
);