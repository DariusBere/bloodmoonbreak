


/* -----------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------- COFFEE ARTICLES CODE -------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------- */
let coffee_specials = new Array();

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
        setInterval(() => {
            coffeeSpecialSelector(coffee_specials);
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




/* -----------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------- COFFEE ARTICLES END --------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------- */




/* -----------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------- BOOKS ARTICLES CODE --------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------- */




/* -----------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------- BOOKS ARTICLES END ---------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------- */





/* -----------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------- FLOWER ARTICLES CODE -------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------- */


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



/* -----------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------- FLOWER ARTICLES END --------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------- */    