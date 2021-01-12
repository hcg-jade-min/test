import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const objective_api_uri = "http://localhost:4000/api/v1/objectives/"

class ObjectiveShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objective: [],
      key_results: []
    }
  };

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
          objective: response.data,
          key_results: response.data.key_result
        })
      });
    }
    getObjective();
  }

  render() {
    const { objective, key_results } = this.state;

    return (
      <div>
        <h1>목표 상세 조회</h1>
        <Link to={"/objectives/"+objective.id+"/edit"}><button>목표 수정하기</button></Link>

        <h2>목표</h2>
            <p>목표명 - {objective.objective_name}</p>
            <p>목표설명 - {objective.objective_description}</p>
            <p>목표 시작일 - {objective.started_on}</p>
            <p>목표 마감일 - {objective.ended_on}</p>
            <p>목표 달성율 - {objective.objective_achievement}</p>

        <h2>핵심 성과</h2>
        <Link to={"/objectives/"+objective.id+"/key_results"}><button>핵심성과 만들기</button></Link>
          {key_results.map(key_result =>
            <ul key={key_result.id}>
              <li>핵심성과명 - {key_result.kr_name}</li>
              <li>핵심성과 설명 - {key_result.kr_description}</li>
              <li>관리방식 - {key_result.kr_manage_style}</li>
              <li>핵심성과 달성값 - {key_result.kr_achievement}</li>
              <li>
                <Link to={"/objectives/"+objective.id+"/key_results/"+key_result.id}>
                  <button>핵심성과 수정하기</button>
                </Link>
              </li>
            </ul>
          )}
          <br /><br />

        <Link to="/objectives">목표 목록</Link>
      </div>
    );
  };
}

export default ObjectiveShow;
