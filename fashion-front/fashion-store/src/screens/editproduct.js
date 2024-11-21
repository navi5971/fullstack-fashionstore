import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Itemcard from '../components/product/itemcard';


import { getAllitems } from '../actions/itemactions';


export default function EditItem() {

    const dispatch = useDispatch()

    const itemsstate = useSelector(state => state.getAllItemsReducer)

    const{items, error, loading } = itemsstate
    useEffect(() => {
        dispatch(getAllitems())
    }, [])



    return (
        <div>
            <div className='row'  >

                {loading ? (<h1>loading</h1>) : error ? (<h1>something went wrong</h1>) : (

                    items.map(item => {
                        return <div className='col-md-4 'key = {item._id} style={{marginTop:"60px"}}>
                            <div className='m-3'>
                                <Itemcard item={item} rating={item.rating} />
                                
                            </div>

                        </div>
                    })

                )}





            </div>
        </div>
    );
}