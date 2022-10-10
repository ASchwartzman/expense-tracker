import React from "react"
import { FlatList, StyleSheet } from "react-native"

import { expense } from "../../model/expense"
import ExpenseListItem from "./ExpenseListItem"

type Props = {
  expenses: expense[]
}

export default function ExpensesList({ expenses }: Props) {
  function renderExpenseItem(item: expense) {
    return <ExpenseListItem item={item} />
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderExpenseItem(item)}
    />
  )
}

const styles = StyleSheet.create({})
