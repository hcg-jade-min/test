import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const api_uri = 'http://localhost:4000/api/v1/objectives'

class ObjectiveNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      started_on: "",
      ended_on: "",
      status: "",
      achievement: ""
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
    const { name, description, started_on, ended_on, status, achievement } = this.state;
    const data = {
      objective: {
        name,
        description,
        started_on,
        ended_on,
        status,
        achievement
      }
    }

    axios({
      method:'post',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: api_uri,
    })
    .then((response) => {
      console.log("됐나")
      console.log(response.data)
      this.setState({
        name: response.data.name,
        description: response.data.description,
        started_on: response.data.started_on,
        ended_on: response.data.ended_on,
        status: response.data.status,
        achievement: response.data.achievement
      })
    })
    .catch((error) => {
      console.log("안됐네")
      return "Failed"
    })
  }

  render() {
    return (
      <div>
        <h1>목표 생성하기</h1>
        <form onSubmit={this.handleFormSubmit}>
          목표명 : <input type="text" name="name" value={this.state.name} onChange={this.handleValueChange}></input><br></br>
          목표설명 : <input type="text" name="description"  value={this.state.description} onChange={this.handleValueChange}></input><br></br>
          목표 시작일 : <input type="date" name="started_on"  value={this.state.started_on} onChange={this.handleValueChange}></input><br></br>
          목표 마감일 : <input type="date" name="ended_on"  value={this.state.ended_on} onChange={this.handleValueChange}></input><br></br>
          status : <input type="text" name="status"  value={this.state.status} onChange={this.handleValueChange}></input><br></br>
          achievement : <input type="text" name="achievement"  value={this.state.achievement} onChange={this.handleValueChange}></input><br></br>
          <input type="submit" value="목표 생성하기"></input>
        </form>
        <Link to="/objectives">목표 목록</Link>
      </div>
    );
  };
}

export default ObjectiveNew;
