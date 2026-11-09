const addExpense = document.getElementById('addExpense') as HTMLButtonElement;
const addExpenseCard = document.getElementById('addExpenseCard') as HTMLBodyElement;
const addExpenseForm   = document.getElementById('addExpenseForm') as HTMLFormElement;
const displayCard = document.getElementById('displayCard') as HTMLBodyElement
const submitBtn  = addExpenseForm.querySelector('button[type="submit"]') as HTMLButtonElement;



type dataStoreType = {
    id? : string
    amount  : number;
    catagory : string;
    date : Date ;
    description : string;
}

let dataStore : dataStoreType[] = [];


let editId : string | null = null; // null = adding new, otherwise the id of the entry being edited

class newEntry {
    id : string
    amount : number
    catagory : string
    date : Date
    description :string

    constructor(id : string,amount : number, catagory : string, date : Date, description :string) {
        this.id = crypto.randomUUID();
        this.amount  = amount;
        this.catagory = catagory;
        this.date = date;
        this.description = description;
    }
}

// Open the form empty, for adding
addExpense?.addEventListener('click', () => {
    editId = null;
    addExpenseForm.reset();
    submitBtn.innerText = 'Submit';
    addExpenseCard.classList.toggle('show');
});

// Submit: add new OR update existing
addExpenseForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(addExpenseForm).entries());

    if (editId === null) {
        // ADD
        dataStore.push(
  new newEntry(
    String(data.id ?? crypto.randomUUID()), // or String(data.id ?? "")
    Number(data.amount),                    // if amount expects a number (or String(data.amount ?? ""))
    String(data.catagory ?? ""),
    new Date(String(data.date ?? "")),
    String(data.description ?? "")
  )
);;
    } else {
        // UPDATE the existing entry (keeps the same id)

        const entry = dataStore.find((item) => item.id === editId);

        if(entry){
            entry.amount = Number(data.amount);
            entry.catagory = String(data.catagory);
            entry.date = new Date(String(data.date));
            entry.description = String(data.description);
            editId = null;

        }
    }

    addExpenseForm.reset();
    addExpenseCard?.classList.remove('show');
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
        editButton.addEventListener('click', () => startEdit(item.id ?? ""));


        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteEntry(item.id ?? ""));

        card.append(newAmount, newCatagory, newDate, newDescription, editButton, deleteButton);
        displayCard.appendChild(card);
    });
}

// Fill the form with this entry's values and show it
function startEdit(id : string) {
    const item = dataStore.find((entry) => entry.id === id);
    editId = id;
    if(item){
        (addExpenseForm.elements.namedItem('amount') as HTMLInputElement).value = String(item.amount);
        (addExpenseForm.elements.namedItem('catagory') as HTMLInputElement).value = String(item.catagory);
        (addExpenseForm.elements.namedItem('date') as HTMLInputElement ).value =  item.date.toISOString();
        (addExpenseForm.elements.namedItem('description') as HTMLInputElement) .value = String(item.description);
    }

    submitBtn.innerText = 'Update';
    addExpenseCard.classList.add('show');
}

// Remove this entry and redraw
function deleteEntry(id : string) {
    dataStore = dataStore.filter((item) => item.id !== id);

    if (editId === id) { // deleted the one being edited
        editId = null;
        addExpenseForm.reset();
        addExpenseCard.classList.remove('show');
    }
    render();
}