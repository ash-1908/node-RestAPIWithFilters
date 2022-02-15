// controllers

//model import
const Product = require("../models/product");

// functions
const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({ rating: { $gte: 4 } });
	res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
	//extract params from url query
	const {
		name,
		company,
		featured,
		rating,
		price,
		createdAt,
		sort,
		fields,
		numericFilter,
	} = req.query;

	//variable for search based on keywords
	let searchQuery = {};

	//searchQuery
	if (name) searchQuery.name = { $regex: name, $options: "i" };
	if (company) searchQuery.company = company;
	if (featured) searchQuery.featured = featured === "true" ? "true" : "false";
	if (rating) searchQuery.rating = rating;
	if (price) searchQuery.price = price;
	if (createdAt) searchQuery.createdAt = createdAt;

	//numeric filters
	if (numericFilter) {
		const symbolMap = {
			">": "$gt",
			">=": "$gte",
			"<": "$lt",
			"<=": "$lte",
			"=": "$eq",
		};
		const symbRegex = /\b(<|>|=|<=|>=)\b/g;
		let filterConstr = numericFilter.replace(
			symbRegex,
			(match) => `-${symbolMap[match]}-`
		);

		const options = ["price", "rating"];
		filterConstr = filterConstr.split(",").forEach((item) => {
			const [field, op, value] = item.split("-");
			if (options.includes(field)) {
				searchQuery[field] = { [op]: Number(value) };
			}
		});
	}

	//variable holding our method
	let result = Product.find(searchQuery);

	//sort feature
	if (sort) {
		const sortList = sort.split(",").join(" ");
		result = result.sort(sortList);
	}

	//display specific fields feature
	if (fields) {
		const field = fields.split(",").join(" ");
		result = result.select(field);
	}

	//set limit and skip of result
	const limit = Number(req.query.limit) || 10;
	const page = Number(req.query.page) || 1;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	const products = await result;
	res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
