import { FETCH_CUISINE_ID, GET_CURRENT_USER_LOCATION, FETCH_SELECTED_CUISINE, SHOW_CUISINES_MAP, GET_CITY_CUISINE_ID } from '../constants';

import axios from 'axios';
import { getCurrentLocation } from '../utils';
import { SIGN_USER_UP, GET_ERRORS } from '../constants';


// start zomato api calls


// this api call works with the search bar on the home page

// this api call ignores the city id, and uses the users ip address geolocation instead to load the list of cuisines 

// Would like to have the search bar set the  city id set coordinates so that user may search by preferred city instead of their ip adresses geolocation setting their location automatically.

//  see fetchCityId call below to continue working out this process


export const fetchZamatoCuisinesUsingCityIDAndCoords = (city, coords) =>  dispatch => {

    console.log('hehe')
    axios
    .get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${city}&lat=${coords.lat}&lon=${coords.lng}`, {headers: {
        'user-key': 'API_KEY_GOES_HERE'
    }})
    .then(results => {
        console.log('Our data from our cuisines api call')
        console.log(results)

        dispatch({
            type: FETCH_CUISINE_ID,
            data: results
        })
    })
    .catch(err => {
        console.log(err)
    })

}


// this api call parses the cities from the zomato api from the users input city
export const fetchCityID = (city) => dispatch => {

    axios
        .get(`https://developers.zomato.com/api/v2.1/cities?q=${city}`, {
            headers: {   
                'user-key': 'API_KEY_GOES_HERE'
        }})
        .then(results => {
           
            
            const locationSuggestions = results.data.location_suggestions;
            
            locationSuggestions.forEach((foundCity) => {
                //foundCity.name.toLowerCase() === city.toLowerCase();

                const lowerCaseFoundCity = foundCity.name.toLowerCase();
                const lowerCaseCity = city.toLowerCase();

                const splittedCityArray = lowerCaseFoundCity.split(',')
                const splittedCity = splittedCityArray[0]
         
                // console.log(splittedCity, lowerCaseCity)
                // console.log(lowerCaseCity === splittedCity)

                if (lowerCaseCity === splittedCity) {
                       dispatch({
                           type: GET_CITY_CUISINE_ID,
                            payload: foundCity.id
                       })
                }
            });

    
        })
        .catch(err => {
            console.log(err);
        });
}


// this api call loads restaurants based on the users clicked cuisine
export const fetchSelectedCuisine = (cuisineID, coords) => dispatch => {

    axios
        .get(`https://developers.zomato.com/api/v2.1/search?count=100&lat=${coords.lat}&lon=${coords.lng}&cuisines=${cuisineID}`, {headers: {
            'user-key': 'API_KEY_GOES_HERE'
        }})
        .then(results => {
            //console.log('clicked cuisines from action')
            //console.log(results)
            
            dispatch({
                type: FETCH_SELECTED_CUISINE,
                data: results
            })

            dispatch({
                type: SHOW_CUISINES_MAP,
                payload: results
            })
        
        })
        .catch(err => {
            console.log(err)
        })

}

// end zomato api calls

// *******************************************************

// start google map call

// this call loads the users geolocation based on their ip address
export const getUserCurrentLocation = () => dispatch => {

    getCurrentLocation()
        .then( location => {
            // console.log('-------')
            // console.log(location)
            dispatch({
                type: GET_CURRENT_USER_LOCATION,
                payload: location
            })

        })
        .catch(err => {
            console.log(err);
        })

}

// end google map call

// *********************************************************

// start express backend call

// this api call works in tandem with our backedn for user signup and authentication
const Axios = axios.create({
    baseURL: `http://localhost:3000`, 
    timeout: 10000,
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});
export const createUser = (userData) => dispatch => {

    Axios
        .post('/users/register', userData) //******* */ MAKE SURE THIS MATCH *******
        .then(user => {
            dispatch({
                type: SIGN_USER_UP,
                data: user
            })
        })
        .catch(err => {            
            dispatch({
                type: GET_ERRORS,
                data: err
            })
        });

}

// end express backend call