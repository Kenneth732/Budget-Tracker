// JavaScript code for Budget Tracker
function FinanceTracker() {
    this.entries = [];
    this.currentId = 0;
}

// add method for entry
FinanceTracker.prototype.addEntry = function (type, description, value) {
    const entry = new Finance(type, description, value);
    entry.id = ++this.currentId;
    this.entries.push(entry);
    return entry;
};
