import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const objective_api_uri = 'http://localhost:4000/api/v1/objectives'

class ObjectiveEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objective: {
        objective_name: "",
        objective_description: "",
        started_on: "",
        ended_on: "",
        objective_status: ""
      }
    }
    // console.log("this.props", this.props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.updateObjective = this.updateObjective.bind(this)
  };

  handleFormSubmit(e) {
    e.preventDefault()
    this.updateObjective()
  }

  handleValueChange(e) {
    const { objective } = this.state;
    this.setState({
      objective: {
        ...objective,
        [e.target.name] : e.target.value
      }
    });
  }

  updateObjective() {
    const { objective } = this.state;
    const data = {
      objective
    }
    axios({
      method:'put',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: `${objective_api_uri}/${objective.id}`
    })
    .then((response) => {
      console.log("됐나")
      console.log(response.data)
    })
    .catch((error) => {
      console.log("안됐네")
      return "Failed"
    })
  }

  componentDidMount() {
    // console.log(this.props); // 콘솔에서 출력되는 걸 보면 this.props 에 match > params 를 확인할 수 있다
    const { objective_id } = this.props.match.params

    let getObjective = () => {
      axios({
        method:'get',
        url: `${objective_api_uri}/${objective_id}`
      })
      .then(response => {
        console.log("response.data", response.data)
        this.setState({
          objective: response.data
        })
      });
    }
    getObjective();
  }

  render() {
    const { objective } = this.state;

    return (
      <div>
        <h1>목표 수정하기</h1>
        <form onSubmit={this.handleFormSubmit}>
          목표명 : <input type="text" name="objective_name" value={objective.objective_name} onChange={this.handleValueChange} /><br></br>
          목표설명 : <input type="text" name="objective_description"  value={objective.objective_description} onChange={this.handleValueChange} /><br />
          목표 시작일 : <input type="date" name="started_on"  value={objective.started_on} onChange={this.handleValueChange} /><br />
          목표 마감일 : <input type="date" name="ended_on" value={objective.ended_on} onChange={this.handleValueChange} /><br />
          <input type="submit" value="목표 수정하기" />
        </form>
        <Link to="/objectives">목표 목록</Link>
      </div>
    );
  };
}

export default ObjectiveEdit;