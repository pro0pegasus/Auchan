
import { renderProducts, toggleTheView } from "./ui.js";
import {initProduct, filtrerProducts, getCategories, setItemsperPage } from "./products.js"
import {fetchData} from './api.js'
import { getStoredData, setStoredData } from "./storage.js";

// fetchData();
// initCatalog(products);

// inputFilter.addEventListener('input', (e)=>
//     {console.log(e.target.value)}
// )

function eventsListners(){
    const inputFilter = document.getElementById('filter');
    const categorySelec = document.getElementById('category-select');
    const itemsSelectedPerPage = document.getElementById('items-per-page')
    const gridBtn = document.getElementById('v-grid');
    const listBtn = document.getElementById('v-list');

    const categories = getCategories();
    if(categorySelec){
        categories.forEach(category =>{
            if(category !== 'all'){
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categorySelec.appendChild(option); 
            }
        })
    }
    
    categorySelec.addEventListener('change', (e)=>{
        filtrerProducts(e.target.value, inputFilter.value);
        renderProducts();
        // console.log(e.target.value, inputFilter.value)
    });
    

    if(inputFilter){
        inputFilter.addEventListener('input', (e)=>{
            const currentCateg = categorySelec ? categorySelec.value : 'all';
            console.log(e.target.value)
            filtrerProducts(currentCateg, e.target.value);
            renderProducts();
        })
    }

    if(itemsSelectedPerPage){
        itemsSelectedPerPage.addEventListener('change', (e)=>{
            setItemsperPage(e.target.value);
            renderProducts();
        })
    }

    if(gridBtn && listBtn){
        gridBtn.addEventListener('click', ()=>{
            gridBtn.classList.add('is-active');
            listBtn.classList.remove('is-active');
            toggleTheView('grid')
        });

        listBtn.addEventListener('click', ()=>{
            listBtn.classList.add('is-active');
            gridBtn.classList.remove('is-active');
            toggleTheView('list');
        });
    }

}   


function app(){
    let products = getStoredData('products');

    if(!products || products.length === 0){
        fetchData()
            .then(fetchedProducts =>{
                setStoredData('products', fetchedProducts);
                initProduct(fetchedProducts); 
                renderProducts();
                eventsListners();
            })
    } else {
        initProduct(products);
        renderProducts();
        eventsListners();
    }
    
}

document.addEventListener('DOMContentLoaded', app);