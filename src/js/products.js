
const products = document.getElementById('products');


export function initCatalog(productsArr){
    
    const div = document.createElement('div');
    
    productsArr.map(elem => {
        console.log(elem)

        div.innerHTML += `
            <div class="product border rounded-lg border-black">
                <p>${elem.name_description}</p>
                <p>${elem.price}</p>
            </div>
        `
    })
    products.appendChild(div);
}