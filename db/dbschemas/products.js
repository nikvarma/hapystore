const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const ProductSchema = new mongoose.Schema({
    mrp: { type: Number, required: true },
    vmrp: { type: Number, required: true },
    label: { type: String, required: true },
    discount: { type: Number, required: true },
    veg_type: { type: String, required: true },
    category: { type: String, required: true },
    product_w: { type: String, required: true },
    rating_info: { type: Array, required: true },
    subcategory: { type: String, required: true },
    product_desc: { type: String, required: true },
    product_image: { type: String, required: true },
    vendor: { type: String, required: true, alias: "supplier" },
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    product_brand: { type: String, required: true, alias: "brand" },
    product_packdesc: { type: String, required: true, alias: "packdesc" }
});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;