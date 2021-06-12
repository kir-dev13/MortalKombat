"use strict";
// import logs from "./logs.js";

const logs = {
    start: "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
    end: [
        "Результат удара [playerWins]: [playerLose] - труп",
        "[playerLose] погиб от удара бойца [playerWins]",
        "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
    ],
    hit: [
        "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
        "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
        "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
        "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
        "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
        "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
        "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
        "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
        "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
        "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
        "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
        "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
        "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
        "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
        "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
        "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
        "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
        "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
    ],
    defence: [
        "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
        "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
        "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
        "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
        "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
        "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
        "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
        "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    ],
    draw: "Ничья - это тоже победа!",
};

const $arenas = document.querySelector(".arenas");
const $chat = document.querySelector(".chat");
let date = new Date();

let time = `${date.getHours()}:${date.getMinutes()}`;

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
    let winTitle = null;
    if (players.every((player) => player.hp === 0)) {
        winTitle = appendElement(".arenas", "div", "winTitle");
        winTitle.innerText = "DRAW";
        $chat.insertAdjacentHTML(
            "afterbegin",
            `<p style='font-size: 1.5em'>${logs.draw}</p>`
        );
        createReloadButton();
    } else {
        players.forEach((player) => {
            if (player.hp === 0) {
                createReloadButton();

                winTitle = appendElement(".arenas", "div", "winTitle");
                switch (player.player) {
                    case 1:
                        winTitle.innerText = player2.name + " WINS";
                        $chat.insertAdjacentHTML(
                            "afterbegin",
                            `<p style='font-size: 1.5em'>${logs.end[
                                randomizer(logs.end.length) - 1
                            ]
                                .replace("[playerWins]", player2.name)
                                .replace("[playerLose]", player1.name)}</p>`
                        );
                        break;
                    case 2:
                        winTitle.innerText = player1.name + " WINS";
                        $chat.insertAdjacentHTML(
                            "afterbegin",
                            `<p style='font-size: 1.5em'>${logs.end[
                                randomizer(logs.end.length) - 1
                            ]
                                .replace("[playerWins]", player1.name)
                                .replace("[playerLose]", player2.name)}</p>`
                        );
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

//* лог старта
$chat.insertAdjacentHTML(
    "afterbegin",
    logs.start
        .replace("[time]", `${date.getHours()}:${date.getMinutes()}`)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name)
);

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

    player1.damage(player2);
    player2.damage(player1);

    titleWins(player1, player2);
});

function createLog(type, player2, attackValue = 0) {
    const text = logs[type][randomizer(logs[type].length) - 1];
    let color = null;
    switch (player2.player) {
        case 1:
            color = "yellow";
            break;
        case 2:
            color = "lightblue";
            break;
    }

    const logItem = `<p style='color:${color};'>${text
        .replace("[playerDefence]", this.name)
        .replace(
            "[playerKick]",
            player2.name
        )}; Повреждения: ${attackValue}hp; Осталось: ${this.hp}/100</p>`;

    $chat.insertAdjacentHTML("afterbegin", logItem);
}

function damage(player) {
    if (player.attack.hit != this.attack.defence) {
        this.changeHP(player.attack.value);
        createLog.call(this, "hit", player, player.attack.value);
    } else {
        createLog.call(this, "defence", player);
        console.log(this.name + " поставил блок");
    }
}
