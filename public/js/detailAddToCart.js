window.onload = () => {

    let card = document.querySelector('section.cajaProd-pDetail');
    
    let cartStorage = {}
    if (localStorage.getItem('carro')) {
        cartStorage = JSON.parse(localStorage.getItem('carro'))
    }
    
    card.addEventListener("click", function (e) {
        if (e.target.classList.contains('form-button')) {
            e.stopPropagation();
            e.preventDefault();
            let product = {};
            let nombre = this.querySelector('.nombreProd-pDetail').innerText;
            let discount = this.querySelector('.product-detail-price-discount').innerText;
            let priceField = this.querySelector('.product-detail-price').innerText;
            let priceRegex = /[0-9]/g;
            product.price = (priceField.match(priceRegex).join(""));
            product.name = nombre
            product.discount = discount.split(" ", 1)
            product.id = this.querySelector('#inputId').value;
            product.quantity = 1 
    
            if (cartStorage?.hasOwnProperty(product.id)) {
                product.quantity = cartStorage[product.id].quantity + 1;
            } 
    
            cartStorage[product.id] = {...product}  
    
            localStorage.setItem('carro', JSON.stringify(cartStorage))
    
        }
    })
    
    
    
    }