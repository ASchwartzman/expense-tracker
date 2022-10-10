import {
  Pressable,
  GestureResponderEvent,
  StyleSheet,
  View,
} from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"

type Props = {
  iconName: keyof typeof Ionicons.glyphMap
  size: number
  color: string
  onPress: (event: GestureResponderEvent) => void
}

export default function IconButton({ iconName, size, color, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={iconName} size={size} color={color} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
})