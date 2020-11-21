import React, { useState, useEffect } from 'react'
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native'
import { getUserData } from "../utils/GetAsyncData"

export default function ({ navigation }) {
    const [username, setusername] = useState(null)
    const [usersData, setallusersData] = useState({})

    const DATA = [
        {
            title: "A",
            data: ["Ali", "Amir", "Aka"]
        },
        {
            title: "B",
            data: ["Bobby", "Baby", "Bonds"]
        },
        {
            title: "C",
            data: ["Caster", "Caler", "Carter"]
        },
    ];
    const [patientsNameList, setpatientsNameList] = useState(["Annie", "Arry"])
    const [allPatientsData, setAllpatientsData] = useState([])

    // data looks like this now
    // allpatientdata = [
    //     {
    //         address: 'add', firstname, "f1",
    //         lastname: "123", phone: "123", uuid: "12kas-asdjk", appointments: []
    //     },
    //     {
    //         address: 'add', firstname, "f1",
    //         lastname: "123", phone: "123", uuid: "12kas-asdjk", appointments: []
    //     },
    //     {
    //         address: 'add', firstname, "f1",
    //         lastname: "123", phone: "123", uuid: "12kas-asdjk", appointments: []
    //     },
    //     {
    //         address: 'add', firstname, "f1",
    //         lastname: "123", phone: "123", uuid: "12kas-asdjk", appointments: []
    //     },

    // ]

    useEffect(() => {
        getUserData([setallusersData, setusername], ["globalUsers", "username"])
        if (username && usersData) {
            setAllpatientsData(usersData[username].patients)
            const patientsDataList = usersData[username].patients
            setAllpatientsData(patientsDataList)
            // setpatientsNameList(patientsDataList.forEach(patient => (patient["firstname"])))
        }
    }, [])

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    console.log("patientsNameList", allPatientsData);
    return (
        <View style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>
                        {title}
                    </Text>
                )}
            />
            <Pressable
                style={{ margin: 20, height: 20 }}
                onPress={() => navigation.navigate("HomeScreen")}><Text>Back To Home</Text>
            </Pressable>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});

