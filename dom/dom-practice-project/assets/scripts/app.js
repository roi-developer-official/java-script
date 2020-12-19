const addMovieButton = document.querySelector('header button');
const addMovieModal = document.getElementById('add-modal');
const deleteModal = document.getElementById('delete-modal');
const backDrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive')
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const inputs = addMovieModal.getElementsByTagName('input');
const entrySection = document.getElementById('entry-text');


let title;
let imgUrl;
let rating;
const movies = [];
const root = document.getElementById('movie-list');


/* OverAll */
const updateUi = () => {
    if (movies.length === 0)
    entrySection.style.display = 'block'
    else {
        entrySection.style.display = 'none';
    }
}
const clearInputs = () => {
    for (let input of inputs) {
        input.value = ''
    }
}

/* data functionality */
const deleteMovie = (movieId) => {
    let index = 0;
    for (let movie of movies) {
        if (movie.id === movieId)
        break;
        index++;
    }
    movies.splice(index, 1);
    root.children[index].remove();
}
const cancelAddMovie = () => {
    closeMovieModal();
    clearInputs();
}


const renderNewMovieElement = (id, title, img, rating) => {
    const newMovie = document.createElement('li')
    newMovie.classList.add('movie-element');
    newMovie.innerHTML = `
    <div class="movie-element__image">
    <img src="${img}" alt="${title}" >
    </div>
    <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
    </div>`;
    newMovie.addEventListener('click', deleteMovieHandler.bind(null, id))
    root.appendChild(newMovie);
}


/* Show and Close Modals */
const closeMovieModal = () => {
    backDrop.classList.remove('visible');
    addMovieModal.classList.remove('visible');
    clearInputs();
}
const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackDrop();
}

const closeDeleteModal = () => {
    backDrop.classList.remove('visible');
    deleteModal.classList.remove('visible');
}
const showDeleteModal = () => {
    deleteModal.classList.add('visible');
    toggleBackDrop();
}
const toggleBackDrop = () => {
    backDrop.classList.toggle('visible')
}


/* Handlers */
const deleteMovieHandler = movieId => {
    const cancelBtn =  deleteModal.querySelector('.btn--passive');
    const confirmBtn = deleteModal.querySelector('.btn--danger');

    cancelBtn.onclick = closeDeleteModal;
    confirmBtn.onclick = ()=>{
        deleteMovie(movieId);
        closeDeleteModal();
    }
    showDeleteModal();
}

const backDropHandler = () => {
    closeMovieModal();
    closeDeleteModal();
}
const addMovieHandler = () => {
    title = inputs[0].value;
    imgUrl = inputs[1].value;
    rating = inputs[2].value;
    if (title.trim().length === '' ||
    imgUrl.trim() === '' ||
    rating.trim() === '' ||
    +rating < 1 ||
    +rating > 10
    ) {
        alert('enter valid information')
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title,
        image: imgUrl,
        rating
    }
    movies.push(newMovie);
    closeMovieModal();
    clearInputs();
    updateUi();
    renderNewMovieElement(newMovie.id, title, imgUrl, rating)
}



addMovieButton.addEventListener('click', showMovieModal);
backDrop.addEventListener('click', backDropHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovie);
confirmAddMovieButton.addEventListener('click', addMovieHandler)





