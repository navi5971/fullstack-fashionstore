import md5 from 'crypto-js/md5';

const merchantId = 'yourMerchantId';
const merchantSecret = 'yourMerchantSecret';

app.post('/api/generate-hash', (req, res) => {
    const { orderId, amount, currency } = req.body;

    // Format amount to two decimal places
    const amountFormatted = parseFloat(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
    }).replaceAll(',', '');

    // Hash the merchant secret
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();

    // Generate the hash for this transaction
    const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret)
        .toString()
        .toUpperCase();

    // Send back the hash and merchantId
    res.json({ hash, merchantId });
});
