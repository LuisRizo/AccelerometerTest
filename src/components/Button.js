import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Platform,
} from 'react-native'

export default class Button extends Component {
    render() {
        const { title, style, onPress, textStyle, color } = this.props
        const buttonStyles = [styles.button]
        style && buttonStyles.push(style)
        const textStyles = [styles.text]
        textStyle && textStyles.push(textStyle)
        if (color) {
            if (Platform.OS === 'ios') {
                textStyles.push({ color: color })
            } else {
                buttonStyles.push({ backgroundColor: color })
            }
        }
        const Touchable =
            Platform.OS === 'ios' ? TouchableWithoutFeedback : TouchableOpacity
        return (
            <Touchable onPress={() => onPress()}>
                <View style={buttonStyles}>
                    <Text style={textStyles}>{title}</Text>
                </View>
            </Touchable>
        )
    }
}

const styles = {
    button: Platform.select({
        ios: {},
        android: {
            elevation: 4,
            // Material design blue from https://material.google.com/style/color.html#color-color-palette
            backgroundColor: '#2196F3',
            borderRadius: 2,
        },
    }),
    text: Platform.select({
        ios: {
            // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
            color: '#007AFF',
            textAlign: 'center',
            padding: 8,
            fontSize: 18,
        },
        android: {
            color: 'white',
            textAlign: 'center',
            padding: 8,
            fontWeight: '500',
        },
    }),
}
