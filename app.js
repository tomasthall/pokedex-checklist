const fileSelector = document.getElementById('fileSelector');
let pokeList = [];

fileSelector.addEventListener('change', (event) => {
    const fr = new FileReader();
    fr.readAsText(event.target.files[0]);
    fr.onload = () => {
        createPokeList(fr.result);
        pokeList = getPokeList();
        renderPokeList(pokeList);
    }
});

document.getElementById('savePokelist').addEventListener('click', () => {
    pokeList = pokeList.filter(pokemon => !pokemon.checked);
    savePokeList(pokeList);
    document.getElementById('pokeList').innerHTML = '';
    renderPokeList(pokeList);
})

document.getElementById('loadLSPokeList').addEventListener('click', () => {
    document.getElementById('pokeList').innerHTML = '';
    pokeList = getPokeList();
    renderPokeList(pokeList);
})

const createPokeList = fileContent => {
    let pokeList = fileContent.split("\n").filter(pokemon => pokemon !== '').map(pokemon => ({pokemon: pokemon, checked: false}));
    savePokeList(pokeList);
}

const getPokeList = () => JSON.parse(localStorage.getItem('pokeList'));
const savePokeList = pokeList => localStorage.setItem('pokeList', JSON.stringify(pokeList));

const renderPokeList = pokeList => {
    const listWrapper = document.getElementById('pokeList');
    pokeList.map(pokemon => listWrapper.appendChild(createPokeListElement(pokemon)))
}

const createPokeListElement = pokemon => {
    let div = document.createElement('div');
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', pokemon.checked);
    input.addEventListener('change', () => {
        pokemon.checked = !pokemon.checked;
    })
    div.appendChild(input);
    let span = document.createElement('span');
    span.innerText = pokemon.pokemon;
    div.appendChild(span);
    return div;
}
