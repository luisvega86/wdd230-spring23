function toggleMenu() {
    document.getElementById('primaryNav').classList.toggle("open");
    document.getElementById('hamburgerBtn').classList.toggle("open");
}

const x = document.getElementById('hamburgerBtn');
x.onclick = toggleMenu;

const date = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);
document.getElementById('datetime').innerText = formattedDate;

const banner = document.getElementById('banner');

function addbanner() {
    const currentDay = date.getDay();
    if (currentDay === 1 || currentDay === 2) {
        banner.classList.add("displays");
        const p = document.createElement("p");
        p.innerText = "🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.";
        banner.appendChild(p);
    }
}

addbanner();

const lastModified = new Date(document.lastModified);
document.getElementById('lastModified').innerText = lastModified

const d = new Date();
let year = d.getFullYear();
document.getElementById('year').innerText = year;

const navItems = document.querySelectorAll('#primaryNav li');

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        navItems.forEach((navItem) => {
            navItem.classList.remove('active');
        });
    
    item.classList.add('active');
    });
});
// join button
const joinButton = document.querySelector('#joinUs')

joinButton.addEventListener('click', () => {
    window.location.href = "./joinus.html";
});

// lazyLoading

const images = document.querySelectorAll('[data-src]');

const lazyOptions = {
    rootMargin: '0px 0px 100px 0px',
    threshold: 0,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');

        img.setAttribute('src', src);
        img.removeAttribute('data-src');
        observer.unobserve(img);
        }
    });
}, options);

images.forEach((image) => {
    observer.observe(image);
});

// days since last visit
function getDaysSinceLastVisit() {
    const lastVisitTimestamp = localStorage.getItem('lastVisitTimestamp');
    
    const currentTimestamp = new Date().getTime();
    
    if (lastVisitTimestamp) {
        const timeDifference = currentTimestamp - parseInt(lastVisitTimestamp);

      const daysSinceVisit = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        document.getElementById('daysSinceVisit').textContent = daysSinceVisit;
    }
        localStorage.setItem('lastVisitTimestamp', currentTimestamp);
}

getDaysSinceLastVisit();


// weather

// select HTML elements in the document
const temperature = document.querySelector('.temperature');
const weatherIcon = document.querySelector('.weather-icon img');
const captionDesc = document.querySelector('.description');
const cityName = document.querySelector('.city-name');

const apikey = '8d1039b8dfb3d22677437362ebb6ef15';
const q = 'Mar del Plata, AR';

const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&&appid=${apikey}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        displayResults(data);
        } else {
        throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(weatherData) {
    temperature.innerHTML = `<strong>${weatherData.main.temp.toFixed(1)} C°</strong>`;

    const iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
    cityName.textContent = q;
}

    


// Directory 


async function getCompanyData() {
    const response = await fetch('./data/data.json');
    const data = await response.json();
    // console.table(data.companies);
    try {
        displayCompanies(data.companies);
    } catch {
        displaySpotlights(data.companies);
    }
}

getCompanyData();

const displayCompanies = (companies) => {
    const cards = document.querySelector('div.cards-grid'); // select the output container element

    companies.forEach((company) => {
        let card = document.createElement('div');
        card.classList.add('companyCard');
        let logo = document.createElement('img');
        let info = document.createElement('div');
        info.classList.add('info');

        logo.setAttribute('src', company.picture);
        logo.setAttribute('alt', `The logo of ${company.company}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '200');
        logo.setAttribute('height', '200');

        info.innerHTML = `
        <h2>${company.company}</h2>
        <p><strong>Address:</strong> ${company.address}</p>
        <p><strong>Phone:</strong> ${company.phone}</p>
        <p><strong>Email:</strong> ${company.email}</p>
        <p><strong>Website:</strong> ${company.website}</p>
        `;

        card.appendChild(logo);
        card.appendChild(info);
        cards.appendChild(card);
    })
}

const displaySpotlights = (companies) => {
    const cards = document.querySelector('section.spotlights');
    companies.forEach((company) => {
        if (company.membership === "gold") {
            let card = document.createElement('div');
            card.classList.add('companyCard');
            let logo = document.createElement('img');
            let info = document.createElement('div');
            info.classList.add('info');
    
            logo.setAttribute('src', company.picture);
            logo.setAttribute('alt', `The logo of ${company.company}`);
            logo.setAttribute('loading', 'lazy');
            logo.setAttribute('width', '200');
            logo.setAttribute('height', '200');
    
            info.innerHTML = `
            <h2>${company.company}</h2>
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Phone:</strong> ${company.phone}</p>
            <p><strong>Email:</strong> ${company.email}</p>
            <p><strong>Website:</strong> ${company.website}</p>
            `;
    
            card.appendChild(logo);
            card.appendChild(info);
            cards.appendChild(card);
        }
    });
}
// grid / list  toggle
const cards = document.querySelector('div.cards-grid');
const toGrid = document.getElementById('grid');
const toList = document.getElementById('list');

function showList() {
    cards.classList.add('cards-list');
    cards.classList.remove('cards-grid');
    toList.classList.add('hide');
    toGrid.classList.remove('hide');
}

function showGrid() {
    cards.classList.add('cards-grid');
    cards.classList.remove('cards-list');
    toGrid.classList.add('hide');
    toList.classList.remove('hide');
}

toGrid.addEventListener('click', showGrid);

toList.addEventListener('click', showList);

