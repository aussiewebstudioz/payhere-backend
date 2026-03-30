export default function handler(req, res) {
  const { amount, order, name } = req.query;

  const merchantId = process.env.PAYHERE_MERCHANT_ID;

  if (!amount || !order || !name) {
    return res.status(400).send("Missing order details.");
  }

  const payHereUrl = `https://www.payhere.lk/pay/checkout?merchant_id=${merchantId}&amount=${amount}&order_id=${order}&items=Order+${order}&first_name=${name}`;

  res.redirect(payHereUrl);
}
