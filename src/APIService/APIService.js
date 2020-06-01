/* Description: This will make API calls to server and will return data to components */
export default async function APIService(cityelement) {
    try {
        let response = '';
        /* In real time we need to set api string and API token in environment variable in .env file.
      then below line will help to hide confidential information*/
        // let result = await fetch(process.env.REACT_APP_API_URL + cityelement +
        // '&appid='+REACT_APP_API_URL);

        let result = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityelement + '&appid=f9b14f353ab97350fc4e49e9773415da');
        response = await result.json()
        return response
    } catch (error) {
        throw error
    }
}
