import { useEffect, useState } from 'react'
import axios from 'axios'
const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

export default function useProductSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [productss, setProducts]= useState([])

    useEffect(()=>{
        setProducts([])
    },[query])

    useEffect(() => {
        let cancel
        axios.get(`${domain}/search/${pageNumber}`, {
            params: {
                q: query,
            },
            cancelToken: new axios.CancelToken(c=> cancel=c)
        })
        .then(function (response) {
            setProducts(prevProducts=>{
                return [...prevProducts, ...response.data.products]
            })
            setHasMore(response.data.products.length>0)
            setLoading(false)
        })
        .catch(function (error) {
            if(axios.isCancel(error)) return
            setError(error)
        })
        return ()=> cancel()
    }, [query, pageNumber])
    return {loading, error, hasMore,productss}
}