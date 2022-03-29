let containerIn = document.querySelector(".containerIn");
let buscar = document.querySelector(".buscar");
let dex = document.querySelector("#pokeData");
let pokeName = document.querySelector(".pokeName");
let pokeNumber = document.querySelector(".pokeNumber");
let pokeType = document.querySelector(".pokeType");
let pokeMove = document.querySelector(".pokeMove");
let imgSprite = document.createElement("img");
let btnShiny = document.querySelector(".btnShiny");
let btnFemale = document.querySelector(".btnFemale");
let btnBack = document.querySelector(".btnBack");
let btnReset = document.querySelector(".btnReset");
let loading = document.querySelector(".loading");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let stats = document.querySelector(".stats");
let pokeAux;


containerIn = addEventListener("submit", (e) => {

    e.preventDefault();
    busqueda(buscar.value.toLowerCase());
})

next.onclick = () => {
    if (pokeAux == undefined) {
        pokeAux = 0;
    }
    pokeAux++;
    busqueda(pokeAux);
}

prev.onclick = () => {
    if (pokeAux == undefined || pokeAux > 1) {
        pokeAux--;
        busqueda(pokeAux);
    }
}

function busqueda(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((resp) => resp.json())
        .then((data) => {
            pokeCreate(data);
            console.log(data);
        })
}

function pokeCreate(miPoke) {
    pokeNumber.innerHTML = 
    `N°#${miPoke.id} <br>
    Name:${miPoke.name} <br>`
    pokeType.textContent = miPoke.types.length > 1 ? `Type:${miPoke.types[0].type.name}/${miPoke.types[1].type.name}` : `Type:${miPoke.types[0].type.name}`
    pokeMove.textContent = miPoke.abilities.length > 1 ? `Moves:${miPoke.abilities[0].ability.name}/${miPoke.abilities[1].ability.name}` : `Moves:${miPoke.abilities[0].ability.name}`
    imgSprite.src = miPoke.sprites.front_default;
    pokeData.append(imgSprite);
    loading.remove();
    pokeAux = miPoke.id;

    stats.innerHTML = 
    `<h3>STATS</h3>
    Hp................${miPoke.stats[0].base_stat} <br>
    Attack............${miPoke.stats[1].base_stat} <br>
    Defense...........${miPoke.stats[2].base_stat} <br>
    Special-attack....${miPoke.stats[3].base_stat} <br>
    Special-defense...${miPoke.stats[4].base_stat} <br>
    Speed.............${miPoke.stats[5].base_stat}
    `

    btnFemale.onclick = () => {
        imgSprite.src = miPoke.sprites.front_female;
        if (miPoke.sprites.front_female == null) {
            imgSprite.src = miPoke.sprites.front_default;
        }

    }

    btnShiny.onclick = () => {
        imgSprite.src = miPoke.sprites.front_shiny;
    }

    btnBack.onclick = () => {
        imgSprite.src = miPoke.sprites.back_default;
    }

    btnReset.onclick = () => {
        imgSprite.src = miPoke.sprites.front_default;
    }
}












