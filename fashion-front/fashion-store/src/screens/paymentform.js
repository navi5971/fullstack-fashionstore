import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function Payment() {
    const [hash, setHash] = useState("");
    

    const orderId = "Order002";
        const amount = "600";
        const currency = "LKR";

    const handleSubmit = async (e) => {
        
        e.preventDefault(); // Prevent default form submission

      

        console.log("Submitting form to generate hash...");

        try {
            const response = await fetch('http://localhost:5000/h/generate-hash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, amount, currency }),
            });

            if (!response.ok) throw new Error('Failed to generate hash');

            const { hash } = await response.json();
            console.log('Generated Hash:', hash);
            setHash(hash); // Update hash state

           
            // Programmatically submit the form
            document.getElementById('payhere-checkout-form').submit();
            console.log("submiietedd the formmmmmm")
        } catch (error) {
            console.error('Error generating hash:', error);
        }
    };

    return (
        <div className="form">
            <div className="card-header" style={{ color: '#FDFFFE' }}>
                <h2>Test Payment with PayHere</h2>
            </div>
            <form
                method="POST"
                action="https://sandbox.payhere.lk/pay/checkout"
                id="payhere-checkout-form"
                onSubmit={handleSubmit}

                
            >
                <input type="hidden" name="merchant_id" value="1228344" />
                <input type="hidden" name="return_url" value="http://localhost:5000/payment/success" />
                <input type="hidden" name="cancel_url" value="http://localhost:5000/payment/cancel" />
                
                <input type="hidden" name="notify_url" value="http://localhost:5000/payment/notify" />

                <div className="form-group">
                    <label htmlFor="order_id">Order ID:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="order_id"
                        name="order_id"
                        value={orderId}
                     
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="items">Items Description:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="items"
                        name="items"
                        value="Test Product"
                        
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="currency">Currency:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="currency"
                        name="currency"
                        value={currency}
                       
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="amount"
                        name="amount"
                        value={amount}
                       
                    />
                </div>

                <p>Customer Details</p>
                <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input className="form-control" type="text" name="first_name" value="Saman"  />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input className="form-control" type="text" name="last_name" value="Perera"  />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input className="form-control" type="text" name="email" value="samanp@gmail.com"  />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input className="form-control" type="text" name="phone" value="0771234567"  />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input className="form-control" type="text" name="address" value="No.1, Galle Road"  />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input className="form-control" type="text" name="city" value="Colombo"  />
                </div>

                <input type="hidden" name="country" value="Sri Lanka" />
                <input type="hidden" name="hash" value="55FC5E34E6502A0F60975FACD534184A" />

                <button type="submit"  value="Buy Now" className="btn btn-success" style={{ background: "#1B5C4A" }}   >
                    Buy Now
                </button>
            </form>
        </div>
    );
}

export default Payment;
