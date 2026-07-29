/* =====================================
   STUDY FOCUS QUOTE SYSTEM
   Random Quote + Favorite + Copy
===================================== */


/* ===============================
   QUOTE DATA - 100 QUOTES
================================ */


const quotes = [

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
        text: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "Unknown"
    },

    {
        text: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh"
    },

    {
        text: "Dream big and dare to fail.",
        author: "Norman Vaughan"
    },

    {
        text: "You don't have to be perfect to be amazing.",
        author: "Unknown"
    },

    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },

    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },

    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
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
        text: "Don't limit your challenges. Challenge your limits.",
        author: "Jerry Dunn"
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
        text: "The difference between ordinary and extraordinary is that little extra.",
        author: "Jimmy Johnson"
    },

    {
        text: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky"
    },

    {
        text: "Don't be afraid to give up the good to go for the great.",
        author: "John D. Rockefeller"
    },

    {
        text: "If you can dream it, you can achieve it.",
        author: "Zig Ziglar"
    },

    {
        text: "Action is the foundational key to all success.",
        author: "Pablo Picasso"
    },

    {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu"
    },

    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },

    {
        text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        author: "Zig Ziglar"
    },

    {
        text: "Don't count the days, make the days count.",
        author: "Muhammad Ali"
    },

    {
        text: "Quality means doing it right when no one is looking.",
        author: "Henry Ford"
    },

    {
        text: "If you want to achieve greatness, stop asking for permission.",
        author: "Unknown"
    },

    {
        text: "The best preparation for tomorrow is doing your best today.",
        author: "H. Jackson Brown Jr."
    },

    {
        text: "Do something today that your future self will thank you for.",
        author: "Sean Patrick Flanery"
    },

    {
        text: "Success is walking from failure to failure with no loss of enthusiasm.",
        author: "Winston Churchill"
    },

    {
        text: "Don't wait. The time will never be just right.",
        author: "Napoleon Hill"
    },

    {
        text: "The mind is everything. What you think you become.",
        author: "Buddha"
    },

    {
        text: "Learning never exhausts the mind.",
        author: "Leonardo da Vinci"
    },

    {
        text: "Education is the most powerful weapon which you can use to change the world.",
        author: "Nelson Mandela"
    },

    {
        text: "The beautiful thing about learning is that nobody can take it away from you.",
        author: "B.B. King"
    },

    {
        text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        author: "Mahatma Gandhi"
    },

    {
        text: "An investment in knowledge pays the best interest.",
        author: "Benjamin Franklin"
    },

    {
        text: "The roots of education are bitter, but the fruit is sweet.",
        author: "Aristotle"
    },

    {
        text: "Knowledge is power.",
        author: "Francis Bacon"
    },

    {
        text: "The capacity to learn is a gift; the ability to learn is a skill.",
        author: "Brian Herbert"
    },

    {
        text: "Study while others are sleeping; work while others are loafing.",
        author: "William Arthur Ward"
    },

    {
        text: "The secret to getting ahead is getting started.",
        author: "Mark Twain"
    },

    {
        text: "A person who never made a mistake never tried anything new.",
        author: "Albert Einstein"
    },

    {
        text: "Once you stop learning, you start dying.",
        author: "Albert Einstein"
    },

    {
        text: "The important thing is to never stop questioning.",
        author: "Albert Einstein"
    },

    {
        text: "I have no special talent. I am only passionately curious.",
        author: "Albert Einstein"
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
        text: "You can do anything you set your mind to.",
        author: "Benjamin Franklin"
    },

    {
        text: "The pain of discipline is nothing compared to the pain of regret.",
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
        text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle"
    },

    {
        text: "First we make our habits, then our habits make us.",
        author: "John Dryden"
    },

    {
        text: "Either you run the day, or the day runs you.",
        author: "Jim Rohn"
    },

    {
        text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
        author: "Stephen Covey"
    },

    {
        text: "Time is what we want most, but what we use worst.",
        author: "William Penn"
    },

    {
        text: "Lost time is never found again.",
        author: "Benjamin Franklin"
    },

    {
        text: "The trouble is, you think you have time.",
        author: "Buddha"
    },

    {
        text: "Time flies, but you are the pilot.",
        author: "Michael Altshuler"
    },

    {
        text: "Ordinary people can choose to be extraordinary.",
        author: "Elon Musk"
    },

    {
        text: "If you spend too much time thinking about a thing, you'll never get it done.",
        author: "Bruce Lee"
    },

    {
        text: "Knowing is not enough; we must apply. Willing is not enough; we must do.",
        author: "Johann Wolfgang von Goethe"
    },

    {
        text: "Well done is better than well said.",
        author: "Benjamin Franklin"
    },

    {
        text: "The secret of success is to do the common thing uncommonly well.",
        author: "John D. Rockefeller Jr."
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
        text: "If opportunity doesn't knock, build a door.",
        author: "Milton Berle"
    },

    {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
    },

    {
        text: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis"
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
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson"
    },

    {
        text: "What we think, we become.",
        author: "Buddha"
    },

    {
        text: "Happiness depends upon ourselves.",
        author: "Aristotle"
    },

    {
        text: "Believe in yourself and all that you are.",
        author: "Christian D. Larson"
    },

    {
        text: "You have power over your mind, not outside events.",
        author: "Marcus Aurelius"
    },

    {
        text: "The happiness of your life depends upon the quality of your thoughts.",
        author: "Marcus Aurelius"
    },

    {
        text: "The secret of happiness is to see all the marvels of the world and never forget the drops of oil on the spoon.",
        author: "Paulo Coelho"
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
        text: "Keep your face always toward the sunshine, and shadows will fall behind you.",
        author: "Walt Whitman"
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
        text: "Don't compare your beginning to someone else's middle.",
        author: "Jon Acuff"
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
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
    },

    {
        text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
        author: "Roy T. Bennett"
    },

    {
        text: "Make each day your masterpiece.",
        author: "John Wooden"
    },

    {
        text: "You can start late, look different, be uncertain, and still succeed.",
        author: "Misty Copeland"
    },

    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela"
    },

    {
        text: "Hard work beats talent when talent doesn't work hard.",
        author: "Tim Notke"
    },

    {
        text: "The difference between try and triumph is just a little umph!",
        author: "Marvin Phillips"
    },

    {
        text: "Don't stop when you're tired. Stop when you're done.",
        author: "Marilyn Monroe"
    },

    {
        text: "The future starts today, not tomorrow.",
        author: "Pope John Paul II"
    },

    {
        text: "If you want something you've never had, you must be willing to do something you've never done.",
        author: "Thomas Jefferson"
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


let currentQuote = quotes[0];





/* ===============================
   INITIALIZE QUOTE
================================ */


document.addEventListener(
"DOMContentLoaded",
()=>{


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



    if(
        !quoteText ||
        !quoteAuthor ||
        !randomButton ||
        !favoriteButton ||
        !copyButton
    ){

        return;

    }



    currentQuote = {

        text:
        quoteText.textContent.trim()
        .replace(/^["“]|["”]$/g,""),

        author:
        quoteAuthor.textContent
        .replace(/^—\s*/,"")
        .trim()

    };



    updateFavoriteButton(
        favoriteButton
    );



    randomButton.addEventListener(
        "click",
        ()=>{
            showRandomQuote(
                quoteText,
                quoteAuthor,
                favoriteButton
            );
        }
    );



    favoriteButton.addEventListener(
        "click",
        ()=>{
            toggleFavoriteQuote(
                favoriteButton
            );
        }
    );



    copyButton.addEventListener(
        "click",
        ()=>{
            copyCurrentQuote(
                copyButton
            );
        }
    );



});





/* ===============================
   RANDOM QUOTE
================================ */


function showRandomQuote(
    quoteText,
    quoteAuthor,
    favoriteButton
){


    let randomIndex;



    do{


        randomIndex =
        Math.floor(
            Math.random()
            *
            quotes.length
        );


    }
    while(
        quotes[randomIndex].text
        ===
        currentQuote.text
    );



    currentQuote =
    quotes[randomIndex];



    quoteText.textContent =
    `"${currentQuote.text}"`;



    quoteAuthor.textContent =
    `— ${currentQuote.author}`;



    updateFavoriteButton(
        favoriteButton
    );


}







/* ===============================
   FAVORITE QUOTE
================================ */


function toggleFavoriteQuote(
    favoriteButton
){


    let favorites =
    getFavoriteQuotes();



    const quoteIndex =
    favorites.findIndex(
        quote =>
        quote.text
        ===
        currentQuote.text
        &&
        quote.author
        ===
        currentQuote.author
    );



    if(
        quoteIndex !== -1
    ){


        favorites.splice(
            quoteIndex,
            1
        );


    }
    else{


        favorites.push(
            currentQuote
        );


    }



    saveFavoriteQuotes(
        favorites
    );



    updateFavoriteButton(
        favoriteButton
    );


}







/* ===============================
   UPDATE FAVORITE BUTTON
================================ */


function updateFavoriteButton(
    favoriteButton
){


    if(!favoriteButton)
        return;



    const favorites =
    getFavoriteQuotes();



    const isFavorite =
    favorites.some(
        quote =>
        quote.text
        ===
        currentQuote.text
        &&
        quote.author
        ===
        currentQuote.author
    );



    const span =
    favoriteButton.querySelector(
        "span"
    );



    const language =
    localStorage.getItem(
        "language"
    )
    ||
    "vi";



    if(isFavorite){


        favoriteButton.classList.add(
            "active"
        );


        if(span){


            span.textContent =
            language === "en"
            ?
            "Unfavorite"
            :
            "Bỏ yêu thích";


        }


    }
    else{


        favoriteButton.classList.remove(
            "active"
        );


        if(span){


            span.textContent =
            language === "en"
            ?
            "Favorite"
            :
            "Yêu thích";


        }


    }


}







/* ===============================
   COPY QUOTE
================================ */


function copyCurrentQuote(
    copyButton
){


    const textToCopy =
    `"${currentQuote.text}" — ${currentQuote.author}`;



    navigator.clipboard
    .writeText(
        textToCopy
    )
    .then(
        ()=>{
            showCopySuccess(
                copyButton
            );
        }
    )
    .catch(
        ()=>{
            fallbackCopy(
                textToCopy,
                copyButton
            );
        }
    );


}







/* ===============================
   COPY FALLBACK
================================ */


function fallbackCopy(
    text,
    copyButton
){


    const textarea =
    document.createElement(
        "textarea"
    );



    textarea.value =
    text;



    textarea.style.position =
    "fixed";



    textarea.style.opacity =
    "0";



    document.body.appendChild(
        textarea
    );



    textarea.select();



    try{


        document.execCommand(
            "copy"
        );


        showCopySuccess(
            copyButton
        );


    }
    catch(error){


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


function showCopySuccess(
    copyButton
){


    const span =
    copyButton.querySelector(
        "span"
    );



    if(!span)
        return;



    const language =
    localStorage.getItem(
        "language"
    )
    ||
    "vi";



    const originalText =
    language === "en"
    ?
    "Copy Quote"
    :
    "Sao chép";



    span.textContent =
    language === "en"
    ?
    "Copied!"
    :
    "Đã sao chép!";



    setTimeout(
        ()=>{
            span.textContent =
            originalText;
        },
        1500
    );


}







/* ===============================
   SYNC LANGUAGE
================================ */


window.addEventListener(
"languageChanged",
()=>{


    const favoriteButton =
    document.getElementById(
        "favorite-quote"
    );



    if(favoriteButton){


        updateFavoriteButton(
            favoriteButton
        );


    }


});