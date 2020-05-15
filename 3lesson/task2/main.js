const button = document.getElementById('analyze');
const tbody = document.getElementById('tbody');
const form = document.getElementById('form');
let symbolsArray = [];

function readFile(){
    const input = document.getElementById('file');
    const file = input.files[0];
    const reader = new FileReader();
    if (!file) {
        form.classList.add('not-selected');
        alert('File is not selected!');
        return;
    }
    reader.onload = function () {
        form.classList.remove('not-selected');
        symbolsArray = []; // очистка массива
        const string = reader.result;
        symbols = [... new Set(string)];
        for (let i = 0; i < symbols.length; i++) {
            let count = 0;
            for (let j = 0; j < string.length; j++) {
                if (symbols[i] == string[j]) {
                    count++;
                }
            }
            let obj = {};
            obj.symbol = symbols[i];
            obj.count = count;
            symbolsArray.push(obj);
        }

        renderTable(symbolsArray.sort((a, b) => b.count - a.count));

    }
    reader.readAsText(file);
}

function renderTable(array) {
    tbody.innerHTML = '';
    array.forEach(symbol => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${symbol.symbol}</td> <td>${symbol.count}</td>`;
        tbody.appendChild(tr);
    });
}

button.addEventListener('click', function () {
    readFile();
});
