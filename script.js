"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addExpense = document.getElementById('addExpense');
const addExpenseCard = document.getElementById('addExpenseCard');
const addExpenseForm = document.getElementById('addExpenseForm');
const displayCard = document.getElementById('displayCard');
const submitBtn = addExpenseForm.querySelector('button[type="submit"]');
let dataStore = [];
let editId = null; // null = adding new, otherwise the id of the entry being edited
class newEntry {
    constructor(amount, catagory, date, description) {
        this.id = crypto.randomUUID();
        this.amount = amount;
        this.catagory = catagory;
        this.date = date;
        this.description = description;
    }
}
// Open the form empty, for adding
addExpense.addEventListener('click', () => {
    editId = null;
    addExpenseForm.reset();
    submitBtn.innerText = 'Submit';
    addExpenseCard.classList.toggle('show');
});
// Submit: add new OR update existing
addExpenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(addExpenseForm).entries());
    if (editId === null) {
        // ADD
        dataStore.push(new newEntry(data.amount, data.catagory, data.date, data.description));
    }
    else {
        // UPDATE the existing entry (keeps the same id)
        const entry = dataStore.find((item) => item.id === editId);
        entry.amount = data.amount;
        entry.catagory = data.catagory;
        entry.date = data.date;
        entry.description = data.description;
        editId = null;
    }
    addExpenseForm.reset();
    addExpenseCard.classList.remove('show');
    render();
});
// Draw every entry from dataStore, each with its own Edit and Delete buttons
function render() {
    displayCard.innerHTML = '';
    dataStore.forEach((item) => {
        const card = document.createElement('div');
        const newAmount = document.createElement('h6');
        const newCatagory = document.createElement('h6');
        const newDate = document.createElement('h6');
        const newDescription = document.createElement('h6');
        newAmount.innerText = item.amount;
        newCatagory.innerText = item.catagory;
        newDate.innerText = item.date;
        newDescription.innerText = item.description;
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => startEdit(item.id));
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteEntry(item.id));
        card.append(newAmount, newCatagory, newDate, newDescription, editButton, deleteButton);
        displayCard.appendChild(card);
    });
}
// Fill the form with this entry's values and show it
function startEdit(id) {
    const item = dataStore.find((entry) => entry.id === id);
    editId = id;
    addExpenseForm.elements['amount'].value = item.amount;
    addExpenseForm.elements['catagory'].value = item.catagory;
    addExpenseForm.elements['date'].value = item.date;
    addExpenseForm.elements['description'].value = item.description;
    submitBtn.innerText = 'Update';
    addExpenseCard.classList.add('show');
}
// Remove this entry and redraw
function deleteEntry(id) {
    dataStore = dataStore.filter((item) => item.id !== id);
    if (editId === id) { // deleted the one being edited
        editId = null;
        addExpenseForm.reset();
        addExpenseCard.classList.remove('show');
    }
    render();
}
//# sourceMappingURL=script.js.map