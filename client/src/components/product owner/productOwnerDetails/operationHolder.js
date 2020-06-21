import React from 'react';
import ReactStars from 'react-rating-stars-component';
import '../../styles/operation_holder.scss';
import { updateBookStatus, rateBook } from '../../API/book';
import {getUserData} from "../../utils/utils";
import { handleSuccess, handleError } from '../../errors/book';

const OperationHolder = ({ book, setBook, setAlert, alert }) => {
    const addToShelve = (event) => {
        const status = event.target.value;
        updateBookStatus(getUserData()._id, book._id, status).then(res => {
            setBook({
                ...book,
                status
            });
            handleSuccess(setAlert, 'Book added to shelve successfully', 5000);
        }).catch(err => handleError(setAlert, 'Server error'))
    }

    const rate = (newRate) => {
        console.log(book._id);
        rateBook(book._id, newRate).then(res => {
            setBook({
                ...book,
                userRate: newRate
            });
            handleSuccess(setAlert, 'Your book rate is submitted successfully', 5000);
        }).catch(err => handleError(setAlert, 'Server error'))
    }
    return (
        <div className="left-card">
            <img className="book-img" src={book.image ? `${process.env.REACT_APP_BACKEND_URL}${book.image}` : "https://www.esm.rochester.edu/uploads/NoPhotoAvailable-335x419.jpg"}/>
            <select className="shelve-options" name="category" id="category" value={book.status} onChange={addToShelve} >
                <option disabled value="not selected">Add to shelve</option>
                <option value="read">Read</option>
                <option value="reading">Reading</option>
                <option value="want to read">Want to read</option>
            </select>
            <ReactStars
            count={5}
            onChange={rate}
            size={40}
            value={book.userRate ? book.userRate : 0}
            color2={'#F99A3D'} />
        </div>
    );
};

export default OperationHolder;