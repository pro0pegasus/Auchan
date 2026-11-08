import {getPaginatedProducts, filtrerProducts, setPage, getPaginationData} from './products.js'
import { getCartItems, getCartTotals } from './cart.js'

const productsContainer = document.getElementById('products');
const paginationContainer = document.getElementById('pagination');
const productsCount = document.getElementById('products-count');

let viewCurr = 'grid';

export function renderProducts(){
    const items = getPaginatedProducts();
    const {totalItems} = getPaginationData();

    productsContainer.innerHTML = '';

    if(productsCount){
        productsCount.textContent = `${totalItems} produit(s)`;
    }

    if(items.length === 0){
        productsContainer.className = 'rounded-xl border border-gray-200 bg-white px-4 py-12 text-center text-sm text-gray-500'
        productsContainer.innerHTML = `Aucun produit trouvé. Essayez une autre recherche ou catégorie.`
        renderPagination();
        return;
    }

    // document.getElementById('search-btn').addEventListener('click', ())

const containerClasses = viewCurr === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4' : 'flex flex-col gap-3';

const cardsHtml = items.map(elem => {
    const id = elem.id || elem.name_description;
    return `
        <article class="product-card border rounded-lg border-gray-200 p-4 shadow-sm bg-white hover:shadow-md transition flex cursor-grab ${viewCurr === 'list' ? 'flex-row items-center gap-2' : 'flex-col justify-between'}" draggable = "true" data-id="${id}">
            
            <img src=${elem.image} class="${viewCurr === 'list' ? 'w-24 h-24 object-contain' : 'w-full h-44 object-contain mb-3'} pointer-events-none"/>
            
            <div class="flex-1 w-full">
                    <span class="text-xs text-blue-600 font-semibold uppercase">${elem.brand}</span>
                    <h3 class="font-meduim text-sm text-gray-800 line-clamp-2 my-1">${elem.name_description}</h3>
                    <p class="text-xs text-gray-500 mb-2">${elem.data}</p>
                
            
                <div class="flex items-center gap-2 my-2 text-xs">
                    <label for="" class="">Taile:</label>
                    <select id="" class="size-select border border-gray-300 rounded px-1.5 py-0.5 data-base-price="${elem.price}">
                        <option value="S">S</option>
                        <option value="M">M (+5%)</option>
                        <option value="L">L (+10%)</option>
                        <option value="XL">XL (+20%)</option>
                    </select>
                </div>
            </div>
                <div class="flex items-center justify-between w-full pt-2 border-t border-gray-100">
                    <span class="price-display text-m font-bold text-gray-900">${elem.price} €</span>
                    <button type="button" class="btn-add bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded transition cursor-pointer" data-id="${id}">Ajouter</button>
                </div>
        </article>
    `
}).join('')

    productsContainer.className = containerClasses;
    productsContainer.innerHTML = cardsHtml;

    renderPagination();
}

export function renderPagination(){
    if(!paginationContainer){
        return;
    }

    const { currentPage, totalPages } = getPaginationData();

    paginationContainer.innerHTML = ``;

    if(totalPages <= 1){
        return;
    }

    let buttonHtml = `
        <div class="flex flex-wrap items-center justify-center gap-2">
            <button id="prev-page" class="px-3 py-1 border border-gray-200 shadow-sm rounded text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white hover:bg-gray-50'}" ${currentPage === 1 ? 'disabled': ''}>
                Precedent
            </buttom>
    `;

    for(let i=1; i<= totalPages; i++){
        const isActive = (i === currentPage);

        buttonHtml += `
            <button class="page-num px-3 py-1 border rounded-lg border-gray-200 shadow-sm text-sm ${isActive ? 'bg-red-600 text-white border-red-600' : 'bg-white hover:bg-gray-50'}" data-page="${i}">
                ${i}
            </button>
        `;
    }

    buttonHtml += `
            <button id="next-page" class="px-3 py-1 border rounded border-gray-200 shadow-sm text-sm ${currentPage === totalPages ? 'opacity-50 cursor-50 cursor-not-allowed bg-gray-100' : 'bg-white hover:bg-gray-50'}" ${currentPage === totalPages ? 'disabled' : ''}>
                Suivant
            </button>
        </div>
    `;

    paginationContainer.innerHTML = buttonHtml;

    paginationContainer.querySelectorAll('.page-num').forEach(btn =>{
        btn.addEventListener('click', (e) =>{
            setPage(Number(e.target.dataset.page));
            renderProducts();
        });
    });

    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    if(prevBtn){
        prevBtn.addEventListener('click', ()=>{
            setPage(currentPage-1);
            renderProducts();
        });
    }

    if(nextBtn){
        nextBtn.addEventListener('click', ()=>{
            setPage(currentPage+1);
            renderProducts();
        });
    }
}

