/* =========================================================
   STATISTICS
   Đọc dữ liệu học thực tế từ localStorage
   Dữ liệu được tạo khi hoàn thành Pomodoro
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        createYearOptions();

        loadStatistics();



        const yearSelect =
            document.getElementById(
                "yearSelect"
            );


        const monthSelect =
            document.getElementById(
                "monthSelect"
            );



        if (
            yearSelect
        ) {

            yearSelect.addEventListener(

                "change",

                function () {

                    renderMonthlyChart();

                }

            );

        }



        if (
            monthSelect
        ) {

            monthSelect.addEventListener(

                "change",

                function () {

                    renderMonthlyChart();

                }

            );

        }


    }
);



// =========================================================
// LẤY DỮ LIỆU HỌC THỰC TẾ TỪ LOCALSTORAGE
// =========================================================


function getStudyData() {


    try {


        const data =
            localStorage.getItem(
                "studyTimeData"
            );



        if (
            !data
        ) {

            return [];

        }



        const parsedData =
            JSON.parse(
                data
            );



        if (
            !Array.isArray(
                parsedData
            )
        ) {

            return [];

        }



        return parsedData

            .filter(

                function (
                    item
                ) {

                    return (

                        item &&

                        item.date &&

                        Number(
                            item.minutes
                        ) > 0

                    );

                }

            )

            .sort(

                function (
                    a,
                    b
                ) {

                    return (

                        new Date(
                            a.date
                        )
                        -
                        new Date(
                            b.date
                        )

                    );

                }

            );


    }

    catch (
        error
    ) {


        console.error(

            "Không thể đọc dữ liệu thống kê:",

            error

        );


        return [];

    }

}



// =========================================================
// LOAD STATISTICS
// =========================================================


function loadStatistics() {


    const data =
        getStudyData();



    renderDailyChart(
        data
    );



    renderDayStatistics(
        data
    );



    createYearOptions();



    renderMonthlyChart();

}



// =========================================================
// LẤY SỐ GIỜ HỌC
// =========================================================


function getItemHours(
    item
) {


    const minutes =
        Number(
            item.minutes ||
            0
        );



    return (
        minutes /
        60
    );

}



// =========================================================
// LẤY SỐ PHÚT HỌC
// =========================================================


function getItemMinutes(
    item
) {


    return Number(
        item.minutes ||
        0
    );

}



// =========================================================
// CHUYỂN NGÀY THÀNH DATE AN TOÀN
// =========================================================


function getDateFromItem(
    item
) {


    if (
        !item ||
        !item.date
    ) {

        return null;

    }



    const date =
        new Date(
            item.date +
            "T00:00:00"
        );



    if (
        isNaN(
            date.getTime()
        )
    ) {

        return null;

    }



    return date;

}



// =========================================================
// ĐỊNH DẠNG NGÀY
// =========================================================


function formatDate(
    date
) {


    return (

        String(
            date.getDate()
        )
        +
        "/"
        +
        String(
            date.getMonth() + 1
        )

    );

}



// =========================================================
// DAILY STUDY CHART
// Chỉ hiển thị ngày thực tế đã học
// =========================================================


function renderDailyChart(
    data
) {


    const chart =
        document.getElementById(
            "dailyChart"
        );


    const empty =
        document.getElementById(
            "dailyEmpty"
        );



    if (
        !chart ||
        !empty
    ) {

        return;

    }



    chart.innerHTML =
        "";



    if (
        !data.length
    ) {


        chart.style.display =
            "none";


        empty.style.display =
            "block";


        return;

    }



    chart.style.display =
        "flex";


    empty.style.display =
        "none";



    /* =============================================
       CHỈ HIỂN THỊ TỐI ĐA 30 NGÀY HỌC GẦN NHẤT
       Không tạo ngày giả.
    ============================================= */


    const recentData =
        data.slice(
            -30
        );



    const maxMinutes =
        Math.max(

            ...recentData.map(

                function (
                    item
                ) {

                    return getItemMinutes(
                        item
                    );

                }

            ),

            1

        );



    recentData.forEach(

        function (
            item
        ) {


            const minutes =
                getItemMinutes(
                    item
                );



            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "vertical-item";



            const bar =
                document.createElement(
                    "div"
                );


            bar.className =
                "vertical-bar";



            /* =============================================
               CHIỀU CAO BIỂU ĐỒ
               Ngày học nhiều nhất = 220px
            ============================================= */


            const height =
                Math.max(

                    (
                        minutes /
                        maxMinutes
                    )
                    *
                    220,

                    15

                );



            bar.style.height =
                height +
                "px";



            const label =
                document.createElement(
                    "span"
                );


            label.className =
                "chart-label";



            const date =
                getDateFromItem(
                    item
                );



            label.textContent =
                date
                ?
                formatDate(
                    date
                )
                :
                "";



            const hour =
                document.createElement(
                    "small"
                );



            hour.textContent =

                getItemHours(
                    item
                )
                .toFixed(
                    1
                )
                +
                "h";



            box.appendChild(
                bar
            );


            box.appendChild(
                label
            );


            box.appendChild(
                hour
            );



            chart.appendChild(
                box
            );


        }

    );

}



