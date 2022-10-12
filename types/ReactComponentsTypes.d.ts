import { Ionicons } from "@expo/vector-icons"
import {
  GestureResponderEvent,
  StyleProp,
  TextInputProps,
  ViewStyle,
} from "react-native"

export type BottomTabsParamList = {
  AllExpenses: undefined
  RecentExpenses: undefined
}

export type StackParamList = {
  ManageExpense: { expenseId: string | null }
  BottomTabStack: undefined
}

export type IconButtonProps = {
  iconName: keyof typeof Ionicons.glyphMap
  size: number
  color: string
  onPress: (event: GestureResponderEvent) => void
}

export type ButtonProps = {
  children: React.ReactNode
  onPress: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  mode?: "flat" | null
}

export type ExpenseListItemProps = {
  item: expense
}

export type ExpenseListProps = {
  expenses: expense[]
}

export type ExpenseOutputProps = {
  expenses?: expense[]
  periodName: string
  fallbackText?: string
}

export type ExpenseSummaryProps = {
  periodName: string
  expenses: expense[]
}

export type InputProps = {
  label: string
  textInputConfig?: TextInputProps
  style?: StyleProp<ViewStyle>
  invalid?: boolean
}

export type ExpenseFormProps = {
  isEditing: boolean
  onCancel: () => void
  onSubmit: (expenseData: ExpenseInputs) => void
  defaultlValues: expense
}

export type ExpenseInputs = {
  title: string
  amount: number
  date: Date
}
