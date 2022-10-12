import React, { createContext, useContext, useReducer } from "react"

import { expense } from "../types/expense"
import { ExpenseInputs } from "../types/ReactComponentsTypes"

type Props = {
  children: React.ReactNode
}

type Action =
  | { type: "ADD"; payload: expense }
  | { type: "SET"; payload: expense[] }
  | {
      type: "UPDATE"
      payload: { id: string; title: string; amount: number; date: Date }
    }
  | { type: "DELETE"; payload: { id: string } }

type State = {
  expenses: expense[]
}

const ExpenseContext = createContext({
  expenses: [] as expense[],
  addExpense: ({}: expense) => {},
  setExpenses: (expenses: expense[]) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, {}: ExpenseInputs) => {},
})

export function useExpenseContext() {
  return useContext(ExpenseContext)
}

function expensesReducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD":
      const newExpense: expense = { ...action.payload }
      return { expenses: [newExpense, ...state.expenses] }
    case "SET":
      const inverted = action.payload.reverse()
      return { expenses: inverted }
    case "UPDATE":
      const updatableExpenseIndex = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      )
      const updatableExpense = state.expenses[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload }
      const updatedExpenses = [...state.expenses]
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return { expenses: updatedExpenses }
    case "DELETE":
      return {
        expenses: state.expenses.filter((exp) => exp.id !== action.payload.id),
      }
    default:
      return state
  }
}

export default function ExpensesContextProvider({ children }: Props) {
  const [expensesState, dispatch] = useReducer(expensesReducer, {
    expenses: [],
  })

  function addExpense(expenseData: expense) {
    dispatch({ type: "ADD", payload: expenseData })
  }

  function setExpenses(expenses: expense[]) {
    dispatch({ type: "SET", payload: expenses })
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: { id } })
  }

  function updateExpense(id: string, expenseData: ExpenseInputs) {
    dispatch({ type: "UPDATE", payload: { id, ...expenseData } })
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses: expensesState.expenses,
        addExpense,
        setExpenses,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}
