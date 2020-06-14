module.exports = {
    login: [
        {
            minlength: 8,
            maxlength: 32,
            required: true,
            name: "userid",
            label: "User Id"
        },
        {
            name: "pwd",
            minlength: 6,
            maxlength: 20,
            required: true,
            label: "Password"
        }
    ],
    register: [
        {
            minlength: 5,
            maxlength: 32,
            required: true,
            name: "fullname",
            label: "Full Name"
        },
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
            name: "mobilenumber",
            minlength: 10,
            maxlength: 13,
            required: true,
            label: "Mobile Number"
        },
        {
            name: "emailaddress",
            minlength: 5,
            maxlength: 50,
            required: true,
            label: "Email Address"
        },
        {
            name: "pwd",
            minlength: 6,
            maxlength: 20,
            required: true,
            label: "Password"
        },
        {
            minlength: 1,
            maxlength: 4,
            required: true,
            name: "countrycode",
            label: "Country Code"
        }
    ],
    resetPassword: [
        {
            name: "emailormobile",
            minlength: 8,
            maxlength: 50,
            required: true,
            label: "Email ID/Mobile Number"
        }
    ],
    updatePassword: [
        {
            name: "pwd",
            minlength: 8,
            maxlength: 20,
            required: true,
            label: "Password"
        },
        {
            name: "pwdtoken",
            minlength: 8,
            maxlength: 200,
            required: true,
            label: "Password Token"
        }
    ],
    sendActivationCode: [
        {
            name: "sendto",
            minlength: 4,
            maxlength: 8,
            required: true
        },
        {
            name: "uid",
            minlength: 8,
            maxlength: 200,
            required: true,
            label: "Request ID"
        }
    ],
    verifyActivationCode: [
        {
            name: "sendto",
            minlength: 4,
            maxlength: 8,
            required: true
        },
        {
            name: "uid",
            minlength: 8,
            maxlength: 200,
            required: true,
            label: "Request ID"
        },
        {
            name: "otp",
            minlength: 6,
            maxlength: 6,
            required: true,
            label: "Activation Code"
        }
    ]
}