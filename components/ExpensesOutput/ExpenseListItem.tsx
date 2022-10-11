import { StyleSheet, Text, View, Pressable } from "react-native"
import React from "react"
import { expense } from "../../model/expense"
import { GlobalStyles } from "../../constants/styles"
import { getFormattedDate } from "../../utils/date"

import { useNavigation } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { StackParamList } from "../../types/ReactComponentsTypes"
import { ExpenseListItemProps } from "../../types/ReactComponentsTypes"

type NavProps = NativeStackScreenProps<StackParamList, "ManageExpense">
type ManageExpenseScreenNavigationProp = NavProps["navigation"]

export default function ExpenseListItem({ item }: ExpenseListItemProps) {
  const { title, amount, date } = item

  const navigation = useNavigation<ManageExpenseScreenNavigationProp>()

  function expensePressHandler() {
    navigation.navigate("ManageExpense", { expenseId: item.id })
  }

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={expensePressHandler}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{title}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
    padding: 12,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: 75,
  },
  amount: {
    color: GlobalStyles.colors.primary400,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
})
