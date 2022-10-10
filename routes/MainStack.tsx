import { createNativeStackNavigator } from "@react-navigation/native-stack"

import BottomTabsStack from "./BottomTabs"
import ManageExpenseScreen from "../screens/ManageExpense"
import { GlobalStyles } from "../constants/styles"

export type StackParamList = {
  ManageExpense: { expenseId: string | null }
  BottomTabStack: undefined
}

const Stack = createNativeStackNavigator<StackParamList>()

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabsStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpenseScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  )
}
