import React from 'react'
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated';
import Colors from '../config/colors';
import { AntDesign } from '@expo/vector-icons';

export default function NavigationComponent({ name, navigation, where }) {
    return (
        <TouchableOpacity

            onPress={() => where ? navigation.navigate(where) : alert(`${name}`)}
            style={{
                backgroundColor: 'white',
                flexDirection: "row", alignItems: 'center', paddingLeft: 15
                , shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 2,
                marginTop: 0,
                padding: 12


            }}>
            <View style={{
                margin: 10,
                padding: 6,
                borderWidth: 3, borderColor: Colors.darkGreen, borderRadius: 40
            }}>
                <AntDesign
                    borderRadius={20}


                    name="creditcard" size={20} color={Colors.darkGreen} />
            </View>

            <Text style={{
                padding: 10,
                fontSize: 16,
                color: Colors.darkGreen
            }}>{name}</Text>

            {/* <View style={{

                width: '100%', height: '100%'
            }}>
                <View style={{
                    marginLeft: 82,
                    width: 8, height: '100%', backgroundColor: Colors.lightGreen
                }}>


                </View>

            </View> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})
