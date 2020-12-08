import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../config/colors";
import InputStyle from "../components/InputStyle";
import { Ionicons } from "@expo/vector-icons";
import InfoInput from '../components/InfoInput';
import { Surface } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Accessory, Icon } from 'react-native-elements';
import { Header } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from "../utils/GetAsyncData"
import { add } from 'react-native-reanimated';




export default function EditPatientInfo({ navigation, route }) {
    const [input, setInput] = useState("9139902719");
    // const [firstinput, setfirstInput] = useState("9139902719");
    // const [middleinput, setmiddleInput] = useState("9139902719");
    // const [lastinput, setlastInput] = useState("9139902719");
    // const [sexinput, setsexInput] = useState("9139902719");
    // const [input, setInput] = useState("9139902719");
    // const [input, setInput] = useState("9139902719");


    const [firstname, setfirstname] = useState("Alexander")
    const [middlename, setmiddlename] = useState("Gomex")
    const [lastname, setlastname] = useState("Dela Costa")
    const [age, setage] = useState("39")
    const [gender, setgender] = useState("Male")
    const [birthday, setbirthday] = useState("Aug 21,1980")
    const [dateAdded, setdateAdded] = useState("February 21,2018")
    const [dateDifference, setdateDifference] = useState("6 Months")
    const [address, setaddress] = useState("12A Kamuning Quezon City")
    const [email, setemail] = useState("lexicota@gmail.com")
    const [phone, setphone] = useState('+639139902719')
    const [accountNumber, setaccountNumber] = useState("289|2018")
    const [image, setimage] = useState("https://reactnative.dev/img/tiny_logo.png")
    const [puuid, setuuid] = useState("")


    const [username, setusername] = useState("")
    const [allUsersData, setAllusersData] = useState(null)


    useEffect(() => {
        const { firstname, middlename, lastname, phone, gender, address, dob, patientImage, uuid } = route.params.patientDetails;
        setfirstname(firstname)
        setmiddlename(middlename)
        setlastname(lastname)
        setaddress(address)
        setgender(gender)
        setbirthday(dob)
        setphone(phone)
        setimage(patientImage)
        setuuid(uuid)


        setInput(phone.substr(2))

        setemail(`${firstname}@gmail.com`)

        // AsyncStorage.getAllKeys((err, keys) => {
        //     AsyncStorage.multiGet(keys, (error, stores) => {
        //         stores.map((result, i, store) => {
        //             console.log({ [store[i][0]]: store[i][1] });
        //             return true;
        //         });
        //     });
        // });
        getUserData([setAllusersData, setusername], ["globalUsers", "username"])


    }, [route.params])

    // useEffect(() => {
    // }, [route.params])

    // useEffect(() => {
    //     if (username && allUsersData) {
    //         var filterPatient = []
    //         allUsersData[username].patients.map((f) => {

    //             if (f.uuid == puuid) {
    //                 console.log("--------------");

    //             }

    //         })
    //         console.log(allUsersData[username].patients, "ooo")
    //         console.log(filterPatient);
    //     }
    // }, [allUsersData])


    //CHECK THIS FUNCTION
    const editInfo = async () => {
        if (username && allUsersData) {
            //var filterPatient = []
            allUsersData[username].patients.map((f) => {

                if (f.uuid == puuid) {
                    console.log("--------------");
                    f.firstname = firstname
                    f.middlename = middlename
                    f.lastname = lastname
                    f.gender = gender
                    f.address = address
                    f.email = email
                    f.phone = phone
                    f.fullname = `${firstname} ${middlename} ${lastname}`

                }

            })
            await AsyncStorage.setItem("globalUsers", JSON.stringify(allUsersData))

            // console.log(allUsersData[username].patients, "ooo")
            // console.log(filterPatient);
        }
        navigation.navigate("HomeScreen")

        // var x = await AsyncStorage.getItem("globalUsers")
        // alert(allUsersData)
        // alert(x)
        // AsyncStorage.setItem("globalUsers", allUsersData)
        // route.params.patientDetails.firstname = "Abu"
        // console.log(route.params.patientDetails);
        alert("Patient Information Changed")
    }

    return (
        <>
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

                centerComponent={{ text: 'View Patient', style: { color: 'darkblue', fontSize: 40, fontWeight: "bold" } }}

            />
            <ScrollView >
                <Surface style={{ flexDirection: 'row', margin: 12, padding: 30, marginBottom: 20 }}>
                    <View>


                        <Avatar
                            rounded
                            size='large'
                            source={{
                                uri:
                                    image,
                            }}
                        />

                    </View>
                    <View style={{ justifyContent: 'flex-start', marginLeft: 15 }}>
                        <Text
                            style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}
                        >{firstname} {lastname}</Text>
                        <Text
                            // onPress={}
                            style={{ color: 'teal' }}>Tap to edit patient information</Text>
                    </View>



                </Surface>
                <Surface style={{ margin: 12, padding: 30, marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Basic Information</Text>

                    <Text style={{ marginTop: 10, fontSize: 12, fontWeight: '500', color: 'grey' }}>ACCOUNT NUMBER 20/2020</Text>

                    <InfoInput label="FIRST NAME" fill={firstname} set={setfirstname} />
                    <InfoInput label="MIDDLE NAME" fill={middlename} set={setmiddlename} />
                    <InfoInput label="LAST NAME" fill={lastname} set={setlastname} />
                    <InfoInput label="SEX" fill={gender} set={setgender} />

                </Surface>

                <Surface style={{ margin: 12, padding: 30, marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Contact Information</Text>

                    <Text style={{ marginTop: 10, fontSize: 12, fontWeight: '500', color: 'grey' }}>Let us know who to reach you.</Text>

                    <InfoInput label="ADDRESS" fill={address} set={setaddress} />
                    <InfoInput label="EMAIL ADDRESS" fill={email} set={setemail} />


                    <View>
                        <View style={InputStyle.UserNameBlock}>
                            <Text style={[InputStyle.UserNameTextStyle, { fontSize: 12 }]}>PHONE NUMBER</Text>
                        </View>

                        <View
                            style={[
                                InputStyle.InputBlockStyle,
                                {
                                    width: widthPercentageToDP("60%"),
                                    marginTop: 10,
                                },
                            ]}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.phoneCode}>+63</Text>
                                <TextInput
                                    keyboardType="numeric"
                                    textContentType="telephoneNumber"
                                    onChangeText={(val) => setphone(val)}
                                    value={phone}
                                    style={[
                                        InputStyle.TextInputStyle,
                                        {
                                            width: widthPercentageToDP("48%"),
                                        },
                                    ]}
                                />
                            </View>
                        </View>

                        {/* Proceed */}




                    </View>
                </Surface>
                <TouchableOpacity
                    onPress={editInfo}

                    style={[
                        InputStyle.InputBlockStyle,
                        {

                            backgroundColor: colors.darkGreen,
                            width: widthPercentageToDP("60%"),
                        },
                    ]}
                >
                    <Text style={{ color: "white" }}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: colors.lightGreen,
        fontSize: 16,
        width: widthPercentageToDP("60%"),
        fontWeight: "700",
        lineHeight: 23,
        marginLeft: widthPercentageToDP("19%"),
        marginTop: 20,
    },
    phoneCode: {
        marginTop: 20,
        marginLeft: 30,
        color: "gray",
        height: 20,
        width: 30,
        backgroundColor: "rgba(0,0,0,0.1)",
    }
})
