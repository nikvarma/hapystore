const comTypes = require('../utils/comtype');
const userModel = require('../db/dbschemas/user');

module.exports = {
    updateProfile: async (usr, uid) => {
        if (!usr) {
            return Promise.resolve({ isSuccess: false });
        } else {
            const user = await userModel.updateOne({ _id: uid },{
                city: usr.city,
                fname: usr.fname,
                lname: usr.lname,
                pincode: usr.pincode,
                fullname: usr.fullname,
                fulladdress: usr.fulladdress
            });
            return Promise.resolve({ isSuccess: true });
        }
    },
    updatePassword: async (pwd, uid) => {
        await userModel.updateOne({ uid: uid }, {
            pwd: pwd
        });
        return Promise.resolve({ isSuccess: true });
    }
}