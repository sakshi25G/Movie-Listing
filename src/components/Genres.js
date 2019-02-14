import React, { Component } from "react";
import _ from "lodash";
class Genres extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const genresMovieData = this.props.genresMovieData;
    return (
      <>
        {genresMovieData.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <input
                type="checkbox"
                id={item.id}
                value={item.name}
                onChange={this.props.checkBoxesCheck}
                className=""
              />
              {item.name}
            </React.Fragment>
          );
        })}
      </>
    );
  }
}

export default Genres;
