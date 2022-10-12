import React, { useLayoutEffect, useState } from "react"
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
import {
  deleteExpenseBackend,
  storeExpense,
  updateExpenseBackend,
} from "../utils/http"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import ErrorOverlay from "../components/ui/ErrorOverlay"

type NavProps = NativeStackScreenProps<StackParamList, "ManageExpense">

export default function ManageExpense({ route, navigation }: NavProps) {
  const [isSendingData, setIsSendingData] = useState(false)
  const [error, setError] = useState<string>(null)
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
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    })
  }, [navigation, isEditing])

  async function deleteExpenseHandler() {
    setIsSendingData(true)
    try {
      await deleteExpenseBackend(editedExpenseId)
      deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError("Could not delete expense! \n" + error.message)
    }

    setIsSendingData(false)
  }

  async function confirmHandler(expenseData: ExpenseInputs) {
    if (isEditing) {
      setIsSendingData(true)
      try {
        await updateExpenseBackend(editedExpenseId, expenseData)
        updateExpense(editedExpenseId, expenseData)
        navigation.goBack()
      } catch (error) {
        setError("Could not update expense! \n" + error.message)
      }
      setIsSendingData(false)
    } else {
      setIsSendingData(true)
      try {
        const id = await storeExpense(expenseData)
        addExpense({ id, ...expenseData })
        navigation.goBack()
      } catch (error) {
        setError("Could not create new expense! \n" + error.message)
      }

      setIsSendingData(false)
    }
  }

  function cancelHandler() {
    navigation.goBack()
  }

  if (isSendingData) {
    return <LoadingOverlay />
  }

  if (error && !isSendingData) {
    return (
      <ErrorOverlay errorMessage={error} onConfirm={() => setError(null)} />
    )
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
