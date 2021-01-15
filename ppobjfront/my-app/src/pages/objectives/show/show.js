import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const objective_api_uri = "http://localhost:4000/api/v1/objectives"

class ObjectiveShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objective: [],
      key_results: [],
      check_in: {},
      bosses: [],
      assignees: []
    }
    // 체크인 생성 관련
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.createCheckIns = this.createCheckIns.bind(this)

    // 체크인 승인 관련
    this.handleApproveSubmit = this.handleApproveSubmit.bind(this)
    this.approveCheckIns = this.approveCheckIns.bind(this)
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this)

    // 체크인 취소 관련
    this.cancelCheckIns = this.cancelCheckIns.bind(this)
    this.handleArchiveSubmit = this.handleCancelSubmit.bind(this)
    this.ArchiveObjective = this.cancelCheckIns.bind(this)

    // 목표 아카이브 관련
    this.handleButtonClick = this.handleButtonClick.bind(this) 
    this.archiveObjective = this.archiveObjective.bind(this)
  };

  handleFormSubmit(e) {
    e.preventDefault()
    this.createCheckIns()
  }

  handleValueChange(e) {
    const { key_results } = this.state;
    const temp = key_results[0];
    const key_result_temp = {
      ...temp,
      kr_achievement: e.target.value
    };

    this.setState({
      key_results: [key_result_temp],
      check_in: {
        key_result_id: temp.id,
        ci_value: e.target.value
      }
    })
  }

  createCheckIns() {
    const { objective_id } = this.props.match.params
    const { key_result_id, ci_value } = this.state.check_in;
    const data = {
      objective: {
        objective_id
      },
      check_in: {
        key_result_id,
        ci_value
      }
    }
    axios({
      method:'post',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: `${objective_api_uri}/${objective_id}/checkins`,
      withCredentials: true
    })
    .then((response) => {
      console.log("됐나")
      console.log(response.data)
      alert("체크인");
      // this.setState({
      //   objective_id: response.data.objective_id,
      //   ci_value: response.data.ci_value
      // })
    })
    .catch((error) => {
      console.log("안됐네")
      return "Failed"
    })
  }

  handleApproveSubmit(e) {
    e.preventDefault()
    this.approveCheckIns()
  }

  approveCheckIns() {
    const { objective_id } = this.props.match.params
    const data = {
      objective: {
        objective_id
      },
    }
    axios({
      method:'put',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: `${objective_api_uri}/${objective_id}/checkins/approve`,
      withCredentials: true
    })
    .then((response) => {
      console.log("됐나")
      console.log("response", response);
      console.log(response.data);
      if (response.data === "권한이 없습니다") {
        alert(response.data);
      } else (
        alert("체크인 승인")
      )
      // this.setState({
      //   objective_id: response.data.objective_id,
      //   ci_value: response.data.ci_value
      // })
    })
    .catch((error) => {
      console.log("안됐네")
      return "Failed"
    })
  }

  handleCancelSubmit(e) {
    e.preventDefault()
    this.cancelCheckIns()
  }

  cancelCheckIns() {
    const { objective_id } = this.props.match.params
    const data = {
      objective: {
        objective_id
      },
    }
    axios({
      method:'delete',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: `${objective_api_uri}/${objective_id}/checkins`,
      withCredentials: true
    })
    .then((response) => {
      console.log("됐나")
      console.log(response.data)
      alert('체크인 취소');
    })
    .catch((error) => {
      console.log("안됐네")
      alert('요청한 체크인이 없습니다.')
    })
  }

  handleButtonClick(e) {
    e.preventDefault()
    this.archiveObjective()
  }

  archiveObjective() {
    const { objective_id } = this.props.match.params
    const data = {
      objective: {
        objective_id
      },
    }
    axios({
      method:'put',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: `${objective_api_uri}/${objective_id}/archives`,
      withCredentials: true
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
          // obj_joins: response.data.obj_joins
        })
      });
    }
    
    getObjective();
  }

  render() {
    const { objective, key_results, bosses, assignees } = this.state;
    // let username = Cookies.get('username');

    // console.log(objective.boss);
    // console.log(username == objective.boss[0].username);
    return (
      <div>
        <h1>목표 상세 조회</h1>
        <Link to={"/objectives/"+objective.id+"/edit"}><button>목표 수정하기</button></Link>
        <button onClick={this.handleButtonClick}>목표 아카이브하기</button>

        <h2>목표</h2>
            <p>목표명 - {objective.objective_name}</p>
            <p>목표설명 - {objective.objective_description}</p>
            <p>목표 시작일 - {objective.started_on}</p>
            <p>목표 마감일 - {objective.ended_on}</p>
            <p>목표 달성율 - {objective.objective_achievement}</p>
            <p>목표 상태 - {objective.objective_status}</p>
        <h2>핵심 성과</h2>
        {/* <Link to={"/objectives/"+objective.id+"/key_results"}><button>핵심성과 만들기</button></Link> */}
          {key_results.map(key_result =>
            <ul key={key_result.id}>
              <li>핵심성과명 - {key_result.kr_name}</li>
              <li>핵심성과 설명 - {key_result.kr_description}</li>
              <li>관리방식 - {key_result.kr_manage_style}</li>
              <li>핵심성과 상태 - {key_result.kr_status}</li>
              <form onSubmit={this.handleFormSubmit}>
                핵심성과 달성값 - <input type="number" name="ci_value" value={key_result.kr_achievement} onChange={this.handleValueChange} /><br />
                <input type="submit" value="체크인하기" />
              </form>
            </ul>
          )}
        <h2>관련 구성원</h2>
          {assignees.map(assignee =>
            <ul key={assignees.id}>
              <li>담당자 - {assignee.username}</li>
            </ul>
          )}
          {bosses.map(boss =>
            <ul key={boss.id}>
              <li>관리자 - {boss.username}</li>
            </ul>
          )}
          <br /><br />
          <form onSubmit={this.handleApproveSubmit}>
            <input type="submit" value="체크인 승인하기" />
          </form>
          <form onSubmit={this.handleCancelSubmit}>
            <input type="submit" value="체크인 요청 취소하기" />
          </form>
          <br /><br />
        <Link to="/">목표 목록</Link>
      </div>
    );
  };
}

export default ObjectiveShow;
