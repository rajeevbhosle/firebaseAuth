
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, StatusBar, TextInput, FlatList, ScrollView, Card, Alert } from "react-native";
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from "firebase";
import { FirebaseConfig } from "../config"
import { object } from "yup/lib/locale";



// if (!firebase.apps.length) {
//     firebase.initializeApp(FirebaseConfig);

// }



const reviewSchema = yup.object({
    title: yup.string()
        .required()
        .min(3),
    body: yup.string()
        .required()
        .min(3),
    rating: yup.string()
        .required()
        .test('is-num-1-5', 'Rating must be a number 1 - 5', (val) => {
            return parseInt(val) < 6 && parseInt(val) > 0;
        }),
});


export const Page1 = ({ navigation }) => {

    const [dataof, setdata] = useState([{}])

    useEffect(() => {

        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         Alert.alert(user);

        //     } else {

        //         navigation.replace("Loginscreen");

        //     }
        // });




        return () => {
        }
    })


    const fetchdata = () => {
        const data = firebase.database().ref("user");
        data.on("value", dataofser => {
            // console.log("values", dataofser.val());
            // console.log("values", Object.values(dataofser.val()));

            if (dataofser.val()) {
                setdata(Object.values(dataofser.val()))
                // console.log(dataof[0].body);
                console.log(dataof);
            }
        })
    }
    const removedata = () => {
        firebase.database().ref("user").remove();
        setdata([{ rating: "", title: "", body: "" }]);


    }

    const addReview = (review) => {
        // console.log("review", review.title)
        // review.key = Math.random().toString();

        const submit_data = firebase.database().ref("user");
        //set overides 
        // submit_data.set({
        //     title: review.title,
        //     body: review.body,
        //     rating: review.rating,
        // })

        //push  

        submit_data.push({
            title: review.title,
            body: review.body,
            rating: review.rating,
        })






    };
    const logoutuser = () => {
        firebase.auth().signOut().then(() => {

            // navigation.navigate('Loginscreen');
        }).catch((error) => {
            // An error happened.
        });









    };



    return (

        <View style={globalStyles.container}>
            <Formik
                initialValues={{ title: '', body: '', rating: '' }}
                validationSchema={reviewSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addReview(values);
                }}
            >
                {props => (
                    <View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Review title'
                            onChangeText={props.handleChange('title')}
                            onBlur={props.handleBlur('title')}
                            value={props.values.title}
                        />
                        {/* only if the left value is a valid string, will the right value be displayed */}
                        <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>

                        <TextInput
                            style={globalStyles.input}
                            multiline
                            placeholder='Review details'
                            onChangeText={props.handleChange('body')}
                            onBlur={props.handleBlur('body')}
                            value={props.values.body}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.body && props.errors.body}</Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Rating (1 - 5)'
                            onChangeText={props.handleChange('rating')}
                            onBlur={props.handleBlur('rating')}
                            value={props.values.rating}
                            keyboardType='numeric'
                        />
                        <Text style={globalStyles.errorText}>{props.touched.rating && props.errors.rating}</Text>
                        <View style={{ paddingBottom: 18, paddingTop: 8 }}>
                            <Button color='green' title="Submit " onPress={props.handleSubmit} />
                        </View>
                        <View style={{ paddingBottom: 18, paddingTop: 8 }}>

                            <Button color='maroon' title="fetch" onPress={fetchdata} />
                        </View>
                        <View style={{ paddingBottom: 18, paddingTop: 8 }}>

                            <Button color='maroon' title="remove" onPress={removedata} />
                        </View>

                        <Button color='maroon' title="logout" onPress={logoutuser} />




                    </View>
                )}
            </Formik>


            <View style={styles.lists}>
                <ScrollView>
                    <FlatList data={dataof} renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                            <Text style={styles.text}>Title: {item.title}</Text>
                            <Text style={styles.text}> Body: {item.body}</Text>
                            <Text style={styles.text}> Rating: {item.rating}</Text>


                        </View>



                    )} />
                </ScrollView>


            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 18,
        marginLeft: 3,
        padding: 8,
    },
    lists: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 18,
        borderRadius: 6,
        textAlign: "center",
        marginTop: 10,



    }
});