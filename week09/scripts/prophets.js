const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);  // note that we reference the prophet array of the data object given the structure of the json file
    displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
    const cards = document.querySelector('div.cards'); // select the output container element

    prophets.forEach((prophet) => {
      // Create elements to add to the div.cards element
        let card = document.createElement('section');
        card.classList.add('card');
        let h2 = document.createElement('h2');
        let info = document.createElement('div');
        info.classList.add('info');
        let portrait = document.createElement('img');

      // Build the h2 content out to show the prophet's full name - finish the template string
        h2.textContent = `${prophet.name} ${prophet.lastname}`;

        info.innerHTML = `
            <p><strong>Birth:</strong> ${prophet.birthdate}</p>
            <p><strong>Birthplace:</strong> ${prophet.birthplace}</p>
            <p><strong>Children:</strong> ${prophet.numofchildren}</p>
            <p><strong>Prophet years:</strong> ${prophet.length} years</p>
            <p><strong>Death:</strong> ${prophet.death}</p>
        `;

      // Build the image portrait by setting all the relevant attribute
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

      // Append the section(card) with the created elements
        card.appendChild(h2);
        card.appendChild(info);
        card.appendChild(portrait);

        cards.appendChild(card);
    }); // end of forEach loop
  } // end of function 