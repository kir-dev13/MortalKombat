"use strict";
const $arenas = document.querySelector(".arenas");
const $randomBtn = $arenas.querySelector(".button");

const player1 = {
    player: 1,
    name: "Вася",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["гарпун", "огонь"],

    attack() {
        console.log(this.name + " fight");
    },
};

const player2 = {
    player: 2,
    name: "Коля",
    hp: 80,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["лёд", "снег"],

    attack() {
        console.log(this.name + " fight");
    },
};

function appendElement(parentSelector, tag, className = "") {
    const $tag = document.createElement(tag);
    document.querySelector(parentSelector).appendChild($tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObj) {
    const fighter = appendElement(
        ".arenas",
        "div",
        "player" + playerObj.player
    );
    //div с игроком

    const progressbar = appendElement(
        `.player${playerObj.player}`,
        "div",
        "progressbar"
    );
    // прогресс бар

    appendElement(`.player${playerObj.player}`, "div", "character");
    // div с картинкой внутри

    const playerImg = appendElement(
        `.player${playerObj.player} .character`,
        "img"
    );
    playerImg.setAttribute("src", playerObj.img);
    //картинка

    const $hp = appendElement(
        `.player${playerObj.player} .progressbar`,
        "div",
        "life"
    );
    $hp.style.width = playerObj.hp + "%";
    //остаток жизней

    const $name = appendElement(
        `.player${playerObj.player} .progressbar`,
        "div",
        "name"
    );
    $name.innerText = playerObj.name;
}

function changeHP(player) {
    const playerLife = document.querySelector(
        ".player" + player.player + " .life"
    );
    player.hp -= 20;
    playerLife.style.width = player.hp + "%";
    if (player.hp <= 0) {
        playerLose(player.name);
    }
}

function playerLose(name) {
    const loseTitle = appendElement(".arenas", "div", "loseTitle");
    loseTitle.innerText = name + " проиграл";
}

$randomBtn.addEventListener("click", () => {
    changeHP(player1);
    changeHP(player2);
});

createPlayer(player1);
createPlayer(player2);
