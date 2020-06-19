import React, { useState, useEffect } from 'react';
// import './Home.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// import Register from "../auth/Register";
// import UserPage from '../user/userPage/userPage';
const Home = () => {
  // const [Products, setProducts] = useState([]);
  const [popularProducts, setpopulaProducts] = useState([]);
//   const [popularAuthors, setpopularAuthors] = useState([]);
//   const [poularCategories, setpoularCategories] = useState([]);
const catId = useParams()['catId'];

const domain=`${process.env.REACT_APP_BACKEND_DOMAIN}`
  // const ProductsURL = `http://localhost:5000/Products`;
  const CategoryProducts = `${domain}/products/${catId}`;
 
  useEffect(() => {
    // axios.get(ProductsURL, {
    //   headers: {
    //     'Authorization': 'Bearer ' + localStorage.getItem("token")
    //   }
    // }).then(response => {
    //   // console.log(response.data);
    //   setProducts(response.data);
    // }).catch(err => {
    //   console.log(err);
    // });
    axios.get(CategoryProducts, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }).then(response => {
      // console.log(response.data);
      setpopulaProducts(response.data);
    }).catch(err => {
      console.log(err);
    });
    
  }, []);

  return (
    <>
      {/* { localStorage.getItem("token") ? (<UserPage />) : ( */}
        <div className="main-container">
          <div key="left-div" className="left-div">
            <fieldset key="Products" className="popular">
              <legend> <strong>Popular Products</strong></legend>
              <ul>
                {
                  popularProducts.map(book => {
                    return (
                      <li className="popular-list-item">
                        <Link key={ book.name } to={ `/Products/${book._id}` }>{ book.name }</Link>
                      </li>
                    );
                  })
                }

              </ul>
            </fieldset>

            <fieldset key="authors" className="popular">
              <legend> <strong>Popular Authors</strong></legend>
              <ul>
                {
                  popularProducts.map(book => {
                    return (
                      <li className="popular-list-item">
                        <Link key={ book.author.firstName } to={ `/authors/${book.author._id}` }>{ book.author.firstName }</Link>
                      </li>
                    );
                  })
                }
              </ul>
            </fieldset>
            <fieldset key="categories" className="popular">
              <legend> <strong>Popular Categories</strong></legend>
              <ul>
                {
                  popularProducts.map(category => {
                    const id = category.category._id;
                    const url = `/categories/${id}`;
                    return (

                      <li className="popular-list-item">

                        <Link key={ category.category.name } to={ url }>{ category.category.name }</Link>
                      </li>
                    );
                  })
                }

              </ul>
            </fieldset>
          </div>

          <div key="right-div" className="right-div">
            {/* { localStorage.getItem("token") ? (<UserPage />) : ( <Register /> ) } */ }
            {/* <Register /> */}
          </div>

        </div>) 
        
        {/* } */}

    </>
  );
};

export default Home;