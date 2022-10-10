import { StyleSheet, Text, View } from "react-native"
import React from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"

import { useExpenseContext } from "../store/expenses-context"

export default function AllExpensesScreen() {
  const { expenses } = useExpenseContext()

  return <ExpensesOutput periodName="Total" expenses={expenses} />
}

const styles = StyleSheet.create({})
