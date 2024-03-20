import React from 'react';
import {View, StyleSheet, AsyncStorage, Alert, TouchableOpacity} from 'react-native';
import {ListItem, Left, Right, Body, Button, Thumbnail, Text, Item, Input, Label, Form} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Navigation} from "react-native-navigation";
import axios from "axios";
class EditProfile extends React.Component {
    // userUpdate = {
    //     firstName: undefined,
    //     lastName: undefined,
    //     mobile: undefined,
    //     address: undefined,
    //     nationalCode: undefined
    // };
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.userFirstName,
            lastName: this.props.userLastName,
            mobile: this.props.userMobile,
            address: this.props.userAddress,
            nationalCode: this.props.userNationalCode,
        };
    }
    closeEditProfile = () => {
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
    };
    updateEditProfile = () => {
        // Works on both iOS and Android
        Alert.alert(
            'ذخیره تغییرات',
            'از ذخیره کردن تغییرات اطمینان دارید؟ ',
            [
                {text: 'انصراف', onPress: () => {null}, style: 'cancel'},
                {text: 'ذخیره', onPress: () => {

                        // console.log('name: ', this.state.firstName);
                        // console.log('lastname: ', this.state.lastName);
                        // console.log('mobile: ', this.state.mobile);
                        // console.log('address: ', this.state.address);
                        // console.log('na: ', this.state.nationalCode);
                         //API
                        AsyncStorage.getItem('token').then((value) => {
                            axios.post('/Api/V1/auth/profile-update',
                                {
                                    "name": this.state.firstName,
                                    "family": this.state.lastName,
                                    "mobile": this.state.mobile,
                                    "address": this.state.address,
                                    "national_code": this.state.nationalCode
                                },
                                {
                                    headers: {
                                        "uuid": "test-arin",
                                        "token": value,
                                    },
                                }).then(response => {
                                console.log('response', response);
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
                            });
                        });

                    }},
            ],
            { cancelable: false }
        );

    };
    // updateFirstName = (value) => {
    //     this.userUpdate.firstName = value;
    //     console.log('this.userUpdate.firstName: ', this.userUpdate.firstName);
    // };
    // updateLastName = (value) => {
    //     this.userUpdate.lastName = value;
    // };
    // updateMobile = (value) => {
    //     this.userUpdate.mobile = value
    // };
    // updateAddress = (value) => {
    //     this.userUpdate.address = value
    // };
    // updateNationalCode =(value) => {
    //     this.userUpdate.nationalCode = value
    // };
    render() {

        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                <ListItem thumbnail style={{borderBottomWidth: 0}}>
                    <Left>
                        <TouchableOpacity onPress={this.closeEditProfile} style={{width: 45, height: 45}}>
                            <Icon name="times" style={{color: '#707070'}} size={25} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{borderBottomWidth: 0}}>
                        <Text style={{textAlign: 'center', color: '#707070', fontFamily:'iranyekanwebregular'}}>ویرایش پروفایل</Text>
                    </Body>
                    <Right style={{borderBottomWidth: 0}}>
                        <TouchableOpacity onPress={this.updateEditProfile} style={{width: 45, height: 45}}>
                            <Icon name="check" style={{color: '#707070'}}  size={25}/>
                        </TouchableOpacity>
                    </Right>
                </ListItem>
                <Form style={styles.auth_formStyle}>
                    <Item inlineLabel style={{marginTop: 10}}>
                        <Input style={styles.auth_Form_Item_Input} onChangeText={(firstName) => this.setState({firstName})} value={this.state.firstName}/>
                        <Label style={styles.auth_Form_Item_Label}>نام</Label>
                    </Item>
                    <Item inlineLabel style={{marginTop: 10}}>
                        <Input style={styles.auth_Form_Item_Input} onChangeText={(lastName) => this.setState({lastName})} value={this.state.lastName}/>
                        <Label style={styles.auth_Form_Item_Label}>نام خانوادگی</Label>
                    </Item>
                    <Item inlineLabel style={{marginTop: 10}}>
                        <Input keyboardType='numeric' style={styles.auth_Form_Item_Input} onChangeText={(mobile) => this.setState({mobile})} value={this.state.mobile}/>
                        <Label style={styles.auth_Form_Item_Label}>شماره همراه</Label>
                    </Item>
                    <Item inlineLabel style={{marginTop: 10}}>
                        <Input style={styles.auth_Form_Item_Input} onChangeText={(address) => this.setState({address})} value={this.state.address}/>
                        <Label style={styles.auth_Form_Item_Label}>آدرس</Label>
                    </Item>
                    <Item inlineLabel style={{marginTop: 10}}>
                        <Input keyboardType='numeric' style={styles.auth_Form_Item_Input} onChangeText={(nationalCode) => this.setState({nationalCode})} value={this.state.nationalCode}/>
                        <Label style={styles.auth_Form_Item_Label}>شماره ملی</Label>
                    </Item>
                </Form>
            </View>
        )
    }
}
const styles = StyleSheet.create({
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
});
export default EditProfile