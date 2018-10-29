import React, { Component } from 'react';

const ZamatoCuisine = (props) => {

    // this page displays the views for list of restaurants on the homepage, and works in tandem with Home page in containers folder
    

    console.log(props)

    return (
        <div>
            <img style={{width: 300, height: 100}} src={props.cuisine.restaurant.featured_image} alt="" />
           <p>{props.cuisine.restaurant.name}</p>

        </div>
    )
}

export default ZamatoCuisine;


// this page displays the views for list of cuisines on the homepage, and works in tandem with Cuisine page in containers folder