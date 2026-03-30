import crypto from "crypto";

export default function handler(req, res) {
  let { amount, order, name } = req.query;
amount = parseFloat(amount).toFixed(2);

  const merchantId = "253545";
  const merchantSecret = "MzI3NDA1Njk4MzI0MDg1NzgzNzIyODcyMTA0OTEzMTkyNzk3Njk4";
  const currency = "LKR";

  // Step 1: hash the merchant secret
  const secretHash = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

  // Step 2: create final hash string EXACTLY in this order
  const hashString = merchantId + order + amount + currency + secretHash;

  // Step 3: final hash
  const hash = crypto
    .createHash("md5")
    .update(hashString)
    .digest("hex")
    .toUpperCase();

  res.send(`
    <html>
      <body onload="document.forms[0].submit()">
        <form method="POST" action="https://www.payhere.lk/pay/checkout">
          <input type="hidden" name="merchant_id" value="${merchantId}" />
          <input type="hidden" name="order_id" value="${order}" />
          <input type="hidden" name="items" value="Order ${order}" />
          <input type="hidden" name="currency" value="${currency}" />
          <input type="hidden" name="amount" value="${amount}" />
          <input type="hidden" name="first_name" value="${name}" />
          <input type="hidden" name="hash" value="${hash}" />
        </form>
      </body>
    </html>
  `);
}
