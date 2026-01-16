export const waait = () => new Promise(res =>setTimeout(res, Math.random() * 1200))

const generateRandomColor = () =>{
    const exsitingBudgetLength = fetchExpenses("budgets")?.length ?? 0;
    return `${exsitingBudgetLength * 34} 65% 50`
}
// Local storage

export const fetchExpenses = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

//Get all items from local storage
export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchExpenses(category) ?? [];

    return data.filter((item) => item[key] === value);
}

// delete item from local storage
export const deleteItem = ({key, id}) => {
    const existingData = fetchExpenses(key);
    if(id){
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
};

// create budget
export const createBudget = ({
    name, amount
}) =>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt:Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = fetchExpenses("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

export const createExpense = ({
    name, amount, budgetId
}) =>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt:Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchExpenses("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchExpenses("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if(expense.budgetId !== budgetId) return acc;
        return acc + expense.amount;
    }, 0);
    return budgetSpent;
}

//Formatting

export const formateDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

//Formatting percentages

export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

//Format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}