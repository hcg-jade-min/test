import React from "react";
import axios from 'axios';
// import IndexList from "../../../containers/IndexList";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  };

  componentDidMount() {
    let getUsers = () => {
        axios({
          method:'get',
          url:'http://localhost:4000/api/v1/users',
        })
        .then(response => {
          console.log(response.data)
          this.setState({data: response.data})
          console.log(this.state.data[0].id)
        });
    }

    getUsers();

}

  render() {
    return (
      <div>
          <h1>locallhost:3000/users</h1>
          <form action="http://localhost:4000/api/v1/users/login" method="POST">
            ID : <input type="text"></input><br></br>
            PW : <input type="password"></input><br></br>
            <input type="submit" value="Login"></input>
          </form>
        <h1>{this.state.data.length == 0 ? 'abcabc' : this.state.data[0].name}</h1>
        {/* <h2>{this.this.state this.state.number}</h2> */}
      </div>
    );
  };
}

export default UserList;
