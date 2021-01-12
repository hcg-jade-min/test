import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const objective_api_uri = 'http://localhost:4000/api/v1/objectives/'

class KrNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kr_name: "",
      kr_description: "",
      kr_manage_style: "",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.createKeyResult = this.createKeyResult.bind(this)
  };

  handleFormSubmit(e) {
    e.preventDefault()
    this.createKeyResult()
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  createKeyResult() {
    const { objective_id } = this.props.match.params
    const { kr_name, kr_description, kr_manage_style } = this.state;

    const data = {
      key_result: {
        kr_name,
        kr_description,
        kr_manage_style
      }
    }

    axios({
      method:'post',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: `${objective_api_uri}/${objective_id}/key_results`,
    })
    .then((response) => {
      console.log("됐나")
      console.log(response.data)
      this.setState({
        kr_name: response.data.kr_name,
        kr_description: response.data.kr_description,
        kr_manage_style: response.data.kr_manage_style
      })
    })
    .catch((error) => {
      console.log("안됐네")
      return "Failed"
    })
  }

  render() {
    const { objective_id } = this.props.match.params

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <h2>핵심 성과 생성하기</h2>
            핵심성과명 : <input type="text" name="kr_name" value={this.state.kr_name} onChange={this.handleValueChange} /><br />
            핵심성과설명 : <input type="text" name="kr_description"  value={this.state.kr_description} onChange={this.handleValueChange} /><br />
            관리방식 : <input type="text" name="kr_manage_style"  value={this.state.kr_manage_style} onChange={this.handleValueChange} /><br />
          <input type="submit" value="핵심 성과 생성하기"></input>
        </form>
        <Link to={"/objectives/"+objective_id}>해당 목표로 돌아가기</Link>
      </div>
    );
  };
}

export default KrNew;
