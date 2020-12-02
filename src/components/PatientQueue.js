import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Button, Menu, Divider, Provider } from 'react-native-paper';


import Colors from '../config/colors';
export default function PatientQueue({ isQueued, isCancelled }) {

    const RenderBtn = () => {
        if (isQueued) {
            return (

                <Button
                    labelStyle={{ color: 'red', fontWeight: 'bold', fontSize: 12 }}
                    style={{ borderColor: 'red', borderWidth: 2 }}
                    mode="outlined" onPress={() => console.log('Pressed')}>
                    Cancel
                </Button>
            )
        }
        else if (!isQueued && !isCancelled) {
            return (
                <>
                    <Button
                        labelStyle={{ fontWeight: 'bold', fontSize: 12 }}
                        style={{ backgroundColor: 'darkblue', marginRight: -16, borderWidth: 0 }}
                        mode="contained" onPress={() => console.log('Pressed')}>
                        Check
                </Button>

                    <Button
                        labelStyle={{ color: 'red', fontWeight: 'bold', fontSize: 12 }}
                        style={{
                            borderColor: 'red', borderWidth: 2
                            , width: 93, height: 35, marginLeft: 10
                        }}
                        mode="outlined" onPress={() => console.log('Pressed')}>
                        Cancel
                </Button>
                </>
            )
        }
        else if (isCancelled) {
            return (
                <View></View>)
        }



    }
    return (
        <View>
            <Text style={{ fontSize: 18, color: 'grey', marginStart: 20, marginTop: 20 }}>8:45 AM</Text>

            <Surface style={{ padding: 20, margin: 20 }}>

                <View style={{ flexDirection: 'row' }}>


                    <View style={{
                        flexDirection: "row", alignItems: 'center'

                        , justifyContent: 'space-between'
                    }}>

                        <View style={{
                            marginRight: 14,
                            width: 64,
                            height: 64,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: "rgba(176,224,230,0.4)", borderRadius: 400

                        }}>
                            <Text style={{ fontSize: 40, color: "blue" }}>65</Text>
                        </View>





                    </View>

                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 20, color: 'grey' }}>Patient Name </Text>
                        <Text style={{ fontSize: 25, }}>Juan B. Dela Cruz</Text>
                        {
                            isQueued && (
                                <Text style={{ fontSize: 20, color: "green" }}>Queued</Text>

                            )
                        }
                        {
                            isCancelled && (
                                <Text style={{ fontSize: 20, color: "red" }}>Cancelled</Text>

                            )
                        }


                    </View>

                </View>

                <Divider style={{ margin: 20 }} />

                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text
                            style={{ marginBottom: 5, color: 'grey', fontSize: 12 }}
                        >Cheif Complaint</Text>
                        <Text style={{ fontSize: 12 }}>Extraction</Text>
                    </View>

                    <RenderBtn />
                </View>




            </Surface>
        </View>
    )
}

const styles = StyleSheet.create({})
