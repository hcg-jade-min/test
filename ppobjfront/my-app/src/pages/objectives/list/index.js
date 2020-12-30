import React from "react";
import axios from 'axios';
// import IndexList from "../../../containers/IndexList";

const api_uri = 'http://localhost:4000/api/v1/objectives'

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
          url: api_uri,
        })
        .then(response => {
          console.log(response.data)
          this.setState({data: response.data})
          console.log(this.state.data[0].id)
        });
    }

    getObjectives();

}

  render() {
    return (
      <div>
        <h1>{this.state.data.length == 0 ? 'abcabc' : this.state.data[0].name}</h1>
        {/* <h2>{this.this.state this.state.number}</h2> */}
      </div>
    );
  };
}

export default ObjectiveList;
