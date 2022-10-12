import { expense } from "../types/expense"
import axios from "axios"
import { ExpenseInputs } from "../types/ReactComponentsTypes"

const BACKEND_URL = "https://expense-tracker-1d975-default-rtdb.firebaseio.com/"

export async function storeExpense(expenseData: ExpenseInputs) {
  const response = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData)
  const id = response.data.name
  return id
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`)
  const expenses = []

  console.log("http.js", response.data)
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      title: response.data[key].title,
    }

    expenses.push(expenseObj)
  }

  return expenses
}

export function updateExpenseBackend(id: string, expenseData: ExpenseInputs) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData)
}

export function deleteExpenseBackend(id: string) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`)
}
