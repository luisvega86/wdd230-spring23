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
    console.log(currentDay);
    if (currentDay === 1 || currentDay === 3) {
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