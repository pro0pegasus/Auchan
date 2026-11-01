
import { initCatalog } from "./products";
import {fetchData} from './api'
import { getStoredData, steStoredData } from "./storage";

// fetchData();
// initCatalog(products);

function app(){
    let products = getStoredData('products');

    if(!products || products.length === 0){
        fetchData()
            .then(fetchedProducts =>{
                steStoredData('products', fetchedProducts);
                initCatalog(fetchedProducts);
            
            })
        
    } else {
        initCatalog(products);
    }
    
}

document.addEventListener('DOMContentLoaded', app);