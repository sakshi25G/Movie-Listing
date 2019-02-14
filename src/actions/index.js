export const getMovieLists = response => ({
  type: "GET_MOVIE_LIST",
  payload: response
});

export const getGenresList = response => ({
  type: "GET_GENRES_LIST",
  payload: response
});

export const getMovies = handleSuccess => {
  return dispatch => {
    return fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=5cbba6421e09cfc001edd0842cac8fd9&language=en-US&page=1"
    )
      .then(response => response.json())
      .then(response => {
        dispatch(getMovieLists(response));
        handleSuccess(response);
      });
  };
};

export const getGenres = () => {
  return dispatch => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=5cbba6421e09cfc001edd0842cac8fd9&language=en-US"
    )
      .then(response => response.json())
      .then(response => dispatch(getGenresList(response)));
  };
};
