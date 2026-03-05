import razorpay from "../config/razorpay.js";

export const createPayment = async (req, res, next) => {
  try {
    const options = {
      amount: req.body.amount * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
     console.error("Razorpay Error:", error);
    next(error);
  }
};
