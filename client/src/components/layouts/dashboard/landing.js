import React from 'react';
import Card from './card';
import '../../../styles/landing.scss';
import MyChart from '../chart';

const Landing = ({children}) => {
    return (
        <Card>
            <div className="container">
                <h3 className="landing-header">Welcome to dashboard landing page</h3>
                <MyChart />
            </div>
        </Card>
    )
}

export default Landing;