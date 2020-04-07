const onDataLoaded = (text) => {
    const lines = text.split('\n');
    const names = lines.shift().trim().split(', ');
    const items = lines.map(line => {
        const splitted = line.split(', ');
        const object = splitted.reduce((result, value, index) => ({
            ...result,
            [names[index]]: value
        }), {});
        return object;
    });

    const thead = document.getElementById('thead');
    const trHeader = document.createElement('tr');
    for (let i = 0; i < names.length; i++) {
        trHeader.insertAdjacentHTML('beforeend', `<th id="${names[i]}">${names[i]}</th>`);
    }
    thead.appendChild(trHeader);

    const tbody = document.getElementById('tbody');
    const render = () => {
        tbody.innerHTML = "";

        items.forEach((item) => {
            tbody.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${item.Name}</td>
                <td>${item.Age}</td>
                <td>${item.Position}</td>
                <td>${item.Salary}</td>
                <td>${item.Supervisor}</td>
            </tr>
        `);
        });

    };
    let sortCounter = 0;
    //"умная" сортировка, которая учитывает содержимое
    thead.addEventListener('click', function (e) {
        let field = e.target.getAttribute('id');
        let test = items[0][field];
        if (e.target.nodeName == "TH" && sortCounter === 0) {
            if (isNaN(Number(test))) {
                items.sort((a, b) => a[field] < b[field] ? 1 : -1);
                sortCounter = 1;
            }
            else {
                items.sort((a, b) => a[field] - b[field]);
                sortCounter = 1;
            }
            render();
        }
        else if (e.target.nodeName == "TH" && sortCounter === 1) {
            if (isNaN(Number(test))) {
                items.sort((a, b) => b[field] < a[field] ? 1 : -1);
                sortCounter = 0;
            }
            else {
                items.sort((a, b) => b[field] - a[field]);
                sortCounter = 0;
            }
            render();
        };
    });
    render();
}

const xhr = new XMLHttpRequest();
xhr.open('GET', 'data.csv', true);
xhr.onload = () => {
    onDataLoaded(xhr.responseText);
}
xhr.send(null);
