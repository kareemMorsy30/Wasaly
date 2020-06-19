
import React, { useState } from 'react'
import axios from 'axios';
import {authHeader} from './config/config'
import StarRatings from 'react-star-ratings';

const RateService = (props) => {

    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    const { serviceId, rate, order } = props
    const [rating, setRating] = useState(rate);
   
    const handleRatingChange = ( newRating) => {
        setRating(parseInt(newRating));
        const data = { rating: parseInt(newRating), order }
        axios.patch(`${domain}/services/${serviceId}/rates/`, data, authHeader)
            .then(response => {
                console.log(response); // Service Rating Object
            })
            .catch(err => {
                console.log(err)
            })
    }  
    
    return (
        <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={handleRatingChange}
            numberOfStars={5}
            name='rating'
            starDimension="20px"
        />
    );

}

export default RateService