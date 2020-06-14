module.exports = {
    createSuccess: (str) => {
        return `${str} created successfully.`;
    },
    updateSuccess: (str) => {
        return `${str} updated successfully.`;
    },
    fetchSuccess: (str) => {
        return `${str} fetched successfully.`;
    },
    validateSuccess: (str) => {
        return `${str} validated successfully.`;
    },
    tryAgain: (str) => {
        return `${str}, please try again.`;
    },
    somethingWentWrong: (str) => {
        return `${str}, something went wrong please try again.`;
    }
}