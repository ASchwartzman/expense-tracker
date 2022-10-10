import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"

import MainStack from "./routes/MainStack"

import ExpensesContextProvider from "./store/expenses-context"

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <ExpensesContextProvider>
          <MainStack />
        </ExpensesContextProvider>
      </NavigationContainer>
    </>
  )
}
