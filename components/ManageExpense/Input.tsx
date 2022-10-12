import React from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { InputProps } from "../../types/ReactComponentsTypes"

export default function Input({
  label,
  textInputConfig,
  style,
  invalid,
}: InputProps) {
  let inputStyles = [styles.input]

  if (textInputConfig && textInputConfig.multiline) {
    //@ts-ignore
    inputStyles.push(styles.inputMultiline)
  }

  if (invalid) {
    //@ts-ignore
    inputStyles.push(styles.invalidInput)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={[inputStyles]} {...textInputConfig} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary800,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
})
