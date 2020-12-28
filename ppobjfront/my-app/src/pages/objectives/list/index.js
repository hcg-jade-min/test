import React from "react";
import axios from 'axios';
// import IndexList from "../../../containers/IndexList";

class ObjectiveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  };

  componentDidMount() {
    let getObjectives = () => {
        axios({
          method:'get',
          url:'http://localhost:4000/api/v1/objectives',
        })
        .then(response => {
          console.log(response.data)
          this.setState({data: response.data})
          console.log(this.state.data[0].id)
        });
    }

    getObjectives();

}

  handleIncreaseButtonClick() {
    const number = this.state.number + 1;
    this.setState({number: number})
  }

  handleDecreaseButtonClick() {
    const number = this.state.number - 1;
    this.setState({number: number})
  }

  handleMultiplyButtonClick() {
    const number = this.state.number * 2;
    this.setState({number: number})
  }

  handleResetButtonClick() {
    const reset_number = 0
    const number = reset_number;
    this.setState({number: number})
  }

  render() {
    return (
      <div>
        <h1>{this.state.data.length == 0 ? 'abcabc' : this.state.data[0].name}</h1>
        {/* <h2>{this.this.state this.state.number}</h2> */}
        <button onClick={() => this.handleIncreaseButtonClick()}>Increase</button>
        <button onClick={() => this.handleDecreaseButtonClick()}>Decrease</button>
        <button onClick={() => this.handleMultiplyButtonClick()}>Multiply</button>
        <button onClick={() => this.handleResetButtonClick()}>Reset</button>
      </div>
    );
  };
}

export default ObjectiveList;
