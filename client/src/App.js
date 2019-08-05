import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import './App.css';
import Chart from './components/Chart';
import RankChart from './components/RankChart';
import CategoryButtons from './components/CategoryButtons';
import HideButton from './components/HideButton';
import ShowButton from './components/ShowButton';
import DivisionButtons from './components/DivisionButtons';

class App extends Component {
  constructor() {
    super();
    this.state = {
      initialData: [],
      weeks: 0,
      chartType: "",
      division: "All Divisions",
      stepSize: 0,
      reverse: true,
      hidden: false,
    }
  }

  // Initial teams object, structured for ChartJS
  teams = {
    datasets: [
      {
        label: 'APG',
        data: [],
        borderColor: '#a6cee3',
        backgroundColor: '#a6cee3',
        division: "MilBest"
      },
      {
        label: 'Bomb',
        data: [],
        borderColor: '#ff7f00',
        backgroundColor: '#ff7f00',
        division: "MilBest"
      },
      {
        label: 'Bugs',
        data: [],
        borderColor: '#a1fc2a',
        backgroundColor: '#a1fc2a',
        division: "BlueMoon"
      },
      {
        label: 'CD',
        data: [],
        borderColor: '#6a3d9a',
        backgroundColor: '#6a3d9a',
        division: "MilBest"
      },
      {
        label: 'EL',
        data: [],
        borderColor: '#fdbf6f',
        backgroundColor: '#fdbf6f',
        division: "Lagun"
      },
      {
        label: 'For',
        data: [],
        borderColor: '#787f6e',
        backgroundColor: '#787f6e',
        division: "MilBest"
      },
      {
        label: 'HGH',
        data: [],
        borderColor: '#e31a1c',
        backgroundColor: '#e31a1c',
        division: "BlueMoon"
      },
      {
        label: 'Leg',
        data: [],
        borderColor: '#fb9a99',
        backgroundColor: '#fb9a99',
        division: "BlueMoon"
      },
      {
        label: 'OC',
        data: [],
        borderColor: '#b15928',
        backgroundColor: '#b15928',
        division: "Lagun"
      },
      {
        label: 'RP',
        data: [],
        borderColor: '#cab2d6',
        backgroundColor: '#cab2d6',
        division: "Bud"
      },
      {
        label: 'SM',
        data: [],
        borderColor: '#1f78b4',
        backgroundColor: '#1f78b4',
        division: "Lagun"
      },
      {
        label: 'SSP',
        data: [],
        borderColor: '#b2df8a',
        backgroundColor: '#b2df8a',
        division: "Bud"
      },
      {
        label: 'TBD',
        data: [],
        borderColor: '#030914',
        backgroundColor: '#030914',
        division: "Bud"
      },
      {
        label: 'Big T',
        data: [],
        borderColor: '#ffff99',
        backgroundColor: '#ffff99',
        division: "Bud"
      },
      {
        label: 'DSq',
        data: [],
        borderColor: '#33a02c',
        backgroundColor: '#33a02c',
        division: "Lagun"
      },
      {
        label: 'HH',
        data: [],
        borderColor: '#d031d6',
        backgroundColor: '#d031d6',
        division: "BlueMoon"
      },
    ],
  }

  // Object to hold chart data after division filter, if any
  chartData = {
    labels: [],
    datasets: []
  }

  // Array of stat categories user can choose from. Used to build Category Buttons
  categoryTitle = ["Rank", "Points For", "Points Against", "Expected Wins", "Luck", "H2H Luck"];

  // Array of divisions user can choose from. Used to build Division Buttons
  divisions = ["BlueMoon", "Bud", "Lagun", "MilBest", "All Divisions"];

  // Do initial database call - all charts will use this info
  componentDidMount() {
    this.getChartData();
  }

  // Initial db call on page load
  getChartData = () => {
    axios.get('/api/stats')
      .then(response => {
        // Calculate number of weeks of data retrieved - number of records divided by number of teams
        const weeks = response.data.length / this.teams.datasets.length;
        // Add week numbers to chart label once data retrieved
        for (let i = 1; i <= weeks; i++) {
          this.chartData.labels.push(`Week ${i}`)
        }

        // Save db data, weeks in state for further use
        this.setState({
          initialData: response.data,
          weeks
        })
      })
      // Call function to show rank chart on page load
      .catch(err => console.log(err));
  }

  // Function called when category button is clicked
  categoryClick = (event) => {
    // Set state with button id of stat chosen
    this.setState({
      chartType: event.target.id
    },
      // Will call function to filter chartData once state is set
      this.chartDataFiltered
    )
  }

