
import { getStoredData, setStoredData } from "./storage.js";

let allproducts = [];
let filtredProducts = [];
let currentPage = 1;
let itemsperPage = 8;
let activeCategory = 'all';
let searchTerm = '';

export function initProduct(productArr){
    allproducts = productArr || getStoredData('products');
    filtredProducts = [...allproducts];
}
// after: I need to separate the function to 2 function on filter by term and one by category
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

// export function calculateDynamicPrce(bestPrice, size){
//     let price = Number(bestPrice);
//     console.log(price);
// }


export function getPaginationData(){
    const totalPages = Math.ceil(filtredProducts.length / itemsperPage) || 1;
    const totalItems = filtredProducts.length;

    return { currentPage, totalPages, totalItems, itemsperPage};
}


export function getCategories(){
    const categories = allproducts.map(product =>product.category).filter(category => category && category !== '');
    return ['all', ...new Set(categories)]; // creation dun nouveau objet depuis un array itterable (caretgories) et delete automaticment les duplique 
};