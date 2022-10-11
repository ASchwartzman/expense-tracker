import { StyleSheet, Text, View } from "react-native"
import React from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"

import { getDateMinusdays } from "../utils/date"

import { useExpenseContext } from "../store/expenses-context"

export default function RecentExpensesScreen() {
  const { expenses } = useExpenseContext()

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
