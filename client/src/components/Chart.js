import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {      
    render() {
        console.log(this.props.teamData)
        return (
            <div className="chart mt-3">
                {this.props.reverse ? (
                <Line
                    data={this.props.teamData}
                    options={{
                        title: {
                            display: false,
                            fontSize: 20
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    reverse: true,
                                    stepSize: `${this.props.stepSize}`
                                },
                            }]
                        },
                        elements: {
                            line: {
                                fill: false,
                                tension: 0
                            }
                        }
                    }}
                /> ) : (
                <Line
                    data={this.props.teamData}
                    options={{
                        title: {
                            display: false,
                            fontSize: 20
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    reverse: false,
                                    stepSize: `${this.props.stepSize}`
                                },
                            }]
                        },
                        elements: {
                            line: {
                                fill: false,
                                tension: 0
                            }
                        }
                    }}
                /> )}
            </div>
        )
    }
}

export default Chart;