import React, { useState, useEffect } from 'react';
import Alert from '../alerts/alert';
import OperationHolder from './productOwnerDetails/operationHolder';
import Details from './productOwnerDetails/details';
import '../../styles/details.scss';

const ProductOwnerDetails = (props) => {
    const [ alert, setAlert ] = useState({
        errors: false,
        success: false,
        message: ''
    });

    return (
        <>
            <div className="book-container">
                {
                    alert.errors || alert.success
                    && 
                    <Alert message={alert.message} type={alert.errors && "error" || alert.success && "success"}/>
                }
                <div className="upper-card">
                    <OperationHolder book={book} setBook={setBook} setAlert={setAlert} alert={alert}/>
                    <Details book={book}/>
                </div>
                <div className="bottom-card">
                </div>
            </div>
        </>
    )
}

export default ProductOwnerDetails;