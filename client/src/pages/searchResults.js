import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Card, Button, Spinner } from 'react-bootstrap'
import useProductSearch from '../components/hooks/useProductSearch'
import axios from 'axios'
import ShowProducts from '../components/showProducts'
import {
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

const SearchResults = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { id } = useParams()
  const {
    products,
    hasMore,
    loading,
    error
  } = useProductSearch(id, pageNumber)

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

  return (
    <>

      {
        products &&
        <ShowProducts products={products} lastProductElementRef={lastProductElementRef} />
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