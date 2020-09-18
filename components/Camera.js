import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';

export default () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [tackPictureMode, setTackPictureMode] = useState(false);
    const [picture, setPicture] = useState('');

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })();
    }, [])

    const takePhoto = async () =>{
        let photo = await this.camera.takePictureAsync();
        setPicture(photo.url)
        props.onTakePicture(photo.uri)
    }

    if(hasPermission === null){
        return <View />
    } 
    if(hasPermission === false){
        return <Text>No access to camera</Text>
    }
    if(picture){
        return <Images style={styles.avatar} source={{ uri: picture }} />
    }else if(tackPictureMode){
        return (
            <View>
                <Camera 
                ref={ ref => {this.camera = ref}}
                type={Camera.Constants.Type.front}
                style={styles.camera}/>
                <Button onPress={takePhoto} title="Take Photo" />
            </View>
        );
    }else{
        return <Button onPress= {() => setTackPictureMode(true)} title="Take Picture" />
    }
    
}

const styles = StyleSheet.create({
    camera: { width: '100%', height: 360 },
    avatar: {width: '100%', height: '100%'}
})