import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         teamData: props.teamData
    //     }
    // }  

    static defaultProps = {
        titleText: 'Rank',
        stepSize: 1,
        reverse: true,
    }

    render() {
        return (
            <div className="chart">
                <Line
                    data={this.props.teamData}
                    options={{
                        title: {
                            display: true,
                            text: `${this.props.titleText}`,
                            fontSize: 20
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    stepSize: `${this.props.stepSize}`,
                                    reverse: `${this.props.reverse}`
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
                />
            </div>
        )
    }
}

export default Chart;