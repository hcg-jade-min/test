import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const objective_api_uri = 'http://localhost:4000/api/v1/objectives'

class ObjectiveNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objective_name: "",
      objective_description: "",
      started_on: "",
      ended_on: "",
      kr_name: "",
      kr_description: "",
      kr_manage_style: "",
      username1: "",
      username2: ""
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.createObjective = this.createObjective.bind(this)
  };

  handleFormSubmit(e) {
    e.preventDefault()
    this.createObjective()
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  createObjective() {
    const { objective_name, objective_description, started_on, ended_on, kr_name, kr_description, kr_manage_style, username1, username2 } = this.state;
    const data = {
      objective: {
        objective_name,
        objective_description,
        started_on,
        ended_on
      },
      key_result: {
        kr_name,
        kr_description,
        kr_manage_style
      },
      username1,
      username2
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
        objective_name: response.data.objective_name,
        objective_description: response.data.objective_description,
        started_on: response.data.started_on,
        ended_on: response.data.ended_on,
        kr_name: response.data.kr_name,
        kr_description: response.data.kr_description,
        kr_manage_style: response.data.kr_manage_style,
        username1: response.data.username1,
        username2: response.data.username2
      })
      alert('목표가 생성되었습니다')
    })
    .catch((error) => {
      console.log("안됐네")
      return "Failed"
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <h2>목표</h2>
            목표명 : <input type="text" name="objective_name" value={this.state.objective_name} onChange={this.handleValueChange} /><br />
            목표설명 : <input type="text" name="objective_description"  value={this.state.objective_description} onChange={this.handleValueChange} /><br />
            목표 시작일 : <input type="date" name="started_on"  value={this.state.started_on} onChange={this.handleValueChange} /><br />
            목표 마감일 : <input type="date" name="ended_on"  value={this.state.ended_on} onChange={this.handleValueChange} /><br />
          <h2>핵심 성과 생성하기</h2>
            핵심성과명 : <input type="text" name="kr_name" value={this.state.kr_name} onChange={this.handleValueChange} /><br />
            핵심성과설명 : <input type="text" name="kr_description"  value={this.state.kr_description} onChange={this.handleValueChange} /><br />
            관리방식 : <input type="text" name="kr_manage_style"  value={this.state.kr_manage_style} onChange={this.handleValueChange} /><br />
          <h2>관련 구성원</h2>
            담당자 : <input type="text" name="username1" value={this.state.username1} onChange={this.handleValueChange} /><br />
            관리자 : <input type="text" name="username2" value={this.state.username2} onChange={this.handleValueChange} /><br />
          <input type="submit" value="목표 생성하기"></input>
        </form>
        <Link to="/">목표 목록</Link>
      </div>
    );
  };
}

export default ObjectiveNew;
