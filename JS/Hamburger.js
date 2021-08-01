let pPrice = document.querySelector(".price")
let pCalories = document.querySelector(".calories")

function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;

    this.hamburgerPrice = function () {
        return this.size.price + this.stuffing.price;
    }
    this.hamburgerCalories = function () {
        return this.size.calories + this.stuffing.calories;
    }
}

function Parameters(name, price, calories) {
    this.paramName = name;
    this.price = price;
    this.calories = calories;
}

Hamburger.SIZE_SMALL = new Parameters("small", 50, 20);
Hamburger.SIZE_LARGE = new Parameters("large", 100, 40);
Hamburger.STUFFING_CHEESE = new Parameters("cheese", 10, 20);
Hamburger.STUFFING_SALAD = new Parameters("salad", 20, 5);
Hamburger.STUFFING_POTATO = new Parameters("potato", 15, 10);
Hamburger.TOPPING_MAYO = new Parameters("mayo", 20, 5);
Hamburger.TOPPING_MAYO.added = false;
Hamburger.TOPPING_SPICE = new Parameters("spice", 15, 0);
Hamburger.TOPPING_SPICE.added = false;

let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO)
console.log("price: " + hamburger.hamburgerPrice())
console.log("calories: " + hamburger.hamburgerCalories())

let hamburgerPrice = hamburger.hamburgerPrice()
let hamburgerCalories = hamburger.hamburgerCalories()

pPrice.innerHTML = hamburgerPrice
pCalories.innerHTML = hamburgerCalories

Hamburger.prototype.addTopping = function (topping) {

    if (topping.added === false) {
        if (topping.paramName == "mayo") {
            this.toppingMayo = topping;
            topping.added = true;
        } else {
            this.toppingSpice = topping;
            topping.added = true;
        }

        this.totalPrice = function () {
            return hamburgerPrice + topping.price;
        }
        this.totalCalories = function () {
            return hamburgerCalories + topping.calories;
        }
        hamburgerPrice = this.totalPrice()
        hamburgerCalories = this.totalCalories()
        pPrice.innerHTML = hamburgerPrice
        pCalories.innerHTML = hamburgerCalories
    }
}

Hamburger.prototype.removeTopping = function (topping) {
    if (topping.added === true) {
        if (topping.paramName == "mayo") {
            delete this.toppingMayo;
            topping.added = false;
        } else {
            delete this.toppingSpice;
            topping.added = false;
        }

        this.totalPrice = function () {
            return hamburgerPrice - topping.price;
        }
        this.totalCalories = function () {
            return hamburgerCalories - topping.calories;
        }

        hamburgerPrice = this.totalPrice()
        hamburgerCalories = this.totalCalories()
        pPrice.innerHTML = hamburgerPrice
        pCalories.innerHTML = hamburgerCalories
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
    return hamburgerPrice
}

Hamburger.prototype.calculateCalories = function () {
    return hamburgerCalories
}

hamburger.addTopping(Hamburger.TOPPING_MAYO)
console.log("price: " + hamburgerPrice)
console.log("calories: " + hamburgerCalories)

hamburger.addTopping(Hamburger.TOPPING_SPICE)

console.log("price: " + hamburgerPrice)
console.log("calories: " + hamburgerCalories)

hamburger.addTopping(Hamburger.TOPPING_MAYO)
console.log("price: " + hamburgerPrice)
console.log("calories: " + hamburgerCalories)

console.log("All topping: " + hamburger.getToppings().join(", "))

// hamburger.removeTopping(Hamburger.TOPPING_MAYO)
// console.log("price: " + price)
// console.log("calories: " + calories)
// console.log("All topping: " + hamburger.getToppings().join(", "))

// hamburger.removeTopping(Hamburger.TOPPING_SPICE)
console.log(hamburger)
console.log("All topping: " + hamburger.getToppings().join(", "))
console.log("Hamburger size: " + hamburger.getSize())
console.log("Hamburger with stuffing: " + hamburger.getStuffing())
console.log("Hamburger price: " + hamburger.calculatePrice())
console.log("Hamburger calories: " + hamburger.calculateCalories())

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
*
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании

Hamburger.prototype.addTopping = function (topping) ...
*/

/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании

Hamburger.prototype.removeTopping = function (topping) ...
*/

/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*

Hamburger.prototype.getToppings = function () ...
*/

/**
 * Узнать размер гамбургера

Hamburger.prototype.getSize = function () ...
*/

/**
 * Узнать начинку гамбургера

Hamburger.prototype.getStuffing = function () ...
*/

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках

Hamburger.prototype.calculatePrice = function () ...
*/

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях

Hamburger.prototype.calculateCalories = function () ...
*/

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor

function HamburgerException (...) { ... }
```*/