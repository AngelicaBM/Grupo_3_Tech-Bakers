window.onload = function() {

let tableBody = document.querySelector('.menu-carro tbody');
let cartProducts = localStorage.getItem('carro');
let total = document.querySelector(".total-price p");
let subtotal = document.querySelector(".subtotal p");
let discount = document.querySelector(".total-discount p");

let totalPre = 0;
let totalSub = 0;
let totalDis = 0;

if (cartProducts) {
    for (product of Object.values(JSON.parse(cartProducts))) {
        let row = `
            <tr>
                <td class="cart-table-name">${product.name}</td>
                <td class="cart-table-price">$ ${product.price}</td>
                <td class="cart-table-quantity"><input type="number" class="product-quantity" name="${product.id}" value="${product.quantity}"></td>
                <td class="cart-table-total">$ ${(product.price * ((100 - product.discount) / 100)) * product.quantity}</td>
                <td class="cart-table-discountt">${product.discount}</td>
                <td class="cart-table-delete"><a class="delete" title="${product.id}" href="javascript:void(0)"><i class="far fa-trash-alt"></i></a></td>
            </tr>
        `;

        tableBody.innerHTML += row;

        totalPre += (product.price * ((100 - product.discount) / 100)) * product.quantity;
        totalSub += product.price * product.quantity;
        totalDis += product.price * (product.discount/100) * product.quantity

    }

    total.innerText = `Precio total : $ ${totalPre}`
    subtotal.innerText = `Subtotal     : $ ${totalSub}`
    discount.innerText = `Descuento    : $ ${totalDis}`

    let inputsProductQuantity = document.querySelectorAll('.product-quantity');
        inputsProductQuantity.forEach( input => {
            input.addEventListener('change', function (e) {
                let product = {}
                let productId = this.getAttribute('name');
                let products = JSON.parse(cartProducts);
                product = { ...products[+productId] };
                product.quantity = this.value;

                if (this.value < 0) {

                    this.value = 0

                } else {

                    products[product.id] = {...product}
                    
                    localStorage.setItem('carro', JSON.stringify(products))
                    let totalElement = e.target.parentElement.nextElementSibling;
                    totalElement.innerText =`$ ${(product.price * ((100 - product.discount) / 100)) * product.quantity}`
    
                    let sum = 0;
                    let sub = 0;
                    let dis = 0;

                    for (product of Object.values(products)) {
                        sum += (product.price * ((100 - product.discount) / 100)) * product.quantity;
                        sub += product.price * product.quantity;
                        dis += product.price * (product.discount/100) * product.quantity
                    };
                    total.innerText = `Precio total : $ ${sum}`
                    subtotal.innerText = `Subtotal     : $ ${sub}`
                    discount.innerText = `Descuento    : $ ${dis}`

                }
        
            })
        }) 

        let garbageBins = document.querySelectorAll('.delete');
        for (bin of garbageBins) {
            bin.addEventListener('click', function (e) {
                let productId = this.getAttribute("title")
                let products = JSON.parse(localStorage.getItem('carro'));
                delete products[productId];
                localStorage.setItem('carro', JSON.stringify(products));
                location.reload();
            })
        }
    }



};

