import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { expense } from "../../model/expense"
import { GlobalStyles } from "../../constants/styles"

type Props = {
  periodName: string
  expenses: expense[]
}

export default function ExpensesSummary({ expenses, periodName }: Props) {
  const expensesSum = expenses.reduce((acc, expense) => {
    return acc + expense.amount
  }, 0)

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
  },
  period: {
    fontSize: 14,
    color: GlobalStyles.colors.primary500,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
  },
})
