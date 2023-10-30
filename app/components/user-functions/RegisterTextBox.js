import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput} from 'react-native-paper'

export default function RegisterTextBox({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        selectionColor={"black"}
        underlineColor="transparent"
        mode="outlined"
        outlineStyle={{borderRadius: 15}}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "white",
    width: 325,
  },
  description: {
    fontSize: 13,
    color: "grey",
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: "red",
    paddingTop: 8,
  },
})
