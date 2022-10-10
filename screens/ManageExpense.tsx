import { StyleSheet, Text, View } from "react-native"
import React, { useLayoutEffect } from "react"

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StackParamList } from "../routes/MainStack"
import IconButton from "../components/ui/IconButton"
import { GlobalStyles } from "../constants/styles"
import Button from "../components/ui/Button"

type NavProps = NativeStackScreenProps<StackParamList, "ManageExpense">

export default function ManageExpense({ route, navigation }: NavProps) {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler() {
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  function confirmHandler() {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={cancelHandler} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>

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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})