// =========================================================
// STUDY DAYS STATISTICS
// Thống kê số ngày học thực tế
// =========================================================


function renderDayStatistics(
    data
) {


    const chart =
        document.getElementById(
            "dayChart"
        );


    const empty =
        document.getElementById(
            "dayEmpty"
        );



    if (
        !chart ||
        !empty
    ) {

        return;

    }



    chart.innerHTML =
        "";



    if (
        !data.length
    ) {


        chart.style.display =
            "none";


        empty.style.display =
            "block";


        return;

    }



    empty.style.display =
        "none";


    chart.style.display =
        "flex";



    const now =
        new Date();



    now.setHours(
        0,
        0,
        0,
        0
    );



    /* =============================================
       TÍNH NGÀY BẮT ĐẦU TUẦN
       Thống kê 7 ngày gần nhất
    ============================================= */


    const sevenDaysAgo =
        new Date(
            now
        );


    sevenDaysAgo.setDate(

        now.getDate()
        -
        6

    );



    sevenDaysAgo.setHours(
        0,
        0,
        0,
        0
    );



    let week =
        0;


    let month =
        0;



    data.forEach(

        function (
            item
        ) {


            const date =
                getDateFromItem(
                    item
                );



            if (
                !date
            ) {

                return;

            }



            date.setHours(
                0,
                0,
                0,
                0
            );



            /* =============================================
               7 NGÀY GẦN NHẤT
            ============================================= */


            if (

                date >=
                sevenDaysAgo

                &&

                date <=
                now

            ) {

                week++;

            }



            /* =============================================
               THÁNG HIỆN TẠI
            ============================================= */


            if (

                date.getMonth()
                ===
                now.getMonth()

                &&

                date.getFullYear()
                ===
                now.getFullYear()

            ) {

                month++;

            }


        }

    );



    createHorizontalBar(

        chart,

        "7 ngày gần nhất",

        week,

        7

    );



    createHorizontalBar(

        chart,

        "Tháng này",

        month,

        getDaysInCurrentMonth()

    );

}



// =========================================================
// LẤY SỐ NGÀY TRONG THÁNG HIỆN TẠI
// =========================================================


function getDaysInCurrentMonth() {


    const now =
        new Date();



    return new Date(

        now.getFullYear(),

        now.getMonth() + 1,

        0

    )
    .getDate();

}



// =========================================================
// HORIZONTAL BAR
// =========================================================


function createHorizontalBar(

    parent,

    title,

    value,

    maxValue

) {


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "horizontal-item";



    const percentage =

        maxValue > 0

        ?

        Math.min(

            (
                value /
                maxValue
            )
            *
            100,

            100

        )

        :

        0;



    item.innerHTML = `

        <div class="horizontal-title">

            <span>
                ${title}
            </span>

            <span>
                ${value} ngày
            </span>

        </div>


        <div class="horizontal-bar">

            <div
                class="horizontal-fill"
                style="width:${percentage}%">

            </div>

        </div>

    `;



    parent.appendChild(
        item
    );

}



// =========================================================
// YEAR SELECT
// Chỉ tạo năm có dữ liệu học thực tế
// =========================================================


