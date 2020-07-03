import React, { useState, useEffect } from 'react'
import './search.css';
import { Link } from "react-router-dom";
import useComponentVisible from './hooks/useComponentVisible'

const DropDown = (props) => {
    const [options, setOptions] = useState(props.options)
    const { searchInput } = props
    const { handleChange } = props
    const { fieldName } = props
    const { to } = props
    // const { ref, isComponentVisible } = useComponentVisible(true);
    useEffect(() => {
        setOptions(props.options)
    }, [props.options])

    return (
        <div className="dropdown" >
            <input className="landing-search-input" type="text" placeholder="Search..." value={searchInput} onChange={handleChange} onClick={()=>setOptions(props.options)} />
            {
                options.length >= 1  &&
                <div className="dropdown-content" >
                    {options.map((option,i) => {
                        return (
                            <div className="suggestion" key={i} >
                                <Link style={{ textDecoration: "none", color:"black" }}
                                to={{
                                    pathname: `/search/${option[fieldName]}`,                                    
                                    state: { products: options }
                                }}
                                onClick={()=>setOptions('')}
                              
                                >
                                    {option[fieldName]}

                                </Link>
                            </div>)
                    }
                    )}
                </div>
            }
        </div>
    )

}
export default DropDown


// to={to}