import React from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"

import { expense } from "../../types/expense"
import { ExpenseListProps } from "../../types/ReactComponentsTypes"
import ExpenseListItem from "./ExpenseListItem"

export default function ExpensesList({ expenses }: ExpenseListProps) {
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

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 24,
  },
})
