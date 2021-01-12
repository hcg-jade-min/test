import React  from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const objective_api_uri = 'http://localhost:4000/api/v1/objectives'

class ObjectiveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objectives: []
    }
  };

  componentDidMount() {
    let getObjectives = () => {
        axios({
          method:'get',
          url: objective_api_uri,
        })
        .then(response => {
          // console.log("response.data", response.data)
          let data = response.data
          this.setState({
            objectives: data
          })
        });
    }
    getObjectives();
  }

  render() {
    const { objectives } = this.state;

    return (
      <div>
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
  };
}

export default ObjectiveList;