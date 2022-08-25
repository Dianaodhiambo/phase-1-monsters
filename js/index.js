document.addEventListener('DOMContentLoaded', () => {


    //Create New Monster Form
document.addEventListener('DOMContentLoaded', createButton())
function createButton() {
let form = document.createElement('form');
form.setAttribute('method', 'post');
form.setAttribute('action', 'http://localhost:3000/monsters');
form.setAttribute('id', 'monster_form')
let formName = document.createElement('input');
formName.setAttribute('type', 'text');
formName.setAttribute('name', 'name');
formName.setAttribute('placeholder', 'name...');
let formAge = document.createElement('input');
formAge.setAttribute('type', 'text');
formAge.setAttribute('name', 'age');
formAge.setAttribute('placeholder', 'age...');
let formDes = document.createElement('input');
formDes.setAttribute('type', 'text');
formDes.setAttribute('name', 'description');
formDes.setAttribute('placeholder', 'description...');
let createBtn = document.createElement('input');
createBtn.setAttribute('type', 'submit');
createBtn.setAttribute('value', 'create');
form.appendChild(formName);
form.appendChild(formAge);
form.appendChild(formDes);
form.appendChild(createBtn);
document.querySelector('h1').appendChild(form);
}


//Give New Monster Form Functionality
document.getElementById('monster_form').addEventListener('submit', (event) => {
    event.preventDefault();
    let monsterObj = {
        age: event.target.age.value,
        description: event.target.description.value,
        name: event.target.name.value
    }
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(monsterObj)
    }).then(res => res.json())
        .then(data => console.log(data))
        document.getElementById('monster_form').reset();
        })
})


//Fetching the Monsters (limited to 50)
document.addEventListener('DOMContentLoaded', getMonsters())
function getMonsters() {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
    .then(res => res.json())
    .then(data => appendMonsters(data))
    //appendMonsters() adds fetched monsters to DOM
}


//Adding Monsters to the DOM
function appendMonsters(data) {
    for(i = 0; i < data.length; i++) {
    let monsterInfo = document.createElement('div')
    let monsterName = document.createElement('h2');
    monsterName.textContent = data[i].name;
    let monsterAge = document.createElement('h4');
    monsterAge.textContent = `Age: ${data[i].age}`;
    let monsterDescription = document.createElement('p');
    monsterDescription.textContent = `Bio: ${data[i].description}`;
    let monsterContainer = document.querySelector('#monster-container')
    monsterContainer.appendChild(monsterInfo);
    monsterInfo.appendChild(monsterName);
    monsterInfo.appendChild(monsterAge);
    monsterInfo.appendChild(monsterDescription);
    }

    let page = 1;
//Forward Button Functionality
document.getElementById('forward').addEventListener('click', function () {
    page++;
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    //.then(data => appendMonsters(data))
    .then(data => console.log(data))
    console.log(page)
})


}
