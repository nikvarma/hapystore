const message = require('../commons/responseMessage');
const reposProfile = require('../repository/profileRepository');


module.exports = {
    profile: async (uid, uip, body) => {
        const profile = await reposProfile.updateProfile(body, uid);
        if (profile.isSuccess) {
            return Promise.resolve({ message: message.updateSuccess("Profile") });
        } else {
            return Promise.resolve({ message: message.tryAgain("Error occurred while updating profile") });
        }
    }
}