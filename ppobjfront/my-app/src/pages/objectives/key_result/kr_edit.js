import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const objective_api_uri = 'http://localhost:4000/api/v1/objectives'

class KrEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key_result: {
        kr_name: "",
        kr_description: "",
        kr_achievement: ""
      }
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.updateKeyResult = this.updateKeyResult.bind(this)
  };

  handleFormSubmit(e) {
    e.preventDefault()
    this.updateKeyResult()
  }

  handleValueChange(e) {
    const { key_result } = this.state;
    this.setState({
      key_result: {
        ...key_result,
        [e.target.name] : e.target.value
      }
    });
  }

  updateKeyResult() {
    const { objective_id } = this.props.match.params
    const { key_result_id } = this.props.match.params
    
    const { key_result } = this.state;
    const data = {
      key_result
    }
    axios({
      method:'put',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: `${objective_api_uri}/${objective_id}/key_results/${key_result_id}`
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
    const { key_result_id } = this.props.match.params

    let getKeyResult = () => {
      axios({
        method:'get',
        url: `${objective_api_uri}/${objective_id}/key_results/${key_result_id}`
      })
      .then(response => {
        console.log("getKeyResult response.data", response.data)
        this.setState({
          key_result: response.data
        })
      });
    }
    getKeyResult();
  }

  render() {
    const { objective_id } = this.props.match.params
    const { key_result } = this.state;

    return (
      <div>
        <h2>핵심 성과 수정하기</h2>
        <form onSubmit={this.handleFormSubmit}>
            핵심성과명 : <input type="text" name="kr_name" value={key_result.kr_name} onChange={this.handleValueChange} /><br />
            핵심성과 설명 : <input type="text" name="kr_description"  value={key_result.kr_description} onChange={this.handleValueChange} /><br />
            핵심성과 달성값 : <input type="text" name="kr_achievement"  value={key_result.kr_achievement} onChange={this.handleValueChange} /><br />
          <input type="submit" value="핵심 성과 수정하기"></input>
        </form>
        관리방식 : {key_result.kr_manage_style} <br />
        <Link to={"/objectives/"+objective_id}>해당 목표로 돌아가기</Link>
      </div>
    );
  };
}

export default KrEdit;