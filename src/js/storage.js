
export function getStoredData(key){
    return JSON.parse(localStorage.getItem(key) || '[]');

}

export function setStoredData(key, products){
    localStorage.setItem(key, JSON.stringify(products));
}

export function saveCart(cartItems){
    return setStoredData('cart', cartItems)
}

export function getCart(){
    return getStoredData('cart');
}

export function saveProduct(productList){
    setStoredData('products', productList)
}

export function getProducts(){
    return getStoredData('products')
}

// export {getStoredData, steStoredData}