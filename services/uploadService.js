
module.exports = {
    userImage: async (uid, body) => {
        return Promise.resolve({ body: body });
    },
    productImage: async (pid, uid, body) => {
        return Promise.resolve({  });
    }
}