// ===== КОРЗИНА =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image){

    const existing = cart.find(item => item.name === name);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            name,
            price,
            image,
            quantity:1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Товар додано до кошика!");

}

function renderCart(){

    const cartContainer = document.getElementById("cartItems");

    const totalPrice = document.getElementById("totalPrice");

    if(!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartContainer.innerHTML = "<p class='empty-cart'>Ваш кошик порожній</p>";

        totalPrice.innerText = "0";

        return;

    }

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        cartContainer.innerHTML += `
        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>${item.price} ₴ × ${item.quantity}</p>

            </div>

            <button onclick="removeItem(${index})">
            Видалити
            </button>

        </div>
        `;

    });

    totalPrice.innerText = total;

}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

}

document.addEventListener("DOMContentLoaded", renderCart);

const BOT_TOKEN = "8627514379:AAHcwh2_CmoqbXJbNVkUv-bIKRLQoxPdL6I";
const CHAT_ID = "7999613061";

function sendOrder(event){

event.preventDefault();

const name = document.querySelector('input[type="text"]').value;

const phone = document.querySelector('input[type="tel"]').value;

const telegram = document.querySelectorAll("input")[2].value;

const comment = document.querySelector("textarea").value;

const delivery = document.querySelector('input[name="delivery"]:checked').parentElement.innerText;

const text =
`🛒 Нове замовлення

👤 Ім'я: ${name}

📞 Телефон: ${phone}

📲 Telegram: ${telegram}

🚚 Доставка: ${delivery}

📝 Коментар:
${comment}`;

fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

chat_id:CHAT_ID,

text:text

})

})

.then(()=>{

alert("Замовлення успішно відправлено!");

})

.catch(()=>{

alert("Помилка!");

});

}
function toggleMenu(){

const menu = document.getElementById("mobileMenu");

menu.classList.toggle("show");

}