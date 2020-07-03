import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authHeader } from './config/config';
import Checkout from './checkout';
const Payment =(props,setShowTotal,Total)=>{
    console.log('====================================');
    // setShowTotal(true);
    console.log(Total);
    console.log('====================================');
    return(
        <div>
            payment method by strip
            <p className="App-intro">
          <Checkout
            name={'Your Company Name'}
            description={'Item that you sold'}
            amount={{ Total }}
          />
        </p>
        </div>
    );
}
export default Payment;
