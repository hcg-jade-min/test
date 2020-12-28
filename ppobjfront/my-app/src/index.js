import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

// class Counter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       number: 0,
//     }
//   };

//   handleIncreaseButtonClick() {
//     const number = this.state.number + 1;
//     this.setState({number: number})
//   }

//   handleDecreaseButtonClick() {
//     const number = this.state.number - 1;
//     this.setState({number: number})
//   }

//   handleMultiplyButtonClick() {
//     const number = this.state.number * 2;
//     this.setState({number: number})
//   }

//   handleResetButtonClick() {
//     const reset_number = 0
//     const number = reset_number;
//     this.setState({number: number})
//   }

//   render() {
//     return (
//       <div>
//         <h2>{this.state.number}</h2>
//         <button onClick={() => this.handleIncreaseButtonClick()}>Increase</button>
//         <button onClick={() => this.handleDecreaseButtonClick()}>Decrease</button>
//         <button onClick={() => this.handleMultiplyButtonClick()}>Multiply</button>
//         <button onClick={() => this.handleResetButtonClick()}>Reset</button>
//       </div>
//     );
//   };
// }

class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Performance Plus - 목표</h1>
        <h2>목표현황</h2>
        <button>목표 생성</button>
      </div>
    );
  }
}
class App extends React.Component {
  render() {
    return (
      <Index/>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById("root"));
/////