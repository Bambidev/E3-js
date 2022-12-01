const form = document.getElementById('form')
const inputNum = document.getElementById('form__input')
const pizzasContainer = document.getElementById('pizzas__container')
const small = document.getElementById('small')

const pizzas = [
    {
        id: 1,
        nombre: "Napo",
        ingredientes: [' salsa', ' tomate', ' oregano'],
        precio: 1800,
        foto: "napo"
    },
    {
        id: 2,
        nombre: "Muzza",
        ingredientes: [' queso', ' salsa'],
        precio: 1400,
        foto: "muzza"
    },
    {
        id: 3,
        nombre: "Pepperoni",
        ingredientes: [' salsa', ' tomate', ' pepperoni'],
        precio: 1800,
        foto: "pepperoni"
    },
    {
        id: 4,
        nombre: "Especial",
        ingredientes: [' salsa', ' tomate', ' oregano', ' huevo'],
        precio: 1900,
        foto: "especial"
    },
    {
        id: 5,
        nombre: "margarita",
        ingredientes: [' salsa', ' tomate', ' mozzarella', ' albahaca'],
        precio: 1800,
        foto: "margarita"
    },
    {
        id: 6,
        nombre: "champiñon",
        ingredientes: [' champiñones', ' oregano', ' quesio'],
        precio: 1600,
        foto: "champiñon"
    }
]

function guardar_pizza(nombre, precio, foto, id, ingredientes) { //guarda la ultima pizza
    let newPizza = {
        nombre: nombre,
        precio: precio,
        foto: foto,
        id: id,
        ingredientes: ingredientes,
    }
    localStorage.setItem("pizza", JSON.stringify( newPizza ))
}

function obtener_pizza() { //trae la pizza del localStorage
    let pizza = JSON.parse(localStorage.getItem("pizza")) 
    devolverPizza(pizza.nombre, pizza.precio, pizza.foto, pizza.id, pizza.ingredientes)
}

const showError = (mensaje) => {
    small.classList.add('error')
    small.textContent = mensaje
}

const clearError = () => {
    small.classList.remove('error')
    small.textContent = ''
}

const devolverPizza = (nombre, precio, foto, ingredientes) => {
    return pizzasContainer.innerHTML = `
        <div id="pizza" class="pizza --color-celeste">
            <div class="left">
                <img src="./assets/img/${foto}.jpg" alt="">
            </div>
            <div class="separador"></div>
            <div class="right">
                <h2>${nombre}</h2>
                <p>Precio: <span class="precio">$${precio}</span></p>
                <p>Ingredientes: <span class="ingredientes">${ingredientes}</span></p>
            </div>
        </div>
        ` 
    }

const clerearResultado = () => {
    return pizzasContainer.innerHTML = ``
}

const boton = document.getElementById('button').addEventListener('click', (e) =>{
    e.preventDefault()
    
    const idValue = inputNum.value
    const idPizza = parseInt(idValue);

    pizzas.forEach(element => {
        if (idPizza === element.id) {
                devolverPizza(element.nombre, element.precio, element.foto, element.ingredientes)
                guardar_pizza(element.nombre, element.precio, element.foto, element.ingredientes)
                clearError()
            } else if (idValue == '') {
                showError('no ingresó valor')
                clerearResultado()
            } else if (idPizza > element.id) {
               showError('no existe una pizza con ese ID')
               clerearResultado()
            } else {
                clearError()
            }  
    })
})

if (localStorage.getItem("pizza")) {
    obtener_pizza()
}
