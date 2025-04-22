let card = JSON.parse(localStorage.getItem('card'))
let products_block = document.querySelector('.products');
let counter = 0
let img_add = document.querySelector('.img__add');
let form__fields = document.querySelector('.form__fields');
let form__button = document.querySelector('.form__button');
let form__card = document.querySelector('.add__form');
let modal = document.querySelector('.modal');
let buttonYes = document.getElementById('yes')
let buttonNo = document.getElementById('no')


function showForm() {
    img_add.classList.toggle("hide")
    form__fields.classList.toggle("show")
}

img_add.addEventListener("click", showForm)



appendProducts()
let deleteButtons = document.querySelectorAll('.card__delete');
let image = document.querySelector('.card__delete');
function add__card(event) {
    event.preventDefault()
    let text_field = document.querySelector('.text-field');
    let form__rating = document.querySelector('.form__rating');
    let form__value = document.querySelector('.form__value');
    let form__name = document.querySelector('.form__name');
    let form__cost = document.querySelector('.form__cost');
    let card_info = {
        img: text_field.value,
        rating: form__rating.value,
        value: form__value.value,
        name: form__name.value,
        cost: form__cost.value
    }
    if (form__card.checkValidity()) {
        createProdcut(card_info)
        location.reload()
    }
}


form__button.addEventListener("click", function(event) {
    add__card(event)
})


if (localStorage.getItem("counter")) {
    counter = Number(localStorage.getItem("counter"))
}
else {
    localStorage.setItem("counter", counter)
}

function createProdcut(products__card) {
    counter++
    localStorage.setItem("counter", counter)
    localStorage.setItem(`card${counter}`, JSON.stringify({
        "img": products__card.img, 
        "rating": products__card.rating, 
        "value": products__card.value, 
        "name": products__card.name, 
        "cost": products__card.cost, 
        "data": counter
    }))             
}

function showModal() {
    modal.classList.add("active")
    modal.classList.remove("closed")
}
function closeModal() {
    modal.classList.remove("active")
    modal.classList.add("closed")
}

for (let deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", function(){
        showModal()
        let data = deleteButton.getAttribute("data")
        buttonYes.addEventListener("click", function(){
            closeModal()
            localStorage.removeItem(`card${data}`)
            location.reload()
        })
        buttonNo.addEventListener("click", function(){
            closeModal()
        })
    })
}


function appendProducts() {
    let keys = Object.keys(localStorage);
    keys.sort()
    keys.reverse()
    for (let key of keys) {
        if (key != "counter") {
            let key_meaning = JSON.parse(localStorage.getItem(key))
            let products__card = document.createElement('div');
            products__card.className = 'products__card'
            products__card.innerHTML = `<img src="img/delete.svg" data=${key_meaning["data"]} class="card__delete">
                                        <div class="card__image-block">
                                            <div class="card__image">
                                                <img src=${key_meaning["img"]}>
                                            </div>
                                        </div>
                                        <div class="card__description">
                                            <div class="card__meta">
                                                <div class="card__rating">
                                                    <p>${key_meaning["rating"]}</p>
                                                </div>
                                                <div class="card__value">
                                                    <p>${key_meaning["value"]}ккал</p>
                                                </div>
                                            </div>
                                            <div class="card__name">
                                                <p>${key_meaning["name"]}</p>
                                            </div>
                                            <div class="card__cost">
                                                ${key_meaning["cost"]}
                                            </div>
                                        </div>`
            products_block.append(products__card);
        }
    }
}

