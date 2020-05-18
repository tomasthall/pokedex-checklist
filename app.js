const fileSelector = document.getElementById('fileSelector');
fileSelector.addEventListener('change', (event) => {
    const fr = new FileReader();
    let pokeList;
    fr.readAsText(event.target.files[0]);
    fr.onload = () => {
        createPokeList(fr.result);
        pokeList = getPokeList();
        renderPokeList(pokeList);
    }
});

const createPokeList = fileContent => {
    let pokeList = fileContent.split("\n").filter(pokemon => pokemon !== '').map(pokemon => ({pokemon: pokemon, checked: false}));
    localStorage.setItem('pokeList', JSON.stringify(pokeList));
}

const getPokeList = () => {
    return JSON.parse(localStorage.getItem('pokeList'));
}

const renderPokeList = pokeList => {
    const listWrapper = document.getElementById('pokeList');
    pokeList.map(pokemon => listWrapper.appendChild(createPokeListElement(pokemon)))
}

const createPokeListElement = pokemon => {
    let div = document.createElement('div');
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', pokemon.checked);
    div.appendChild(input);
    let span = document.createElement('span');
    span.innerText = pokemon.pokemon;
    div.appendChild(span);
    return div;
}
