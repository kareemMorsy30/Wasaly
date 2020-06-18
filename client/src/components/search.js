import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './search.css';
import { Link } from "react-router-dom";
import DropDown from './dropDown';


const Search = () => {
  
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const domain= `${process.env.REACT_APP_BACKEND_DOMAIN}`

    useEffect(() => {
        if (searchInput.length > 1) {
            axios.get(`${domain}/search/suggestion`, {
                params: {
                    q: searchInput
                }
            })
                .then(function (response) {
                    console.log(response);
                    setSuggestedProducts(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [searchInput])

    const handleChange = (e) => { 
        if(e.target.value==""){
            setSuggestedProducts([])
            setSearchInput("") 
        }
        else  setSearchInput(e.target.value)
    }
    return (
     
        <DropDown options={suggestedProducts} handleChange={handleChange} searchInput={searchInput} fieldName="name" to="/s"/>
       
    )

}
export default Search