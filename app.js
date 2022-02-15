// express
const express = require("express");
const app = express();

//imports
require("dotenv").config();
require('express-async-errors')
const productsRoute = require("./routes/products");
const connectDB = require("./db/connect");
const notFound = require('./middleware/not-found')
const errorHandlerMiddlewareFunction = require('./middleware/error-handler')
const productsRouter = require('./routes/products')


//middlewares
app.use(express.json());
app.use("/api/v1/products", productsRoute);

//routes
app.get("/", (req, res) => {
	res.send("hello home route");
});

app.use('/api/v1/products', productsRouter)


app.use(notFound)
app.use(errorHandlerMiddlewareFunction)

//server
const startServer = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => console.log(`server running`));
	} catch (error) {
		console.log(error);
	}
};

startServer();
