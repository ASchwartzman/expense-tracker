import React, { createContext, useContext, useReducer } from "react"

import { expense } from "../model/expense"

type ExpenseInputs = {
  title: string
  amount: number
  date: Date
}

type Props = {
  children: React.ReactNode
}

type Action =
  | { type: "ADD"; payload: ExpenseInputs }
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
  addExpense: ({}: ExpenseInputs) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, {}: ExpenseInputs) => {},
})

export function useExpenseContext() {
  return useContext(ExpenseContext)
}

function expensesReducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString()
      const newExpense: expense = { id, ...action.payload }
      return { expenses: [newExpense, ...state.expenses] }
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
  const expenses = DUMMY_EXPENSES

  const [expensesState, dispatch] = useReducer(expensesReducer, {
    expenses: DUMMY_EXPENSES,
  })

  function addExpense(expenseData: ExpenseInputs) {
    dispatch({ type: "ADD", payload: expenseData })
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
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}

const DUMMY_EXPENSES: expense[] = [
  {
    id: "e1",
    title: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-10-09"),
  },
  {
    id: "e2",
    title: "A pair of trousers",
    amount: 89.99,
    date: new Date("2022-10-07"),
  },
  {
    id: "e3",
    title: "Some bananas",
    amount: 9.99,
    date: new Date("2022-09-08"),
  },
  {
    id: "e4",
    title: "Book",
    amount: 49.99,
    date: new Date("2022-06-15"),
  },
  {
    id: "e5",
    title: "Another Book",
    amount: 18.59,
    date: new Date("2022-10-04"),
  },
  {
    id: "e6",
    title: "A smartphone",
    amount: 359.0,
    date: new Date("2022-06-09"),
  },
  {
    id: "e7",
    title: "A smartphone",
    amount: 359.0,
    date: new Date("2022-06-09"),
  },
  {
    id: "e8",
    title: "A smartphone",
    amount: 359.0,
    date: new Date("2022-06-09"),
  },
  {
    id: "e9",
    title: "A smartphone",
    amount: 359.0,
    date: new Date("2022-06-09"),
  },
  {
    id: "e10",
    title: "A smartphone",
    amount: 359.0,
    date: new Date("2022-06-09"),
  },
  {
    id: "e11",
    title: "A smartphone",
    amount: 359.0,
    date: new Date("2022-06-09"),
  },
]
