import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Button, colors, Header, Icon } from 'react-native-elements';
import { Portal, Searchbar, Provider, Surface, Divider } from 'react-native-paper';
// import Calendar from 'react-native-calendar';
// import { Calendar } from 'react-native-calendario';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Avatar, Accessory } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import InputStyle from "../components/InputStyle";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { RadioButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { LogBox } from 'react-native';
import Colors from '../config/colors';
const uuid = require("react-native-uuid")
// import { LocaleConfig } from 'react-native-calendars';

// import moment from 'moment'




export default function AddAppointment({ navigation, route }) {
    // This data will be given to backend
    // Will Decide More after selecting Calendar
    //Using this one
    //https://github.com/wix/react-native-calendars
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
    const [doneDate, setdoneDate] = useState(false)
    const [doneTime, setdoneTime] = useState(false)
    // const [timeStr, settimeStr] = useState("TAP TO CHANGE")

    //In finish appintment func check if appointmentTime not set 
    //set it to default, same as appointment details, 
    //or disable btn unless both are not set

    //Giving Date OBJ
    const [dateobject, setdateobject] = useState("")

    const [markDates, setmarkDates] = useState(['2020-12-22', '2020-12-23'])


    //Testing
    const [selected, setselected] = useState("")




    const setDate = (day) => {
        // var ds = JSON.stringify(d.startDate)
        // var year = ds.substr(1, 4)
        // var month = ds.substr(6, 2)
        // var day = JSON.stringify(Number(ds.substr(9, 2)) + 1)

        console.log('selected day', day)
        setselected(day.dateString)

        var date_ob = new Date(day.timestamp);
        setdateobject(date_ob)
        console.log(date_ob, "dob");

        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var weekn = weekday[date_ob.getDay()];


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
        var monthn = month[date_ob.getMonth()];

        // setfulldate(year)
        setappointmentMonth(monthn)
        setappointmentDate(day.day)
        setappointmentWeekDay(weekn)
        setdoneDate(true)



        // let copyOf = d.startDate.toDateString()
        // // var x = new Date(copyOf)
        // setdateobject(copyOf)

        // console.log(copyOf, "as");
    }

    const handleAddAppointment = () => {
        const newAppointmentDetails = {
            time: appointmentTime,
            day: appointmentWeekDay,
            date: appointmentDate,
            month: appointmentMonth,
            uuid: uuid.v4(),
            // fulldate: new Date()
        }
        alert("Appointment Added!")
        navigation.navigate("PatientList", {
            patientUuid: route.params.patientUuid,
            newAppointmentDetails
        })
    }

    const getLastAppointment = (allAppointments) => {
        if (allAppointments.length > 1) {
            let lastUuid = ""
            let lastDate;
            let today = new Date()
            allAppointments.forEach((appntmnt, i) => {
                let adate = new Date(appntmnt.fulldate)
                if (i == 0) {
                    lastDate = adate
                    lastUuid = appntmnt.uuid
                }
                if (i > 0 && adate > lastDate) {
                    lastUuid = appntmnt.uuid
                    lastDate = adate
                }
            })
            const diffTime = Math.abs(today - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // return `${diffDays} days`
            return lastDate.toDateString()
        }
        return "NA"
    }

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        // set patient details
        // more to come here
        if (route.params.patientDetails) {
            setfirstname(route.params.patientDetails.firstname)
            setlastname(route.params.patientDetails.lastname)
            // setlastAppointment(getLastAppointment(route.params.patientDetails.appointments))
        }
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
                        <Text style={{ color: Colors.lightGreen, fontWeight: 'bold' }}>Last appointment: {lastAppointment}</Text>
                        <Text
                            onPress={() => navigation.navigate("PatientList")}
                            style={{ color: Colors.darkGreen }}>Tap to change Patient</Text>
                    </View>
                </Surface>
                <Text style={{
                    color: 'grey', margin: 25, marginBottom: 0
                }}>SET DATE OF APPOINTMENT</Text>

                <Surface style={{ height: 320, margin: 20 }}>

                    <Calendar


                        markedDates={{

                            [markDates[0]]: { selectedColor: 'grey', textColor: 'white', selected: true },
                            // '2021-01-23': { color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white' },
                            // '2021-01-24': { color: '#70d7c7', textColor: 'white' },
                            [selected]: {
                                selected: true,
                                disableTouchEvent: true,
                                // selectedColor: 'orange',
                                // selectedTextColor: 'red'
                            }
                        }}

                        // Initially visible month. Default = Date()
                        // current={'2021-03-01'}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        // minDate={'2012-05-10'}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        // maxDate={'2012-05-30'}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => { setDate(day) }}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => { console.log('selected day', day) }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'MMM yyyy'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => { console.log('month changed', month) }}
                        // Hide month navigation arrows. Default = false
                        //hideArrows={true}
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        // renderArrow={(direction) => (<Arrow />)}
                        // Do not show days of other months in month page. Default = false
                        //hideExtraDays={true}
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={false}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={1}
                        // Hide day names. Default = false

                        hideDayNames={false}

                        // Show week numbers to the left. Default = false
                        showWeekNumbers={true}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        // Disable left arrow. Default = false
                        // disableArrowLeft={false}
                        // Disable right arrow. Default = false
                        // disableArrowRight={false}
                        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                        disableAllTouchEventsForDisabledDays={true}

                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            textSectionTitleDisabledColor: '#d9e1e8',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: 'grey',
                            disabledArrowColor: '#d9e1e8',
                            monthTextColor: 'grey',
                            //indicatorColor: 'blue',
                            // textDayFontFamily: 'monospace',
                            // textMonthFontFamily: 'monospace',
                            // textDayHeaderFontFamily: 'monospace',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16
                        }}
                    // Replace default month and year title with custom one. the function receive a date as parameter.
                    //renderHeader={(date) => { }}
                    // Enable the option to swipe between months. Default = false
                    //enableSwipeMonths={true}
                    />
                    {/* <Calendar
                        nestedScrollEnabled={true}
                        numberOfMonths={2}
                        disableRange={true}
                        onChange={(range) => {
                            setDate(range)

                        }
                        }
                        minDate={new Date(2018, 3, 20)}
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
                    /> */}
                </Surface>


                {/* Setting Time */}
                <Text style={{
                    color: 'grey', margin: 25, marginBottom: 0
                    , marginTop: 30
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
                    disabled={true}
                    // disabled={doneDate && doneTime ? false : true}
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
                    onPress={() =>
                        handleAddAppointment()
                    }
                />
            </ScrollView>

        </View>



    )
}

const styles = StyleSheet.create({})
