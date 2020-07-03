import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/search.scss';
import { Link } from "react-router-dom";
import DropDown from './dropDown';


const Search = () => {
  
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [showDropDown,setShowDropDown]= useState(false)
    const domain= `${process.env.REACT_APP_BACKEND_DOMAIN}`

    useEffect(() => {
        if (searchInput.length > 1) {
            axios.get(`${domain}/search/suggestion`, {
                params: {
                    q: searchInput,
                }
            })
                .then(function (response) {
                    setSuggestedProducts(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [searchInput])

    useEffect(()=>{
        setShowDropDown(true);
    },[])
    const handleChange = (e) => { 
        setSearchInput(true)
        if(e.target.value==""){
            setSuggestedProducts([])
            setSearchInput("") 
        }
        else{            
            setSearchInput(e.target.value)
        }
    }
    return (     
        
            showDropDown ?
                <DropDown options={suggestedProducts} handleChange={handleChange} searchInput={searchInput} fieldName="name" to="/search/s"/>  :''     
        
    )

}
export default Search