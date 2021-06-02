"use strict";

const player1 = {
    name: "Вася",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["гарпун", "огонь"],

    attack() {
        console.log(this.name + " fight");
    },
};

const player2 = {
    name: "Коля",
    hp: 80,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["лёд", "снег"],

    attack() {
        console.log(this.name + " fight");
    },
};

function createPlayer(className, obj) {
    function appendElement(parentSelector, element, className = "", ...args) {
        const elem = document.createElement(element);
        document
            .querySelector(parentSelector)
            .appendChild(elem)
            .classList.add(className);

        args.forEach((item) => {
            switch (item) {
                case obj.img:
                    elem.setAttribute("src", args);
                    break;
                case obj.hp:
                    elem.style.width = obj.hp + "%";
                    break;
                case obj.name:
                    elem.innerText = obj.name;
                    break;
            }
        });
    }

    appendElement(".arenas", "div", className);
    //div с игроком

    appendElement(`.${className}`, "div", "progressbar");
    // прогресс бар

    appendElement(`.${className}`, "div", "character");
    // div с картинкой внутри

    appendElement(`.${className} .character`, "img", "playerImg", obj.img);
    //картинка

    appendElement(`.${className} .progressbar`, "div", "life", obj.hp);
    //остаток жизней

    appendElement(`.${className} .progressbar`, "div", "name", obj.name);

    // console.log(window[`${obj.name}Fighter`]);
    // console.log(window[`${obj.name}Character`]);
}

createPlayer("player1", player1);
createPlayer("player2", player2);
