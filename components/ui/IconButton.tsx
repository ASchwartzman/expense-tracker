import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { IconButtonProps } from "../../types/ReactComponentsTypes"

export default function IconButton({
  iconName,
  size,
  color,
  onPress,
}: IconButtonProps) {
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
