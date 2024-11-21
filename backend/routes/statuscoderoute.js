const crypto = require('crypto');
const express = require('express');
const router = express.Router();

const merchantSecret = "MTcxNjYzOTYzNTMzMDAyOTM1MTcxMTExMjg4NTE5NDEzNzUwMTU2MQ=="; // Replace with your actual secret
const merchantid = "1228344";
const orderid = "Order002";
const payhereamount = "600";
const payherecurrency = "LKR";
const statuscode = "2";


router.post('/payment/notify', (req, res) => {


    console.log("notif endpoint reacheddddddddd");
    const {
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
        md5sig,
    } = req.body;

    console.log("Notification received:", {
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
        md5sig,
    });

    // Generate the local md5sig
    const localMd5sig = crypto
        .createHash('md5')
        .update(
            merchant_id +
            order_id +
            payhere_amount +
            payhere_currency +
            status_code +
            crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase()
        )
        .digest('hex')
        .toUpperCase();

        console.log("md5 thing is",localMd5sig );

    // Verify the md5sig
    if (md5sig ===  localMd5sig) {
        console.log("Payment verified successfully with status:", status_code);

        // Process the payment based on the status code
        if (status_code === "2") {
            console.log("Payment was successful.");
            // Update your database here
        } else if (status_code === "0") {
            console.log("Payment is pending.");
            // Handle pending status
        } else {
            console.log("Payment failed or was canceled.");
            // Handle failure or cancellation
        }

        res.status(200).send("Notification processed successfully");
    } else {
        console.error("Invalid notification received. md5sig does not match.");
        res.status(400).send("Invalid notification");
    }
});

module.exports = router;






router.post('/payment/test', (req, res) => {
    const {
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
    
    } = req.body;

    console.log("Notification received:", {
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
        
    });

    // Generate the local md5sig
    const localMd5sig = crypto
        .createHash('md5')
        .update(
            merchant_id +
            order_id +
            payhere_amount +
            payhere_currency +
            status_code +
            crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase()
        )
        .digest('hex')
        .toUpperCase();

        console.log("md5 thing is",localMd5sig );

        const Md5sig = crypto
        .createHash('md5')
        .update(
            merchantid +
            orderid +
            payhereamount +
            payherecurrency +
            statuscode +
            crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase()
        )
        .digest('hex')
        .toUpperCase();

        console.log("md5 thing is",Md5sig );

  
});

module.exports = router;