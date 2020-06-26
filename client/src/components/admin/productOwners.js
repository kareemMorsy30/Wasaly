import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFlag, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from '../table';
import Modal from '../product owner/modal';
import Info from '../alerts/info';
import Moment from 'react-moment';
import { allProductOwners, deleteProductOwner } from '../../endpoints/admin';
import { handleSuccess } from '../../errors/handleAlerts';
import Alert from '../alerts/alert';

const AdminProductOwners = (props) => {
    const cols = ["marketName", ["user", "name"], "marketPhone"];
    const [productOwners, setProductOwners] = useState([]);
    const [ alert, setAlert ] = useState({
        errors: false,
        success: false,
        message: ''
    });

    useEffect(() => {
        allProductOwners().then(owners => setProductOwners(owners));
    } ,[]);

    function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const createdAtA = a.createdAt;
        const createdAtB = b.createdAt;
      
        let comparison = 0;
        if (createdAtA > createdAtB) {
          comparison = 1;
        } else if (createdAtA < createdAtB) {
          comparison = -1;
        }
        return comparison;
    }

    const deleteRecord = (record) => {
        deleteProductOwner(record.user._id)
        .then(deletedOwner => {
            setProductOwners(productOwners.filter(owner => owner.user._id !== deletedOwner._id));
            handleSuccess(setAlert, `User ${deletedOwner.name} deleted successfully`, 5000);
        })
    }

    const flag = ({record}) => {
        return (
            <FontAwesomeIcon className="flagged" icon={faFlag} color={record.reports && record.reports.length > 0 ? 'red' : 'silver'}/>
        );
    }

    const description = ({record}) => {
        return (
            <>
            <h4 className="text-center">Reports</h4>
            {
                record.reports && record.reports.length > 0
                ?
                record.reports.sort(compare).map(report => {
                    return (
                    <>
                    <label className="modal-title">{report.user.name && report.user.name}:</label>
                    <Moment style={{color: 'black', fontSize: 'small'}} format="D MMM YYYY" withTitle>{report.createdAt}</Moment>
                    <textarea placeholder="More info" value={report.message} readOnly/>
                    </>
                    );
                })
                :
                <Info msg="No reports yet!"/>
            }
            </>
        );
    }

    return (
        <>
        <div className="card_one" style={{backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71'}}>
            {alert.errors || alert.success ?
                <Alert alert={alert}/>
                :
                <>
                    <h5>All product owners</h5>
                </>
            }
        </div>
        <div className="card_two">
            <Table del={deleteRecord} data={productOwners} cols={cols}><Modal Flag={flag} Description={description}/></Table>
        </div>
        </>
    )
}

export default AdminProductOwners;