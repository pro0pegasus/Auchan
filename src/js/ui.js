import {getPaginatedProducts, filtrerProducts, setPage, getPaginationData} from './products.js'

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
        <div class="product-card border rounded-lg border-gray-200 p-4 shadow-sm bg-white hover:shadow-md transition flex cursor-grab ${viewCurr === 'list' ? 'flex-row items-center gap-2' : 'flex-col justify-between'}" draggable = "true" data-id="${id}">
            
            <img src=${elem.image} class="${viewCurr === 'list' ? 'w-24 h-24 object-contain' : 'w-full h-44 object-contain mb-3'} pointer-events-none"/>
            
            <div class="flex-1 w-full">
                    <span class="text-xs text-blue-600 font-semibold uppercase">${elem.brand}</span>
                    <h3 class="font-meduim text-sm text-gray-800 line-clamp-2 my-1">${elem.name_description}</h3>
                    <p class="text-xs text-gray-500 mb-2">${elem.data}</p>
                
            
                <div class="flex items-center gap-2 my-2 text-xs">
                    <label class="">Taile :</label>
                    <selec class="size-select border border-gray-300 rounded px-1.5 py-0.5 data-base-price="${elem.price}">
                        <option value="S">S</option>
                        <option value="M">M (+5%)</option>
                        <option value="L">L (+10%)</option>
                        <option value="XL">XL (+20%)</option>
                    </select>
                </div>
            </div>
                <div class="flex items-center justify-between w-full pt-2 border-t border-gray-100">
                    <span class="price-display text-m font-bold text-gray-900">${elem.price} €</span>
                    <button class="btn-add bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded transition" data-id="${id}">Ajouter</button>
                </div>
        </div>
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
            <button id="prev-page" class="px-3 py-1 border rounded text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white hover:bg-gray-50'}" ${currentPage === 1 ? 'disabled': ''}>
                Precedent
            </buttom>
    `;

    for(let i=1; i<= totalPages; i++){
        const isActive = (i === currentPage);

        buttonHtml += `
            <button class="page-num px-3 py-1 border rounded-lg text-sm ${isActive ? 'bg-red-600 text-white border-red-600' : 'bg-white hover:bg-gray-50'}" data-page="${i}">
                ${i}
            </button>
        `;
    }

    buttonHtml += `
            <button id="next-page" class="px-3 py-1 border rounded text-sm ${currentPage === totalPages ? 'opacity-50 cursor-50 cursor-not-allowed bg-gray-100' : 'bg-white hover:bg-gray-50'}" ${currentPage === totalPages ? 'disabled' : ''}>
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

