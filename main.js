"use strict";

const player1 = {
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["гарпун", "огонь"],

    attack() {
        console.log(this.name + " fight");
    },
};

const player2 = {
    name: "Subzero",
    hp: 80,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["лёд", "снег"],

    attack() {
        console.log(this.name + " fight");
    },
};

function createPlayer(className, obj) {
    function appendElement(
        parentSelector,
        element,
        elementName = "",
        className = "",
        ...args
    ) {
        const parent = document.querySelector(parentSelector);
        window[elementName] = document.createElement(element);
        parent.appendChild(window[elementName]).classList.add(className);
        args.forEach((item) => {
            switch (item) {
                case obj.img:
                    window[elementName].setAttribute("src", args);
                    break;
                case obj.hp:
                    window[elementName].style.width = obj.hp + "%";
                    break;
                case obj.name:
                    window[elementName].innerText = obj.name;
                    break;
            }
        });
    }

    appendElement(".arenas", "div", obj.name + "Fighter", className);
    //div с игроком

    appendElement(
        `.${className}`,
        "div",
        obj.name + "Progressbar",
        "progressbar"
    );
    // прогресс бар

    appendElement(`.${className}`, "div", obj.name + "Character", "character");
    // div с картинкой внутри

    appendElement(
        `.${className} .character`,
        "img",
        obj.name + "Img",
        "playerImg",
        obj.img
    );
    //картинка

    appendElement(
        `.${className} .progressbar`,
        "div",
        obj.name + "Life",
        "life",
        obj.hp
    );
    //остаток жизней

    appendElement(
        `.${className} .progressbar`,
        "div",
        obj.name + "PlayerName",
        "name",
        obj.name
    );
    //имя
}
// console.log(ScorpionFighter);
createPlayer("player1", player1);
createPlayer("player2", player2);
