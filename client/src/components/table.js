import React from 'react';
import '../styles/table.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Table = ({ cols, data, editUrl, delUrl, del, options }) => {
    return (
        <table id="table">
            <thead>
                <tr>
                    {cols.map((col, id) => {
                        return (
                            <th key={id}>{Array.isArray(col) ? col[0] : col}</th>
                        );
                    })}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((record) => {
                    return (
                        <tr key={record._id}>
                            {cols.map((col, id) => {
                                return (
                                    <td key={id}>
                                        { col === "image"?
                                            <img style={{width: "50px", height: "50px"}} src= {typeof record[col] == 'object' && record[col] != null
                                                ? 
                                                "http://localhost:5000/"+record[col]                                               :
                                                record[col] == 0 ? "-" : "http://localhost:5000/"+record[col]
                                            }/>
                                            : Array.isArray(col)
                                                ? 
                                                record[col[0]][col[1]]
                                                : 
                                                record[col] == 0 ? "-" : record[col]
                                        }

                                    </td>
                                );
                            })}
                            {
                            options 
                            ?
                            <td>
                                <select name="category" id="category" onChange={event => options[1](event, record._id)}>
                                    {
                                        options[0].map(option => {
                                            return option === record.status
                                            ?
                                            <option disabled selected value={option}>{option}</option>
                                            :
                                            <option value={option}>{option}</option>
                                        })
                                    }
                                </select>
                            </td>
                            :
                            <td className="actions">
                                <Link to={{
                                    pathname: editUrl,
                                    state: {
                                        record
                                    }
                                }} className="edit-record"><FontAwesomeIcon icon={faEdit}/></Link>
                                {del ?
                                    <a onClick={() => del(record)} className="delete-record"><FontAwesomeIcon icon={faTrash}/></a>
                                    :
                                    <Link to={{
                                        pathname: delUrl,
                                        state: {
                                            record
                                        }
                                    }} className="delete-record"><FontAwesomeIcon icon={faTrash}/></Link>
                                }
                            </td>
                            }
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;