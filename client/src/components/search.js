import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './search.css';
import { Link } from "react-router-dom";


const Search = (props) => {
    const [products, setProducts] = useState([])
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        if (searchInput.length > 1) {
            axios.get('http://localhost:8000/search/suggestion', {
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
        else    
        setSearchInput(e.target.value)
    }
    return (
        <div className="dropdown">
            <input type="text" value={searchInput} onChange={handleChange} />
            {
            suggestedProducts.length>1&&
            <div className="dropdown-content">               
                {suggestedProducts.map((product)=>{
                    console.log(product)
                    return(
                    <div className="suggestion">
                        <Link to="/s">{product.name}</Link>
                    </div>)
                    }
                )}
            </div>
            }   
        </div>
    )

}
export default Search