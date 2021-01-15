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
      },
      key_results: [],
      key_result: {
        kr_name: "",
        kr_description: "",
        kr_manage_style: ""
      },
      // bosses: [],
      // boss: {
      //   username: "",
      // },
      // assignees: [],
      // assignee: {
      //   username: ""
      // }
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
    const { objective, key_results } = this.state;
    const temp1 = key_results[0];
    // const temp2 = bosses[0];
    // const temp3 = assignees[0];
    const key_results_temp = {
      ...temp1,
      [e.target.name] : e.target.value
    };
    // const bosses_temp = {
    //   ...temp2,
    //   [e.target.name]  : e.target.value
    // };
    // const assignees_temp = {
    //   ...temp3,
    //   [e.target.name]  : e.target.value
    // };

    this.setState({
      objective: {
        ...objective,
        [e.target.name] : e.target.value,
      },
      key_results: [key_results_temp],
      key_result: {
        kr_name: temp1.kr_name,
        kr_description: temp1.kr_description,
        kr_manage_style: temp1.kr_manage_style
      },
      // bosses: [bosses_temp],
      // boss: {
      //   boss_name: temp2.username
      // },
      // assignees: [assignees_temp],
      // assignee: {
      //   assignee_name: temp3.username
      // }
    });
  }

  updateObjective() {
    const { objective } = this.state;
    const { kr_name, kr_description, kr_manage_style } = this.state.key_result;
    // const { boss_name } = this.state.boss;
    // const { assignee_name } = this.state.assignee;
    const data = {
      objective,
      key_result: {
        kr_name,
        kr_description,
        kr_manage_style
      },
      // boss: {
      //   boss_name
      // },
      // assignee: {
      //   assignee_name
      // }
    }
    axios({
      method:'put',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: `${objective_api_uri}/${objective.id}`,
      withCredentials: true
    })
    .then((response) => {
      console.log("됐나")
      console.log(response.data)
      alert('목표가 수정되었습니다')
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
        url: `${objective_api_uri}/${objective_id}`,
        withCredentials: true
      })
      .then(response => {
        console.log("response.data", response.data)
        this.setState({
          objective: response.data,
          key_results: response.data.key_results,
          bosses: response.data.boss,
          assignees: response.data.assignee
        })
      });
    }

    getObjective();
  }



  render() {
    const { objective, key_results } = this.state;
    return (
      <div>
        <h1>목표 수정하기</h1>
        <form onSubmit={this.handleFormSubmit}>
          목표명 : <input type="text" name="objective_name" value={objective.objective_name} onChange={this.handleValueChange} /><br></br>
          목표설명 : <input type="text" name="objective_description"  value={objective.objective_description} onChange={this.handleValueChange} /><br />
          목표 시작일 : <input type="date" name="started_on"  value={objective.started_on} onChange={this.handleValueChange} /><br />
          목표 마감일 : <input type="date" name="ended_on" value={objective.ended_on} onChange={this.handleValueChange} /><br />
        <h2>핵심 성과 생성하기</h2>
          {key_results.map(KR =>
            <div key={KR.id}>
              {/* <input type="hidden" name="kr_id" value={KR.id} onChange={this.handleValueChange} /> */}
              핵심성과명 : <input type="text" name="kr_name" value={KR.kr_name} onChange={this.handleValueChange} /><br />
              핵심성과설명 : <input type="text" name="kr_description"  value={KR.kr_description} onChange={this.handleValueChange} /><br />
              관리방식 : <input type="text" name="kr_manage_style"  value={KR.kr_manage_style} onChange={this.handleValueChange} /><br />
            </div>
          )}
        {/* <h2>관련 구성원</h2>
          {assignees.map(assignee =>
            <div key={assignees.id}>
              담당자 : <input type="text" name="boss_name" value={assignee.username} onChange={this.handleValueChange} /><br />
            </div>
          )}
          {bosses.map(boss =>
            <div key={boss.id}>
              관리자 - <input type="text" name="assignee_name" value={boss.username} onChange={this.handleValueChange} /><br />
            </div>
          )} */}
          <input type="submit" value="목표 수정하기" />
        </form>
        <Link to="/">목표 목록</Link>
      </div>
    );
  };
}

export default ObjectiveEdit;