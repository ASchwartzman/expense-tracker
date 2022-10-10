import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import RecentExpensesScreen from "../screens/RecentExpensesScreen"
import AllExpensesScreen from "../screens/AllExpensesScreen"

import { Ionicons } from "@expo/vector-icons"

import { GlobalStyles } from "../constants/styles"
import IconButton from "../components/ui/IconButton"

export type BottomTabsParamList = {
  AllExpenses: undefined
  RecentExpenses: undefined
}

const Tabs = createBottomTabNavigator<BottomTabsParamList>()

export default function BottomTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: ({ tintColor }) => (
          <IconButton
            iconName="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense")
            }}
          />
        ),
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
      })}
    >
      <Tabs.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}
