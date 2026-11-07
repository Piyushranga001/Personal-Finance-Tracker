const addExpense = document.getElementById('addExpense');
const addExpenseCard = document.getElementById('addExpenseCard');
const addExpenseForm = document.getElementById('addExpenseForm');
const dataStore = [];
const displayCard = document.getElementById('displayCard');



addExpense.addEventListener('click' , () => {
    addExpenseCard.classList.toggle('show');
})

addExpenseForm.addEventListener('submit' ,(event) =>{
    event.preventDefault();

    class newEntry {
        constructor(amount,catagory,date,description){
            this.amount = amount;
            this.catagory = catagory;
            this.date = date;
            this.description = description;
        }
    }

    const formData = new FormData(addExpenseForm);

    const data = Object.fromEntries(formData.entries());

    const entries = new newEntry(data.amount,data.catagory,data.date,data.description)
    console.log(entries);
    
    dataStore.push(entries)

    const newAmount = document.createElement('h6');
    const newCatagory = document.createElement('h6');
    const newDate = document.createElement('h6');
    const newDescription = document.createElement('h6');

    newAmount.innerText = data.amount
    newCatagory.innerText = data.catagory
    newDate.innerText = data.date
    newDescription.innerText = data.description

    displayCard.appendChild(newAmount)
    displayCard.appendChild(newCatagory)
    displayCard.appendChild(newDate)
    displayCard.appendChild(newDescription)

})