import React, { Component } from "react";
import * as actions from "../actions/index";
import { connect } from "react-redux";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import "./movieList.scss";
import Genres from "./Genres";
class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenres: [],
      movieData: props.movieData
    };
  }

  componentDidMount() {
    const handleSuccess = response => {
      this.setState({
        movieData: _.orderBy(response.results, ["popularity"], ["desc"])
      });
    };
    this.props.getMovieLists(handleSuccess);
    this.props.getGenresList();
    //console.log(this.props);
  }

  filterGenres = genreIds => {
    const { genresMovieData } = this.props;
    let genereName = [];
    for (const genreId of genreIds) {
      for (const genre of genresMovieData) {
        if (genreId === genre.id) {
          genereName.push(genre.name);
        }
      }
    }
    return genereName;
  };

  compareGenre = genres => {
    const { selectedGenres } = this.state;
    let isAvailable = false;
    for (const item of selectedGenres) {
      isAvailable = _.includes(genres, item);
      if (!isAvailable) {
        break;
      }
    }
    return isAvailable;
  };

  checkBoxesCheck = e => {
    const { movieData } = this.props;
    const genreId = _.toNumber(e.target.id);
    if (e.target.checked) {
      this.setState(
        prevState => ({
          selectedGenres: prevState.selectedGenres.concat(genreId)
        }),
        () => {
          const filteredGenres = movieData.filter(item =>
            this.compareGenre(item.genre_ids)
          );
          this.setState({
            movieData: filteredGenres
          });
        }
      );
    } else {
      let { selectedGenres } = this.state;
      _.remove(selectedGenres, genre => genre === genreId);
      this.setState(
        {
          selectedGenres
        },
        () => {
          if (!_.isEmpty(selectedGenres)) {
            const filteredGenres = movieData.filter(item =>
              this.compareGenre(item.genre_ids)
            );
            this.setState({
              movieData: filteredGenres
            });
          } else {
            this.setState({
              movieData
            });
          }
        }
      );
    }
  };

  filterByRatings = () => {
    const { movieData } = this.props;
    const ratingToBeFiltered = this.ratingInput.value;
    const filteredGenres = movieData.filter(
      item => item.vote_average >= ratingToBeFiltered
    );
    this.setState({
      movieData: filteredGenres
    });
  };

  render() {
    const { genresMovieData } = this.props;
    const { selectedGenres, movieData } = this.state;

    return (
      <>
        <div className="col-sm-7">
          <header className="card-header">
            <h6 className="title">Movie List </h6>
          </header>
          {!_.isEmpty(movieData) && !_.isEmpty(genresMovieData) ? (
            movieData.map((item, index) => {
              const genres = this.filterGenres(item.genre_ids, genresMovieData);
              return (
                <React.Fragment key={index}>
                  <div className={"card"}>
                    <img
                      alt=""
                      className="poster-img"
                      src={`http://image.tmdb.org/t/p/w500${item.poster_path}`}
                    />
                    <p> Title: {item.title} </p>
                    <p> Genres: {genres.join(", ")} </p>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <p>No movie available.</p>
          )}
        </div>
        {!_.isEmpty(genresMovieData) && (
          <Genres
            genresMovieData={genresMovieData}
            checkBoxesCheck={this.checkBoxesCheck}
          />
        )}
        <div className="col-sm-2 card">
          <header className="card-header">
            <h6 className="title">Ratings </h6>
          </header>
          <input
            ref={ref => {
              this.ratingInput = ref;
            }}
            type="number"
            min="0"
            max="10"
            step="0.5"
            placeholder="0"
            onChange={this.filterByRatings}
          />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    movieData: _.orderBy(state.getMovieData.items, ["popularity"], ["desc"]),
    genresMovieData: state.getMovieData.genres
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMovieLists: data => dispatch(actions.getMovies(data)),
    getGenresList: data => dispatch(actions.getGenres(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
