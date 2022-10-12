import { Alert, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import Input from "./Input"
import Button from "../ui/Button"
import { ExpenseFormProps } from "../../types/ReactComponentsTypes"
import { getFormattedDate } from "../../utils/date"
import { GlobalStyles } from "../../constants/styles"

export default function ExpenseForm({
  isEditing,
  onCancel,
  onSubmit,
  defaultlValues,
}: ExpenseFormProps) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultlValues ? defaultlValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultlValues
        ? getFormattedDate(defaultlValues.date)
        : getFormattedDate(new Date()),
      isValid: true,
    },
    title: {
      value: defaultlValues ? defaultlValues.title : "",
      isValid: true,
    },
  })

  function inputChangeHandler(
    inputIdentifier: "amount" | "date" | "title",
    inputText: string
  ) {
    setInputs((currentState) => {
      return {
        ...currentState,
        [inputIdentifier]: { value: inputText, isValid: true },
      }
    })
  }

  function submitHandler() {
    const expense = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      title: inputs.title.value,
    }

    const amountIsValid = !isNaN(expense.amount) && expense.amount > 0
    const dateIsValid = expense.date.toString() !== "Invalid Date"
    const titleIsValid = expense.title.trim().length > 0

    if (!amountIsValid || !dateIsValid || !titleIsValid) {
      // Alert.alert("Invalid Input", "Please check your input values")
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          title: { value: curInputs.title.value, isValid: titleIsValid },
        }
      })
      return
    }

    onSubmit(expense)
  }

  const formIsInvalid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.title.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            keyboardType: "numbers-and-punctuation",
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          multiline: true,
          autoCapitalize: "sentences",
          onChangeText: inputChangeHandler.bind(this, "title"),
          value: inputs.title.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorMessage}>Inputs are not valid</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={onCancel} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
  errorMessage: {
    textAlign: "center",
    color: "red",
    margin: 8,
  },
})
