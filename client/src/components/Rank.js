import React, { Component } from 'react';
import Chart from './Chart';

class Rank extends Component {
    
    state = {
        teamData: {}
    }
    
    // Call rank function when data is received
    componentWillMount() {
        this.rankInfo();
    }
    
    // Update teams with rank info from db
    rankInfo() {
        // Set team and counter to 0
        let team = 0, counter = 0

        // For loop goes through each database record
        for (let i = 0; i < this.props.newData.length; i++) {
            // Records are groups alphabetically by team, so the first team's records will all be in a row. So we need to keep a counter to check when it's time to move to the next team. Once the counter is greater than the number of weeks in the data, we know it's time to move on. Add one to the team counter and reset the other counter.
            if (counter >= this.props.weeks) {
                team++;
                counter = 0;
            }
            // Push the rank from the record into the team's data. Advance the counter. 
            this.props.teamData.datasets[team].data.push(this.props.newData[i].rank);
            counter++;
        }
        this.setState({
            teamData: this.props.teamData
        })
    }

    render() {     
        return (
            <Chart 
                teamData={this.state.teamData}
            />
        )
    }
}

export default Rank;