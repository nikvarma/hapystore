module.exports = {
    add: [
        {
            name: "pid",
            minlength: 11,
            maxlength: 32,
            required: true,
            label: "Product #"
        },
        {   
            name: "count",
            required: true,
            label: "Order Count"
        }
    ]
}