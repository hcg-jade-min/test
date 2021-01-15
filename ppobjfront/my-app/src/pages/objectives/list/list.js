import React  from "react";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import Cookies from 'browser-cookies';

const objective_api_uri = 'http://localhost:4000/api/v1/objectives'

class ObjectiveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objectives: [],
      isLogin: true
    }
  };

  componentDidMount() {
    let getObjectives = () => {
        axios({
          method:'get',
          url: objective_api_uri,
          withCredentials: true
        })
        .then(response => {
          console.log("response.data", response.data)
          let data = response.data
          let isLogin = Cookies.get('uid');
          if (isLogin === undefined || isLogin === null) {
            isLogin = null
          };
          this.setState({
            objectives: data,
            isLogin: isLogin
          })
          console.log("isLogin", isLogin)
        });
    }
    getObjectives();
  }

  logoutUser() {
    let username = Cookies.get('username');
    let password = Cookies.get('password');
    const data = {
      username,
      password,
    }

    axios({
      method:'post',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: "http://localhost:4000/api/v1/users/logout",
      withCredentials: true,
    })
    .then((response) => {
      console.log("response.data", response.data)
      Cookies.erase('uid');
      Cookies.erase('username');
      let isLogin = null
      this.setState({
        // username: response.data.username,
        // password: response.data.password,
        isLogin: isLogin
      })
      alert("로그아웃되었습니다.")
      console.log("isLogin", isLogin)
    })
    .catch((error) => {
      alert("로그아웃되었습니다!")
      return "Failed"
    })
  }
  //

  render() {
    const { objectives, isLogin } = this.state;
    let username = Cookies.get('username');

    if (isLogin === null) {
      return (
        <Redirect
          to={{
            pathname: '/users/login',
          }}
        />
      )
    } else {
      return (
        <div>
          {username} 님, 환영합니다! <button onClick={this.logoutUser}>로그아웃</button>
          <h1>목표 목록</h1>
          <Link to="/objectives/new">
            <button>목표 생성하기</button>
          </Link>
          <table>
            <thead>
              <tr>
                <th>목표 이름</th>
                <th>목표 시작일</th>
                <th>목표 마감일</th>
              </tr>
            </thead>
            <tbody>
            {objectives.map(objective =>
              <tr key={objective.id}>
                <td><Link to={"/objectives/"+objective.id}>{objective.objective_name}</Link></td>
                <td>{objective.started_on}</td>
                <td>{objective.ended_on}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      );
    }
  };
}

export default ObjectiveList;