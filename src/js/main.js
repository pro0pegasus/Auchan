
import { renderProducts, toggleTheView, renderCart, openCart, closeCart } from "./ui.js";
import { initProduct, filtrerProducts, getCategories, setItemsperPage, calculatePrice } from "./products.js"
import {fetchData} from './api.js'
import { getStoredData, setStoredData } from "./storage.js";
import { addToCart, changeCartQty, clearCart, removeFromCart } from './cart.js'

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
    const productsContainer = document.getElementById('products');
    const cartItemsContainer = document.getElementById('cart-items');

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

    if(productsContainer){
        productsContainer.addEventListener('change', (e) =>{
            if(!e.target.matches('size-select'))
                return;

            const card = e.target.closest('.product-cart');

            let priceDisplay = null;

            if(card){
                priceDisplay = card.querySelector('price-display');
            }

            const basePrice = Number(e.target.dataset.basePrice);
            const price = calculatePrice(basePrice, e.target.value); ///

            if(priceDisplay){
                priceDisplay.textContent = `${price.toFixed(2)} €`
            }
            
        })
    }

    if(productsContainer){
        productsContainer.addEventListener('click', (e) =>{
            const addBtn = e.target.closest('.btn-add');

            if(!addBtn)
                return;

            const card = addBtn.closest('.product-card');

            let size = 'S';
            if (card && card.querySelector('.size-select') && card.querySelector('.size-select').value) {
                size = card.querySelector('.size-select').value;
            }

            if(addToCart(addBtn.dataset.id, size)){
                renderCart()
                addBtn.textContent = 'Ajouté';
                // window.setTimeout(()=>{
                //     addBtn.textContent = "Ajouter"
                // }, 1000)
            }
            
        })
    }

    //Handeling cart, opening and closing cart

    const cartDropZone = document.getElementById('cart-drop-zone');
    if(cartDropZone){
        cartDropZone.addEventListener('click', openCart)
    }

    const closeBackDrop = document.getElementById('cart-backdrop');
    if(closeBackDrop){
        closeBackDrop.addEventListener('click', closeCart);
    }

    const closeCartBtn = document.getElementById('close-cart');
    if(closeCartBtn){
        closeCartBtn.addEventListener('click', closeCart);
    }

    const clearCartBtn = document.getElementById('clear-cart');
    if(clearCartBtn){
        clearCartBtn.addEventListener('click', ()=>{
            clearCart();
            renderCart()
        });
    }

    // global escape key
    document.addEventListener('keydown', (e)=>{
        if(e.key === 'Escape'){
            closeCart();
        }
    })

    // managing cart quantity and sup
    if(cartItemsContainer){
        cartItemsContainer.addEventListener('click', (e)=>{
            const quantityBtn = e.target.closest('.cart-quantity-btn')
            const removeBtn = e.target.closest('.cart-remove');

            if(quantityBtn){
                const change = quantityBtn.dataset.action === 'increase' ? 1 : - 1;
                changeCartQty(quantityBtn.dataset.id, quantityBtn.dataset.size, change);
                renderCart();
            }
            if(removeBtn){
                removeFromCart(removeBtn.dataset.id, removeBtn.dataset.size)
                renderCart();
            }
        })
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