const mongoose = require('mongoose');
const productsModel = require('../db/dbschemas/products');

module.exports = {
    get: async (filter) => {
        let pageSize = filter.paging.size;
        let pageIndex = filter.paging.index;
        let filters = (filter && filter.products) ? filter.products : {};
        let productList = productsModel.find(filters)
            .select({
                mrp: true,
                label: true,
                discount: true,
                veg_type: true,
                category: true,
                product_w: true,
                product_w: true,
                subcategory: true,
                product_desc: true,
                product_image: true,
                product_brand: true,
                product_packdesc: true
            }).limit(pageSize).skip(pageSize * pageIndex).lean();
        let productCount = productsModel.find(filters).countDocuments();
        let products = await Promise.all([productList, productCount]);
        return { products: products[0], count: products[1] }
    },
    getById: async(pid) => {
        let p = undefined;
        const isValidObjectId = mongoose.isValidObjectId(pid);
        if (isValidObjectId) {
            const _id = mongoose.Types.ObjectId(pid);
            p = await productsModel.findOne({ id: _id }).select({ _id: true, maxOrderCount: true }).lean();
        }
        return Promise.resolve({ product: p, isValid: ((p) ? true : false) });
    }
}
