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
    this.added = false;
}

Hamburger.SIZE_SMALL = new Parameters("small", 50, 20);
Hamburger.SIZE_LARGE = new Parameters("large", 100, 40);
Hamburger.STUFFING_CHEESE = new Parameters("cheese", 10, 20);
Hamburger.STUFFING_SALAD = new Parameters("salad", 20, 5);
Hamburger.STUFFING_POTATO = new Parameters("potato", 15, 10);
Hamburger.TOPPING_MAYO = new Parameters("mayo", 20, 5);
Hamburger.TOPPING_SPICE = new Parameters("spice", 15, 0);

let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO)
console.log(hamburger)
console.log("price: " + hamburger.hamburgerPrice())
console.log("calories: " + hamburger.hamburgerCalories())

pPrice.innerHTML = hamburger.hamburgerPrice()
pCalories.innerHTML = hamburger.hamburgerCalories()

let price = hamburger.hamburgerPrice()
let calories = hamburger.hamburgerCalories()

Hamburger.prototype.addTopping = function (topping) {
    for (let prop in hamburger) {
        if (prop == topping) {
            this.topping = true;
        } else {
            this.topping = false;
        }
    }
    if (this.topping == false) {
        this.topping = topping;
        // let price = this.hamburgerPrice();
        this.totalPrice = function () {
            return price + this.topping.price;
        }
        price = this.totalPrice()

        //let calories = this.hamburgerCalories()
        this.totalCalories = function () {
            return calories + this.topping.calories;
        }
        calories = this.totalCalories()
    }
}
hamburger.addTopping(Hamburger.TOPPING_MAYO)
console.log(hamburger)
console.log("price: " + price)
console.log("calories: " + calories)

hamburger.addTopping(Hamburger.TOPPING_SPICE)
console.log(hamburger)
console.log("price: " + price)
console.log("calories: " + calories)

hamburger.addTopping(Hamburger.TOPPING_MAYO)
console.log(hamburger)
console.log("price: " + price)
console.log("calories: " + calories)
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