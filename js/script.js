// Get the modal
var modal = document.getElementById('id01');
var modal1 = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
window.onclick = function(event) {
    if (event.target == modal1) {
        modal.style.display = "none";
    }
}
// --------------------------------------registeration------------------------------//
let username = document.querySelector("#username")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let register_btn = document.querySelector("#sign_up")

register_btn.addEventListener("click" , function(e){
    e.preventDefault(); 
    if(username.value ==="" || email.value ==="" || password.value ===""){
        alert("please fill data")
    }
    else{
            localStorage.setItem("username" , username.value);
            localStorage.setItem("email" , email.value);
            localStorage.setItem("password" , password.value);
            setTimeout(()=> {
                document.getElementById('id01').style.display='block';
                document.getElementById('id02').style.display='none';
            } , 1500 )
        }
    }
)
// --------------------------------------log-in------------------------------//
let usernameLogin = document.querySelector("#usernameLogin")
let passwordLogin = document.querySelector("#passwordLogin")
let logINBtn = document.querySelector("#logINBtn");
let userIcon = document.getElementById("user-icon");
let getUser = localStorage.getItem("username");
let getPassword = localStorage.getItem("password");

logINBtn.addEventListener("click" , function(e){
    e.preventDefault();
    if(username.value === "" ||  password.value === ""){
        alert("please fill data")
    }
    else{
        if(getUser && getUser.trim()=== usernameLogin.value.trim() && getPassword && getPassword.trim()===passwordLogin.value.trim()){
            console.log("dine")
            userIcon.style.display='none';
            document.getElementById('usernamelog').innerHTML = "Hi, " + getUser;
            setTimeout(() => {
                document.getElementById('id01').style.display='none';
            } , 1500)
        }
        else{
            alert("username or password os wrong")
        }
    }
})
// ------------------------------------------------open/close-ShoppingCart-------------------------=

function closeCart() {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling')
}


const openShopCart = document.querySelector('.shoppingCartButton');
openShopCart.addEventListener('click', () => {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling');
});


const closeShopCart = document.querySelector('#closeButton');
const overlay = document.querySelector('.overlay');
closeShopCart.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
// ------------------------------------------------shopping-cart------------------------------------

let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.card');


const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}

const updateShoppingCartHTML = function () { 
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>$${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
		// clearAll.classList.toggle('hide');
		cartSumPrice.innerHTML = 'Total Price: ' + ' $' + countTheSumPrice();

	}
	else {
		document.querySelector('.clearAll').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
	}
    
}
function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}
products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('#store-item-name').innerHTML;
			const productPrice = item.querySelector('#store-item-price').innerHTML;
			const productImage = item.querySelector('.store-img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
            
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
       
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();

