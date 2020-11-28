import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Button, colors, Header, Icon } from 'react-native-elements';
import { Portal, Searchbar, Provider, Surface, Divider } from 'react-native-paper';
// import Calendar from 'react-native-calendar';
import { Calendar } from 'react-native-calendario';
import { Avatar, Accessory } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import InputStyle from "../components/InputStyle";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { RadioButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { LogBox } from 'react-native';

export default function AddAppointment({ navigation }) {



    // This data will be given to backend

    // Will Decide More after selecting Calendar
    //https://github.com/amhinson/react-native-calendar
    //https://react-native-components.gitbook.io/calendar/
    // const [appointment, setappointmen] = useState("6/12/2019")

    const [appointmentTime, setappointmentTime] = useState("TAP TO CHANGE")


    //This data will be fetched
    const [lastAppointment, setlastAppointment] = useState("6 months ago")
    const [firstname, setfirstname] = useState("Alexander")
    const [lastname, setlastname] = useState("Dela Costa")
    const [image, setimage] = useState('https://reactnative.dev/img/tiny_logo.png')

    //Will be fetched locally
    const [appointmentDate, setappointmentDate] = useState("6")
    const [appointmentMonth, setappointmentMonth] = useState("December")
    const [appointmentWeekDay, setappointmentWeekDay] = useState("Monday")



    //Normal
    const [timeshower, settimeshower] = useState(false)
    //const [value, setValue] = useState('first');
    const [doneDate, setdoneDate] = useState(false)
    const [doneTime, setdoneTime] = useState(false)
    // const [timeStr, settimeStr] = useState("TAP TO CHANGE")


    //In finish appintment func check if appointmentTime not set 
    //set it to default, same as appointment details, 
    //or disable btn unless both are not set
    const setDate = (d) => {
        console.log(d.startDate);
        var ds = JSON.stringify(d.startDate)
        var year = ds.substr(0, 5)
        var month = ds.substr(6, 2)
        var day = JSON.stringify(Number(ds.substr(9, 2)) + 1)

        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var weekn = weekday[d.startDate.getDay()];
        console.log(year, month, day, weekn);

        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var monthn = month[d.startDate.getMonth()];

        setappointmentMonth(monthn)
        setappointmentDate(day)
        setappointmentWeekDay(weekn)

        setdoneDate(true)

    }


    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return (
        <View>
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
                centerComponent={{ text: 'Add Appointment', style: { color: 'darkblue', fontSize: 35, fontWeight: "bold" } }}
            />
            {/* <Button
                containerStyle={{ marginBottom: 300 }}
                title="Tap to Change Patient"
                onPress={() => navigation.navigate("PatientList")}
            /> */}
            <ScrollView>

                <Text style={{
                    color: 'grey', margin: 25, marginBottom: 0
                }}>PATIENT FOR APPOINTMENT</Text>

                <Surface style={{ flexDirection: 'row', margin: 12, padding: 30 }}>
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
                    <View style={{ justifyContent: 'space-between', marginLeft: 15 }}>
                        <Text
                            style={{ fontWeight: 'bold', fontSize: 20 }}
                        >{firstname} {lastname}</Text>
                        <Text style={{ color: 'lightblue', fontWeight: 'bold' }}>Last appointment: {lastAppointment}</Text>
                        <Text
                            onPress={() => navigation.navigate("PatientList")}
                            style={{ color: 'darkblue' }}>Tap to change Patient</Text>
                    </View>
                </Surface>
                {/* 
            <Calendar
                currentMonth={'2015-08-01'}       // Optional date to set the currently displayed month after initialization
                customStyle={{ day: { fontSize: 15, textAlign: 'center' } }} // Customize any pre-defined styles
                dayHeadings={Array}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                eventDates={['2015-07-01']}       // Optional array of moment() parseable dates that will show an event indicator
                // events={[{ date: '2015-07-01' }]}// Optional array of event objects with a date property and custom styles for the event indicator
                monthNames={Array}                // Defaults to english names of months
                nextButtonText={'Next'}           // Text for next button. Default: 'Next'
                onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
                //onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
                //onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
                //onTouchNext={this.onTouchNext}    // Callback for next touch event
                //onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
                prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
                scrollEnabled={true}              // False disables swiping. Default: False
                selectedDate={'2015-08-15'}       // Day to be selected
                showControls={true}               // False hides prev/next buttons. Default: False
                showEventIndicators={true}        // False hides event indicators. Default:False
                startDate={'2015-08-01'}          // The first month that will display. Default: current month
                titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
                today={'2017-05-16'}              // Defaults to today
                weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
            /> */}
                <Text style={{
                    color: 'grey', margin: 25, marginBottom: 0
                }}>SET DATE OF APPOINTMENT</Text>

                <Surface style={{ height: 320, margin: 20 }}>
                    <Calendar
                        nestedScrollEnabled={true}

                        numberOfMonths={2}
                        disableRange={true}
                        onChange={(range) => setDate(range)}
                        minDate={new Date(2018, 3, 20)}
                        // startDate={new Date(2018, 3, 30)}
                        // endDate={new Date(2018, 4, 5)}
                        theme={{
                            activeDayColor: {},
                            monthContainerStyle: {
                                backgroundColor: "#fff"
                            },

                            monthTitleTextStyle: {
                                color: '#6d95da',
                                fontWeight: '300',
                                fontSize: 16,

                            },
                            emptyMonthContainerStyle: {},
                            emptyMonthTextStyle: {
                                fontWeight: '200',
                            },
                            weekColumnsContainerStyle: {},
                            weekColumnStyle: {
                                paddingVertical: 10,
                            },
                            weekColumnTextStyle: {
                                color: '#b6c1cd',
                                fontSize: 13,
                            },
                            nonTouchableDayContainerStyle: {},
                            nonTouchableDayTextStyle: {},
                            startDateContainerStyle: {},
                            endDateContainerStyle: {

                            },
                            dayContainerStyle: {},
                            dayTextStyle: {
                                color: '#2d4150',
                                fontWeight: '200',
                                fontSize: 15,
                            },
                            dayOutOfRangeContainerStyle: {},
                            dayOutOfRangeTextStyle: {},
                            todayContainerStyle: {},
                            todayTextStyle: {
                                color: '#6d95da',
                            },
                            activeDayContainerStyle: {
                                backgroundColor: '#6d95da',
                            },
                            activeDayTextStyle: {
                                color: 'white',
                            },
                            nonTouchableLastMonthDayTextStyle: {},
                        }}
                    />
                </Surface>


                {/* Setting Time */}
                <Text style={{
                    color: 'grey', margin: 25, marginBottom: 0
                    , marginTop: 8
                }}>SET TIME OF APPOINTMENT</Text>

                <Surface style={{ margin: 20, paddingBottom: 20 }}>
                    <View
                        style={[
                            InputStyle.InputBlockStyle,
                            {
                                width: widthPercentageToDP("79%"),
                                marginTop: 10,
                                marginLeft: 0,


                            },
                        ]}
                    >


                        <Pressable
                            onPress={() => {
                                // alert("asf")
                                settimeshower(!timeshower),
                                    setdoneTime(true)


                            }}
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <AntDesign
                                style={{
                                    paddingLeft: 20, marginLeft: -158
                                    ,
                                }}
                                name="clockcircleo" size={24} color="black" />
                            <Text style={{ marginLeft: 20, color: 'grey', fontWeight: 'bold' }}>{appointmentTime}</Text>
                        </Pressable>
                    </View>
                    {timeshower &&
                        <Surface style={{
                            marginLeft: 25,
                            marginRight: 25
                        }}>
                            <RadioButton.Group onValueChange={newValue => setappointmentTime(newValue)} value={appointmentTime}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                        margin: 10
                                    }}

                                >
                                    <RadioButton value="10:00 AM" />
                                    <Text
                                        style={{ color: 'grey', fontSize: 16 }}
                                    >10:00 AM</Text>

                                </View>
                                <Divider />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                        margin: 10
                                    }}

                                >
                                    <RadioButton value="12:00 AM" />
                                    <Text
                                        style={{ color: 'grey', fontSize: 16 }}
                                    >12:00 AM</Text>

                                </View>

                            </RadioButton.Group>
                        </Surface>
                    }

                </Surface>
                {/* Appointment Summary */}
                <Text style={{
                    color: 'grey', margin: 25, marginBottom: 0
                    , marginTop: 8
                }}>APPOINTMENT SUMMARY</Text>

                {
                    doneTime && doneDate &&

                    <Surface style={{ margin: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 2, padding: 20 }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold', fontSize: 22, color: 'grey'
                                        , marginBottom: 10
                                    }}
                                >{lastname}, {firstname}</Text>
                                <Text style={{ color: 'grey' }}>EXISTING PATIENT</Text>
                            </View>
                            <View style={{
                                flex: 2.4,
                                padding: 10
                            }}>

                                <Text
                                    style={{
                                        fontSize: 34,
                                        color: 'teal',
                                        marginBottom: 5
                                    }}
                                >{appointmentTime}</Text>
                                <Text style={
                                    { color: 'teal' }
                                }

                                >{appointmentMonth} {appointmentDate}, {appointmentWeekDay}</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'teal', padding: 18 }}>
                            <Text style={{ color: 'white' }}>Last Appointment - {lastAppointment}</Text>
                        </View>
                    </Surface>


                }
                {/* light-blue darken-4 */}
                <Button
                    disabled={doneDate && doneTime ? false : true}
                    buttonStyle={{
                        backgroundColor: '#01579b',
                        padding: 16
                    }}
                    containerStyle={{
                        marginBottom: 200,
                        marginLeft: 44,
                        marginRight: 44,
                        marginTop: 10


                    }}
                    textStyle={{
                        fontWeight: 'bold'
                    }}
                    title="FINISH APPOINTMENT"
                    onPress={() => navigation.navigate("HomeScreen")}
                />
            </ScrollView>

        </View>



    )
}

const styles = StyleSheet.create({})
