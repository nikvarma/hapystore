module.exports = {
    profile: [
        {
            minlength: 5,
            maxlength: 16,
            required: true,
            name: "fname",
            label: "First Name"
        },
        {
            minlength: 5,
            maxlength: 16,
            required: true,
            name: "lname",
            label: "Last Name"
        },
        {
            name: "city",
            minlength: 3,
            maxlength: 40,
            required: true,
            label: "City"
        },
        {
            name: "pincode",
            minlength: 4,
            maxlength: 8,
            required: true,
            label: "Pincode"
        },
        {
            name: "fulladdress",
            minlength: 8,
            maxlength: 250,
            required: true,
            label: "Full Address"
        }
    ],
    password: [
        {
            name: "pwd",
            minlength: 6,
            maxlength: 20,
            required: true,
            label: "Password"
        },
        {
            name: "confirmpwd",
            minlength: 6,
            maxlength: 20,
            required: true,
            label: "Confirm Password"
        }
    ]
}