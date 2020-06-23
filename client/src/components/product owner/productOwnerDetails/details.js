import React from 'react';
import {Link} from "react-router-dom";
import '../../../styles/productowner_details.scss';

const Details = ({ market: market }) => {
    console.log('inside comp', );
    return (
        <div className="right-card">
            <h2 className="section-title">{market.marketName}</h2>
            <p className="author-section">by <Link className="author-name">{market.user.username}</Link></p>
            <hr></hr>
            <h2>Market info</h2>
            <hr></hr>
            <div className="book-rating">
                <label>Market name</label>
                <input type="text" placeholder="Market name" value={market.marketName} readOnly/>
                <label>Market phone</label>
                <input type="text" placeholder="Market phone" value={market.marketPhone} readOnly/>
            </div>
            <hr></hr>
            <h2>User details</h2>
            <hr></hr>
            <div className="book-rating">
                <label>Username</label>
                <input type="text" placeholder="Username" value={market.user && market.user.username} readOnly/>
                <label>Email</label>
                <input type="text" placeholder="Email" value={market.user && market.user.email} readOnly/>
                <label>Phone</label>
                <input type="text" placeholder="Phone" value={market.user && market.user.phones[0]} readOnly/>
                <label>Address</label>
                <input type="text" placeholder="Address" value={market.user && market.user.address.length > 0 && market.user.address[0].area && `${market.user.address[0].area} ${market.user.address[0].city}`} readOnly/>
            </div>
        </div>
    );
};

export default Details;