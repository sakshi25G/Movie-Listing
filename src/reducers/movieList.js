const getMovieData = (state = {}, action) => {
  //console.log(action.payload);
  switch (action.type) {
    case "GET_MOVIE_LIST":
      return { ...state, items: action.payload.results };
    case "GET_GENRES_LIST":
      return { ...state, genres: action.payload.genres };
    default:
      return state;
  }
};

export default getMovieData;
