/* =====================================
   STUDY FOCUS DASHBOARD QUOTE SYSTEM
   Random Quote + Favorite + Copy
===================================== */


/* ===============================
   QUOTE DATA
================================ */

const dashboardQuotes = [

    {
        text: "Don't watch the clock. Do what it does. Keep going.",
        author: "Sam Levenson"
    },

    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },

    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },

    {
        text: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier"
    },

    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },

    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },

    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },

    {
        text: "Start where you are. Use what you have. Do what you can.",
        author: "Arthur Ashe"
    },

    {
        text: "Success is not final, failure is not fatal.",
        author: "Winston Churchill"
    },

    {
        text: "The expert in anything was once a beginner.",
        author: "Helen Hayes"
    },

    {
        text: "A little progress each day adds up to big results.",
        author: "Unknown"
    },

    {
        text: "You are capable of more than you know.",
        author: "Unknown"
    },

    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },

    {
        text: "Difficult roads often lead to beautiful destinations.",
        author: "Unknown"
    },

    {
        text: "Focus on being productive instead of busy.",
        author: "Tim Ferriss"
    },

    {
        text: "Your only limit is your mind.",
        author: "Unknown"
    },

    {
        text: "Every accomplishment starts with the decision to try.",
        author: "John F. Kennedy"
    },

    {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu"
    },

    {
        text: "Don't count the days, make the days count.",
        author: "Muhammad Ali"
    },

    {
        text: "The best preparation for tomorrow is doing your best today.",
        author: "H. Jackson Brown Jr."
    },

    {
        text: "Learning never exhausts the mind.",
        author: "Leonardo da Vinci"
    },

    {
        text: "Knowledge is power.",
        author: "Francis Bacon"
    },

    {
        text: "Study while others are sleeping; work while others are loafing.",
        author: "William Arthur Ward"
    },

    {
        text: "Strive for progress, not perfection.",
        author: "Unknown"
    },

    {
        text: "Small steps every day.",
        author: "Unknown"
    },

    {
        text: "Discipline is the bridge between goals and accomplishment.",
        author: "Jim Rohn"
    },

    {
        text: "Motivation gets you started. Habit keeps you going.",
        author: "Jim Ryun"
    },

    {
        text: "Success doesn't come from what you do occasionally. It comes from what you do consistently.",
        author: "Marie Forleo"
    },

    {
        text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
        author: "Stephen Covey"
    },

    {
        text: "Lost time is never found again.",
        author: "Benjamin Franklin"
    },

    {
        text: "If you spend too much time thinking about a thing, you'll never get it done.",
        author: "Bruce Lee"
    },

    {
        text: "Well done is better than well said.",
        author: "Benjamin Franklin"
    },

    {
        text: "Great things never come from comfort zones.",
        author: "Unknown"
    },

    {
        text: "Don't let yesterday take up too much of today.",
        author: "Will Rogers"
    },

    {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
    },

    {
        text: "It is never too late to be what you might have been.",
        author: "George Eliot"
    },

    {
        text: "Don't wish it were easier. Wish you were better.",
        author: "Jim Rohn"
    },

    {
        text: "Believe in yourself and all that you are.",
        author: "Christian D. Larson"
    },

    {
        text: "Nothing will work unless you do.",
        author: "Maya Angelou"
    },

    {
        text: "You don't have to see the whole staircase, just take the first step.",
        author: "Martin Luther King Jr."
    },

    {
        text: "The best view comes after the hardest climb.",
        author: "Unknown"
    },

    {
        text: "Sometimes later becomes never. Do it now.",
        author: "Unknown"
    },

    {
        text: "You are stronger than you think.",
        author: "Unknown"
    },

    {
        text: "Every day is a new beginning. Take a deep breath, smile, and start again.",
        author: "Unknown"
    },

    {
        text: "One day or day one. You decide.",
        author: "Paulo Coelho"
    },

    {
        text: "Your future is created by what you do today, not tomorrow.",
        author: "Robert Kiyosaki"
    },

    {
        text: "Make each day your masterpiece.",
        author: "John Wooden"
    },

    {
        text: "Great things take time.",
        author: "Unknown"
    },

    {
        text: "Keep going. Everything you need will come to you at the perfect time.",
        author: "Unknown"
    }

];



