const comTypes = require('../utils/comtype');

module.exports = async (req, res) => {
    this.filterOption = {};
    const query = req.query;
    const params = req.params;
    const filterLists = {
        products: {
            id: { type: 'Array', isNullable: true, name: '_id' },
            price: { type: 'Array', isNullable: true, name: 'price' },
            vgType: { type: 'Array', isNullable: true, name: 'veg_type' },
            discount: { type: 'Array', isNullable: true, name: 'discount' },
            category: { type: 'Array', isNullable: true, name: 'category' },
            brandName: { type: 'Array', isNullable: true, name: 'product_brand' },
            subcategory: { type: 'Array', isNullable: true, name: 'subcategory' },
        },
        params: {
            qid: { type: 'String', isNullable: true, name: '_id' },
            qcategory: { type: 'String', isNullable: true, name: 'category' },
            qsubcategory: { type: 'String', isNullable: true, name: 'subcategory' },
        }
    }
    for (const key in filterLists) {
        if (filterLists.hasOwnProperty(key)) {
            const element = filterLists[key];
            this.filterOption[key] = {};
            if (typeof element === "object") {
                for (const subKey in element) {
                    if (element.hasOwnProperty(subKey)) {
                        const subElement = element[subKey];
                        if (!query[subKey] && !params[subKey]) { continue; };
                        if (subElement.type && subElement.type.toLowerCase() === 'string') {
                            this.filterOption[key][subElement.name] = (query[subKey]) ? query[subKey] : params[subKey];
                        } else if (subElement.type && subElement.type.toLowerCase() === 'array') {
                            this.filterOption[key][subElement.name] = [];
                            this.filterOption[key][subElement.name] = (query[subKey]) ? query[subKey].split(',') : params[subKey].split(',');
                        }
                    }
                }
            }
        }
    }

    this.filterOption.paging = {
        size: (query["pagesize"] && query["pagesize"] < 50 && query["pagesize"] > 0) ? query["pagesize"] : comTypes.defaultPaging.size,
        index: (query["pageindex"]) ? (query["pageindex"] - 1) : comTypes.defaultPaging.index
    };
    
    return this.filterOption;
}