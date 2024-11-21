

async function initiatePayment(orderId, amount, currency) {
    // Collect necessary parameters from user input or order data
    const response = await fetch('/api/generate-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, amount, currency })
    });
    
    const { hash, merchantId } = await response.json();
    
    // Use these details for the PayHere form or API
    console.log('Generated Hash:', hash);
    console.log('Merchant ID:', merchantId);
}
