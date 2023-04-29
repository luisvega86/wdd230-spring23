const lastUpdate = new Date(document.lastModified);
document.getElementById('lastUpdate').innerText = lastUpdate;

const d = new Date();
let year = d.getFullYear();
document.getElementById('year').innerText = year;