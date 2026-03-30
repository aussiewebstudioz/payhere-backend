export default function handler(req, res) {
  const { amount, order, name } = req.query;

  const merchantId = process.env.PAYHERE_MERCHANT_ID;

  if (!amount || !order || !name) {
    return res.status(400).send("Missing required parameters");
  }

  // 
  const returnUrl = "https://www.swingsbyryzu.com/thank_you";
  const cancelUrl = "https://www.swingsbyryzu.com/orders/{order-id}/authenticate";
  const notifyUrl = "https://payhere-backend-zm4p.vercel.app/api/payhere-webhook";

  const payHereUrl =
    "https://www.payhere.lk/pay/checkout?" +
    "merchant_id=" + merchantId +
    "&return_url=" + encodeURIComponent(returnUrl) +
    "&cancel_url=" + encodeURIComponent(cancelUrl) +
    "&notify_url=" + encodeURIComponent(notifyUrl) +
    "&order_id=" + order +
    "&items=" + encodeURIComponent("Order " + order) +
    "&currency=LKR" +
    "&amount=" + amount +
    "&first_name=" + encodeURIComponent(name);

  res.redirect(payHereUrl);
}
