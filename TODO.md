What apis can be there?

Model wise:

1. users  DONE  TESTED
- POST /user/new to add new user
- POST /user to authenticate
- GET /user/:id to get user name, email


2. products   DONE  TESTED
- GET /products to get all the products
- GET /products/:id to get data of one product

 
3. wishlist  DONE TESTED
- GET /wish-list/:userId to get all the products in wishlist
- POST /wish-list/:userId/ to add new product to wishlist
- DELETE /wish-list/:userId/:productId to delete a product from wishlist


4. cart DONE  TESTED
- GET /cart/:userId to get all the products in cart
- POST /cart/:userId to add new product to cart
- POST /cart/:userId/:productId to modify quantity
- DELETE /cart/:userId/:productId to delete a product from cart


5. address  DONE  TESTED
- GET /address/:userId to get all the addresses
- POST /address/:userId to add new address
- GET /address/:userId/:addressId to get one address
- POST /address/:userId/:addressId to edit address
- DELETE /address/:userId/:addressId to delete an address


6. orders DONE
- GET /orders/:userId to get all the orders
- POST /orders/:userId to add new order


7. payments  DONE  TESTED
- GET /payments/:userId to get all the payments
- POST /payments/:userId to add new payments
- GET /payments/:userId/:paymentId to get one payment
- POST /payments/:userId/:paymentId to edit payment detail
- DELETE /payments/:userId/:paymentId to delete a payment method

-> 404 page DONE


- Write more controllers 
- Write the middleware to find the document and append it to the request object