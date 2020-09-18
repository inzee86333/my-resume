import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { StyleSheet, View, Text } from 'react-native';

export default (props) =>{
    const [resume, serResume] = useState({
        name: '',
        nickname: '',
        age: '',
        skill: ''
    });

    useEffect(()=>{
        const id = props.route.params.id;
        axios.get(`https://movie-api.igeargeek.com/users/profile/${id}`)
        .then((response)=>{
            console.log('response' ,response.data);
            serResume(response.data);
        }).catch((error)=>{
            console.log('error' ,error);
        })
    },[
        resume
    ]);

    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={{uri: `https://movie-api.igeargeek.com/${resume.avatar}`}} />
            <View style={styles.textLine}>
                <Text style={{fontSize: 20}}> Full Name: {resume.name}</Text>
            </View>
            <View style={styles.textLine}>
                <Text style={{fontSize: 20}}> Nick Name: {resume.nickname}</Text>
            </View>
            <View style={styles.textLine}>
                <Text style={{fontSize: 20}}> Age: {resume.age}</Text>
            </View>
            <View style={styles.textLine}>
                <Text style={{fontSize: 20}}> Skill: {resume.skill}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 30,
        backgroundColor: 'white',
        minHeight: '100%'
    }, textLine:{
        marginBottom: 20,
    },
    avatar:{
        width: '100%',
        height: 360,
        marginBottom: 20
    }
})
