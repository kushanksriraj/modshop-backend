const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const connectDB = require('./db/db.connect');

const productRouter = require('./router/products.router');
const cartRouter = require('./router/cart.router');
const wishListRouter = require('./router/wishlist.router');
const userRouter = require('./router/users.router');
const orderRouter = require('./router/orders.router');
const addressRouter = require('./router/address.router');
const paymentRouter = require('./router/payment.router');
const userDataRouter = require('./router/user-data.router');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Refer to the API docs at github.com/kushanksriraj/formula-modshop"
  });
});

app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/wish-list", wishListRouter);
app.use("/user-data", userDataRouter);
app.use("/orders", orderRouter);
app.use("/address", addressRouter);
app.use("/payments", paymentRouter);
app.use("/user", userRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.json({
    success: false,
    error: err.message
  });
});

app.use( (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Undefined endpoint!"
  });
})

app.listen(PORT, () => {
  console.log('server started');
});

/**
 * Wrap any async function in catchError.
 * catchError sends the error to error handler middleware.
 * No need to wrap sync functions as their error is
 * automatically caught by the error handler middleware.
 */