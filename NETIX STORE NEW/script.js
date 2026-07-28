function showClothes(button){

document.getElementById("clothes").style.display="grid";

document.getElementById("jewelry").style.display="none";


document.querySelectorAll(".category").forEach(btn=>{
btn.classList.remove("active");
});


button.classList.add("active");

}




function showJewelry(button){

document.getElementById("clothes").style.display="none";

document.getElementById("jewelry").style.display="grid";


document.querySelectorAll(".category").forEach(btn=>{
btn.classList.remove("active");
});


button.classList.add("active");

}
// ДОБАВЛЕНИЕ В КОРЗИНУ


function addToCart(name, price, image){


let cart = JSON.parse(localStorage.getItem("cart")) || [];


cart.push({

name:name,

price:Number(price),

image:image

});


localStorage.setItem("cart", JSON.stringify(cart));


alert("Товар додано в кошик");


}







// ОТРИСОВКА КОРЗИНЫ


function loadCart(){


let cart = JSON.parse(localStorage.getItem("cart")) || [];


let box = document.getElementById("cart-items");


let total = 0;



if(!box) return;



box.innerHTML="";



cart.forEach((item,index)=>{


total += item.price;



box.innerHTML += `

<div class="cart-item">


<img src="${item.image}">


<div>

<h3>${item.name}</h3>

<p>${item.price} грн</p>


<button class="remove-btn" onclick="removeItem(${index})">

Видалити

</button>


</div>


</div>

`;


});



document.getElementById("total").innerHTML = total;


}







function removeItem(index){


let cart = JSON.parse(localStorage.getItem("cart")) || [];


cart.splice(index,1);


localStorage.setItem("cart",JSON.stringify(cart));


loadCart();


}




loadCart();
// ПОКАЗ КОРЗИНЫ


function loadCart(){


let cart = JSON.parse(localStorage.getItem("cart")) || [];


let box = document.getElementById("cart-items");

let total = 0;



if(!box) return;



box.innerHTML = "";



if(cart.length === 0){

box.innerHTML = `
<h2 style="text-align:center;">
Кошик порожній
</h2>
`;

return;

}



cart.forEach((item,index)=>{


total += Number(item.price);



box.innerHTML += `


<div class="cart-product">


<img src="${item.image}">


<div>


<h2>
${item.name}
</h2>


<p>
${item.price} грн
</p>



<button onclick="removeCart(${index})">
Видалити
</button>


</div>


</div>


`;



});



document.getElementById("total").innerHTML = total;


}







function removeCart(index){


let cart = JSON.parse(localStorage.getItem("cart")) || [];


cart.splice(index,1);


localStorage.setItem("cart",JSON.stringify(cart));


loadCart();


}
const BOT_TOKEN = "8627514379:AAGgX7-Kgyzw1dbaBI0U2AEjVjMZkAWtK8I";
const CHAT_ID = "7999613061";

function sendOrder(event){

event.preventDefault();

const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;
let products = "";

cart.forEach(item=>{

total += Number(item.price);

products += `• ${item.name} — ${item.price} грн\n`;

});

const text = `🛒 НОВЕ ЗАМОВЛЕННЯ

👤 Ім'я:
${name}

📞 Телефон:
${phone}

📦 Товари:

${products}

💰 Разом:
${total} грн`;

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

alert("Замовлення відправлено!");

localStorage.removeItem("cart");

window.location.href="index.html";

})

.catch(()=>{

alert("Помилка!");

});

}