import React from 'react';
import validationComponent from 'react-native-form-validator';
import { ScrollView, View, StyleSheet, Text, TextInput, Button, Alert, Platform } from 'react-native';
import axios from 'axios';
import Camera from './Camera';


export default class ResumeForm extends validationComponent{
    state = {
        name: '',
        nickname: '',
        age: '',
        skill: '',
        avatar: '',
    }

    _onSubmit =() =>{
        const isValid = this.validate({
            name: { required: true },
            nickname: { required: true },
            age: { required: true, numbers: true},
            skill: { required: true },
            avatar: { required: true }
        })
        if (isValid){
            const formData = new FormData();
            const uri = this.state.avatar;
            formData.append('name', this.state.name);
            formData.append('nickname', this.state.nickname);
            formData.append('age', this.state.age);
            formData.append('skill', this.state.skill);
            formData.append('avatar', {
                uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
                type: 'image/jpeg',
                name: 'avatar.jpg',
            })
            axios.post('https://movie-api.igeargeek.com/users/register',formData,{
                headers:{'content-type': 'multipart/from-data'}
            }).then((response) =>{
                // Alert.alert(
                //     "Create success",
                //     'Click OK go to resume detail page',
                //     [
                //         {
                //             test: 'OK',
                //             onPress: ()=>{
                                this.props.navigation.push('resumeDetail', { id: response.data.id })
                //             }
                //         }
                //     ]
                // )
            }).catch((error) =>{
                console.log('api error', error)
            })
        }
    }

    render() {
        return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.errorMessages}>
                    {this.getErrorMessages()}
                </Text>
            <Camera onTakePicture={(pictureUri) => {this.setState({avatar: pictureUri})}} />
            </View>
            <View>
                <Text>Full name</Text>
                <TextInput 
                style={styles.textInput}
                onChangeText={(text) => this.setState({name: text})}
                value={this.state.name}
                ></TextInput>
            </View>

            <View style={{ marginTop: 20}}>
                <Text>Nick name</Text>
                <TextInput 
                style={styles.textInput}
                onChangeText={(text) => this.setState({nickname: text})}
                value={this.state.nickname}
                ></TextInput>
            </View>

            <View style={{ marginTop: 20}}>
                <Text>Age</Text>
                <TextInput 
                style={styles.textInput}
                onChangeText={(text) => this.setState({age: text})}
                value={this.state.age}
                ></TextInput>
            </View>

            <View style={{ marginTop: 20}}>
                <Text>Skill</Text>
                <TextInput 
                style={styles.textAreaInput}
                onChangeText={(text) => this.setState({skill: text})}
                value={this.state.skill}
                multiline={true}
                ></TextInput>
            </View>

            <View style={{ marginTop: 20, marginBottom: 80}}>
                <Button title="Create Resume" onPress={this._onSubmit}>

                </Button>
            </View> 
        </ScrollView>
        )        
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30, 
        backgroundColor: 'white', 
        minHeight: '100%'
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    textAreaInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1
    },
    errorMessages:{
        color: 'red',
        marginBottom: 20
    }
})