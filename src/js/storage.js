
export function getStoredData(key){
    return JSON.parse(localStorage.getItem(key) || '[]');

}

export function setStoredData(key, products){
    localStorage.setItem(key, JSON.stringify(products));
}

export function saveCart(cartItems){

}

export function getCart(){

}

export function saveProduct(productList){

}

export function getProducts(){

}

// export {getStoredData, steStoredData}