const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionList = document.getElementById('transactionList');
const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');
const netBalance = document.getElementById('netBalance');
const addTransactionBtn = document.getElementById('addTransactionBtn');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateUI() {
    transactionList.innerHTML = '';
    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.classList.add(transaction.type);
        listItem.textContent = `${transaction.description}: $${transaction.amount}`;
        transactionList.appendChild(listItem);

        if (transaction.type === 'income') {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    totalIncome.textContent = `$${income}`;
    totalExpense.textContent = `$${expense}`;
    netBalance.textContent = `$${income - expense}`;
}

function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (!description || isNaN(amount)) {
        alert("Please provide valid inputs");
        return;
    }

    const transaction = { description, amount, type };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    descriptionInput.value = '';
    amountInput.value = '';
    updateUI();
}

addTransactionBtn.addEventListener('click', addTransaction);

updateUI();