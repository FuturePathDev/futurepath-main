import React, { useEffect, useState } from "react";
import "../styles/BudgetPlanner.css";


const BudgetPlanner = () => {
  const [income, setIncome] = useState("");
  const [savingsGoal, setSavingsGoal] = useState("");
  const [expenses, setExpenses] = useState([{ label: "", amount: "" }]);
  const [status, setStatus] = useState("");

  const userId = "test123"; // Later make this dynamic via context or props

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await fetch(
          `https://1t529kitz3.execute-api.us-east-1.amazonaws.com/dev/getBudget?userId=${userId}`
        );
        const data = await res.json();

        if (res.ok) {
          setIncome(data.income || "");
          setSavingsGoal(data.savingsGoal || "");
          setExpenses(data.expenses || [{ label: "", amount: "" }]);
        } else {
          setStatus("No budget found. Please enter and save your data.");
        }
      } catch (err) {
        setStatus("Error loading budget data.");
      }
    };

    fetchBudget();
  }, []);

  const handleExpenseChange = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = field === "amount" ? Number(value) : value;
    setExpenses(updated);
  };

  const addExpense = () => {
    setExpenses([...expenses, { label: "", amount: "" }]);
  };

  const removeExpense = (index) => {
    const updated = [...expenses];
    updated.splice(index, 1);
    setExpenses(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    const payload = {
      userId,
      income: Number(income),
      savingsGoal: Number(savingsGoal),
      expenses: expenses.filter((e) => e.label && e.amount),
    };

    try {
      const res = await fetch(
        "https://1t529kitz3.execute-api.us-east-1.amazonaws.com/dev/SaveParentBudget",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setStatus("Budget saved successfully.");
      } else {
        const error = await res.json();
        setStatus(`Error: ${error.message}`);
      }
    } catch (err) {
      setStatus("Save failed. Please try again.");
    }
  };

  return (
    <div className="budget-planner-container">
      <h2>Budget & Savings Planner</h2>
      <form onSubmit={handleSubmit}>
        <label>Monthly Income:</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
        />

        <label>Savings Goal:</label>
        <input
          type="number"
          value={savingsGoal}
          onChange={(e) => setSavingsGoal(e.target.value)}
          required
        />

        <h4>Expenses:</h4>
        {expenses.map((expense, index) => (
          <div key={index} className="expense-row">
            <input
              type="text"
              placeholder="Label"
              value={expense.label}
              onChange={(e) =>
                handleExpenseChange(index, "label", e.target.value)
              }
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) =>
                handleExpenseChange(index, "amount", e.target.value)
              }
              required
            />
            <button
              type="button"
              onClick={() => removeExpense(index)}
              disabled={expenses.length === 1}
            >
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addExpense}>
          Add Expense
        </button>

        <button type="submit">Save Budget</button>
        <p>{status}</p>
      </form>
    </div>
  );
};

export default BudgetPlanner;
