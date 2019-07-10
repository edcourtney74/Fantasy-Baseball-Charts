import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Rank from './components/Rank';
import StatButton from './components/StatButton';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newData: [],
      weeks: 0
    }
  }
  // Do initial database call - all charts will use this info
  componentDidMount() {
    this.getChartData();
  }

  // Initial teams object, structured for ChartJS
  teamData = {
    labels: [],
    datasets: [
      {
        label: 'APG',
        data: [],
        borderColor: '#a6cee3',
        backgroundColor: '#a6cee3',
      },
      {
        label: 'Bomb',
        data: [],
        borderColor: '#ff7f00',
        backgroundColor: '#ff7f00',
      },
      {
        label: 'Bugs',
        data: [],
        borderColor: '#a1fc2a',
        backgroundColor: '#a1fc2a',
      },
      {
        label: 'CD',
        data: [],
        borderColor: '#6a3d9a',
        backgroundColor: '#6a3d9a',
      },
      {
        label: 'EL',
        data: [],
        borderColor: '#fdbf6f',
        backgroundColor: '#fdbf6f',
      },
      {
        label: 'For',
        data: [],
        borderColor: '#787f6e',
        backgroundColor: '#787f6e',
      },
      {
        label: 'HGH',
        data: [],
        borderColor: '#e31a1c',
        backgroundColor: '#e31a1c',
      },
      {
        label: 'Leg',
        data: [],
        borderColor: '#fb9a99',
        backgroundColor: '#fb9a99',
      },
      {
        label: 'OC',
        data: [],
        borderColor: '#b15928',
        backgroundColor: '#b15928',
      },
      {
        label: 'RP',
        data: [],
        borderColor: '#cab2d6',
        backgroundColor: '#cab2d6',
      },
      {
        label: 'SM',
        data: [],
        borderColor: '#1f78b4',
        backgroundColor: '#1f78b4',
      },
      {
        label: 'SSP',
        data: [],
        borderColor: '#b2df8a',
        backgroundColor: '#b2df8a',
      },
      {
        label: 'TBD',
        data: [],
        borderColor: '#030914',
        backgroundColor: '#030914',
      },
      {
        label: 'Big T',
        data: [],
        borderColor: '#ffff99',
        backgroundColor: '#ffff99',
      },
      {
        label: 'DSq',
        data: [],
        borderColor: '#33a02c',
        backgroundColor: '#33a02c',
      },
      {
        label: 'HH',
        data: [],
        borderColor: '#d031d6',
        backgroundColor: '#d031d6',
      },
    ],
  }

  // Initial db call on page load
  getChartData() {
    axios.get('/api/stats')
      .then(response => {
        // Calculate number of weeks of data retrieved - number of records divided by number of teams (16)
        const weeks = response.data.length / 16;
        // Add week numbers to chart label once data retrieved
        for (let i = 1; i <= weeks; i++) {
          this.teamData.labels.push(`Week ${i}`)
        }
        
        // Save db data, weeks in state for further use
        this.setState({
          newData: response.data,
          weeks
        })
      })
      // Call function to show rank chart on page load
      .catch(err => console.log(err));
  } 

  render() {
    return (
        <Container>
          <h1>LPH Pythagorean</h1>
          <StatButton />
          <Rank
            teamData={this.teamData}
            newData={this.state.newData}
            weeks={this.state.weeks}
          />
        </Container>
    )
  };
}

export default App;
