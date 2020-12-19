
const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const addMovieHandler = ()=>{
    const title = document.getElementById('title').value;
    const exName = document.getElementById('extra-name').value;
    const exValue = document.getElementById('extra-value').value;

    if(title.trim() ==='' ||
    exName.trim() ===''||
    exValue.trim() ===''){
        return;
    }
    const newMovie = {
        info: { 
            //getters and setters could be useful if you want to create readonly variable ny ommiting the setter
            //to add extra validation and to set default values
        set title (val){
            if(val.trim() ===''){
                this._title = 'DEFAULT';
                return;
            }
            this._title = val;
        },
        get title() {
            return this._title;
        },
            [exName] : exValue
        },
        id: Math.random(),
        getFormattedTitle: function(){
             return this.info.title.toUpperCase();
        }
    }

    newMovie.info.title = title; //setter
    console.log(newMovie.info.title); //getter

    movies.push(newMovie);
    renderMovies();
 
}
const renderMovies = (filter = '')=>{
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';
    if(movies.length === 0){
        movieList.classList.remove('visible')
    }
    else{
        movieList.classList.add('visible')
    }

    const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));


    filteredMovies.forEach(movie=>{
        const {info, ...rest} = movie;
       const { title: movieTitle } = info;
       const li =  document.createElement('li');
       let text = movieTitle + ' - ';
       for(const key in info){
           if(key !== 'title' && key !== '_title'){
               text = text +  ` ${key} : ${info[key]}`
           }
       }
       li.textContent = text;
       movieList.append(li);
    });

}
const searchMovieHandler = ()=>{
    console.log(this);
    const filterdTerm = document.getElementById('filter-title').value;
    renderMovies(filterdTerm)
}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);