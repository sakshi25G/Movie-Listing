import React, { Component } from "react";
import _ from "lodash";
class Genres extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const genresMovieData = this.props.genresMovieData;
    return (
      <div className="col-sm-3 card">
        <header className="card-header">
          <h6 className="title">Genres </h6>
        </header>
        {genresMovieData.map((item, index) => {
          return (
            <div key={index} className="">
              <label className="form-check" />
              <input
                type="checkbox"
                id={item.id}
                value={item.name}
                onChange={this.props.checkBoxesCheck}
                className="badge-danger"
              />
              <span className="form-check-label">{item.name}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Genres;
