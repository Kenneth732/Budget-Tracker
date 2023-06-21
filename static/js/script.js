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

// Create a new instance of FinanceTracker
const tracker = new FinanceTracker();

// DOM elements
const incomeValue = document.querySelector('.budget__income-value');
const expensesValue = document.querySelector('.budget__expenses-value');
const totalValue = document.querySelector('.budget__total-value');
const typeSelect = document.querySelector('.add__type');
const descriptionInput = document.querySelector('.add__description');
const valueInput = document.querySelector('.add__value');
const addButton = document.querySelector('.add__btn');
const itemList = document.querySelector('.item-list');

// Function to update the budget UI
function updateBudgetUI() {
    const incomes = tracker.entries
        .filter(entry => entry.type === 'income')
        .reduce((sum, entry) => sum + parseFloat(entry.value), 0);

    const expenses = tracker.entries
        .filter(entry => entry.type === 'expense')
        .reduce((sum, entry) => sum + parseFloat(entry.value), 0);

    const budget = incomes - expenses;

    incomeValue.textContent = `+$${incomes.toFixed(2)}`;
    expensesValue.textContent = `-$${expenses.toFixed(2)}`;
    totalValue.textContent = budget >= 0 ? `+$${budget.toFixed(2)}` : `-$${Math.abs(budget).toFixed(2)}`;
}

// Function to add a new entry to the tracker
function addEntry() {
    const type = typeSelect.value;
    const description = descriptionInput.value;
    const value = parseFloat(valueInput.value);

    if (!description || isNaN(value) || value <= 0) {
        return;
    }

    const entry = tracker.addEntry(type, description, value);
    createItemElement(entry);
    updateBudgetUI();

    descriptionInput.value = '';
    valueInput.value = '';
    descriptionInput.focus();
}

// Function to delete an entry from the tracker
function deleteEntry(id) {
    const isDeleted = tracker.deleteEntry(id);
    if (isDeleted) {
        const itemElement = document.getElementById(`item-${id}`);
        itemElement.parentNode.removeChild(itemElement);
        updateBudgetUI();
    }
}

// Function to create an item element
function createItemElement(entry) {
    const itemElement = document.createElement('div');
    itemElement.className = 'item clearfix';
    itemElement.id = `item-${entry.id}`;

    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'item__description';
    descriptionElement.textContent = entry.description;
    itemElement.appendChild(descriptionElement);

    const valueElement = document.createElement('div');
    valueElement.className = 'item__value';
    valueElement.textContent = entry.getFormattedValue();
    itemElement.appendChild(valueElement);

    const deleteElement = document.createElement('div');
    deleteElement.className = 'item__delete';
    itemElement.appendChild(deleteElement);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'item__delete--btn';
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => deleteEntry(entry.id));
    deleteElement.appendChild(deleteButton);

    itemList.appendChild(itemElement);
}

// Event listener for add button click
addButton.addEventListener('click', addEntry);

// Event listener for Enter key press in value input
valueInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        addEntry();
    }
});
