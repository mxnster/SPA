function loadData(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        callback(data);
    }
    xhr.send(null);
}

function renderInterface() {
    const container = document.getElementById('container');
    container.innerHTML = '';
    loadData(function (products) {
        products.forEach(product => {
            container.insertAdjacentHTML('beforeend', `
                <li class="cards">
               
                <div class="info">
                    <p class="name">${product.name}</p>
                    <p class="description">${product.description}</p>
                    <p class="stock">In stock: ${product.stock}</p>
                    <button type="button" class="btn btn-outline-primary" data-id="${product.id}">Add to cart</button>
                </div>
                <img src="${product.img}" width="auto" height="150px" alt="" class="img">
                    
                </li>`)
        });
    });

    let itemsCount = localStorage.getItem('itemsCount');
    let purchases = localStorage.purchases ? JSON.parse(localStorage.purchases) : [];

    const itemsCountLabel = document.getElementById('items-count');
    itemsCountLabel.innerText = itemsCount;
    container.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-id') && e.target.nodeName == "BUTTON") {
            itemsCount = localStorage.getItem('itemsCount');
            purchases = localStorage.purchases ? JSON.parse(localStorage.purchases) : [];
            itemsCount++;
            localStorage.setItem('itemsCount', itemsCount)
            itemsCountLabel.innerText = itemsCount;
            id = e.target.getAttribute('data-id');
            purchases.push(id);
            localStorage.setItem('purchases', JSON.stringify(purchases));
        }
    });

    const cart = document.getElementById('cart');
    const fade = document.getElementById('fade');
    cart.addEventListener('click', function () {
        fade.style.display = 'block';
        renderCart();

        const close = document.getElementById('close');
        close.addEventListener('click', function () {
            fade.style.display = 'none';
        });

        const clear = document.getElementById('clear');
        clear.addEventListener('click', function () {
            localStorage.clear();
            renderCart();
            itemsCountLabel.innerText = '';
        });
    });

    fade.addEventListener('click', function (e) {
        if (e.target.getAttribute('id') == "fade") {
            fade.style.display = 'none';
        }
    });

};

function renderCart() {
    const close = document.getElementById('close');
    const tbody = document.getElementById('tbody');
    const errorLine = document.getElementById('error');
    tbody.innerHTML = '';
    errorLine.innerHTML = '';
    close.addEventListener('click', function () {
        fade.style.display = 'none';
    });
    try {
        array = JSON.parse(localStorage.purchases);
        array.sort((a, b) => a - b);

        tbody.innerHTML = `<tr> <td>Name</td> <td>Count</td> </tr>`;
        loadData(function (products) {
            count = 1;
            for (let i = 0; i < array.length; i++) {

                if (array[i] == array[i + 1]) {
                    count++;
                }
                else if (array[i] != array[i + 1]) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<tr><td>${products[array[i] - 1].name}</td> <td>${count}</td></tr>`;
                    tbody.appendChild(tr);
                    count = 1;
                }

            }
        });
    } catch (error) {
        errorLine.innerHTML = `<p>Cart is empty</p>`;
        localStorage.clear();
    }
}

renderInterface();

