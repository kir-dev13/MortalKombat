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
        className = ""
    ) {
        const parent = document.querySelector(parentSelector);
        window[elementName] = document.createElement(element);
        parent.appendChild(window[elementName]).classList.add(className);
    }

    appendElement(".arenas", "div", obj.name + "fighter", className);

    appendElement(
        `.${className}`,
        "div",
        obj.name + "progressbar",
        "progressbar"
    );

    appendElement(`.${className}`, "div", obj.name + "character", "character");

    appendElement(
        `.${className} .character`,
        "img",
        obj.name + "img",
        "playerImg"
    );

    window[`${obj.name}img`].setAttribute("src", obj.img);

    appendElement(
        `.${className} .progressbar`,
        "div",
        obj.name + "life",
        "life"
    );
    window[`${obj.name}life`].style.width = obj.hp + "%";

    appendElement(
        `.${className} .progressbar`,
        "div",
        obj.name + "playerName",
        "name"
    );
    window[`${obj.name}playerName`].innerText = obj.name;
}

createPlayer("player1", player1);
createPlayer("player2", player2);
