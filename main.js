/*El trabajo es una Pokedex basada en los juegos de Nintendo, cada uno de estos datos es de utilidad 
a la hora de armar un equipo pokémon, viendo sus estadísticas podemos optar que tipos de ataques son convenientes,
que pokémon dan más experiencia, etc. Esto es una primera parte, pero mi idea es seguir trabajando sobre este proyecto.*/

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
let btnMale = document.querySelector(".btnMale");
let loading = document.querySelector(".loading");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let stats = document.querySelector(".stats");
let gameData = document.querySelector(".gameData");

let pokeAux;
let toastName;
let miPokeBtn;

/*recibimos el valor que ingresa por el input y lo buscamos dentro de la función "busqueda" donde llamamos a la API*/
containerIn = addEventListener("submit", (e) => {

    e.preventDefault();
    busqueda(buscar.value.toLowerCase());
})

//-----------------------Botonera---------------------------->

/*Botones Prev y Next*/
next.onclick = () => {
    if (pokeAux == undefined) {
        pokeAux = 0;
    }
    pokeAux += 1;
    busqueda(pokeAux);
}

prev.onclick = () => {
    if (pokeAux == undefined || pokeAux > 1) {
        pokeAux -= 1;
        busqueda(pokeAux);
    }
}

/*Botones para elegir sexo del Pokémon. Por default es masculino y algunos no tienen versión femenina*/
btnMale.onclick = () => {
    imgSprite.src = miPokeBtn.sprites.front_default;
}

btnFemale.onclick = () => {
    imgSprite.src = miPokeBtn.sprites.front_female;
    if (miPokeBtn.sprites.front_female == null) {
        imgSprite.src = miPokeBtn.sprites.front_default;

        Toastify({
            text: "Has no female", //si no tiene femenino vamos a ver este aviso.
            duration: 2000,
            className: "toastMod",
        }).showToast();
    }
}

/*Botón Shiny muestra una variante de otro color del Pokémon*/
btnShiny.onclick = () => {
    imgSprite.src = miPokeBtn.sprites.front_shiny;
}

/*Botón Back muestra parte trasera del Pokémon*/
btnBack.onclick = () => {
    imgSprite.src = miPokeBtn.sprites.back_default;
}



//-----------------------------------FUNCIONES---------------------------------------->

//----------------------------Fetch---------------------------------->

function busqueda(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((resp) => resp.json())
        .then((data) => {
            pokeCreate(data);

            Toastify({
                text: toastName,
                duration: 2000,
                position: "left",
                className: "toastModName",
            }).showToast();


        })
        .catch((err) => {
            console.log(err);
        })
}

//----------------------------CreamosPokémon---------------------------->

function pokeCreate(miPoke) {

    miPokeBtn = miPoke;
    pokeAux = miPoke.id;
    toastName = "#"+miPoke.id +" "+ miPoke.name;

    /*Información básica del pokémon que aparece en la parte inferior izquierda*/
    pokeNumber.innerHTML =
        `N°#${miPoke.id} <br>
    Name:${miPoke.name} <br>`
    pokeType.textContent = miPoke.types.length > 1 ? `Type:${miPoke.types[0].type.name}/${miPoke.types[1].type.name}` : `Type:${miPoke.types[0].type.name}`
    pokeMove.textContent = miPoke.abilities.length > 1 ? `Moves:${miPoke.abilities[0].ability.name}/${miPoke.abilities[1].ability.name}` : `Moves:${miPoke.abilities[0].ability.name}`
    loading.remove(); //Elimino el "esperando pokémon" que aparece en pantalla al realizar la búsqueda.

    /*Imágen pokémon*/
    imgSprite.src = miPoke.sprites.front_default;
    pokeData.append(imgSprite);

    /*Recuadro de experiencia base del pokémon, parte superior derecha*/
    gameData.textContent = `Base Experience: ${miPoke.base_experience}`;

    /*Estadísticas del pokémon, se visualiza en la parte derecha*/
    stats.innerHTML =
        `<h3>STATS</h3>
    Hp.....................${miPoke.stats[0].base_stat} <br>
    Attack.................${miPoke.stats[1].base_stat} <br>
    Defense................${miPoke.stats[2].base_stat} <br>
    Special-attack.........${miPoke.stats[3].base_stat} <br>
    Special-defense........${miPoke.stats[4].base_stat} <br>
    Speed..................${miPoke.stats[5].base_stat}
    `
}












