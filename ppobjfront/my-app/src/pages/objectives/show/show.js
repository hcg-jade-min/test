import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const api_uri = "http://localhost:4000/api/v1/objectives/"

class ObjectiveShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objective: []
    }
  };

  componentDidMount() {
    // console.log(this.props); // 콘솔에서 출력되는 걸 보면 this.props 에 match > params 를 확인할 수 있다
    const { objective_id } = this.props.match.params
    let getObjective = () => {
        axios({
          method:'get',
          url: `${api_uri}/${objective_id}`
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
        <h1>목표 상세 조회</h1>
        <table>
          <thead>
            <tr>
              <th>목표 이름</th>
              <th>목표 설명</th>
              <th>목표 시작일</th>
              <th>목표 마감일</th>
              <th>목표 상태</th>
              <th>목표 달성도</th>
              {/* <th>핵심 성과 이름</th>
              <th>핵심 성과 설명</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{objective.name}</td>
              <td>{objective.description}</td>
              <td>{objective.started_on}</td>
              <td>{objective.ended_on}</td>
              <td>{objective.status}</td>
              <td>{objective.achievement}</td>
              {/* {objective.key_result.map(k_r =>
                <td>{k_r.name}</td>
              )} */}
              <td><Link to={"/objectives/"+objective.id+"/edit"}><button>수정</button></Link></td>
            </tr>
          </tbody>
        </table>
        <Link to="/objectives">목표 목록</Link>
      </div>
    );
  };
}

export default ObjectiveShow;
