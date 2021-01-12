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
      kr_manage_style: ""
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
    const { objective_name, objective_description, started_on, ended_on } = this.state;
    const data = {
      objective: {
        objective_name,
        objective_description,
        started_on,
        ended_on
      }
    }

    axios({
      method:'post',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: objective_api_uri,
    })
    .then((response) => {
      console.log("됐나")
      console.log(response.data)
      this.setState({
        objective_name: response.data.objective_name,
        objective_description: response.data.objective_description,
        started_on: response.data.started_on,
        ended_on: response.data.ended_on
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
        <form onSubmit={this.handleFormSubmit}>
          <h2>목표</h2>
            목표명 : <input type="text" name="objective_name" value={this.state.objective_name} onChange={this.handleValueChange} /><br />
            목표설명 : <input type="text" name="objective_description"  value={this.state.objective_description} onChange={this.handleValueChange} /><br />
            목표 시작일 : <input type="date" name="started_on"  value={this.state.started_on} onChange={this.handleValueChange} /><br />
            목표 마감일 : <input type="date" name="ended_on"  value={this.state.ended_on} onChange={this.handleValueChange} /><br />
          <input type="submit" value="목표 생성하기"></input>
        </form>
        <Link to="/objectives">목표 목록</Link>
      </div>
    );
  };
}

export default ObjectiveNew;
