import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { expense } from "../../model/expense"
import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"

type Props = {
  expenses?: expense[]
  periodName: string
  fallbackText?: string
}

export default function ExpensesOutput({
  expenses,
  periodName,
  fallbackText,
}: Props) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  infoText: {
    color: GlobalStyles.colors.primary800,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
    fontWeight: "bold",
  },
})