  // Function called when division is chosen
  divisionClick = (event) => {
    // Makes sure stat category/chartType has already been chosen. Otherwise no data will exist to display. If user selects division first, no data will display until category has been chosen.
    if (this.state.chartType) {
      // Set state with division name from button id 
      this.setState({
        division: event.target.id
      },
        // Will call function to filter chartData once state is set
        this.chartDataFiltered
      )
    } else {
      this.setState({
        division: event.target.id
      })
    }
  }

  // Main function to filter database info already stored in state into desired ChartJs form.
  chartDataFiltered = () => {
    // Use forEach to empty previous data from teams object
    this.teams.datasets.forEach(dataset => dataset.data = []);

    // Clear chartData of previous team info
    this.chartData.datasets = [];

    // Category var holds category column to use from database
    let category = "";

    // Switch statement to determine which data to display and set state with chart properties
    switch (this.state.chartType) {
      case "Rank":
        category = "rank"
        this.setState({
          stepSize: 1,
        })
        break;
      case "Points For":
        category = "points_for"
        this.setState({
          stepSize: 500,
        })
        break;
      case "Points Against":
        category = "points_against"
        this.setState({
          stepSize: 500
        })
        break;
      case "Expected Wins":
        category = "expected_wins"
        this.setState({
          stepSize: .5,
        })
        break;
      case "Luck":
        category = "luck"
        this.setState({
          stepSize: .3,
        })
        break;
      case "H2H Luck":
        category = "h2h_luck"
        this.setState({
          stepSize: .3,
        })
        break;
      default:
        console.log("Switch statement error");
    }

    // Start pushing database info into teams object
    // Set team and counter to 0
    let team = 0, counter = 0;

    // Use forEach to go through each database record
    this.state.initialData.forEach(record => {
      // Records are grouped alphabetically by team, so the first team's records will all be in a row. So we need to keep a counter to check when it's time to move to the next team. Once the counter is greater than the number of weeks in the data, we know it's time to move on. Add one to the team counter and reset the other counter.
      if (counter >= this.state.weeks) {
        team++;
        counter = 0;
      }
      // Push the data from the record into the team's data. Advance the counter. 
      this.teams.datasets[team].data.push(record[category]);
      counter++;
    })

    // Push team data into chartData object based on division filter
    this.teams.datasets.forEach(dataset => {
      if (this.state.division === dataset.division || this.state.division === "All Divisions") {
        this.chartData.datasets.push(dataset);
      }
    })
  }

  // Function to hide all current data so user can focus on just a few teams
  hideAll = () => {
    // Use forEach to add hidden: true property to each team's dataset
    this.teams.datasets.forEach(dataset => {
      dataset.hidden = true;
    }) 
    this.setState({
      hidden: true
    })
  }

  // Function to show all current data so user can all teams again. This
  showAll = () => {
    // Use forEach to add hidden: true property to each team's dataset
    this.teams.datasets.forEach(dataset => {
      dataset.hidden = false;
    }) 
    this.setState({
      hidden: false
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="mt-4" xs="10">
            <h1>LPH Pythagorean</h1>
            {/* Displays message until user chooses a stat option */}
            {!this.state.chartType &&
              <h3 className="mt-3">Choose a stat at the right to view</h3>
            }
            {this.state.chartType === "Rank" ? (
              <RankChart
                chartData={this.chartData}
                weeks={this.state.weeks}
                stepSize={this.state.stepSize}
                chartType={this.state.chartType}
              />
            ) : (
                this.state.chartType &&
                <Chart
                  chartData={this.chartData}
                  weeks={this.state.weeks}
                  stepSize={this.state.stepSize}
                  chartType={this.state.chartType}
                />
              )}
          </Col>
          <Col className="mt-4" xs="2">
            {this.categoryTitle.map(category => (
              <CategoryButtons
                onClickCategory={this.categoryClick}
                id={category}
                chartType={this.state.chartType}
                key={category}
              />)
            )}

            <div className="mt-3" />
            {this.divisions.map(division => (
              <DivisionButtons
                division={this.state.division}
                id={division}
                onClick={this.divisionClick}
                key={division}
              />)
            )}

            <HideButton
              onClickHideAll={this.hideAll}
            />
            <ShowButton
              onClickShowAll={this.showAll}
            />
          </Col>
        </Row>
      </Container>
    )
  };
}

export default App;
