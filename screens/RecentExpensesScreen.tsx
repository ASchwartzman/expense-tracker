import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"

import { getDateMinusdays } from "../utils/date"

import { useExpenseContext } from "../store/expenses-context"
import { fetchExpenses } from "../utils/http"
import { expense } from "../types/expense"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import ErrorOverlay from "../components/ui/ErrorOverlay"

export default function RecentExpensesScreen() {
  const { expenses, setExpenses } = useExpenseContext()
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string>(null)

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      try {
        const fetchedExpenses = await fetchExpenses()
        setExpenses(fetchedExpenses)
      } catch (error) {
        setError("Could not fetch expenses from backend \n" + error.message)
      }
      setIsFetching(false)
    }
    getExpenses()
  }, [])

  if (isFetching) {
    return <LoadingOverlay />
  }

  if (error && !isFetching) {
    return (
      <ErrorOverlay errorMessage={error} onConfirm={() => setError(null)} />
    )
  }

  const recentExpenses = expenses.filter((exp) => {
    const today = new Date()
    return exp.date >= getDateMinusdays(today, 7)
  })

  return (
    <ExpensesOutput
      periodName="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No recent expenses found"
    />
  )
}

const styles = StyleSheet.create({})