function createYearOptions() {


    const select =
        document.getElementById(
            "yearSelect"
        );



    if (
        !select
    ) {

        return;

    }



    const data =
        getStudyData();



    const years =
        new Set();



    data.forEach(

        function (
            item
        ) {


            const date =
                getDateFromItem(
                    item
                );



            if (
                date
            ) {

                years.add(

                    date.getFullYear()

                );

            }


        }

    );



    /* =============================================
       Nếu chưa từng học
       → Hiển thị năm hiện tại
    ============================================= */


    if (
        years.size === 0
    ) {

        years.add(

            new Date()
                .getFullYear()

        );

    }



    const currentValue =
        select.value;



    select.innerHTML =
        "";



    Array.from(
        years
    )
    .sort(

        function (
            a,
            b
        ) {

            return b - a;

        }

    )
    .forEach(

        function (
            year
        ) {


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                year;


            option.textContent =
                year;



            select.appendChild(
                option
            );


        }

    );



    /* =============================================
       GIỮ LẠI NĂM ĐANG CHỌN
    ============================================= */


    if (
        currentValue &&
        years.has(
            Number(
                currentValue
            )
        )
    ) {

        select.value =
            currentValue;

    }



    else {

        select.value =
            Array.from(
                years
            )
            .sort(

                function (
                    a,
                    b
                ) {

                    return b - a;

                }

            )[0];

    }

}



// =========================================================
// MONTHLY CHART
// Thống kê dữ liệu học thực tế theo tháng
// =========================================================


function renderMonthlyChart() {


    const chart =
        document.getElementById(
            "monthChart"
        );


    const empty =
        document.getElementById(
            "monthEmpty"
        );


    const yearSelect =
        document.getElementById(
            "yearSelect"
        );


    const monthSelect =
        document.getElementById(
            "monthSelect"
        );



    if (
        !chart ||
        !empty ||
        !yearSelect ||
        !monthSelect
    ) {

        return;

    }



    chart.innerHTML =
        "";



    const data =
        getStudyData();



    const year =
        Number(
            yearSelect.value
        );



    const selectedMonth =
        monthSelect.value;



    /* =============================================
       LỌC THEO NĂM
    ============================================= */


    const filtered =
        data.filter(

            function (
                item
            ) {


                const date =
                    getDateFromItem(
                        item
                    );



                if (
                    !date
                ) {

                    return false;

                }



                if (

                    date.getFullYear()
                    !==
                    year

                ) {

                    return false;

                }



                /* =====================================
                   NẾU CHỌN THÁNG
                ===================================== */


                if (

                    selectedMonth

                    &&

                    date.getMonth() + 1
                    !==
                    Number(
                        selectedMonth
                    )

                ) {

                    return false;

                }



                return true;

            }

        );



    /* =============================================
       KHÔNG CÓ DỮ LIỆU
    ============================================= */


    if (
        filtered.length === 0
    ) {


        chart.style.display =
            "none";


        empty.style.display =
            "block";


        return;

    }



    chart.style.display =
        "grid";


    empty.style.display =
        "none";



    /* =============================================
       GỘP THỜI GIAN THEO THÁNG
    ============================================= */


    const months = {};



    filtered.forEach(

        function (
            item
        ) {


            const date =
                getDateFromItem(
                    item
                );



            const month =
                date.getMonth() +
                1;



            months[month] =

                (

                    months[month]
                    ||
                    0

                )

                +

                getItemHours(
                    item
                );


        }

    );



    /* =============================================
       TÌM GIỜ HỌC CAO NHẤT
    ============================================= */


    const maxHours =
        Math.max(

            ...Object.values(
                months
            ),

            1

        );



    Object.keys(
        months
    )
    .sort(

        function (
            a,
            b
        ) {

            return (

                Number(a)
                -
                Number(b)

            );

        }

    )
    .forEach(

        function (
            month
        ) {


            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "month-item";



            const hours =
                months[month];



            const height =

                Math.max(

                    (

                        hours /
                        maxHours

                    )
                    *
                    120,

                    15

                );



            box.innerHTML = `

                <div>
                    ${getMonthName(month)}
                </div>


                <div class="month-bar">

                    <span
                        style="height:${height}px">
                    </span>

                </div>


                <div>
                    ${hours.toFixed(1)} giờ
                </div>

            `;



            chart.appendChild(
                box
            );


        }

    );

}



// =========================================================
// MONTH NAME
// =========================================================


function getMonthName(
    month
) {


    const lang =
        localStorage.getItem(
            "language"
        )
        ||
        "vi";



    const vn = [

        "",

        "Tháng 1",

        "Tháng 2",

        "Tháng 3",

        "Tháng 4",

        "Tháng 5",

        "Tháng 6",

        "Tháng 7",

        "Tháng 8",

        "Tháng 9",

        "Tháng 10",

        "Tháng 11",

        "Tháng 12"

    ];



    const en = [

        "",

        "January",

        "February",

        "March",

        "April",

        "May",

        "June",

        "July",

        "August",

        "September",

        "October",

        "November",

        "December"

    ];



    return (

        lang ===
        "en"

        ?

        en[month]

        :

        vn[month]

    );

}