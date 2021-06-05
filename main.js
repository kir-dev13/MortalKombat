"use strict";
const $arenas = document.querySelector(".arenas");
const $randomBtn = $arenas.querySelector(".button");

const player1 = {
    player: 1,
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["гарпун", "огонь"],

    attack() {
        console.log(this.name + " fight");
    },
};

const player2 = {
    player: 2,
    name: "Subzero",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["лёд", "снег"],

    attack() {
        console.log(this.name + " fight");
    },
};

function randomizer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
    player.hp -= randomizer(1, 20);

    if (player.hp <= 0) {
        player.hp = 0;
        $randomBtn.disabled = true;
    }
    playerLife.style.width = player.hp + "%";

    // if (player.hp <= 0) {
    //     player.hp = 0;

    //     $randomBtn.disabled = true;
    // }
}

function titleWins(...players) {
    const winsTitle = appendElement(".arenas", "div", "loseTitle");
    if (players.every((player) => player.hp === 0)) {
        winsTitle.innerText = "ничья";
        return;
    }
    players.forEach((player) => {
        if (player.hp === 0) {
            switch (player.player) {
                case 1:
                    winsTitle.innerText = player2.name + " выиграл";
                    break;
                case 2:
                    winsTitle.innerText = player1.name + " выиграл";
                    break;
            }
        }
    });
}

$randomBtn.addEventListener("click", () => {
    changeHP(player1);
    changeHP(player2);
    titleWins(player1, player2);
});

createPlayer(player1);
createPlayer(player2);
