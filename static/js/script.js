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

// add method for deleteentry
FinanceTracker.prototype.deleteEntry = function (id) {
    const index = this.entries.findIndex(entry => entry.id === id);
    if (index !== -1) {
        this.entries.splice(index, 1);
        return true;
    }
    return false;
};

// add method for getEntry
FinanceTracker.prototype.getEntries = function () {
    return this.entries;
};
function Finance(type, description, value) {
    this.type = type;
    this.description = description;
    this.value = value;
}

Finance.prototype.getFormattedValue = function () {
    const sign = this.type === 'income' ? '+' : '-';
    return `${sign}$${this.value.toFixed(2)}`;
};
