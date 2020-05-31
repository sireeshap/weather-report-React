/* Description: This will display Weather reports information in table 
and do necessaru conversions*/
import React from 'react';

export default function WeatherDisplay(props) {
    let weatherReports = props.reports;
    let timezoneConvert = (utcTimeOffset) => {
        let date = new Date(new Date().getTime() + (utcTimeOffset * 1000));
        let hrs = date.getUTCHours();
        let mins = date.getUTCMinutes();
        let secs = date.getUTCSeconds();
        return (hrs + ":" + mins + ":" + secs).toString()
    }
    let tempuratureConverter = (kelvinCode) => {
      const celsius = kelvinCode - 273;
      let fahrenheit = Math.floor(celsius * (9/5) + 32);
      return (fahrenheit.toString()+ '\u{00B0}F')
    }
    return (
        <tr>
            <th scope="row">{props.rownumber + 1}</th>
            <td>{weatherReports.countryCode}</td>
            <td>{weatherReports.name}</td>
            <td>{weatherReports.weather[0].description}</td>
            <td>{weatherReports.main.temp!=='Not found' ? tempuratureConverter(weatherReports.main.temp): '-'}</td>
            <td>{weatherReports.timezone !== 'Not found' ? timezoneConvert(weatherReports.timezone) : '-'}</td>
        </tr>
    )
}