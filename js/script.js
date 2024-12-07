const featured_coffee = document.getElementById("featured_coffee");
const latest_books = document.getElementById("latest_books");
const seasonal_flowers = document.getElementById("seasonal_flowers");

/* Determines which season it is to post the corresponding 
Season dates: 
                Spring-> 20th of March to 21st of June
                Summer-> 21st of June to 23rd of September
                Autumn-> 23rd of September to 21st of December
                Winter-> 21st of December to 20th of March
*/

function getCurrentSeason() {
    const date = new Date();
    const year = date.getFullYear();

    // Define the start dates of the seasons

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
// The value of the current season is stored for further use to determine which articles will be posted. 
let currentSeason = getCurrentSeason();
console.log(`The current season is ${currentSeason}.`);


fetch('../json/articles_flowers.json')
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        let currentSeasonArticles = data.seasons.find(season => season.season === currentSeason);
        console.log(data.currentSeasonArticles);
        
        // Variable where we will introduce our content
        let content = '';

        data.currentSeasonArticles.articles.forEach(article => {
            content += `
            <h3>${article.title}</h3>
            <div>Url: <a>${article.url}</a></div>
            <div>Date of publishing: ${article.published_date}</div>
            <p>${article.summary}</p>
            `
        })

        seasonal_flowers.innerHTML = content;
    })

    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
    })
