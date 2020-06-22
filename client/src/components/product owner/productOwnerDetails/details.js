import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {Link} from "react-router-dom";
import '../../../styles/productowner_details.scss';

const Details = ({ book }) => {
    console.log('inside comp', );
    return (
        <div className="right-card">
            <h2 className="section-title">{book.name}</h2>
            <p className="author-section">by <Link className="author-name" to={`/authors/${book.author && book.author._id}`}>{book.author && book.author.name}</Link></p>
            <p><Link className="category-name" to={`/categories/${book.category && book.category._id}`}>{book.category && book.category.name}</Link></p>
            <div className="book-rating">
                <ReactStars
                count={5}
                size={25}
                value={book.avgRate}
                edit={false}
                color2={'#F99A3D'} />
                <h4><span className="ratings-number">{book.rate && book.rate.length}</span> ratings</h4>
            </div>
            <p>{book.description}</p>
        </div>
    );
};

export default Details;