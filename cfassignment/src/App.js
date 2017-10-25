import React, { Component } from 'react'
import Layout from './Components/Layout'
import styled from 'styled-components'
import './index.css'
const Bar = styled.div`
    top:0;
    left:0;
    width:100%;
    margin: 0;
    height:60px;
    background: #1c2331;
    `;
class App extends Component {
    render() {
    return (
      <div>
          <Bar/>
          <Layout/>
      </div>
    );
  }
}

export default App;
