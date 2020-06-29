import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Card, Button, Spinner } from 'react-bootstrap'
import useProductSearch from '../components/hooks/useProductSearch'
import axios from 'axios'
import ShowProducts from '../components/showProducts'
import {
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";
import { authHeader } from '../components/config/config'

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

const SearchResults = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const {
    productss,
    hasMore,
    loading,
    error
  } = useProductSearch(id, pageNumber)

  console.log(productss)

  useEffect(() => {
    setPageNumber(1)
  }, [id])

  useEffect(() => {
    setProducts(productss)
  }, [productss])



  const observer = useRef()

  const lastProductElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])


  const addToCartHandler = (productId) => {
    axios.post(`${domain}/users/addToCart?productId=${productId}`, authHeader,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    ).then(response => {
      console.log(response)
    }
    ).catch(
        (e) => {
          console.log(e);
        }
      )
  }
  return (
    <>
      {
        products &&
        <ShowProducts products={products} setProducts={setProducts} addToCart={addToCartHandler} showAddToCartButton={false} lastProductElementRef={lastProductElementRef} />
      }
      <div className="container" style={{ margin: 'auto', marginTop: '20vh', width: '20%' }}>
        {
          loading &&
          <div className="row">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        }
      </div>
      <div>{error && 'Error'}</div>
    </>
  )

}

export default SearchResults