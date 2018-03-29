/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Accelerometer, Gyroscope } from 'react-native-sensors'
import { AreaChart, YAxis, LineChart } from 'react-native-svg-charts'
import Button from './components/Button'
import * as shape from 'd3-shape'

type Props = {}
export default class App extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            speedArray: [],
            speed: null,
            maxSpeed: null,
            minSpeed: null,
        }
    }

    componentDidMount() {
        const accelerationObservable = new Accelerometer({
            updateInterval: 100,
        })
        accelerationObservable
            .map(({ x, y, z }) => x + y + z)
            .filter(speed => Math.abs(speed) > 1)
            .subscribe(speed => {
                console.log(`You moved your phone with ${speed}`)
                let speedArray = this.state.speedArray
                speedArray.push(speed)
                if (Math.abs((this.state.speed || 0) - speed) > 1)
                    this.setState({ speed, speedArray })
                if (
                    this.state.maxSpeed === null ||
                    speed > (this.state.maxSpeed || 0)
                ) {
                    this.setState({ maxSpeed: speed })
                }
                if (
                    this.state.minSpeed === null ||
                    speed < this.state.minSpeed
                ) {
                    this.setState({ minSpeed: speed })
                }
            })
        console.log(accelerationObservable)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Accelerometer test</Text>
                <Text style={styles.instructions}>
                    Speed: {this.state.speed}
                </Text>
                <Text style={styles.instructions}>
                    Max speed: {this.state.maxSpeed}
                </Text>
                <Text style={styles.instructions}>
                    Min speed: {this.state.minSpeed}
                </Text>
                <Text style={styles.instructions}>
                    Elements in the graph: {this.state.speedArray.length}
                </Text>
                <View style={{ height: 200, flexDirection: 'row' }}>
                    <YAxis
                        data={this.state.speedArray}
                        contentInset={{ top: 30, bottom: 30 }}
                        svg={{ fill: 'rgba(134, 65, 244, 0.8)', fontSize: 10 }}
                        formatLabel={value => `${value}m/s^2`}
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={this.state.speedArray}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 30, bottom: 30 }}
                    />
                    {/* <AreaChart
                        data={this.state.speedArray}
                        contentInset={{ top: 30, bottom: 30 }}
                        svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                        curve={{shape.curveNatural}}
                    /> */}
                </View>
                <Button
                    title="Reset speed graph"
                    style={{ alignSelf: 'flex-end', marginTop: 30 }}
                    onPress={() => this.setState({ speedArray: [] })}
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})
