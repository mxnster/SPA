function render(data) {
    const ol = document.getElementById('ol');
    ol.innerHTML = "";

    data.forEach(job => {
        const desq = job.description.split('\n');
        ol.insertAdjacentHTML('beforeend', `
        <li class="container">
            <div class="data">
                <a href="${job.url}"><h3>${job.title}</h3></a>
                <p class="options">${job.location} - ${job.type}</p>
                <p>${desq[0]}</p>
                <p>${job.created_at}</p>
            </div>
            <div class="company">
                <img src="${job.company_logo}" width="100px" height="auto">
                <a href="${job.company_url}">${job.company}</a>
            </div>
        </li>`)

    });
}

function init() {
    const findButton = document.getElementById('find-button');
    findButton.addEventListener('click', function () {
        const description = document.getElementById('description').value;
        const location = document.getElementById('location').value;
        loadData(description, location);
    });

}

function loadData(description, location) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jobs.github.com/positions.json?description=${description}&location=${location}`, true);
    xhr.onload = () => {
        const vacancies = JSON.parse(xhr.responseText);
        render(vacancies);
    }
    xhr.send(null);
}

init();
