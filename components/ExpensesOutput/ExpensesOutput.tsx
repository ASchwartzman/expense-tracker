import React from "react"
import { StyleSheet, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { expense } from "../../model/expense"
import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"

type Props = {
  expenses?: expense[]
  periodName: string
}

export default function ExpensesOutput({ expenses, periodName }: Props) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <ExpensesList expenses={expenses} />
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
})
