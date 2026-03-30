import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());


const MERCHANT_ID = "253545";
const MERCHANT_SECRET = "MzI3NDA1Njk4MzI0MDg1NzgzNzIyODcyMTA0OTEzMTkyNzk3Njk4";


app.post("/api/payhere-checkout", async (req, res) => {
  try {
    const { order_id, items, amount, customer } = req.body;

    const payload = {
      merchant_id: MERCHANT_ID,
      return_url: "https://swingsbyryzu.com",
      cancel_url: "https://swingsbyryzu.com",
      notify_url: "https://payhere-backend-zm4p-3wwnd51kx-aussiewebstudioz-2297s-projects.vercel.app",
      order_id,
      items,
      amount,
      currency: "LKR",
      first_name: customer.firstName,
      last_name: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      country: "Sri Lanka",
    };

    const response = await axios.post("https://www.payhere.lk/pay/checkout", payload);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Checkout failed" });
  }
});

// Route to handle PayHere notifications
app.post("/api/payhere-notify", (req, res) => {
  const paymentData = req.body;

  // Verify payment status
  if (paymentData.status === "SUCCESS") {
    console.log("Payment successful:", paymentData);
    // TODO: Verify signature using MERCHANT_SECRET before updating DB
  } else {
    console.log("Payment failed:", paymentData);
  }

  res.sendStatus(200); // Always respond 200 to PayHere
});

export default app;
