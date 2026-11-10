const addExpense = document.getElementById('addExpense');
const addExpenseCard = document.getElementById('addExpenseCard');
const addExpenseForm = document.getElementById('addExpenseForm');
const displayCard = document.getElementById('displayCard');
const submitBtn = addExpenseForm.querySelector('button[type="submit"]');
let dataStore = [];
let editId = null; // null = adding new, otherwise the id of the entry being edited
class newEntry {
    constructor(id, amount, catagory, date, description) {
        this.id = crypto.randomUUID();
        this.amount = amount;
        this.catagory = catagory;
        this.date = date;
        this.description = description;
    }
}
// Open the form empty, for adding
addExpense === null || addExpense === void 0 ? void 0 : addExpense.addEventListener('click', () => {
    editId = null;
    addExpenseForm.reset();
    submitBtn.innerText = 'Submit';
    addExpenseCard.classList.toggle('show');
});
// Submit: add new OR update existing
addExpenseForm === null || addExpenseForm === void 0 ? void 0 : addExpenseForm.addEventListener('submit', (event) => {
    var _a, _b, _c, _d;
    event.preventDefault();
    const data = Object.fromEntries(new FormData(addExpenseForm).entries());
    if (editId === null) {
        // ADD
        dataStore.push(new newEntry(String((_a = data.id) !== null && _a !== void 0 ? _a : crypto.randomUUID()), // or String(data.id ?? "")
        Number(data.amount), // if amount expects a number (or String(data.amount ?? ""))
        String((_b = data.catagory) !== null && _b !== void 0 ? _b : ""), new Date(String((_c = data.date) !== null && _c !== void 0 ? _c : "")), String((_d = data.description) !== null && _d !== void 0 ? _d : "")));
        ;
    }
    else {
        // UPDATE the existing entry (keeps the same id)
        const entry = dataStore.find((item) => item.id === editId);
        if (entry) {
            entry.amount = Number(data.amount);
            entry.catagory = String(data.catagory);
            entry.date = new Date(String(data.date));
            entry.description = String(data.description);
            editId = null;
        }
    }
    addExpenseForm.reset();
    addExpenseCard === null || addExpenseCard === void 0 ? void 0 : addExpenseCard.classList.remove('show');
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
        newAmount.innerText = String(item.amount);
        newCatagory.innerText = item.catagory;
        newDate.innerText = String(item.date);
        newDescription.innerText = item.description;
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => { var _a; return startEdit((_a = item.id) !== null && _a !== void 0 ? _a : ""); });
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => { var _a; return deleteEntry((_a = item.id) !== null && _a !== void 0 ? _a : ""); });
        card.append(newAmount, newCatagory, newDate, newDescription, editButton, deleteButton);
        displayCard.appendChild(card);
    });
}
// Fill the form with this entry's values and show it
function startEdit(id) {
    const item = dataStore.find((entry) => entry.id === id);
    editId = id;
    if (item) {
        addExpenseForm.elements.namedItem('amount').value = String(item.amount);
        addExpenseForm.elements.namedItem('catagory').value = String(item.catagory);
        addExpenseForm.elements.namedItem('date').value = item.date.toISOString();
        addExpenseForm.elements.namedItem('description').value = String(item.description);
    }
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
export {};
//# sourceMappingURL=script.js.map