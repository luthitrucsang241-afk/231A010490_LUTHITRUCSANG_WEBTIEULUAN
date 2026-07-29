document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       USER & STORAGE
    ========================= */

    const user =
        localStorage.getItem("currentUser") || "guest";


    const storageKey =
        "studyCalendar_" + user;


    let calendarData =
        JSON.parse(
            localStorage.getItem(storageKey)
        ) || {
            schedules: []
        };


    if (
        !calendarData.schedules ||
        !Array.isArray(calendarData.schedules)
    ) {

        calendarData.schedules = [];

    }


    let currentMonth =
        new Date().getMonth();


    let currentYear =
        new Date().getFullYear();


    let editId = null;


    /* =========================
       TUẦN ĐANG XEM
    ========================= */

    let currentWeekStart =
        getMonday(
            new Date()
        );


    /* =========================
       DATA
    ========================= */

    const sessions = [

        {
            vn: "Sáng",
            en: "Morning"
        },

        {
            vn: "Chiều",
            en: "Afternoon"
        },

        {
            vn: "Tối",
            en: "Evening"
        }

    ];


    const weekDays = [

        {
            vn: "Thứ 2",
            en: "Monday"
        },

        {
            vn: "Thứ 3",
            en: "Tuesday"
        },

        {
            vn: "Thứ 4",
            en: "Wednesday"
        },

        {
            vn: "Thứ 5",
            en: "Thursday"
        },

        {
            vn: "Thứ 6",
            en: "Friday"
        },

        {
            vn: "Thứ 7",
            en: "Saturday"
        },

        {
            vn: "Chủ nhật",
            en: "Sunday"
        }

    ];


    /* =========================
       STORAGE
    ========================= */

    function saveData() {

        localStorage.setItem(
            storageKey,
            JSON.stringify(calendarData)
        );

    }


    function createId() {

        return Date.now() +
            Math.random();

    }


    /* =========================
       LANGUAGE
    ========================= */

    function getLanguage() {

        return (
            localStorage.getItem("language")
            || "vi"
        );

    }


    function text(vn, en) {

        return getLanguage() === "en"
            ? en
            : vn;

    }


    function updateLanguage() {

        const lang =
            getLanguage();


        document
            .querySelectorAll("[data-vn]")
            .forEach(el => {

                const value =
                    lang === "en"
                        ? el.dataset.en
                        : el.dataset.vn;


                if (
                    value !== undefined
                ) {

                    el.innerText = value;

                }

            });


        document
            .querySelectorAll("[data-vn-placeholder]")
            .forEach(el => {

                el.placeholder =
                    lang === "en"
                        ? el.dataset.enPlaceholder
                        : el.dataset.vnPlaceholder;

            });

    }


    window.changeLanguage =
        function (lang) {

            localStorage.setItem(
                "language",
                lang
            );


            updateLanguage();


            renderAll();

        };


    /* =========================
       DATE
    ========================= */

    function getLocalDateString(date) {

        const year =
            date.getFullYear();


        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                date.getDate()
            ).padStart(2, "0");


        return `${year}-${month}-${day}`;

    }


    function getWeekDay(dateString) {

        const date =
            new Date(
                dateString + "T00:00:00"
            );


        let day =
            date.getDay();


        day =
            day === 0
                ? 6
                : day - 1;


        return weekDays[day].vn;

    }


    /* =========================
       LẤY THỨ 2 CỦA TUẦN
    ========================= */

    function getMonday(date) {

        const result =
            new Date(date);


        result.setHours(
            0,
            0,
            0,
            0
        );


        const day =
            result.getDay();


        const difference =
            day === 0
                ? -6
                : 1 - day;


        result.setDate(
            result.getDate() +
            difference
        );


        return result;

    }


    /* =========================
       LẤY 7 NGÀY TRONG TUẦN
    ========================= */

    function getWeekDates() {

        const dates = [];


        for (
            let i = 0;
            i < 7;
            i++
        ) {

            const date =
                new Date(
                    currentWeekStart
                );


            date.setDate(
                currentWeekStart.getDate() +
                i
            );


            dates.push(
                getLocalDateString(
                    date
                )
            );

        }


        return dates;

    }


    /* =========================
       ĐỊNH DẠNG KHOẢNG TUẦN
    ========================= */

    function formatWeekRange() {

        const weekDates =
            getWeekDates();


        const firstDate =
            new Date(
                weekDates[0] +
                "T00:00:00"
            );


        const lastDate =
            new Date(
                weekDates[6] +
                "T00:00:00"
            );


        const lang =
            getLanguage();


        const locale =
            lang === "en"
                ? "en-US"
                : "vi-VN";


        const first =
            firstDate.toLocaleDateString(
                locale,
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );


        const last =
            lastDate.toLocaleDateString(
                locale,
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );


        return `${first} - ${last}`;

    }


    /* =========================
       CHUYỂN TUẦN
    ========================= */

    function changeWeek(value) {

        currentWeekStart.setDate(
            currentWeekStart.getDate() +
            (value * 7)
        );


        renderWeeklySchedule();

    }


    window.changeWeek =
        changeWeek;


    /* =========================
       VỀ TUẦN HIỆN TẠI
    ========================= */

    function goToCurrentWeek() {

        currentWeekStart =
            getMonday(
                new Date()
            );


        renderWeeklySchedule();

    }


    window.goToCurrentWeek =
        goToCurrentWeek;


    /* =========================
       ADD SCHEDULE
    ========================= */

    function addSchedule() {

        const date =
            document
                .getElementById("studyDate")
                .value;


        const session =
            document
                .getElementById("studySession")
                .value;


        const subject =
            document
                .getElementById("subject")
                .value
                .trim();


        const content =
            document
                .getElementById("content")
                .value
                .trim();


        const note =
            document
                .getElementById("note")
                .value
                .trim();


        const studyTime =
            Number(
                document
                    .getElementById("studyTime")
                    .value
            );


        if (
            !date ||
            !subject
        ) {

            alert(
                text(
                    "Vui lòng nhập ngày và môn học",
                    "Please enter date and subject"
                )
            );

            return;

        }


        if (editId) {

            updateSchedule();

            return;

        }


        const item = {

            id: createId(),

            date: date,

            day: getWeekDay(date),

            session: session,

            subject: subject,

            content: content,

            note: note,

            studyTime:
                studyTime >= 0
                    ? studyTime
                    : 0,

            completed: true

        };


        calendarData.schedules.push(
            item
        );


        saveData();


        clearInput();


        currentWeekStart =
            getMonday(
                new Date(
                    date +
                    "T00:00:00"
                )
            );


        renderAll();

    }


    window.addSchedule =
        addSchedule;


    /* =========================
       CLEAR FORM
    ========================= */

    function clearInput() {

        [

            "studyDate",

            "subject",

            "content",

            "note",

            "studyTime"

        ].forEach(id => {

            const el =
                document.getElementById(id);


            if (el) {

                el.value = "";

            }

        });


        document
            .getElementById("studySession")
            .value = "Sáng";


        editId = null;


        const button =
            document.getElementById(
                "scheduleSubmitButton"
            );


        if (button) {

            button.dataset.vn =
                "Thêm lịch";


            button.dataset.en =
                "Add Schedule";

        }


        updateLanguage();

    }


    /* =========================
       DELETE
    ========================= */

    function deleteSchedule(id) {

        const confirmDelete =
            confirm(
                text(
                    "Bạn có chắc muốn xóa lịch học này không?",
                    "Are you sure you want to delete this study schedule?"
                )
            );


        if (!confirmDelete) {

            return;

        }


        calendarData.schedules =
            calendarData.schedules.filter(
                item =>
                    item.id !== id
            );


        saveData();


        renderAll();

    }


    window.deleteSchedule =
        deleteSchedule;


    /* =========================
       EDIT
    ========================= */

    function editSchedule(id) {

        const item =
            calendarData.schedules.find(
                x =>
                    x.id === id
            );


        if (!item) {

            return;

        }


        editId = id;


        document
            .getElementById("studyDate")
            .value =
            item.date;


        document
            .getElementById("studySession")
            .value =
            item.session;


        document
            .getElementById("subject")
            .value =
            item.subject;


        document
            .getElementById("content")
            .value =
            item.content || "";


        document
            .getElementById("note")
            .value =
            item.note || "";


        document
            .getElementById("studyTime")
            .value =
            item.studyTime || 0;


        const button =
            document.getElementById(
                "scheduleSubmitButton"
            );


        if (button) {

            button.dataset.vn =
                "Lưu thay đổi";


            button.dataset.en =
                "Save Changes";


            updateLanguage();

        }


        document
            .querySelector(".schedule-form")
            .scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

    }


    window.editSchedule =
        editSchedule;


    /* =========================
       UPDATE
    ========================= */

    function updateSchedule() {

        if (!editId) {

            addSchedule();

            return;

        }


        const item =
            calendarData.schedules.find(
                x =>
                    x.id === editId
            );


        if (!item) {

            return;

        }


        const date =
            document
                .getElementById("studyDate")
                .value;


        const subject =
            document
                .getElementById("subject")
                .value
                .trim();


        if (
            !date ||
            !subject
        ) {

            alert(
                text(
                    "Vui lòng nhập ngày và môn học",
                    "Please enter date and subject"
                )
            );

            return;

        }


        item.date =
            date;


        item.day =
            getWeekDay(date);


        item.session =
            document
                .getElementById("studySession")
                .value;


        item.subject =
            subject;


        item.content =
            document
                .getElementById("content")
                .value
                .trim();


        item.note =
            document
                .getElementById("note")
                .value
                .trim();


        item.studyTime =
            Number(
                document
                    .getElementById("studyTime")
                    .value
            ) || 0;


        saveData();


        currentWeekStart =
            getMonday(
                new Date(
                    date +
                    "T00:00:00"
                )
            );


        clearInput();


        renderAll();

    }


    window.updateSchedule =
        updateSchedule;


    /* =========================
       EDIT MODAL
       GIỮ LẠI ĐỂ TƯƠNG THÍCH
    ========================= */

    window.saveEdit =
        function () {

            updateSchedule();

        };


    window.closeEdit =
        function () {

            const modal =
                document.getElementById(
                    "editModal"
                );


            if (modal) {

                modal.classList.remove(
                    "show"
                );

            }

        };


    /* =========================
       WEEKLY STUDY SCHEDULE
       CÓ CHUYỂN TUẦN
       CÓ SỬA + XÓA
    ========================= */

    function renderWeeklySchedule() {

        const box =
            document.getElementById(
                "weeklyStudyTable"
            );


        if (!box) {

            return;

        }


        const weekDates =
            getWeekDates();


        let html = `

            <div class="week-control">

                <button
                    onclick="changeWeek(-1)">

                    ◀
                    ${text(
                        "Tuần trước",
                        "Previous Week"
                    )}

                </button>


                <button
                    onclick="goToCurrentWeek()">

                    ${text(
                        "Tuần hiện tại",
                        "Current Week"
                    )}

                </button>


                <button
                    onclick="changeWeek(1)">

                    ${text(
                        "Tuần sau",
                        "Next Week"
                    )}
                    ▶

                </button>

            </div>


            <h3 class="week-title">

                ${text(
                    "Tuần",
                    "Week"
                )}

                ${formatWeekRange()}

            </h3>


            <table>

                <tr>

                    <th>
                        #
                    </th>

                    ${weekDays.map(
                        (day, index) => `

                        <th>

                            <span
                                data-vn="${day.vn}"
                                data-en="${day.en}">

                                ${
                                    getLanguage() === "en"
                                        ? day.en
                                        : day.vn
                                }

                            </span>

                            <small>

                                ${weekDates[index]
                                    .split("-")
                                    .reverse()
                                    .join("/")}

                            </small>

                        </th>

                    `
                    ).join("")}

                </tr>

        `;


        sessions.forEach(
            session => {

                html += `

                    <tr>

                        <td>

                            <strong>

                                <span
                                    data-vn="${session.vn}"
                                    data-en="${session.en}">

                                    ${
                                        getLanguage() === "en"
                                            ? session.en
                                            : session.vn
                                    }

                                </span>

                            </strong>

                        </td>

                `;


                weekDays.forEach(
                    (day, dayIndex) => {

                        const selectedDate =
                            weekDates[
                                dayIndex
                            ];


                        const list =
                            calendarData.schedules.filter(
                                item =>

                                    item.date ===
                                    selectedDate

                                    &&

                                    item.session ===
                                    session.vn
                            );


                        html += `

                            <td>

                                ${
                                    list.length
                                        ? list.map(
                                            item => `

                                                <div
                                                    class="weekly-event">

                                                    <strong>

                                                        📘

                                                        ${escapeHtml(
                                                            item.subject
                                                        )}

                                                    </strong>


                                                    ${
                                                        item.content
                                                            ? `

                                                                <small>

                                                                    ${escapeHtml(
                                                                        item.content
                                                                    )}

                                                                </small>

                                                              `
                                                            : ""
                                                    }


                                                    ${
                                                        item.note
                                                            ? `

                                                                <small>

                                                                    ${escapeHtml(
                                                                        item.note
                                                                    )}

                                                                </small>

                                                              `
                                                            : ""
                                                    }


                                                    <div
                                                        class="event-actions">

                                                        <button
                                                            type="button"
                                                            onclick="editSchedule(${item.id})">

                                                            

                                                            ${text(
                                                                "Sửa",
                                                                "Edit"
                                                            )}

                                                        </button>


                                                        <button
                                                            type="button"
                                                            onclick="deleteSchedule(${item.id})">

                                                            

                                                            ${text(
                                                                "Xóa",
                                                                "Delete"
                                                            )}

                                                        </button>

                                                    </div>

                                                </div>

                                            `
                                        ).join("")
                                        : `

                                            <span
                                                class="empty-cell">

                                                —

                                            </span>

                                          `
                                }

                            </td>

                        `;

                    }
                );


                html += `

                    </tr>

                `;

            }
        );


        html += `

            </table>

        `;


        box.innerHTML =
            html;

    }


    /* =========================
       ESCAPE HTML
    ========================= */

    function escapeHtml(value) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            value || "";


        return div.innerHTML;

    }


    /* =========================
       MONTH CALENDAR
    ========================= */

    function renderMonth() {

        const box =
            document.getElementById(
                "monthCalendar"
            );


        const title =
            document.getElementById(
                "monthTitle"
            );


        if (!box) {

            return;

        }


        const monthName =
            new Date(
                currentYear,
                currentMonth,
                1
            ).toLocaleString(

                getLanguage() === "en"
                    ? "en-US"
                    : "vi-VN",

                {

                    month: "long",

                    year: "numeric"

                }

            );


        if (title) {

            title.innerText =
                monthName;

        }


        const days =
            new Date(
                currentYear,
                currentMonth + 1,
                0
            ).getDate();


        const fragment =
            document.createDocumentFragment();


        for (
            let i = 1;
            i <= days;
            i++
        ) {

            const date =
                `${currentYear}-${String(
                    currentMonth + 1
                ).padStart(2, "0")}-${String(
                    i
                ).padStart(2, "0")}`;


            const has =
                calendarData.schedules.some(
                    item =>
                        item.date === date
                );


            const day =
                document.createElement(
                    "div"
                );


            day.className =
                has
                    ? "day event"
                    : "day";


            day.innerHTML =
                has
                    ? `${i}<span>🔥</span>`
                    : `${i}`;


            fragment.appendChild(
                day
            );

        }


        box.innerHTML = "";


        box.appendChild(
            fragment
        );

    }


    window.changeMonth =
        function (value) {

            currentMonth += value;


            if (
                currentMonth > 11
            ) {

                currentMonth = 0;

                currentYear++;

            }


            if (
                currentMonth < 0
            ) {

                currentMonth = 11;

                currentYear--;

            }


            renderMonth();

        };


    /* =========================
       STUDY STREAK
    ========================= */

    function renderStreak() {

        const fire =
            document.getElementById(
                "streakFire"
            );


        const streakText =
            document.getElementById(
                "streakText"
            );


        if (
            !fire ||
            !streakText
        ) {

            return;

        }


        const dates =
            [
                ...new Set(

                    calendarData.schedules
                        .map(
                            item =>
                                item.date
                        )

                )

            ].sort();


        const streak =
            calculateStreak(
                dates
            );


        if (streak > 0) {

            const fireCount =
                Math.min(
                    streak,
                    10
                );


            fire.innerHTML =
                "🔥".repeat(
                    fireCount
                );


            streakText.innerText =
                `${streak} ${
                    getLanguage() === "en"
                        ? "days study streak"
                        : "ngày học liên tục"
                }`;

        }
        else {

            fire.innerHTML =
                "🔥";


            streakText.innerText =
                text(
                    "Chưa có lịch học",
                    "No study record"
                );

        }

    }


    function calculateStreak(dates) {

        if (
            !dates.length
        ) {

            return 0;

        }


        let max = 1;

        let current = 1;


        for (
            let i = 1;
            i < dates.length;
            i++
        ) {

            const previous =
                new Date(
                    dates[i - 1] +
                    "T00:00:00"
                );


            const now =
                new Date(
                    dates[i] +
                    "T00:00:00"
                );


            const diff =
                Math.round(
                    (
                        now -
                        previous
                    ) /
                    86400000
                );


            if (
                diff === 1
            ) {

                current++;


                max =
                    Math.max(
                        max,
                        current
                    );

            }
            else {

                current = 1;

            }

        }


        return max;

    }


    /* =========================
       STUDY TIME
    ========================= */

    function renderStudyTime() {

        const today =
            document.getElementById(
                "todayStudy"
            );


        const total =
            document.getElementById(
                "totalStudy"
            );


        if (
            !today ||
            !total
        ) {

            return;

        }


        const now =
            getLocalDateString(
                new Date()
            );


        let todayTime = 0;

        let totalTime = 0;


        calendarData.schedules.forEach(
            item => {

                const time =
                    Number(
                        item.studyTime || 0
                    );


                totalTime += time;


                if (
                    item.date === now
                ) {

                    todayTime += time;

                }

            }
        );


        today.innerText =
            todayTime > 0
                ? `${todayTime} ${
                    getLanguage() === "en"
                        ? "hours"
                        : "giờ"
                }`
                : (
                    getLanguage() === "en"
                        ? "No study time today"
                        : "Chưa có thời gian học hôm nay"
                );


        total.innerText =
            `${totalTime} ${
                getLanguage() === "en"
                    ? "hours"
                    : "giờ"
            }`;

    }


    /* =========================
       RENDER ALL
    ========================= */

    function renderAll() {

        updateLanguage();

        renderWeeklySchedule();

        renderMonth();

        renderStreak();

        renderStudyTime();

    }


    /* =========================
       SETTING DROPDOWN
    ========================= */

    const settingButton =
        document.querySelector(
            ".setting-btn"
        );


    const settingDropdown =
        document.querySelector(
            ".setting-dropdown"
        );


    if (
        settingButton &&
        settingDropdown
    ) {

        settingButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                settingDropdown.classList.toggle(
                    "show"
                );

            }
        );


        document.addEventListener(
            "click",
            event => {

                if (
                    !event.target.closest(
                        ".setting-menu"
                    )
                ) {

                    settingDropdown.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /* =========================
       INITIAL LOAD
    ========================= */

    updateLanguage();

    renderAll();

});
