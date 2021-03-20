import React, { Component } from 'react'
import {TextInput,View,Button} from 'react-native';
import firebase from 'firebase';

export class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
        this.signin=this.signin.bind(this)
    }
    signin(){
        const {email,password}=this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result)=>{
            console.log(result)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    render() {
        return (
            <View>
                <TextInput 
                    placeholder='email'
                    onChangeText={(email)=> this.setState({email})}
                />

                <TextInput 
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(password)=> this.setState({password})}
                />

                <Button
                title="Sign in"
                onPress={()=> this.signin()}
                />
            </View>
        )
    }
}

export default Login
