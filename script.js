const addExpense = document.getElementById('addExpense');
const addExpenseCard = document.getElementById('addExpenseCard');
const addExpenseForm = document.getElementById('addExpenseForm');
const dataStore = [];



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


    dataStore.push(new newEntry(data.amount,data.catagory,data.date,data.description))

    console.log(dataStore);

    document.getElementById("amountValue").innerText = data.amount;
    document.getElementById("catagoryValue").innerText = data.catagory;
    document.getElementById("dateValue").innerText = data.date;
    document.getElementById("descriptionValue").innerText = data.description;
})