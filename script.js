// localStorage.setItem('card', card_info)
 
let card = JSON.parse(localStorage.getItem('card'))

console.log(card)

let products_block = document.querySelector('.products');
console.log(products_block)

let counter = 0

if (localStorage.getItem("counter")) {
    counter = Number(localStorage.getItem("counter"))
}
else {
    localStorage.setItem("counter", counter)
}

function createProdcut(products__card) {
    counter++
    localStorage.setItem("counter", counter)
    localStorage.setItem(`card${counter}`, JSON.stringify(products__card))                  
}

function appendProducts() {
    let keys = Object.keys(localStorage);
    keys.sort()
    keys.reverse()
    for(let key of keys) {
        if (key != "counter") {
            let key_meaning = JSON.parse(localStorage.getItem(key))
            let products__card = document.createElement('div');
            products__card.className = 'products__card'
            products__card.innerHTML = `<div class="card__image-block">
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
                                                    <p>${key_meaning["value"]}</p>
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

let card_info = {
    img: 'img/1.webp',
    rating: '4.95',
    value: '200 ккал',
    name: 'Помидорки',
    cost: '250'
}

createProdcut(card_info)


appendProducts()