
export function getStoredData(key){
    return JSON.parse(localStorage.getItem(key) || '[]');

}

export function steStoredData(key, products){
    localStorage.setItem(key, JSON.stringify(products));
}

// export {getStoredData, steStoredData}