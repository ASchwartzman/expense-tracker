import {
  Pressable,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native"
import React from "react"
import { GlobalStyles } from "../../constants/styles"

type Props = {
  children: React.ReactNode
  onPress: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  mode?: "flat" | null
}

export default function Button({ children, onPress, mode, style }: Props) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
  button: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
})
