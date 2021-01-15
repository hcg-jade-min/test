import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Cookies from 'browser-cookies'

const user_api_uri = "http://localhost:4000/api/v1/users"

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLogin: null
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.loginUser = this.loginUser.bind(this)
  };

  handleFormSubmit(e) {
    e.preventDefault()
    this.loginUser()
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  loginUser() {
    const { username, password } = this.state;
    const data = {
      username,
      password,
    }

    axios({
      method:'post',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: `${user_api_uri}/login`,
      withCredentials: true,
    })
    .then((response) => {
      console.log("response.data", response.data)
      let isLogin = Cookies.get('uid');
      if (isLogin !== null) {
        isLogin = true
      };
      this.setState({
        username: response.data.username,
        password: response.data.password,
        isLogin: isLogin
      })
      alert("로그인 성공!")
    })
    .catch((error) => {
      alert("로그인 실패: 아이디 혹은 비밀번호를 다시 확인해주세요")
      return "Failed"
    })
  }

  render() {
    return (
      <div>
          <h1>로그인 하기</h1>
          <form onSubmit={this.handleFormSubmit}>
            ID : <input type="text" name="username" value={this.state.username} onChange={this.handleValueChange} /><br />
            PW : <input type="password" name="password" value={this.state.password} onChange={this.handleValueChange} /><br />
            <input type="submit" value="로그인" />
          </form>
          <Link to="/users/signup">회원 가입하기</Link><br />
          <Link to="/">목표 목록으로</Link>
      </div>
    );
  };
}

export default UserLogin;
