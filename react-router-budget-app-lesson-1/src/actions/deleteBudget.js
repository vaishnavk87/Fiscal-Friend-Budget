import { redirect } from "react-router-dom";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { toast } from "react-toastify";

export function deleteBudget({params}){
    try{
        deleteItem({
        key: "budgets",
        id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    });
    
    associatedExpenses.forEach(expense => {
        deleteItem({
            key: "expenses",
            id: expense.id,
        });
    });
    
    toast.success("Budget deleted successfully");
    }
    catch(e){
        throw new Error("There was an error deleting your budget");
    }
    return redirect("/");
}