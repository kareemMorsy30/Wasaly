import React from 'react';
import Card from './card';
import '../../../styles/landing.scss';

const Landing = ({children}) => {
    return (
        <Card>
            <div className="container">
                <h3 className="landing-header">Welcome to dashboard landing page</h3>
            </div>
        </Card>
    )
}

export default Landing;