export function toggleTheView(viewMode){
    viewCurr = viewMode;
    renderProducts();
}

export function renderCart(){
    const items = getCartItems();
    const {itemCount, totalPrice} = getCartTotals();

    const count = document.getElementById('cart-count');
    const total = document.getElementById('cart-total');
    const dialogCounter = document.getElementById('cart-dialog-count');
    const dialogTotal = document.getElementById('cart-dialog-total');
    const cartContainer = document.getElementById('cart-items');

    if(count){
        count.textContent = itemCount;
    }
    if(total){
        total.textContent = `${totalPrice} €`;
    }
    if(dialogCounter){
        dialogCounter.textContent = itemCount;
    }
     if(dialogTotal){
        dialogTotal.textContent = totalPrice;
    }
    if(!cartContainer)
        return

    if(items.length ===0){
        cartContainer.innerHTML = `<div class="flex h-full min-h-48 flex-col items-center justify-center text-center">Ajoutez un produit pour commencer.</div>`
        return;
    }

    cartContainer.innerHTML = items.map(item => `
            <article class="flex gap-3 rounded-xl border-gray-200 p-3">
                <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-50 p-2">
                    <img class="h-full object-contain" src="${item.image}">
                </div>
                <div class="min-w-0 flex-1">
                    <p class="text-[10px] font-bold uppercase tracking-wide text-red-600">${item.brand}</p>
                    <h3 class="mt-0.5 line-clamp-2 text-xs font-semibold text-gray-900">${ item.name || item.name_description || ''}</h3>
                    <p class="mt-1 text-xs text-gray-500">${item.size}</p>
                    <div class="mt-2 flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <button type="button" class="cart-quantity-btn h-7 w-7 rounded-md border-gray-200 text-sm" data-action="decrease" data-id="${item.productId}" data-size="${item.size}">-</button>
                            <span class="min-w-4 text-center text-xs font-semibold">${item.quantity}</span>
                            <button type="button" class="cart-quantity-btn h-7 w-7 rounded-md border-gray-200 text-sm" data-action="increase" data-id="${item.productId}" data-size="${item.size}" >+</button>
                        </div>
                        <button type="button" class="cart-remove text-xs font-meduim text-red-600 hover:text-red-700" data-id="${item.productId}" data-size="${item.size}">Supprimer</button>
                    </div>
                </div>
            </article>
        `).join('');

}

export function openCart(){
    const dialog = document.getElementById('cart-dialog');
    const backdrop = document.getElementById('cart-backdrop');

    if(!dialog || !backdrop)
        return;

    renderCart();
    backdrop.classList.remove('hidden');
    dialog.classList.remove('translate-x-full');
    document.body.classList.add('overflow-hidden');

    const closeCartBtn = document.getElementById('close-cart');
    if (closeCartBtn) {
        closeCartBtn.focus();
    }
}

export function closeCart(){
    const dialog = document.getElementById('cart-dialog');
    const backdrop = document.getElementById('cart-backdrop');

    if(!dialog || !backdrop)
        return;

    dialog.classList.add('translate-x-full');
    backdrop.classList.add('hidden');
    
    document.body.classList.remove('overflow-hidden')
}