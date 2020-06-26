import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authHeader } from './config/config';
import Checkout from './checkout';
const Payment =(props)=>{
    
    return(
        <div>
            payment method by strip
            <p className="App-intro">
          <Checkout
            name={'Your Company Name'}
            description={'Item that you sold'}
            amount={4.99}
          />
        </p>
        </div>
    );
}
export default Payment;
