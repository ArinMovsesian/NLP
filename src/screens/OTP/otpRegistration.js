import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {
    Container,
    Content,
    Form,
    Input,
    Label,
    Item,
    ListItem,
    Body,
    Button,
    CheckBox,
    Spinner,
    Card,
    CardItem,
    Right,
    List,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';
import axios from "axios";
class OtpRegistration extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        OTPAgreement: false,
        wrongNumberMessage: false,
        SpinnerIcon: false
    };
    phoneNumberValue = undefined;
    OTPAgreementHandler = () => {
        let prevState = this.state.OTPAgreement;
        this.setState({
                ...this.state,
                OTPAgreement: !prevState,
        })
    };
    goToAuth = () => {
        this.props.navigator.push({
            screen: 'AuthScreen',
            title: 's',
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
        //         screen: 'AuthScreen',
        //         title: 'Auth',
        //         navigatorStyle: {
        //             navBarHidden: true, // make the nav bar hidden
        //         },
        //     },
        //     appStyle: {
        //         orientation: 'portrait',
        //     },
        // });
    };
    phoneNumberChange = (value) => {
        this.phoneNumberValue = value;
    };

    GoToOtpLogin = () => {
        if(this.state.OTPAgreement === false) {
            alert('تیک توافق را انتخاب نمایید.');
        }else {
            this.setState({
                SpinnerIcon: true
            });

            //API

            axios.post('/Api/V1/auth/sendSMS',
                {
                    "phone": this.phoneNumberValue,
                }).then(response => {
                console.log('response', response);


                this.props.navigator.push({
                    screen: 'OtpLoginScreen',
                    title: 'OtpLoginScreen',
                    navigatorStyle: {
                        navBarTextFontFamily: 'iranyekanwebregular',
                        navBarTextColor: '#FFF',
                        navBarBackgroundColor: '#FFF',
                        navBarButtonColor: 'gray',
                        topBarElevationShadowEnabled: false,
                    },
                    passProps: {
                        'reSendNumber': this.phoneNumberValue
                    },
                });

                // Navigation.startSingleScreenApp({
                //     screen: {
                //         screen: 'OtpLoginScreen',
                //         title: 'OtpLoginScreen',
                //         navigatorStyle: {
                //             navBarHidden: true, // make the nav bar hidden
                //         },
                //     },
                //     appStyle: {
                //         orientation: 'portrait',
                //     },
                //     passProps: {
                //         'reSendNumber': this.phoneNumberValue
                //     },
                // });
                //


            }).catch(error => {
                console.log('error', error.response.data.error);
                this.setState({
                    wrongNumberMessage: true,
                    SpinnerIcon: false,
                })
            });

        }
    };
    render() {

        return(
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <View style={{width: '80%'}}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={require('../../assets/images/LOGOMain.png')}/>
                        </View>
                        <Text style={{textAlign: 'center',fontSize: 20, color: '#707070', fontFamily:'iranyekanwebregular', marginTop:
                        30, marginBottom: 30}}>ورود و ثبت نام با شماره همراه</Text>
                        <Item>
                            <Input placeholder="شماره همراه" keyboardType='numeric' onChangeText={this.phoneNumberChange} style={{fontFamily: 'iranyekanwebregular'}}/>
                        </Item>
                        <ListItem  style={{borderBottomWidth: 0, marginTop: 30}}>
                            <Body>
                            <TouchableOpacity onPress={this.OTPAgreementHandler}>
                                <Text style={{fontFamily: 'iranyekanwebregular'}}><Text style={{color: '#3497FD'}}>قوانین و شرایط </Text>را قبول دارم</Text>
                            </TouchableOpacity>
                            </Body>
                            <CheckBox checked={this.state.OTPAgreement} color="#707070" style={{borderRadius: 3, marginLeft: 5}} onPress={this.OTPAgreementHandler}/>
                        </ListItem>
                        {
                            this.state.wrongNumberMessage === true ?
                                <View style={{marginTop: 10, backgroundColor: 'red', borderRadius: 5, padding: 10}}>
                                    <Text style={{fontFamily: 'iranyekanwebregular', textAlign: 'center', color: '#FFF'}}>شماره وارد شده صحیح نمی باشد.</Text>
                                </View> : null
                        }
                        {
                            this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                        }
                    </View>
                </Content>
                <View>
                    <TouchableOpacity onPress={this.goToAuth}>
                        <Text style={{textAlign:'center', fontSize: 16, color: '#3497FD', fontFamily:'iranyekanwebregular', padding: 20}}>ورود و ثبت نام با ایمیل</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.OtpRegistration_registrationCircleBtnContainer} onPress={this.GoToOtpLogin}>
                    <View style={styles.OtpRegistration_registrationCircleBtnInnerContainer}>
                        <Icon name='arrow-right'  style={styles.OtpRegistration_registrationCircleBtnInnerIcon}/>
                    </View>
                </TouchableOpacity>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    OtpRegistration_Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        flexDirection: 'column',
        padding: 20,
        position: 'relative',
    },
    OtpRegistration_ContainerWrapper: {
        width: '100%',
        // backgroundColor: 'red',
    },
    OtpRegistration_formStyle: {
        paddingTop : 20
    },
    OtpRegistration_Form_Item_Input:{
        fontFamily: 'iranyekanwebregular',
        fontSize: 16
    },
    OtpRegistration_Form_Item_Label:{
        fontFamily: 'iranyekanwebregular',
        fontSize: 16
    },
    OtpRegistration_ListItem: {

    },
    OtpRegistration_CheckBox:{
        borderRadius: 3,
        marginLeft: 5
    },
    OtpRegistration_registrationCircleBtnContainer:{
        position: 'absolute',
        bottom: 20,
        right: 10
    },
    OtpRegistration_registrationCircleBtnInnerContainer:{
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
    OtpRegistration_registrationCircleBtnInnerIcon:{
        color: '#FFF'
    }
});
export default OtpRegistration;