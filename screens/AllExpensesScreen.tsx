import React from "react"
import { StyleSheet } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"

import { useExpenseContext } from "../store/expenses-context"

export default function AllExpensesScreen() {
  const { expenses } = useExpenseContext()

  return (
    <ExpensesOutput
      periodName="Total"
      expenses={expenses}
      fallbackText="No registered expenses found"
    />
  )
}

const styles = StyleSheet.create({})
