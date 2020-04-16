const container = document.getElementById('container');
const discription = document.getElementById('discription');
container.addEventListener('click', function (e) {
    if (e.target.tagName == 'BUTTON') {
        let id = e.target.getAttribute('id');
        discription.style.display = 'flex';
        discription.innerText = 'Loading...';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `data/${id}.txt`, true);
        xhr.onload = () => {
            discription.innerText = xhr.responseText;
        }
        xhr.send(null);
    }
});

