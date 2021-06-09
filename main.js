"use strict";
const $arenas = document.querySelector(".arenas");
// const $randomBtn = $arenas.querySelector(".button");

const $formFight = document.querySelector(".control");

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ["head", "body", "foot"];

const player1 = {
    player: 1,
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["гарпун", "огонь"],
    color: "yellow",

    attack: {},
    changeHP,
    damage,
};

const player2 = {
    player: 2,
    name: "Subzero",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["лёд", "снег"],
    color: "lightblue",

    attack: {},
    changeHP,
    damage,
};

function changeHP(damageValue) {
    this.hp -= damageValue;
    if (this.hp <= 0) {
        this.hp = 0;
        // $randomBtn.disabled = true;
        // $randomBtn.style.backgroundColor = "grey";
        const fightBtn = $formFight.querySelector(".button");
        fightBtn.style.backgroundColor = "grey";
        fightBtn.disabled = true;
    }
    renderLife.call(this);
    console.log(
        `%c${this.name + " получил урон " + damageValue}`,
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

function appendElement(parentSelector, tag, ...classNames) {
    const $tag = document.createElement(tag);
    document.querySelector(parentSelector).appendChild($tag);
    if (classNames[0]) {
        $tag.classList.add(...classNames);
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
    let winTitle = undefined;
    if (players.every((player) => player.hp === 0)) {
        winTitle = appendElement(".arenas", "div", "winTitle");
        winTitle.innerText = "DRAW";
        createReloadButton();
    } else {
        players.forEach((player) => {
            if (player.hp === 0) {
                createReloadButton();
                winTitle = appendElement(".arenas", "div", "winTitle");
                switch (player.player) {
                    case 1:
                        winTitle.innerText = player2.name + " WINS";
                        break;
                    case 2:
                        winTitle.innerText = player1.name + " WINS";
                        break;
                }
            }
        });
    }
    if (winTitle) {
        const winTitle2 = $arenas.appendChild(winTitle.cloneNode(true));
        winTitle2.classList.add("animate__animated", "animate__fadeOutUp");
        setTimeout(() => winTitle2.remove(), 1000);
    }
}

function createReloadButton() {
    appendElement(".arenas", "div", "reloadWrap");
    const restartBtn = appendElement(
        ".reloadWrap",
        "button",
        "button",
        "button_restart",
        "animate__animated",
        "animate__bounceInDown"
    );
    restartBtn.innerText = "Restart";
    appendElement(".button_restart", "span", "drop");
    appendElement(".button_restart", "span", "drop");
    appendElement(".button_restart", "span", "drop");
    appendElement(".button_restart", "span", "drop");
    appendElement(".button_restart", "span", "drop");
    restartBtn.addEventListener("click", () => {
        window.location.reload();
    });
}

createPlayer(player1);
createPlayer(player2);

function enemyAttack() {
    const hit = ATTACK[randomizer(3) - 1];

    const defence = ATTACK[randomizer(3) - 1];
    return {
        value: randomizer(HIT[hit]),
        hit,
        defence,
    };
}

function playerAttack() {
    for (let item of $formFight) {
        if (item.checked && item.name === "hit") {
            player1.attack.value = randomizer(HIT[item.value]);
            player1.attack.hit = item.value;
        }
        if (item.checked && item.name === "defence") {
            player1.attack.defence = item.value;
        }
        item.checked = false;
    }
}

$formFight.addEventListener("submit", (e) => {
    e.preventDefault();
    player2.attack = enemyAttack();

    playerAttack();
    console.log("player1 ", player1.attack);
    console.log("player2 ", player2.attack);

    player1.damage(player2.attack);
    player2.damage(player1.attack);

    titleWins(player1, player2);
});

function damage(attack) {
    if (attack.hit != this.defence) {
        this.changeHP(attack.value);
    } else {
        console.log(this.name + " поставил блок");
    }
}

// $randomBtn.addEventListener("click", () => {
//     player1.changeHP(randomizer(20));
//     player2.changeHP(randomizer(20));
//     // changeHP.call(player1, randomizer(20));
//     // changeHP.call(player2, randomizer(20));
//     titleWins(player1, player2);
// });
