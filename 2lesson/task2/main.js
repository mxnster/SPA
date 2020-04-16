function renderList() {
    const container = document.getElementById('container');
    loadData('data/main.json', function (networks) {
        networks.forEach(network => {
            container.insertAdjacentHTML("beforeend", `
          <li id="${network.id}" class="network">${network.name}</li>
          `)

        });
    });

    const nestedUl = document.createElement('ul');
    container.addEventListener('click', function (e) {
        let square = 0;
        let count = 0;
        let avgSquare;
        let visitors = 0;
        if (e.target.tagName == 'LI') {
            let id = e.target.getAttribute('id');
            const nestedLi = document.getElementById(`${id}`);
            nestedUl.innerHTML = "";
            loadData(`data/${id}.json`, function (shops) {
                shops.forEach(shop => {
                    nestedUl.insertAdjacentHTML("beforeend",
                        `
                        <li class="shop">${shop.address}</li>
                    `)
                    square += shop.square;
                    count++;
                    avgSquare = (square / count).toFixed(0);
                    visitors += shop.avgAmountClients;
                }
                );
                nestedUl.insertAdjacentHTML("beforeend", `
                    <div> Кол-во магазинов: ${count}, общая площадь: ${square},</div>
                    <div> средняя площадь: ${avgSquare}, сумарное число посетителей: ${visitors} </div>
                `)
            });
            nestedLi.appendChild(nestedUl);
        };

    });
}

function loadData(path, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        callback(data);
    }
    xhr.send(null);
}

renderList();