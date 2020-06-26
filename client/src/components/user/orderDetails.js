import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { authHeader } from '../config/config'
import RateService from '../rateService'

const fontStyle = {
    fontSize: '12px',
    margin: '1px',
    fontWeight: '200'
}

const Order = (props) => {
    const [order, setOrder] = useState([])
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

    const { id } = props.match.params
    useEffect(() => {
        axios.get(`${domain}/orders/${id}`, authHeader).
            then((res) => {
                console.log(res.data)
                setOrder(res.data)
                calculateTotalCost()
            }).catch(e => {
                console.log(e)
            })
    }, [])

    const calculateTotalCost = () => {

    }

    return (
        <>
            <div className="order">
                <h4>Order Info</h4>
                <div className="row">
                    <div className="col-4">
                        <p style={fontStyle}>{`#${order._id}`}</p>
                    </div>
                    <div className="col-4">
                        <h6>{`${order.status}`}</h6>
                        <p style={fontStyle}>{order.from && `From: ${order.from.street}, ${order.from.area}, ${order.from.city}`}</p>
                        <p style={fontStyle}>{order.to && `To: ${order.to.street}, ${order.to.area}, ${order.to.city}`}</p>
                    </div>
                    <div className="col-4">
                        <p style={fontStyle}>{order.service && `Shipped by: ${order.service.name}`}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 offset-8">
                        <p style={{ fontSize: '12px', margin: '1px', fontWeight: '800' }}>{order.cost && `Total: ${order.cost} EGP`}</p>
                    </div>

                </div>
            </div>
            <div className="order" >
                <div className="row">
                    <div className="col-4">
                        {order.products && order.products.length == 0 &&
                            <>
                                <p style={{ fontSize: '12px', margin: '1px', fontWeight: '400' }}>{`${order.item}`}</p>
                                <p style={{ fontSize: '12px', margin: '1px', fontWeight: '400' }}>{`${order.description}`}</p>
                            </>
                        }
                    </div>
                    <div className="col-4">
                        {order.products && order.products.length == 0 &&
                            <>
                                <p style={fontStyle}>{order.amount && `Quantity: ${order.amount}`}</p>

                            </>
                        }

                    </div>
                    {order.products && order.products.length == 0 &&
                        <div className='col-4'>
                            {order.service &&
                                <p style={fontStyle}>
                                    Rate this service
                         </p>}
                            {
                                order.rate &&
                                <RateService serviceId={order.service && order.service._id} rate={order.rate && order.rate.rating || 0} order={order._id} />
                            }
                        </div>

                    }
                </div>


                {order.products && order.products.length > 0 &&

                    <div className='row' style={{ 'overflow-y': 'scroll', 'overflow-x': 'hidden', height: '40vh' }} >

                        {order.products.map(product =>
                            <>
                                <div className="col-4">
                                    <p style={{ fontSize: '14px', margin: '1px', fontWeight: '800' }}>{`${product.product.name}`}</p>
                                    <p style={{ fontSize: '12px', margin: '1px', fontWeight: '400' }}>{`${product.product.description}`}</p>

                                </div>
                                <div className="col-4">
                                    <img src={`${domain}/${product.product.images_path[0]}`} />
                                </div>
                                <div className="col-4">
                                    <p style={{ ...fontStyle, fontWeight: '500', fontSize: '14px' }}>{product.amount && `Sold By: ${product.product.owner.marketName}`}</p>
                                    <p style={{ ...fontStyle, fontWeight: '500', fontSize: '14px' }}>{product.amount && `Quantity: ${product.amount}`}</p>
                                </div>
                                <hr style={{ width: '80%', height: '20px' }} />
                            </>
                        )

                        }



                    </div>


                }
            </div>
        </>

    )


}

export default Order