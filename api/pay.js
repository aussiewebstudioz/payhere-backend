export default function handler(req, res) {
  const { amount, order, name } = req.query;

  const merchantId = process.env.PAYHERE_MERCHANT_ID;

  if (!amount || !order || !name) {
    return res.status(400).send("Missing required parameters");
  }

  const returnUrl = "https://swingsbyryzu.com";
  const cancelUrl = "https://swingsbyryzu.com";
  const notifyUrl = "https://payhere-backend-zm4p-41pxjx4to-aussiewebstudioz-2297s-projects.vercel.app/api/payhere-webhook";

  res.send(`
    <html>
      <body onload="document.forms[0].submit()">
        <form method="POST" action="https://www.payhere.lk/pay/checkout">
          <input type="hidden" name="merchant_id" value="${merchantId}" />
          <input type="hidden" name="return_url" value="${returnUrl}" />
          <input type="hidden" name="cancel_url" value="${cancelUrl}" />
          <input type="hidden" name="notify_url" value="${notifyUrl}" />
          <input type="hidden" name="order_id" value="${order}" />
          <input type="hidden" name="items" value="Order ${order}" />
          <input type="hidden" name="currency" value="LKR" />
          <input type="hidden" name="amount" value="${amount}" />
          <input type="hidden" name="first_name" value="${name}" />
        </form>
      </body>
    </html>
  `);
}
