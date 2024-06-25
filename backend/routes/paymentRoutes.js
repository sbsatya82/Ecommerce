const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');

require('dotenv').config({path:"backend/config/.env"});


const phonePeMerchantId = process.env.PHONEPE_MARCHANT_ID;
const phonePeSecretKey = process.env.PHONEPE_SALT_KEY;
const phonePeBaseUrl = process.env.PHONEPE_BASE_URL;



router.post('/createOrder', async (req, res) => {
  const merchantTransactionId = req.body.orderId;
  const data = {
    merchantId: phonePeMerchantId,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: req.body.MUID,
    name: req.body.name,
    amount: req.body.amount * 100,
    redirectUrl: `http://localhost:8000/api/v1/status/?id=${merchantTransactionId}`,
    redirectMode: 'POST',
    mobileNumber: req.body.contactNo,
    paymentInstrument: {
      type: 'PAY_PAGE'
    }
  };
  console.log(data);
  const payload = JSON.stringify(data);
  const payloadMain = Buffer.from(payload).toString('base64');

  const keyIndex = 1;
  const string = payloadMain + '/pg/v1/pay' + phonePeSecretKey;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + keyIndex;
  const prod_URL = phonePeBaseUrl;

  const options = {
    method: 'POST',
    url: prod_URL,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum
    },
    data: {
      request: payloadMain
    }
  };

  console.log(options);
  console.log('calling.......');
  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message,
      success: false
    });
  }
  console.log('calling end.......');
});




router.post("/status", async (req, res) => {
  const merchantTransactionId = req.query.id
  const merchantId = phonePeMerchantId
  const keyIndex = 1;
  const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + phonePeSecretKey;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + "###" + keyIndex;

  const options = {
      method: 'GET',
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': `${merchantId}`
      }
  };

  // CHECK PAYMENT TATUS
  axios.request(options).then(async (response) => {
          console.log(response.data);
         

      // Set the cookie with response data
      res.cookie('paymentInfo', response.data, { httpOnly: false, maxAge: 3600000 }); // Cookie valid for 1 hour

          if (response.data.success === true) {
              const url = `http://localhost:5173/success`
              return res.redirect(url)
          } else {
              const url = `http://localhost:5173/failure`
              return res.redirect(url)
          }
      })
      .catch((error) => {
          console.error(error);
      });

});

module.exports = router;