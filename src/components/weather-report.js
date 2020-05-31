/* Description: This will get Weather reports for given array of input 
country code using API service*/
import React, {Component} from 'react';
import APIService from './../APIService/APIService';
import WeatherDisplay from './weather-display';

const countryCodes = [ 'London', 'Tokyo', 10005, 'Pluto', 10345, 77777];
export default class WhetherReport extends Component {

    getWeatherReports() {
        let reportStack = [];
        this
            .state
            .countryInputs
            .map((element) => {
                APIService(element).then((data) => {
                    if (data.cod === 200) {
                        data=Object.assign({'countryCode':element}, data)
                        reportStack.push(data);
                    } else {
                        reportStack.push({
                            name: 'Not found',
                            countryCode: element,
                            weather: [
                                {
                                    description: 'Not found'
                                }
                            ],
                            main: {
                                temp: 'Not found'
                            },
                            timezone: 'Not found'
                        })
                    }
                    if (reportStack.length === this.state.countryInputs.length) {
                        this.setState({
                            reports: reportStack
                        }, () => {
                            return this.state.reports
                        })
                    }
                }).catch(error => {
                    this.setState({isError:true});
                })
            })
    }
    constructor(props) {
        super(props);
        this.state = {
            countryInputs: countryCodes,
            reports: [],
            isError: false
        }
        this.getWeatherReports()
    }
    render() {
        let reportsRows = [];
        if(!this.state.isError){
        this
            .state
            .reports
            .forEach((reportData, key) => {
                reportsRows.push(
                    <WeatherDisplay key={key} rownumber={key} reports={reportData}></WeatherDisplay>
                )
            })
          }
        let arrayInputs = [];
        this
            .state
            .countryInputs
            .forEach(item => {
                arrayInputs.push(
                    <span>{item},
                    </span>
                )
            })

        return !this.state.isError ? ( <div>
            <p>Input Array :: [ {arrayInputs}]</p>
            <table className="table table-light table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Country code</th>
                        <th scope="col">City Name</th>
                        <th scope="col">Weather Status</th>
                        <th scope="col">Temperature</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {reportsRows}
                </tbody>
            </table>
        </div>):(<div className='alert alert-warning'>Something went wrong Please try again</div>)
    }
}
