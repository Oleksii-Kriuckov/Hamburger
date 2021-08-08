const pPrice = document.querySelector(".price")
const pCalories = document.querySelector(".calories")
const pToppings = document.querySelector(".toppings")
const checkboxMayo = document.querySelector('#topping_mayo');
const checkboxSpice = document.querySelector('#topping_spice');
const pGetSize = document.querySelector(".size");
const pGetStuffing = document.querySelector(".stuffing");

function Hamburger(size, stuffing) {
    try {
        if (!size || !stuffing) {
            throw new HamburgerException('MissingData', "no size or stuffing given");
        }
        if (size.paramType != "Size" || stuffing.paramType != "Stuffing") {
            throw new HamburgerException('UncorectedParameters', "invalid size or stuffing");
        }

        this.size = size;
        this.stuffing = stuffing;
    } catch (err) {
        alert(err.name + ": " + err.message);
    }
}

function Parameters(type, name, price, calories) {
    this.paramType = type;
    this.paramName = name;
    this.price = price;
    this.calories = calories;
}

Hamburger.SIZE_SMALL = new Parameters("Size", "Small", 50, 20);
Hamburger.SIZE_LARGE = new Parameters("Size", "Large", 100, 40);
Hamburger.STUFFING_CHEESE = new Parameters("Stuffing", "Cheese", 10, 20);
Hamburger.STUFFING_SALAD = new Parameters("Stuffing", "Salad", 20, 5);
Hamburger.STUFFING_POTATO = new Parameters("Stuffing", "Potato", 15, 10);
Hamburger.TOPPING_MAYO = new Parameters("Topping", "Mayo", 20, 5);
Hamburger.TOPPING_MAYO.added = false;
Hamburger.TOPPING_SPICE = new Parameters("Topping", "Spice", 15, 0);
Hamburger.TOPPING_SPICE.added = false;



Hamburger.prototype.addTopping = function (topping) {

    try {
        if (!topping) {
            throw new HamburgerException('MissingData', "no topping given");
        } else if (topping.paramType != "Topping") {
            throw new HamburgerException('UncorectedParameters', "invalid topping");
        }
        if (topping.added === true) {
            throw new HamburgerException('DuplicateTopping', `Topping ${topping.paramName} has been already added`)
        }

        if (topping.paramName == "Mayo") {
            this.toppingMayo = topping;
            topping.added = true;
        } else {
            this.toppingSpice = topping;
            topping.added = true;
        }

    } catch (err) {
        alert(err.name + ": " + err.message);
    }
}

Hamburger.prototype.removeTopping = function (topping) {
    try {
        if (!topping) {
            throw new HamburgerException('MissingData', "no topping given");
        } else if (topping.type != "Topping") {
            throw new HamburgerException('UncorectedParameters', "invalid topping");
        }
        if (topping.added === false) {
            throw new HamburgerException('MissingTopping', `Topping ${topping.paramName} was not added`)
        }

        if (topping.paramName == "Mayo") {
            delete this.toppingMayo;
            topping.added = false;
        } else {
            delete this.toppingSpice;
            topping.added = false;
        }

    } catch (err) {
        alert(err.name + ": " + err.message);
    }
}

Hamburger.prototype.getToppings = function () {
    var addedTopping = new Array(), i = 0;
    for (let prop in this) {
        if (this[prop].added === true) {
            addedTopping[i] = this[prop].paramName;
            i++;
        }
    }
    return addedTopping;
}

Hamburger.prototype.getSize = function () {
    return this.size.paramName
}

Hamburger.prototype.getStuffing = function () {
    return this.stuffing.paramName
}

Hamburger.prototype.calculatePrice = function () {
    let price = 0;
    for (let prop in this) {
        if (this[prop].price) {
            price = this[prop].price + price;
        }
    }
    pPrice.innerHTML = price;
    return price;
}


Hamburger.prototype.calculateCalories = function () {
    let calories = 0;
    for (let prop in this) {
        if (this[prop].calories) {
            calories = this[prop].calories + calories;
        }
    }
    pCalories.innerHTML = calories;
    return calories;
}

function HamburgerException(name, message) {
    this.name = name;
    this.message = message;
}

const buttonCalculate = document.querySelector("#calculate");
buttonCalculate.addEventListener('click', (ev) => {
    let inputSize, inputStuffing, hamburgerSize, hamburgerStuffng;
    inputSize = document.querySelectorAll('[name="size"]');
    inputSize.forEach((el) => {
        if (el.checked == true) {
            if (el.value == "small") {
                hamburgerSize = Hamburger.SIZE_SMALL
            } else if (el.value == "large") {
                hamburgerSize = Hamburger.SIZE_LARGE
            }
        }
    })
    inputStuffing = document.querySelectorAll('[name="stuffing"]');
    inputStuffing.forEach((el) => {
        if (el.checked == true) {
            switch (el.value) {
                case "cheese": {
                    hamburgerStuffng = Hamburger.STUFFING_CHEESE
                } break;
                case "salad": {
                    hamburgerStuffng = Hamburger.STUFFING_SALAD
                } break;
                case "potato": {
                    hamburgerStuffng = Hamburger.STUFFING_POTATO
                }
            }
        }
    })

    let hamburger = new Hamburger(hamburgerSize, hamburgerStuffng)
    Hamburger.TOPPING_MAYO.added = false;
    Hamburger.TOPPING_SPICE.added = false
    pToppings.innerHTML="";
    pGetSize.innerHTML ="";
    pGetStuffing.innerHTML ="";
    
    if (checkboxMayo.checked == true && !hamburger.toppingMayo) {
        hamburger.addTopping(Hamburger.TOPPING_MAYO)
    }

    if (checkboxSpice.checked == true && !hamburger.toppingSpice) {
        hamburger.addTopping(Hamburger.TOPPING_SPICE)
    }

    hamburger.calculatePrice()
    hamburger.calculateCalories()

    const buttonAllTopping = document.querySelector("#all_toppings")
    buttonAllTopping.addEventListener('click', () => {
        pToppings.innerHTML = hamburger.getToppings().join(", ");
    })

    const buttonGetSize = document.querySelector("#get_size");
    buttonGetSize.addEventListener('click', () => {
        pGetSize.innerHTML = hamburger.getSize();
    })
    
    const buttonGetStuffing = document.querySelector("#get_stuffing");
    buttonGetStuffing.addEventListener('click', () => {
        pGetStuffing.innerHTML = hamburger.getStuffing();
    })
    
})


// Для проверки
// let h1 = new Hamburger()
// let h2 = new Hamburger(Hamburger.TOPPING_MAYO, Hamburger.TOPPING_MAYO)
//  let hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE)

// hamburger.addTopping()
// hamburger.addTopping(Hamburger.STUFFING_SALAD)
// hamburger.addTopping(Hamburger.TOPPING_MAYO)
// hamburger.addTopping(Hamburger.TOPPING_SPICE)
// console.log("price: " + hamburger.calculatePrice())
// console.log("calories: " + hamburger.calculateCalories())
// console.log("All topping: " + hamburger.getToppings().join(", "))

// hamburger.removeTopping()
// hamburger.removeTopping(Hamburger.SIZE_SMALL)
// hamburger.removeTopping(Hamburger.TOPPING_MAYO)
// hamburger.removeTopping(Hamburger.TOPPING_MAYO)
// hamburger.removeTopping(Hamburger.TOPPING_SPICE)
// console.log("price: " + hamburger.calculatePrice())
// console.log("calories: " + hamburger.calculateCalories())
// console.log("All topping: " + hamburger.getToppings().join(", "))

// console.log(hamburger)
