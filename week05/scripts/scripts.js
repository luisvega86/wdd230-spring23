const input = document.getElementById('input');
const button = document.getElementById('button');
const list = document.getElementById('list');

function addChapter() {
    const inputValue = input.value.trim();

    if (inputValue !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = inputValue;
        deleteButton.textContent = '❌';

        li.appendChild(deleteButton);
        list.appendChild(li);

        deleteButton.addEventListener('click', function() {
            li.remove();
        });

        input.focus();
        input.value = '';
    }
};

button.addEventListener('click', addChapter);

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addChapter();
    };
});
