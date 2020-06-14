module.exports = {
    start: (schObj) => {

    },
    stop: (schObj) => {

    },
    log: (type, msg) => {
        console.log(`-----------------start-----------------`);
        console.log(`-------scheduler: ${new Date()}--------`);
        console.log(`${type}: ${msg}`);
        console.log(`-------scheduler: ${new Date()}--------`);
        console.log(`-----------------end-------------------`);
    },
    add: () => {
        
    },
    get: () => {

    },
    remove: () => {

    },
    update: () => {

    }
}