import React from 'react';

import {View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import { Container, Content, Button, Tab, Tabs, TabHeading, Item, ListItem, CheckBox, Body,Form, Input, Label,Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import {Navigation} from "react-native-navigation";
import {connect} from 'react-redux';
class Auth extends React.Component {
    state = {
      login: {
          email: '',
          password: '',
          token: '',
          loginEmailErrorShow: false,
          loginPasswordErrorShow: false,
          wrongUsernamePassword: false,
          SpinnerIcon: false
      },
      register: {
          CheckBox: false,
          successRegistrationMessage: false,
          emailExistRegistrationMessage: false,
          SpinnerIcon: false
      }
    };
    login = {
        Email: '',
        Password: ''
    };
    register = {
        Username: '',
        Email: '',
        Password: '',

    };
    loginHandler = () => {
        this.setState({
            login: {
                ...this.state.register,
                SpinnerIcon: true
            }
        });
        axios.post('/Api/V1/auth/login',
            {
                "email": this.login.Email,
                "password": this.login.Password
            },
            {
                headers: {
                    "uuid": "test-arin",
                },
            }).then(response => {
            console.log('response',response);

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
                                    title: 'menu',
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
            console.log('error',error.response.data.data);
            this.setState({
                login: {
                    wrongUsernamePassword: true,
                    SpinnerIcon: false,
                }
            })
        });
    };
    registerAgreementHandler = () => {
      let prevState = this.state.register.CheckBox;
      this.setState({
          register: {
              ...this.state.register,
              CheckBox: !prevState
          }
      })
    };
    registerHandler = () => {
      if(this.register.Username === '') {
          alert('نام کاربری را وارد نمایید.')
      }else if(this.register.Email === '') {
          alert('ایمیل خود را وارد نمایید.')
      }else if(this.register.Password === '') {
          alert('رمز عبور را وارد نمایید.')
      }else if(this.state.register.CheckBox === false) {
          alert('تیک توافق را انتخاب نمایید.');
      }else {
          this.setState({
              register: {
                  ...this.state.register,
                  SpinnerIcon: true
              }
          });
          axios.post('/Api/V1/auth/register',
              {
                  "email": this.register.Email,
                  "password": this.register.Password,
                  "name": this.register.Username
              },
              {
                  headers: {
                      "uuid": "test-arin",
                  },
              }).then(response => {
              console.log('response',response);
              this.setState({
                  register: {
                      ...this.state.register,
                      successRegistrationMessage: true,
                      emailExistRegistrationMessage: false,
                      SpinnerIcon: false
                  }
              })
          }).catch(error => {
              console.log('error',error.response.data.data);
              this.setState({
                  register: {
                      ...this.state.register,
                      successRegistrationMessage: false,
                      emailExistRegistrationMessage: true,
                      SpinnerIcon: false
                  }
              })
          });
      }
    };
    registerUsernameHandler = (value) => {
        this.register.Username = value
    };
    registerEmailHandler = (value) => {
        this.register.Email = value
    };
    registerPasswordHandler = (value) => {
        this.register.Password = value
    };

    loginEmailHandler = (value) => {
        this.login.Email = value;
    };
    loginPasswordHandler = (value) => {
       this.login.Password = value;
    };
    // GoToOtpRegistration = () => {
    //     Navigation.startSingleScreenApp({
    //         screen: {
    //             screen: 'OtpRegistrationScreen',
    //             title: 'Otp',
    //             navigatorStyle: {
    //                 navBarHidden: true, // make the nav bar hidden
    //             },
    //         },
    //         appStyle: {
    //             orientation: 'portrait',
    //         },
    //     });
    // };
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, alignItems: 'flex-end', flexDirection: 'row', }}>
                <View style={{width: '90%'}}>
                    <View style={styles.auth_NlpLifeImgContainer}>
                        <Image source={require('../../assets/images/LOGOMain.png')}/>
                    </View>
                    <View style={styles.auth_tabsContainer}>
                        <Tabs tabContainerStyle={{elevation:0}}
                              tabBarUnderlineStyle={{ backgroundColor: '#665EFF'}}
                        >
                            <Tab heading={
                                <TabHeading style={styles.auth_tabHeadingStyle}>
                                    <Text style={styles.auth_tabHeadingTextStyle}>عضویت</Text>
                                </TabHeading>
                            }>
                                <Form style={styles.auth_formStyle}>
                                    <Item>
                                        <Input placeholder="نام کاربری" onChangeText={this.registerUsernameHandler} style={{fontFamily: 'iranyekanwebregular'}}/>
                                    </Item>
                                    <Item>
                                        <Input placeholder="ایمیل" onChangeText={this.registerEmailHandler} style={{fontFamily: 'iranyekanwebregular'}}/>
                                    </Item>
                                    <Item>
                                        <Input placeholder="رمز عبور" onChangeText={this.registerPasswordHandler} style={{fontFamily: 'iranyekanwebregular'}}/>
                                    </Item>
                                </Form>
                                <ListItem style={styles.auth_ListItem}>
                                    <Body>
                                        <TouchableOpacity onPress={this.registerAgreementHandler}>
                                            <Text style={{fontFamily: 'iranyekanwebregular'}}><Text style={{color: '#3497FD'}}>قوانین و شرایط </Text>را قبول دارم</Text>
                                        </TouchableOpacity>
                                    </Body>
                                    <CheckBox checked={this.state.register.CheckBox} color="#707070" style={styles.auth_CheckBox} onPress={this.registerAgreementHandler}/>
                                </ListItem>
                                {
                                    this.state.register.successRegistrationMessage === true ?
                                    <View style={{marginTop: 10, backgroundColor: 'green', borderRadius: 5, padding: 10}}>
                                        <Text style={{fontFamily: 'iranyekanwebregular', textAlign: 'center', color: '#FFF'}}>لطفا جهت تکمیل ثبت نام به ایمیل خود مراجعه فرمایید.</Text>
                                    </View> : null
                                }
                                {
                                    this.state.register.emailExistRegistrationMessage === true ?
                                        <View style={{marginTop: 10, backgroundColor: 'red', borderRadius: 5, padding: 10}}>
                                            <Text style={{fontFamily: 'iranyekanwebregular', textAlign: 'center', color: '#FFF'}}>ایمیل مورد نظر تکراری می باشد.</Text>
                                        </View> : null
                                }
                                <TouchableOpacity style={styles.auth_registrationCircleBtnContainer} onPress={this.registerHandler}>
                                    <View style={styles.auth_registrationCircleBtnInnerContainer}>
                                        <Icon name='arrow-right'  style={styles.auth_registrationCircleBtnInnerIcon}/>
                                    </View>
                                </TouchableOpacity>
                                {
                                    this.state.register.SpinnerIcon === true ? <Spinner color='blue' /> : null
                                }
                            </Tab>
                            <Tab heading={ <TabHeading style={styles.auth_tabHeadingStyle}><Text style={styles.auth_tabHeadingTextStyle}>ورود</Text></TabHeading>}>

                                <Form style={styles.auth_formStyle}>
                                    <Item>
                                        <Input placeholder="ایمیل" onChangeText={this.loginEmailHandler} style={{fontFamily: 'iranyekanwebregular'}}/>
                                    </Item>
                                    <Item>
                                        <Input placeholder="رمز عبور" onChangeText={this.loginPasswordHandler} style={{fontFamily: 'iranyekanwebregular'}}/>
                                    </Item>
                                </Form>
                                {/*<View style={{marginTop: 20}}>*/}
                                    {/*<TouchableOpacity onPress={this.GoToOtpRegistration}>*/}
                                        {/*<Text style={{textAlign: 'center', color: '#3497FD', fontFamily: 'iranyekanwebregular', fontSize: 16, padding: 10}}>ورود و ثبت نام با موبایل</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                {/*</View>*/}
                                {
                                    this.state.login.wrongUsernamePassword === true
                                    ?
                                    <View style={{marginTop: 50, backgroundColor: 'red', borderRadius: 5, padding: 10}}>
                                        <Text style={{fontFamily: 'iranyekanwebregular', textAlign: 'center', color: '#FFF'}}>رمز عبور یا ایمیل اشتباه می باشد.</Text>
                                    </View>
                                    : null
                                }

                                <TouchableOpacity style={styles.auth_registrationCircleBtnContainer} onPress={this.loginHandler}>
                                        <View style={styles.auth_registrationCircleBtnInnerContainer}>
                                            <Icon name='arrow-right'  style={styles.auth_registrationCircleBtnInnerIcon}/>
                                        </View>
                                </TouchableOpacity>
                                {
                                    this.state.login.SpinnerIcon === true ? <Spinner color='blue'/> : null
                                }
                            </Tab>
                        </Tabs>
                    </View>
                </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    auth_container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: 'transparent'
    },
    auth_NlpLifeImgContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    auth_tabsContainer: {
        width: '100%',
        height: '75%',
        position: 'relative'
    },
    auth_tabHeadingStyle: {
        backgroundColor: '#FFF'
    },
    auth_tabHeadingTextStyle: {
        color: '#665EFF',
        fontSize: 20,
        fontFamily: 'iranyekanwebregular'
    },
    auth_formStyle: {
        paddingTop : 20
    },
    auth_Form_Item_Input:{
        fontFamily: 'iranyekanwebregular',
        fontSize: 16
    },
    auth_Form_Item_Label:{
        fontFamily: 'iranyekanwebregular',
        fontSize: 16
    },
    auth_ListItem: {
        borderBottomWidth: 0
    },
    auth_CheckBox:{
        borderRadius: 3,
        marginLeft: 5
    },
    auth_registrationCircleBtnContainer:{
        position: 'absolute',
        bottom: 10,
        right: 0
    },
    auth_registrationCircleBtnInnerContainer:{
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
    auth_registrationCircleBtnInnerIcon:{
        color: '#FFF'
    }
});

export default Auth;