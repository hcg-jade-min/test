import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const objective_api_uri = 'http://localhost:4000/api/v1/users'

class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.createUser = this.createUser.bind(this)
  };

  handleFormSubmit(e) {
    e.preventDefault()
    this.createUser()
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  createUser() {
    const { username, password } = this.state;
    const data = {
      user: {
        username,
        password
      }
    }

    axios({
      method:'post',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: objective_api_uri,
      withCredentials: true
    })
    .then((response) => {
      console.log("됐나")
      console.log(response.data)
      this.setState({
        username: response.data.username,
        password: response.data.password,
      })
      alert('회원가입이 정상적으로 되었습니다.')
    })
    .catch((error) => {
      console.log("안됐네")
      return "Failed"
    })
  }


  render() {
    return (
      <div>
          <h1>회원 가입 하기</h1>
          <form onSubmit={this.handleFormSubmit}>
            ID : <input type="text" name="username" value={this.state.username} onChange={this.handleValueChange} /><br />
            PW : <input type="password" name="password" value={this.state.password} onChange={this.handleValueChange} /><br />
            <input type="submit" value="회원가입하기" />
          </form>
          <Link to="/users/login">로그인하기</Link>
      </div>
    );
  };
}

export default UserCreate;