/* ===============================
   CURRENT QUOTE
================================ */

let dashboardCurrentQuote =
    dashboardQuotes[0];



/* ===============================
   GET FAVORITE QUOTES
================================ */

function getDashboardFavoriteQuotes() {

    try {

        const favorites =
            JSON.parse(
                localStorage.getItem(
                    "favoriteQuotes"
                )
            );

        return Array.isArray(favorites)
            ? favorites
            : [];

    }

    catch (error) {

        return [];

    }

}



/* ===============================
   SAVE FAVORITE QUOTES
================================ */

function saveDashboardFavoriteQuotes(
    favorites
) {

    localStorage.setItem(
        "favoriteQuotes",
        JSON.stringify(favorites)
    );

}



/* ===============================
   UPDATE FAVORITE BUTTON
================================ */

function updateDashboardFavoriteButton(
    favoriteButton
) {

    if (!favoriteButton) {

        return;

    }


    const favorites =
        getDashboardFavoriteQuotes();


    const isFavorite =
        favorites.some(
            quote =>
                quote.text ===
                dashboardCurrentQuote.text
                &&
                quote.author ===
                dashboardCurrentQuote.author
        );


    const span =
        favoriteButton.querySelector(
            "span"
        );


    const language =
        localStorage.getItem(
            "language"
        ) || "vi";


    if (isFavorite) {

        favoriteButton.classList.add(
            "active"
        );


        if (span) {

            span.textContent =
                language === "en"
                    ? "Unfavorite"
                    : "Bỏ yêu thích";

        }

    }

    else {

        favoriteButton.classList.remove(
            "active"
        );


        if (span) {

            span.textContent =
                language === "en"
                    ? "Favorite"
                    : "Yêu thích";

        }

    }

}



/* ===============================
   SHOW RANDOM QUOTE
================================ */

function showDashboardRandomQuote(
    quoteText,
    quoteAuthor,
    favoriteButton
) {

    if (
        !quoteText ||
        !quoteAuthor
    ) {

        return;

    }


    let randomIndex;


    do {

        randomIndex =
            Math.floor(
                Math.random()
                *
                dashboardQuotes.length
            );

    }

    while (

        dashboardQuotes.length > 1
        &&
        dashboardQuotes[randomIndex].text
        ===
        dashboardCurrentQuote.text

    );


    dashboardCurrentQuote =
        dashboardQuotes[randomIndex];


    quoteText.textContent =
        `"${dashboardCurrentQuote.text}"`;


    quoteAuthor.textContent =
        `— ${dashboardCurrentQuote.author}`;


    updateDashboardFavoriteButton(
        favoriteButton
    );

}



/* ===============================
   TOGGLE FAVORITE
================================ */

function toggleDashboardFavorite(
    favoriteButton
) {

    if (!dashboardCurrentQuote) {

        return;

    }


    let favorites =
        getDashboardFavoriteQuotes();


    const quoteIndex =
        favorites.findIndex(
            quote =>
                quote.text ===
                dashboardCurrentQuote.text
                &&
                quote.author ===
                dashboardCurrentQuote.author
        );


    if (quoteIndex !== -1) {

        favorites.splice(
            quoteIndex,
            1
        );

    }

    else {

        favorites.push(
            dashboardCurrentQuote
        );

    }


    saveDashboardFavoriteQuotes(
        favorites
    );


    updateDashboardFavoriteButton(
        favoriteButton
    );

}



/* ===============================
   COPY QUOTE
================================ */

