
import { getStoredData, setStoredData } from "./storage.js";

let allproducts = [];
let filtredProducts = [];
let currentPage = 1;
let itemsperPage = 8;
let activeCategory = 'all';
let searchTerm = '';

// export function initProduct(productArr){
//     const products = productArr || getStoredData('products');
//     allproducts = products.map((product, index) =>({
//         ...product, id: index+1
//     }))
//     filtredProducts = [...allproducts];
//     return allproducts;
// }

export function initProduct(productArr){
    allproducts = productArr || getStoredData('products');
    filtredProducts = [...allproducts];
}
//
export function getAllProducts(){
    return [...allproducts];
}

export function getProductId(productId){
    return allproducts.find(product => product.id === Number(productId))
}

export function filtrerProducts(category, term){
    if(category !== undefined){
        activeCategory = category;
    }
    if(term !== undefined){
        searchTerm = term.toLowerCase().trim();
    }

    filtredProducts = allproducts.filter(prodItem =>{
        const name = (prodItem.name_description || '').toLowerCase();
        // const brand = (prodItem.brand || '').toLowerCase();
        const productCtegory = (prodItem.category || '').toLowerCase();
        const selectedCategory = activeCategory.toLowerCase();
        // console.log(name)

        const matchCategory = selectedCategory === 'all' || productCtegory === selectedCategory;
        const matchSearch = searchTerm === '' || name.includes(searchTerm) 

        return matchSearch && matchCategory;
    })
    currentPage = 1;
    return filtredProducts;
}

export function getPaginatedProducts(){
    const startIndex = (currentPage -1) * itemsperPage;
    const endIndex = startIndex + itemsperPage

    return filtredProducts.slice(startIndex, endIndex);
}

export function setItemsperPage(limit){
    itemsperPage = Number(limit);
    currentPage = 1;
}

export function setPage(pageNumber){
    const totalpages = Math.ceil(filtredProducts.length / itemsperPage) || 1;
    if(pageNumber >= 1 && pageNumber <= totalpages){
        currentPage = pageNumber;
    }
}

export function calculatePrice(bestPrice, size='S'){
    const percentages = {
        S:0,
        M: 0.05,
        L: 0.10,
        XL: 0.20
    }
    const price = Number(bestPrice) || 0;
    const rate = percentages[size] || 0;


   return Math.round(price*(1+rate)*100) /100;

}


export function getPaginationData(){
    const totalPages = Math.ceil(filtredProducts.length / itemsperPage) || 1;
    const totalItems = filtredProducts.length;

    return { currentPage, totalPages, totalItems, itemsperPage};
}


export function getCategories(){
    const categories = allproducts.map(product =>product.category).filter(category => category && category !== '');
    return ['all', ...new Set(categories)]; // creation dun nouveau objet depuis un array itterable (caretgories) et delete automaticment les duplique 
};