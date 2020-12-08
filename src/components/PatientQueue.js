import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Colors from '../config/colors';
import { Avatar, Accessory } from 'react-native-elements';


export default function PatientQueue({ details, time, handleCancel, handleQueue }) {

    const [queued, setqueued] = useState(false)
    const [cancelled, setcancelled] = useState(false)
    const [patientname, setpatientname] = useState("")
    const [patientimage, setpatientimage] = useState("")


    useEffect(() => {
        //alert(JSON.stringify(details), "details");
        setpatientname(details.patientfullname)
        setpatientimage(details.image)
        setqueued(details.queued)
        setcancelled(details.cancelled)
        console.log(details);
    }, [details])

    const handleCancelButton = () => {
        handleCancel(details.uuid, details.patientUuid)
    }

    const handleQueueButton = () => {
        handleQueue(details.uuid, details.patientUuid)
    }

    const RenderBtn = () => {
        if (queued) {
            return (
                <Button
                    labelStyle={{ color: 'red', fontWeight: 'bold', fontSize: 12 }}
                    style={{ borderColor: 'red', borderWidth: 2 }}
                    mode="outlined" onPress={handleCancelButton}>
                    Cancel
                </Button>
            )
        }
        else if (!queued && !cancelled) {
            return (
                <>
                    <Button
                        labelStyle={{ fontWeight: 'bold', fontSize: 12 }}
                        style={{ backgroundColor: 'darkblue', marginRight: -16, borderWidth: 0 }}
                        mode="contained" onPress={handleQueueButton}>
                        Check
                </Button>

                    <Button
                        labelStyle={{ color: 'red', fontWeight: 'bold', fontSize: 12 }}
                        style={{
                            borderColor: 'red', borderWidth: 2
                            , width: 93, height: 35, marginLeft: 10
                        }}
                        mode="outlined" onPress={handleCancelButton}>
                        Cancel
                </Button>
                </>
            )
        }
        else if (cancelled) {
            return (
                <View></View>)
        }



    }
    return (
        <View>
            <Text style={{ fontSize: 18, color: 'grey', marginStart: 20, marginTop: 20 }}>{time}</Text>

            <Surface style={{ padding: 20, margin: 20 }}>

                <View style={{ flexDirection: 'row' }}>

                    <View style={{ marginRight: 20 }}>


                        <Avatar
                            rounded
                            size='large'
                            source={{
                                uri:
                                    patientimage,
                            }}
                        />

                    </View>
                    {/* <View style={{
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

                    </View> */}

                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 20, color: 'grey' }}>Patient Name </Text>
                        <Text style={{ fontSize: 25, }}>{patientname}</Text>
                        {/* {
                            queued && (
                                <Text style={{ fontSize: 20, color: "green" }}>Queued</Text>

                            )
                        } */}
                        {
                            cancelled ? (
                                <Text style={{ fontSize: 20, color: "red" }}>Cancelled</Text>

                            ) : (
                                    <Text style={{ fontSize: 20, color: "green" }}>Queued</Text>

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
