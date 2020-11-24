import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { colors, Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Button, Menu, Divider, Provider } from 'react-native-paper';


import Colors from '../config/colors';
import DashboardQueue from '../components/DashboardQueue';


export default function HomeScreen({ route, navigation }) {
    //------------------

    //For Fetch
    //For Today
    const [currentAppointments, setcurrentAppointments] = useState("5")
    const [pendingAppointments, setpendingAppointments] = useState("3")
    const [cancelledAppointments, setcancelledAppointments] = useState("1")

    //list of objects containing first,lastname,pic,isqueued,iscancelled
    //sort with date then time  



    //For Upload

    //------------------


    // const [name, setname] = useState()
    var userObject = ""
    if (route.params != undefined) {
        userObject = route.params.userObject;
    }
    const [username, setusername] = useState("")

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    useEffect(() => {
        const getusername = async () => {
            try {
                const username = await AsyncStorage.getItem("username");
                const item = await AsyncStorage.getItem("globalUsers");
                // console.log("Start", item, "End")
                setusername(username)
            } catch (e) {
                console.log(e);
            }
        }
        getusername()
    }, [route])


    const handleNavigation = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <Provider>

            <Header
                containerStyle={{ backgroundColor: 'white', padding: 20, height: 150 }}
                placement="left"
                leftComponent={
                    <>
                        <Icon style={{ color: '#000', padding: 10 }} name="menu" size={35} onPress={
                            () => navigation.openDrawer()
                        } />
                    </>

                }

                centerComponent={{ text: 'Dashboard', style: { color: 'darkblue', fontSize: 40, fontWeight: "bold" } }}

            />
            <Text style={{ fontSize: 20, margin: 10 }}>Logged IN: {username}</Text>
            <ScrollView>

                <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold', marginStart: 20, marginTop: 20 }}>APPOINTMENTS</Text>

                <Surface style={{ padding: 20, margin: 20 }}>
                    <View style={{
                        flexDirection: "row", alignItems: 'center'
                        , justifyContent: 'space-between'
                    }}>
                        <Text style={{ fontSize: 25 }}>Today</Text>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button color="darkblue" onPress={openMenu}>+ Add appointment</Button>}>
                            <Menu.Item onPress={() => { }} title="Add New Patient" />
                            <Divider />
                            <Menu.Item onPress={() => { }} title="Add Existing Patient" />

                        </Menu>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 20, marginTop: 10
                            , color: Colors.lightGray
                        }}>November 22,2019</Text>
                    </View>
                    <View style={{ padding: 18, flexDirection: 'row' }}>

                        <View style={{ flex: 2 }}>
                            <View style={{
                                width: 70,
                                height: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: "rgba(176,224,230,0.4)", borderRadius: 400

                            }}>
                                <Text style={{ fontSize: 60, color: "darkblue" }}>5</Text>
                            </View>
                            <Text style={{ marginLeft: -30, marginTop: 8, fontSize: 14, textAlign: 'center' }}>Current Appointments</Text>
                        </View>



                        <View style={{ flex: 2 }}>
                            <View style={{
                                width: 70,
                                height: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: "rgba(176,224,230,0.4)"
                                , borderRadius: 400

                            }}>
                                <Text style={{ fontSize: 60, color: "green" }}>3</Text>
                            </View>
                            <Text style={{ marginLeft: -30, marginTop: 8, fontSize: 14, textAlign: 'center' }}>Pending Appointments</Text>
                        </View>




                        <View style={{ flex: 2, }}>
                            <View style={{
                                width: 70,
                                height: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: "rgba(176,224,230,0.4)", borderRadius: 400

                            }}>
                                <Text style={{ fontSize: 60, color: "red" }}>1</Text>
                            </View>
                            <Text style={{ marginLeft: -20, marginTop: 8, fontSize: 14, textAlign: 'center' }}>Cancelled Appointments</Text>
                        </View>



                    </View>

                </Surface>

                {/* Another 1**************** */}
                <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold', marginStart: 20, marginTop: 20 }}>PATIENTS</Text>

                <Surface style={{ padding: 20, margin: 20 }}>
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


                        <Text style={{ fontSize: 20, }}>Total Patients</Text>

                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button color="darkblue" onPress={openMenu}>+ Add Patient</Button>}>
                            <Menu.Item onPress={() => { }} title="Add New Patient" />
                            <Divider />
                            <Menu.Item onPress={() => { }} title="Add Existing Patient" />

                        </Menu>

                    </View>
                    <Divider style={{ margin: 20 }} />

                    <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: 'lightgreen',
                            marginLeft: 10, marginRight: 10,

                            width: 20, height: 20, borderRadius: 20
                        }}>

                        </View>
                        <Text style={{
                            color: 'green'
                            , fontSize: 20
                        }}>1 Recent Patient Added</Text>
                    </View>


                </Surface>

                {/* Another 3 */}
                <DashboardQueue />



                <View style={styles.container}>
                    <Text>Home</Text>
                    <Text>Hi {username}</Text>
                    <Pressable onPress={() => navigation.navigate("AddPatient")}>
                        <Text>Add Patient</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }
})
