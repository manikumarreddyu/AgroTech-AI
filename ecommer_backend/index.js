const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

const cartSchema = mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      category: String,
      image: String,
      qty: {
        type: Number,
        default: 1,
      },
      total: Number,
    },
  ],
});

const CartModel = mongoose.model("Cart", cartSchema);
//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  userModel.findOne({ email: email }, (err, result) => {
    // console.log(result);
    console.log(err);
    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  });
});

//api login
app.post("/login", (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
});

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)



//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
    // console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully"})
})

//
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})


// Add item to cart
app.post("/cart/add", async (req, res) => {
  const { userEmail, product } = req.body;

  try {
    let cart = await CartModel.findOne({ userEmail });

    if (!cart) {
      cart = new CartModel({ userEmail, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId == product.productId);

    if (existingItem) {
      existingItem.qty += 1; // Increase quantity
      existingItem.total = product.price*existingItem.qty; // Update total
    } else {
      const total = product.price; // Calculate total for the new item
      cart.items.push({ ...product, total });
    }

    await cart.save();
    res.status(200).send({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get user's cart
app.get("/cart/:email", async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userEmail: req.params.email });
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).send(err);
  }
});


// Delete item from cart
app.delete("/cart/delete", async (req, res) => {
  const {userEmail,productId}= req.body;

  // Check if userEmail is present
  if (!userEmail) {
    return res.status(400).json({
      success: false,
      message: "User email is required.",
    });
  }

  try {
    // Find the cart item by userEmail
    const cart = await CartModel.findOne({ userEmail }); // Use findOne to get a single cart

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user.",
      });
    }

    // Check if the item exists in the cart using productId
    const itemIndex = cart.items.findIndex(item => item.productId == String(productId));
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart.",
      });
    }

    // Remove the item from the items array
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.json({
      success: true,
      message: "Item deleted from cart successfully.",
    });
  } catch (err) {
    console.error(err.message); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Failed to delete item",
      error: err.message,
    });
  }
});


// Update item quantity in cart
app.put('/cart/update', async (req, res) => {
  const { userEmail, productId, qty } = req.body;

  console.log("Request body:", req.body);
  console.log("Searching for cart with userEmail:", userEmail);

  try {
    const cart = await CartModel.findOne({ userEmail });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found for this user.' });
    }

    // Log cart items for comparison
    console.log("Items in cart:", cart.items.map(item => ({ id: item.productId, type: typeof item.productId })));
    console.log("Product ID from request:", productId, "Type:", typeof productId);

    // Ensure the productId is compared as a string
    const filteredItems = cart.items.filter(item => item.productId === String(productId));
    
    if (filteredItems.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found in the cart.' });
    }

    // Assuming only one item matches the productId
    const itemToUpdate = filteredItems[0];
    console.log("Found item to update:", itemToUpdate);

    // Update quantity
    itemToUpdate.qty = qty;

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ success: true, updatedCart: cart.items });
    
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});









 
/*****payment getWay */
console.log(process.env.STRIPE_SECRET_KEY)


const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1N0qDnSAq8kJSdzMvlVkJdua"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "inr",
                product_data : {
                  name : item.name,
                  // images : [item.image]
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,

      }

      
      const session = await stripe.checkout.sessions.create(params)
      // console.log(session)
      res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})


//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
