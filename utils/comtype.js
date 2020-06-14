const ComTypes = {
    roles: {
        user: 'User',
        admin: 'Admin',
        client: 'Client',
        visitor:'Visitor'
    },
    tokenType: {
        tempToken: 'TEMP_TOKEN',
        accessToken: 'ACCESS_TOKEN',
        refreshToken: 'REFRESH_TOKEN'
    },
    defaultPaging: {
        index: 0,
        size: 20
    },
    sendEmailTo: {
        mobile: 'MOBILE',
        email: 'EMAIL'
    }
}


module.exports = ComTypes;