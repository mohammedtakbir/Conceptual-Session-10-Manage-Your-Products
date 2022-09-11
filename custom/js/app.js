getInput = (id) => {
    const inputField = document.getElementById(id);
    const inputValue = inputField.value;
    inputField.value = '';
    return inputValue;
}
addProduct = () => {
    const productName = getInput('product-name');
    const productQuantity = getInput('product-quantity');

    const convertToNumber = Number(productQuantity);
    if(!isNaN(productName) || !Number.isInteger(convertToNumber)){
        console.warn('wrong input');
        return;
    } 
    setToLocalStorage(productName, productQuantity);
    display();
}

getFromLocalStorage = () => {
    const products = localStorage.getItem('all_products');
    const parseProducts = JSON.parse(products);
    return parseProducts;
} 
setToLocalStorage = (name, quantity) => {
    let products = getFromLocalStorage();
    if(!products){
        products = {};
    }
    products[name] = quantity;
    const stringified = JSON.stringify(products);
    localStorage.setItem('all_products', stringified);
}
display = () => {
    const products = getFromLocalStorage();
    
    const productsContainer = document.getElementById('all-products');
    productsContainer.textContent = '';
    for(const product in products){
        const quantity = products[product];
        
        const div = document.createElement('div');
        div.classList.add('shadow-sm', 'p-3', 'bg-body', 'rounded', 'mb-2')
        div.innerHTML=`
        <span class="fs-3">${product}</span> <span class="fs-5">Quantity:</span> <small class="fw-bold">${quantity}</small>
    `; 
        productsContainer.appendChild(div);
    }
}
display();