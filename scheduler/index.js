const scheduler = require('./scheduler');

function Scheduler() {
    this.scheduledTasks = [];
    this.isrunning = false;    
}

Scheduler.prototype.initialize = function(callback) {
    this.isrunning = true;
    if (typeof callback === "function") { callback(); }
}

Scheduler.prototype.schedule = function(name, runattime, callback) {
    if (runattime && Array.isArray(runattime)) {
        this.scheduledTasks.push({ name: name, runtime: runattime, fn: callback });
        scheduler.add(name, this.scheduledTasks);
    } else {
        scheduler.log("error", `name: ${name} has stopped. scheduler run time is incorrect, required array.`);
    }
}

module.exports = Scheduler;