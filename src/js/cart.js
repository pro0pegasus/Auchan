import { getCart, saveCart } from "./storage";
import { getProductId, calculatePrice } from "./products";

let cartItems = getCart();

function updateCartLocalStorage(){
    saveCart(cartItems);
}

export function getCartItems(){
    return [...cartItems];
}

export function addToCart(productId, size='S'){
    const product = getProductId(productId);

    if(!product){
        return false;
    }

    const basePrice = Number(product.price) || 0;
    const uniPrice = calculatePrice(basePrice, size);
    const existingItem = cartItems.find(p =>{
        product => Number(p.productId) === Number(product.id) && p.size === size;
    })

    if(existingItem){
        existingItem.quantity += 1;
    } else{
        const newProductAdd = {
            productId: product.id,
            name: (product.name_description || '').trim(),
            brand: product.brand || '',
            image: product.image || '',
            basePrice,
            size,
            uniPrice,
            quantity: 1
        }
        cartItems.push(newProductAdd);
    }
    updateCartLocalStorage();
    return true;
}

export function changeCartQty(productId, size, change){
    const item = cartItems.find(cartItem => 
        Number(cartItem.productId) === Number(productId) && cartItem.size === size
    );

    item.quantity += change;
    if(item.quantity <=0){
        removeFromCart(productId, size);
    } else {
        updateCartLocalStorage();
    }
}

export function removeFromCart(productId, size){
    cartItems = cartItems.filter(item =>
        !(Number(item.productId) === Number(productId) && item.size === size)
    )
    updateCartLocalStorage();
}

export function clearCart(){
    cartItems = [];
    updateCartLocalStorage();
}

export function getCartTotals(){
    const itemCount = cartItems.reduce((total, item)=>
        total+item.quantity, 0
    );
    const totalPrice = cartItems.reduce((total, item)=>
        total+(item.uniPrice*item.quantity), 0
    );
    
    return {itemCount, totalPrice: Number(totalPrice.toFixed(2))};
}