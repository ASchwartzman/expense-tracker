import React, { useLayoutEffect } from "react"
import { StyleSheet, TextInput, View } from "react-native"

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import Button from "../components/ui/Button"
import IconButton from "../components/ui/IconButton"
import { GlobalStyles } from "../constants/styles"
import { ExpenseInputs, StackParamList } from "../types/ReactComponentsTypes"

import { useExpenseContext } from "../store/expenses-context"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"
import { getFormattedDate } from "../utils/date"
import { expense } from "../types/expense"

type NavProps = NativeStackScreenProps<StackParamList, "ManageExpense">

export default function ManageExpense({ route, navigation }: NavProps) {
  const { expenses, deleteExpense, addExpense, updateExpense } =
    useExpenseContext()

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  let initialState = {
    amount: "",
    date: getFormattedDate(new Date()),
    title: "",
  }
  let editedExpense = null

  if (isEditing) {
    editedExpense = expenses.find((expense) => expense.id === editedExpenseId)
    // initialState = {
    //   amount: editedExpense.amount.toString(),
    //   date: getFormattedDate(editedExpense.date),
    //   title: editedExpense.title,
    // }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler() {
    deleteExpense(editedExpenseId)
    navigation.goBack()
  }

  function confirmHandler(expense: ExpenseInputs) {
    if (isEditing) {
      updateExpense(editedExpenseId, expense)
    } else {
      addExpense(expense)
    }
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultlValues={editedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconName="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
})
