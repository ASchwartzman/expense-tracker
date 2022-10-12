import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"

import { getDateMinusdays } from "../utils/date"

import { useExpenseContext } from "../store/expenses-context"
import { fetchExpenses } from "../utils/http"
import { expense } from "../types/expense"

export default function RecentExpensesScreen() {
  const { expenses, setExpenses } = useExpenseContext()

  useEffect(() => {
    async function getExpenses() {
      const fetchedExpenses = await fetchExpenses()
      setExpenses(fetchedExpenses)
    }
    getExpenses()
  }, [])

  const recentExpenses = expenses.filter((exp) => {
    const today = new Date()
    return exp.date >= getDateMinusdays(today, 7)
  })

  return (
    <ExpensesOutput
      periodName="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No recent expenses found"
    />
  )
}

const styles = StyleSheet.create({})
