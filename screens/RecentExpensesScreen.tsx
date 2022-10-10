import { StyleSheet, Text, View } from "react-native"
import React from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"

import { useExpenseContext } from "../store/expenses-context"

export default function RecentExpensesScreen() {
  const { expenses } = useExpenseContext()
  return <ExpensesOutput periodName="Last 7 days" expenses={expenses} />
}

const styles = StyleSheet.create({})