function copyDashboardQuote(
    copyButton
) {

    if (!dashboardCurrentQuote) {

        return;

    }


    const textToCopy =
        `"${dashboardCurrentQuote.text}" — ${dashboardCurrentQuote.author}`;


    if (
        navigator.clipboard
        &&
        window.isSecureContext
    ) {

        navigator.clipboard
            .writeText(
                textToCopy
            )
            .then(
                () => {

                    showDashboardCopySuccess(
                        copyButton
                    );

                }
            )
            .catch(
                () => {

                    fallbackDashboardCopy(
                        textToCopy,
                        copyButton
                    );

                }
            );

    }

    else {

        fallbackDashboardCopy(
            textToCopy,
            copyButton
        );

    }

}



/* ===============================
   FALLBACK COPY
================================ */

function fallbackDashboardCopy(
    text,
    copyButton
) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value =
        text;


    textarea.style.position =
        "fixed";


    textarea.style.left =
        "-9999px";


    textarea.style.top =
        "0";


    document.body.appendChild(
        textarea
    );


    textarea.focus();


    textarea.select();


    try {

        const successful =
            document.execCommand(
                "copy"
            );


        if (successful) {

            showDashboardCopySuccess(
                copyButton
            );

        }

    }

    catch (error) {

        console.error(
            "Không thể sao chép câu nói:",
            error
        );

    }


    document.body.removeChild(
        textarea
    );

}



/* ===============================
   COPY SUCCESS
================================ */

function showDashboardCopySuccess(
    copyButton
) {

    if (!copyButton) {

        return;

    }


    const span =
        copyButton.querySelector(
            "span"
        );


    if (!span) {

        return;

    }


    const language =
        localStorage.getItem(
            "language"
        ) || "vi";


    const originalText =
        language === "en"
            ? "Copy Quote"
            : "Sao chép";


    span.textContent =
        language === "en"
            ? "Copied!"
            : "Đã sao chép!";


    setTimeout(
        () => {

            span.textContent =
                originalText;

        },
        1500
    );

}



/* ===============================
   INITIALIZE DASHBOARD QUOTE
================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const quoteText =
            document.getElementById(
                "quote-text"
            );


        const quoteAuthor =
            document.getElementById(
                "quote-author"
            );


        const randomButton =
            document.getElementById(
                "random-quote"
            );


        const favoriteButton =
            document.getElementById(
                "favorite-quote"
            );


        const copyButton =
            document.getElementById(
                "copy-quote"
            );



        /* ===============================
           KIỂM TRA QUOTE DASHBOARD
        ================================ */

        if (
            !quoteText ||
            !quoteAuthor ||
            !randomButton ||
            !favoriteButton ||
            !copyButton
        ) {

            return;

        }



        /* ===============================
           LẤY QUOTE HIỆN TẠI
        ================================ */

        const initialText =
            quoteText.textContent
                .trim()
                .replace(
                    /^["“]|["”]$/g,
                    ""
                );


        const initialAuthor =
            quoteAuthor.textContent
                .replace(
                    /^—\s*/,
                    ""
                )
                .trim();


        dashboardCurrentQuote = {

            text:
                initialText,

            author:
                initialAuthor

        };



        /* ===============================
           NÚT CÂU NÓI KHÁC
        ================================ */

        randomButton.addEventListener(
            "click",
            () => {

                showDashboardRandomQuote(
                    quoteText,
                    quoteAuthor,
                    favoriteButton
                );

            }
        );



        /* ===============================
           NÚT YÊU THÍCH
        ================================ */

        favoriteButton.addEventListener(
            "click",
            () => {

                toggleDashboardFavorite(
                    favoriteButton
                );

            }
        );



        /* ===============================
           NÚT SAO CHÉP
        ================================ */

        copyButton.addEventListener(
            "click",
            () => {

                copyDashboardQuote(
                    copyButton
                );

            }
        );



        /* ===============================
           CẬP NHẬT TRẠNG THÁI YÊU THÍCH
        ================================ */

        updateDashboardFavoriteButton(
            favoriteButton
        );

    }
);



/* ===============================
   SYNC LANGUAGE
================================ */

window.addEventListener(
    "languageChanged",
    () => {

        const favoriteButton =
            document.getElementById(
                "favorite-quote"
            );


        if (favoriteButton) {

            updateDashboardFavoriteButton(
                favoriteButton
            );

        }

    }
);