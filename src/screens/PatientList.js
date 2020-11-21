import React from 'react'
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native'

export default function PatientList({ navigation }) {

    const patientList = ["Annie", "Arry"]
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
    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>PATIENTS</Text>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
            <Pressable
                style={{ margin: 20, height: 20 }}
                onPress={() => navigation.navigate("HomeScreen")}><Text>Back To Home</Text></Pressable>
        </View>
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

