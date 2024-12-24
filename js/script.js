
// ------------------ INDEX CODE ------------------ \\

/* -----------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------- COFFEE ARTICLES CODE -------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------- */
fetch('../json/coffee_specials.json')
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! - Coffee JSON - Status: ${response.status}`);
        }
        return response.json();
    })
    .then(coffee_specials => {
        console.log(coffee_specials);
        // Update the articles initially
        coffeeSpecialSelector(coffee_specials);

        //Time interval to check and update articles every minute
        let lastHour = new Date().getHours();
        setInterval(() => {
            const currentHour = new Date().getHours();
            if(currentHour !== lastHour) {
                coffeeSpecialSelector(coffee_specials);
                lastHour = currentHour;
            }
        }, 60 * 1000); // Checks every minute if the hour changed.
    })

    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
    })

function coffeeSpecialSelector(coffee_specials) {
    
    // Get the current hour 
    const currentHour = new Date().getHours();

    // The startIndicator, will indicate the first article, for the second and third to follow after.
    const startIndicator = (currentHour * 3) % coffee_specials.length;

    const selectedCoffeeArticles = [
        coffee_specials[startIndicator % coffee_specials.length],
        coffee_specials[(startIndicator + 1) % coffee_specials.length],
        coffee_specials[(startIndicator + 2) % coffee_specials.length]
    ]

    // Introduce the content 
    const coffeeContent1 = `
    <h3>${selectedCoffeeArticles[0].name}</h3>
    <p>${selectedCoffeeArticles[0].description}</p>
    `;

    const coffeeContent2 = `
    <h3>${selectedCoffeeArticles[1].name}</h3>
    <p>${selectedCoffeeArticles[1].description}</p>
    `;

    const coffeeContent3 = `
    <h3>${selectedCoffeeArticles[2].name}</h3>
    <p>${selectedCoffeeArticles[2].description}</p>
    `;

    
    // Show on site
    coffee_special1_container.innerHTML = coffeeContent1;
    coffee_special2_container.innerHTML = coffeeContent2;
    coffee_special3_container.innerHTML = coffeeContent3;

}

/* ------------------------------------------------------ COFFEE ARTICLES END ----------------------------------------------------------- */

/* -----------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------- BOOKS ARTICLES CODE --------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------- */
fetch('../json/latest_books.json')
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! - Books JSON - Status: ${response.status}`);
        }
        return response.json();
    })

    .then(latest_books => {
        console.log(latest_books);

        // Selects the books of this month
        booksMonthSelector(latest_books);

        // Time interval of the check: everyday
        bookIntervalUpdate(latest_books);

    })

    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
    })

function booksMonthSelector(latest_books) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentMonth = new Date().getMonth();
    const currentMonthName = months[currentMonth];
    const currentMonthBooks = latest_books.booksOfTheMonth[currentMonthName];

    let booksContent = '';
    currentMonthBooks.forEach(book => {
        booksContent += `
        <h3>Title: ${book.title}</h3>
        <div>Author: ${book.author}</div>
        <div>Published: ${book.published}</div>
        <p>Synopsis: ${book.synopsis}</p>
        `
    })
    
    latest_books_container.innerHTML = booksContent;

}

function bookIntervalUpdate(latest_books){

    let pastMonth = new Date().getMonth();
    setInterval(() => {
        const currentMonth = new Date().getMonth();
        if(currentMonth !== pastMonth) {
            booksMonthSelector(latest_books);
            pastMonth = currentMonth;
        }
    }, 24 * 60 * 60 * 1000); // Checks every day.
}


/* ----------------------------------------------------- BOOKS ARTICLES END -------------------------------------------------------------- */

/* -----------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------- FLOWER ARTICLES CODE -------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------- */

fetch('../json/articles_flowers.json')
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! - Flowers JSON - Status: ${response.status}`);
        }
        return response.json();
    })
    .then(articles_flowers => {
        console.log(articles_flowers);

        let currentSeasonArticles = articles_flowers.seasons.find(season => season.season === currentSeason);
        console.log(currentSeasonArticles);
        
        // Variable that will contain the content to be posted.
        let flowersContent = '';

        currentSeasonArticles.articles.forEach(article => {
            flowersContent += `
            <h3>${article.title}</h3>
            <div>Url: <a>${article.url}</a></div>
            <div>Date of publishing: ${article.published_date}</div>
            <p>${article.summary}</p>
            `
        })

        seasonal_flowers_container.innerHTML = flowersContent;
    })

    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
    })


/* Determines which season it is. 
Season dates: 
                Spring-> 20th of March to 21st of June
                Summer-> 21st of June to 23rd of September
                Autumn-> 23rd of September to 21st of December
                Winter-> 21st of December to 20th of March
*/

function getCurrentSeason() {
    const date = new Date();
    const year = date.getFullYear();

    // Define the first dates of the seasons

    const springStart = new Date(year, 2, 20); // March the 20th
    const summerStart = new Date(year, 5, 21); // June the 21st
    const autumnStart = new Date(year, 8, 23); // September the 23rd
    const winterStart = new Date(year, 11, 21); // December the 21st

    if( date >= winterStart || date < springStart) {
        return 'Winter';
    } else if( date >= springStart && date < summerStart) {
        return 'Spring';
    } else if( date >= summerStart && date < autumnStart) {
        return 'Summer';
    } else if( date >= autumnStart && date < winterStart) {
        return 'Autumn';
    } 
}

// The value of the "currentSeason" will determine which articles will be posted. 
let currentSeason = getCurrentSeason();
console.log(`The current season is ${currentSeason}.`);


/* ------------------------------------------------------ FLOWER ARTICLES END ----------------------------------------------------------- */    


// ------------------ PRESUPUESTO BOOKS CODE ------------------ \\

// Reference to the book list and total display
const bookList = document.getElementById("book-list");
const totalDisplay = document.querySelector('.total');


fetch('../json/book_list.json')
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! - Flowers JSON - Status: ${response.status}`);
        }
        return response.json();
    })
    .then(book_list_json => {
        console.log(book_list_json);

        generateChecklistItems(book_list_json);

        startListening(bookList, totalDisplay);
    })

    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
    })

// Generate checklist items dynamically
function generateChecklistItems(book_list_json, bookList) {
    book_list_json.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.innerHTML = `
            <label> 
                <input type="checkbox" class="book-checkbox" data-price="${book.price || 0}" />
                ${book.title} - ${book.price ? book.price.toFixed(2) : '0.00'} EUR
            </label>
        `;
        bookList.appendChild(bookItem); // Append the new item to the list
    });
}

// Function to update the total
function updateTotal() {
    const checkboxes = document.querySelectorAll('.book-checkbox');
    let total = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.dataset.price);
        }
    });

    totalDisplay.textContent = `Total: ${total.toFixed(2)} EUR`;
}

function startListening(bookList, totalDisplay) {
    // Event listener to update when there is a change
    bookList.addEventListener('change', updateTotal);

    console.log('Book list element:', bookList);
    console.log('Total display element:', totalDisplay);

}