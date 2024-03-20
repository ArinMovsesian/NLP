import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import {Container, Form, Input, Label, Item, ListItem, Body, CheckBox, Spinner, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';
import axios from "axios";
class OtpLogin extends React.Component {
    state={
        wrongCodeMessage: false,
        SpinnerIcon: false,
        timer: 60
    };
    clockCall = undefined;
    codeNumber = undefined;
    constructor(props) {
        super(props);
        // this.state = { timer: 60 };
    }
    componentDidMount() {
        this.clockCall = setInterval(() => {
            this.decrementClock();
        }, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.clockCall);
    }
    decrementClock = () => {
        this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
    };
     GoToOtpRegistration = () => {
        clearInterval(this.clockCall);
        this.props.navigator.push({
            screen: 'OtpRegistrationScreen',
            title: 'OtpRegistrationScreen',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#FFF',
                navBarBackgroundColor: '#FFF',
                navBarButtonColor: 'gray',
                topBarElevationShadowEnabled: false,
            },
        });
        // Navigation.startSingleScreenApp({
        //     screen: {
        //         screen: 'OtpRegistrationScreen',
        //         title: 'OtpRegistrationScreen',
        //         navigatorStyle: {
        //             navBarHidden: true, // make the nav bar hidden
        //         },
        //     },
        //     appStyle: {
        //         orientation: 'portrait',
        //     },
        // });
    };
    registerWithOTP = (value) => {
        this.codeNumber = value;
    };
    GoToHomeScreen = () => {
        // alert(this.props.reSendNumber);
        clearInterval(this.clockCall);
        this.setState({
            SpinnerIcon: true
        });
        axios.post('/Api/V1/auth/verifySMS',
            {
                "phone": this.props.reSendNumber,
                "code": this.codeNumber
            },
            {
                headers: {
                    "uuid": "test-arin",
                },
            }).then(response => {
            console.log('response', response);
            AsyncStorage.setItem('token', response.data.data.token.token);
            Promise.all([
                Icon.getImageSource('bars', 30, '#000'),
            ]).then( source => {
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'HomeScreen',
                        title: 'NLP Life',
                        navigatorStyle: {
                            navBarHidden: false, // make the nav bar hidden
                        },
                        navigatorButtons: {
                            rightButtons: [
                                {
                                    icon: source[0],
                                    //title: 'menu',
                                    id: 'sideDrawerBtn'
                                }
                            ]
                        }
                    },
                    drawer: { // optional, add this if you want a side menu drawer in your app
                        right: { // optional, define if you want a drawer from the left
                            screen: 'DrawerScreen', // unique ID registered with Navigation.registerScreen
                        },
                    },
                    appStyle: {
                        orientation: 'portrait',
                        navBarTitleTextCentered: true,
                        navBarTextColor: '#A5A5A5'
                    },
                });

            });
        }).catch(error => {
            console.log('error', error.response.data.error);
            this.setState({
                wrongCodeMessage: true,
                SpinnerIcon: false
            });
        });
    };
    render() {
        let tempTimeOutPut = undefined;
        if(this.state.timer === 0){
            clearInterval(this.clockCall);
            axios.post('/Api/V1/auth/sendSMS',
                {
                    "phone": this.props.reSendNumber,
                }).then(response => {
                console.log('response', response);

            }).catch(error => {
                console.log('error', error.response.data.error);
            });
            tempTimeOutPut = 'پیامک مجددا برای شما ارسال شد!';
        }else {
            tempTimeOutPut = this.state.timer
        }
        return(
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>

                    <View style={{width: '80%'}}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={require('../../assets/images/LOGOMain.png')}/>
                        </View>
                        <Text style={{textAlign: 'center',fontSize: 17, color: '#707070', fontFamily:'iranyekanwebregular'}}>کد تایید</Text>
                        <Form style={styles.OtpLogin_formStyle}>
                            <Item>
                                <Input placeholder="کد ارسال شده" maxLength={4} keyboardType='numeric' style={styles.OtpLogin_Form_Item_Input} onChangeText={this.registerWithOTP}/>
                            </Item>
                        </Form>
                        <View style={{marginTop: 25}}>
                            <Text style={{fontSize: 16, color: '#5773FF', textAlign: 'right' ,fontFamily:'iranyekanwebregular'}}>
                                {tempTimeOutPut}
                            </Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <TouchableOpacity onPress={this.GoToOtpRegistration}>
                                <Text style={{color: '#FF4F9A', fontSize: 16, fontFamily:'iranyekanwebregular'}}>اصلاح شماره همراه</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.wrongCodeMessage === true ?
                                <View style={{marginTop: 10, backgroundColor: 'red', borderRadius: 5, padding: 10}}>
                                    <Text style={{fontFamily: 'iranyekanwebregular', textAlign: 'center', color: '#FFF'}}>کد وارد شده صحیح نمی باشد.</Text>
                                </View> : null
                        }
                        {
                            this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                        }
                    </View>


                </Content>
                <TouchableOpacity style={styles.OtpLogin_registrationCircleBtnContainer} onPress={this.GoToHomeScreen}>
                    <View style={styles.OtpLogin_registrationCircleBtnInnerContainer}>
                        <Icon name='arrow-right'  style={styles.OtpLogin_registrationCircleBtnInnerIcon}/>
                    </View>
                </TouchableOpacity>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    OtpLogin_Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        flexDirection: 'column',
        padding: 20,
        position: 'relative',
    },
    OtpLogin_ContainerWrapper: {
        width: '100%',
        // backgroundColor: 'red',
    },
    OtpLogin_formStyle: {
        paddingTop : 20
    },
    OtpLogin_Form_Item_Input:{
        fontFamily: 'iranyekanwebregular',
        fontSize: 16
    },
    OtpLogin_Form_Item_Label:{
        fontFamily: 'iranyekanwebregular',
        fontSize: 16
    },
    OtpLogin_registrationCircleBtnContainer:{
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    OtpLogin_registrationCircleBtnInnerContainer:{
        width: 56,
        height: 56,
        borderRadius: 56/2,
        backgroundColor: '#3497FD',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    OtpLogin_registrationCircleBtnInnerIcon:{
        color: '#FFF'
    }
});
export default OtpLogin;