"use strict";
const $arenas = document.querySelector(".arenas");
const $randomBtn = $arenas.querySelector(".button");

const player1 = {
    player: 1,
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["гарпун", "огонь"],
    color: "yellow",

    attack() {
        console.log(this.name + " fight");
    },
    changeHP: changeHP,
};

const player2 = {
    player: 2,
    name: "Subzero",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["лёд", "снег"],
    color: "lightblue",

    attack() {
        console.log(this.name + " fight");
    },
    changeHP: changeHP,
};

function changeHP(damageValue) {
    this.hp -= damageValue;
    if (this.hp <= 0) {
        this.hp = 0;
        $randomBtn.disabled = true;
    }
    renderLife.call(this);
    console.log(
        `%c${this.name + " нанёс урон " + damageValue}`,
        `color: ${this.color};`
    );
}

function elHP() {
    return document.querySelector(".player" + this.player + " .life");
}

function renderLife() {
    elHP.call(this).style.width = this.hp + "%";
}

function randomizer(max) {
    return Math.floor(Math.random() * max) + 1;
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

function titleWins(...players) {
    if (players.every((player) => player.hp === 0)) {
        const winsTitle = appendElement(".arenas", "div", "winTitle");
        winsTitle.innerText = "ничья";
        createReloadButton();
        return;
    }
    players.forEach((player) => {
        if (player.hp === 0) {
            createReloadButton();
            const winsTitle = appendElement(".arenas", "div", "winTitle");
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

function createReloadButton() {
    appendElement(".arenas", "div", "reloadWrap");
    const restartBtn = appendElement(".reloadWrap", "button", "button");
    restartBtn.innerText = "Restart";
    restartBtn.addEventListener("click", () => {
        window.location.reload();
    });
}

createPlayer(player1);
createPlayer(player2);

$randomBtn.addEventListener("click", () => {
    player1.changeHP(randomizer(20));
    player2.changeHP(randomizer(20));
    // changeHP.call(player1, randomizer(20));
    // changeHP.call(player2, randomizer(20));
    titleWins(player1, player2);
});
