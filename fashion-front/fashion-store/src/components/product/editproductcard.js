"use client";

import React , {useState}from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../../actions/cartactions";
import imgsrc from '../../images/img1.jpg';
import Ratings from "../reviews";
import { patchProductData } from "../actions/itemaction";


export default function EditItemcard({item}){
    const [quantity, setquantity]=useState(1);
    const [variant, setvariant]=useState('small');
    const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const dispatch = useDispatch()
function addtocart()
{
dispatch(addToCart(item,quantity,variant))
}  


if (!item) {
    return <div>Loading...</div>; // Fallback UI
}
console.log("item in Itemcard:", item);



const price = item.prices?.[variant] * quantity || 0;
console.log("Item prices:", item.prices); // Log to confirm structure



return(
        <div className="m-5 shadow p-3 mb-5 bg-white rounded " style={{marginTop: "100px"}}>
            <div onClick={handleShow}>
            <h1>{item.name}</h1>
            <img src= {imgsrc} className="img-fluid" style={{height:'200px' , width:'200px'}}/>
            </div>
            <div className="flex-container d-flex">
                <div className="w-100 m-1">

                    <p>variants</p>
                    <select className="form-control"  style ={{ width:"100px" }} value={variant} onChange={(e) => setvariant(e.target.value)}>
                        {item.variants.map((variant) => (
                            <option key={variant} value={variant}>{variant}</option>
                        ))}
                    </select>
                   
                    
                </div>
                <div className="w-100 m-1">
                    <p>quantity</p>
                    <select className="form-control"   style ={{ width:"100px", marginRight:"800px"}} value={quantity} onChange={(e)=>{setquantity(e.target.value)}} 
                        >
                        {[...Array(10).keys()].map((x , i)=>{
                            return <option value={i+1}>{i+1}</option>
                        })}
                    </select>

                </div>
                
            </div>
            <div className="flex-container">
                <div className='m-1 w-100'>
                    <p>Price : {price} LKR</p>
                </div>
                <div className="m-1 w-100">
                    <button className="btn" onClick={addtocart}>add to cart</button>
                </div>
                <div>
                    
                </div>
               
            </div>
    <>
    
</>
        </div>
    );
}