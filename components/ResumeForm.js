import React from 'react';
import validationComponent from 'react-native-form-validator';
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';


export default class ResumeForm extends validationComponent{
    state = {
        name: '',
        nickname: '',
        age: '',
        skill: ''
    }

    _onSubmit =() =>{
        const isValid = this.validate({
            name: { required: true },
            nickname: { required: true },
            age: { required: true, numbers: true},
            skill: { required: true }
        })
        if (isValid){
            const formData = new FormData();
            formData.append('name', this.state.name)
            formData.append('nickname', this.state.nickname)
            formData.append('age', this.state.age)
            formData.append('skill', this.state.skill)
            axios.post('https://movie-api.igeargeek.com/users/register',formData,{
                headers:{'content-type': 'multipart/from-data'}
            }).then((response) =>{
                Alert.alert(
                    "Create success",
                    'Click OK go to resume detail page',
                    [
                        {
                            test: 'OK',
                            onPress: ()=>{
                                this.props.navigation.push('ResumeDetail', { id: response.data.id })
                            }
                        }
                    ]
                )
            }).catch((error) =>{
                console.log('api error', error)
            })
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <View>
                <Text style={styles.errorMessages}>
                    {this.getErrorMessages()}
                </Text>
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

            <View style={{ marginTop: 20}}>
                <Button title="Create Resume" onPress={this._onSubmit}>

                </Button>
            </View>
        </View>
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