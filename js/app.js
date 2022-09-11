const inputValue = (id) => {
    const input = document.getElementById(id);
    const value = input.value;
    input.value = '';
    return value;
}
const addProduct = () => {
    const product_name = inputValue('product-name');
    const product_quantity = inputValue('product-quantity');
    //* for empty input
    if(product_name === '' || product_quantity === ''){
        console.warn('empty input');
        return;
    };
    const number = Number(product_quantity);
    if(!isNaN(product_name) || !number){
        console.warn('wrong input!');
        return;
    };
    setProductInLocalstorage(product_name, product_quantity);
    // getLocalStorageData();
    console.table(getLocalStorageData())
    display();
    // window.location.reload(); //! not a good a idea
}

const getLocalStorageData = () => {
    const products = localStorage.getItem('all_products');
    const parseProducts = JSON.parse(products);
    return parseProducts;
}

const setProductInLocalstorage = (name, quantity) => {
    let products = getLocalStorageData();
    // console.log(products)
    if(!products){
        products = {};
    }

    if(products[name]){
        products[name] = parseInt(products[name]) + parseInt(quantity);
    }else{
        products[name] = quantity;
    }    
    localStorage.setItem('all_products', JSON.stringify(products));
}
// setProductInLocalstorage();

const display = () => {
    const products = getLocalStorageData();
    console.log(products)
    const section = document.getElementById('all-products');
    section.textContent = '';
    for(const product in products){
        const quantity = products[product];
        const div = document.createElement('div');
        div.classList.add('shadow-sm', 'p-3', 'mb-2', 'bg-body', 'rounded');
        div.innerHTML = `
            <span class="fs-3">${product}</span> : <span class="fs-5">Quantity</span> <small class="fw-bold">${quantity}</small>
        `;
        section.appendChild(div)
    }
}
display()