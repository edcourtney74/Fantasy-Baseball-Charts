import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Chart from './components/Chart';
import CategoryButtons from './components/CategoryButtons';
import axios from 'axios';
import './App.css';
import CategoryButtonActive from './components/CategoryButtonActive';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newData: [],
      weeks: 0,
      chartType: "",
      stepSize: 0,
      reverse: true,
    }
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

  // Array of stat categories user can choose from. Used to build Category Buttons
  categoryTitle = ["Rank", "Points For", "Points Against", "Expected Wins", "Luck", "H2H Luck"];

  // Do initial database call - all charts will use this info
  componentDidMount() {
    this.getChartData();
  }

  // Initial db call on page load
  getChartData = () => {
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
        console.log(this.state)
      })
      // Call function to show rank chart on page load
      .catch(err => console.log(err));
  }

  // Function that is called when category button is clicked
  categoryClick = (event) => {

    // Run for loop to empty previous data from teamData
    for (let i = 0; i < this.teamData.datasets.length; i++) {
      this.teamData.datasets[i].data = [];
    }

    // Retrieve id of button to determine which function to call
    let id = event.target.id

    // Category var holds category column to use from database
    let category = "";

    // Switch statement to determine which function to call/chart properties to display
    switch (id) {
      case "Rank":
        category = "rank"
        this.showRank()
        break;
      case "Points For":
        category = "points_for"
        this.showPointsFor()
        break;
      case "Points Against":
        category = "points_against"
        this.showPointsAgainst()
        break;
      case "Expected Wins":
        category = "expected_wins"
        this.showExpectedWins()
        break;
      case "Luck":
        category = "luck"
        this.showLuck()
        break;
      case "H2H Luck":
        category = "h2h_luck"
        this.showH2HLuck()
        break;
      default:
        break;
    }

    // Start pushing databse info into teamData
    // Set team and counter to 0
    let team = 0, counter = 0;

    // For loop goes through each database record
    for (let i = 0; i < this.state.newData.length; i++) {
      // Records are groups alphabetically by team, so the first team's records will all be in a row. So we need to keep a counter to check when it's time to move to the next team. Once the counter is greater than the number of weeks in the data, we know it's time to move on. Add one to the team counter and reset the other counter.
      if (counter >= this.state.weeks) {
        team++;
        counter = 0;
      }
      // Push the data from the record into the team's data. Advance the counter. 
      this.teamData.datasets[team].data.push(this.state.newData[i][category]);
      counter++;
    }
  }

  // Function that sets rank chart properties
  showRank = () => {
    this.setState({
      chartType: "Rank",
      stepSize: 1,
      reverse: true,
    })
  }
  
  // Function that sets points for properties
  showPointsFor = () => {
    this.setState({
        chartType: "Points For",
        reverse: false,
        stepSize: 250
      })
    }
  
  // Function that sets points against properties
  showPointsAgainst = () => {
    this.setState({
        chartType: "Points Against",
        reverse: false,
        stepSize: 250
      })
    }

  // Function that sets expected wins properties
  showExpectedWins = () => {
    this.setState({
      chartType: "Expected Wins",
      stepSize: .5,
      reverse: false,
    })
  }
  // Function that sets luck properties
  showLuck = () => {
    this.setState({
      chartType: "Luck",
      stepSize: .2,
      reverse: false,
    })
  }
  // Function that sets H2H luck properties
  showH2HLuck = () => {
    this.setState({
      chartType: "H2H Luck",
      stepSize: .2,
      reverse: false,
    })
  }

  render() {
    return (
      <Container>
        <h1 className="mt-2">LPH Pythagorean</h1>
        <Row className="justify-content-center mt-4">
          {this.categoryTitle.map(category => (
            this.state.chartType === category ? (
              <CategoryButtonActive 
                onClickCategory={this.categoryClick}
                id={category}
                chartType={this.state.chartType}
              />
            ) : (
              <CategoryButtons 
                onClickCategory={this.categoryClick}
                id={category}
                chartType={this.state.chartType}
              />
            )
          ))}
        </Row>
        {/* Displays message until user chooses a stat option */}
        {!this.state.chartType &&
          <h3 className="mt-3">Choose a stat to view</h3>
        }
        {this.state.chartType &&
          <Chart
            teamData={this.teamData}
            weeks={this.state.weeks}
            stepSize={this.state.stepSize}
            reverse={this.state.reverse}
          />}
      </Container>
    )
  };
}

export default App;
