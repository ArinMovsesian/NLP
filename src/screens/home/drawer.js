import React from 'react';
import {View,Linking, Text, Dimensions, StyleSheet, AsyncStorage, TouchableOpacity, ScrollView} from 'react-native';
import {Button, ListItem, List, Left, Right, Thumbnail, Body, Icon} from 'native-base';
import {Navigation} from "react-native-navigation";
import axios from "axios";
class Drawer extends React.Component{

   state = {
       user: {
           firstName: undefined,
           lastName: undefined,
           user_type: undefined,
           mobile: undefined,
           address: undefined,
           national_code: undefined
       },
       guestState: undefined

   };

    componentDidMount() {
        //API
        AsyncStorage.getItem('token').then((value) => {
            if(value === null) {
                this.setState({
                    guestState: true
                })
            }else {
                axios.get('/Api/V1/auth/userInfo',
                    {
                        headers: {
                            "uuid": "test-arin",
                            "token": value,
                        },
                    }).then(response => {
                    console.log('response', response);
                    this.setState({
                        ...this.state,
                        user: {
                            firstName: response.data.data.name,
                            lastName: response.data.data.family,
                            user_type: response.data.data.user_type.title,
                            mobile: response.data.data.mobile,
                            address: response.data.data.address,
                            national_code: response.data.data.national_code
                        },
                        guestState: false
                    });
                }).catch(error => {
                    console.log('error', error.response.data.error);
                });
            }

        });

    }
    logOutH = () => {
        AsyncStorage.clear(() => {
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'MainScreen',
                    title: 'Main',
                    navigatorStyle: {
                        navBarHidden: true, // make the nav bar hidden,
                    },
                },
                appStyle: {
                    orientation: 'portrait',
                },
            });
        })
    };
    openEditProfile = () => {
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'EditProfileScreen',
                    title: 'Edit',
                    navigatorStyle: {
                        navBarHidden: true, // make the nav bar hidden
                    },
                },
                appStyle: {
                    orientation: 'portrait',
                },
                passProps: {
                    'userFirstName': this.state.user.firstName,
                    'userLastName': this.state.user.lastName,
                    'userMobile': this.state.user.mobile,
                    'userAddress': this.state.user.address,
                    'userNationalCode': this.state.user.national_code
                },
            });
        };
    openShoppingCardScreen = () => {
        this.props.navigator.push({
            screen: 'ShoppingCardScreen',
            title: 'سبد خرید',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#FFF',
                navBarBackgroundColor: '#F94E4E',
                navBarButtonColor: '#FFF',
                topBarElevationShadowEnabled: false,
            },
            // passProps: {
            //     itemID: id,
            // },
        })
    };
    openDownloadScreen = () => {
        this.props.navigator.push({
            screen: 'DownloadScreen',
            title: 'خرید های من',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070',
                navBarBackgroundColor: '#FFF',
                navBarButtonColor: '#707070',
                topBarElevationShadowEnabled: false,
            },
            // passProps: {
            //     itemID: id,
            // },
        })
    };
    openFAQScreen = () => {
        this.props.navigator.push({
            screen: 'FAQScreen',
            title: 'سوالات متداول',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070',
                navBarBackgroundColor: '#FFF',
                navBarButtonColor: '#707070',
                topBarElevationShadowEnabled: false,
            },
            // passProps: {
            //     itemID: id,
            // },
        })
    };
    openWalletScreen = () => {
        this.props.navigator.push({
            screen: 'WalletScreen',
            title: 'کیف پول',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070',
                navBarBackgroundColor: '#FFF',
                navBarButtonColor: '#707070',
                topBarElevationShadowEnabled: false,
            },
            // passProps: {
            //     itemID: id,
            // },
        })
    };
    goToHomePage = () => {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'MainScreen',
                title: 'Main',
                navigatorStyle: {
                    navBarHidden: true, // make the nav bar hidden
                },
            },
            appStyle: {
                orientation: 'portrait',
            },
        });
    };
    openTelegramLink = () => {
        Linking.openURL('https://telegram.me/NLPlife');
    };
    contactUs = () => {
        Linking.openURL('tel:02126422582');
    };
    openDownloadCertificateScreen = () => {
        this.props.navigator.push({
            screen: 'DownloadCertificateScreen',
            title: 'مدارک اخذ شده',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070',
                navBarBackgroundColor: '#FFF',
                navBarButtonColor: '#707070',
                topBarElevationShadowEnabled: false,
            },
            // passProps: {
            //     itemID: id,
            // },
        });
    };
    businessCoaching = () => {
        this.props.navigator.push({
            screen: 'businessCoachingScreen',
            title: 'کوچینگ کسب و کار',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070',
                navBarBackgroundColor: '#FFF',
                navBarButtonColor: '#707070',
                topBarElevationShadowEnabled: false,
            },
            // passProps: {
            //     itemID: id,
            // },
        });
    };
    render() {
        return (
        this.state.guestState === true
        ?
            <View style={[{width: Dimensions.get("window").width * 0.8}, style.container]}>
                <View>
                    <Text style={{textAlign: 'center', color: '#FFF', fontSize: 20, }}>NLP Life</Text>
                </View>
                <ScrollView>
                    <List>

                        {/*<ListItem style={{borderBottomWidth: 0}} onPress={this.openFAQScreen}>*/}
                            {/*<Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>پرسش و پاسخ</Text></Body>*/}
                            {/*<Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="chatbubbles" style={{color: '#FFF'}}/></Right>*/}
                        {/*</ListItem>*/}
                        <ListItem style={{borderBottomWidth: 0}} onPress={this.openTelegramLink}>
                            <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>تلگرام</Text></Body>
                            <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="send" style={{color: '#FFF'}}/></Right>
                        </ListItem>
                        {/*<ListItem style={{borderBottomWidth: 0}}>*/}
                            {/*<Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>تنظیمات</Text></Body>*/}
                            {/*<Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="settings" style={{color: '#FFF'}}/></Right>*/}
                        {/*</ListItem>*/}
                        <ListItem style={{borderBottomWidth: 0}} onPress={this.contactUs}>
                            <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>تماس با ما</Text></Body>
                            <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="call" style={{color: '#FFF'}}/></Right>
                        </ListItem>
                        {/*<ListItem style={{borderBottomWidth: 0}} onPress={this.businessCoaching}>*/}
                            {/*<Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>کوچینگ کسب و کار</Text></Body>*/}
                            {/*<Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="people" style={{color: '#FFF'}}/></Right>*/}
                        {/*</ListItem>*/}
                        <ListItem style={{borderBottomWidth: 0}} onPress={this.openFAQScreen}>
                            <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>سوالات متداول</Text></Body>
                            <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="help" style={{color: '#FFF'}}/></Right>
                        </ListItem>
                        <ListItem style={{borderBottomWidth: 0}} onPress={this.goToHomePage}>
                            <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>ورود</Text></Body>
                            <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="log-in" style={{color: '#FFF'}}/></Right>
                        </ListItem>
                    </List>
                    {/*<Button block light>*/}
                    {/*<Text>log out</Text>*/}
                    {/*</Button>*/}
                </ScrollView>
            </View>
        :
            <View style={[{width: Dimensions.get("window").width * 0.8}, style.container]}>
                <View>
                    <Text style={{textAlign: 'center', color: '#FFF', fontSize: 20, }}>NLP Life</Text>
                </View>
                <ScrollView>
                <List>
                    <ListItem thumbnail style={{marginTop: 30}}>
                        <Left>
                            <TouchableOpacity onPress={this.openEditProfile} style={{width: 45, height: 45}}>
                                    <Icon name="create" style={{color: '#FFF'}}/>
                            </TouchableOpacity>
                        </Left>
                        <Body style={{marginRight: 20,  borderBottomWidth: 0}}>
                            <Text style={{textAlign: 'right', color: '#FFF'}}>{this.state.user.mobile === null || this.state.user.mobile === '' ? '-':this.state.user.mobile}</Text>
                            <Text style={{fontFamily: 'iranyekanwebregular', color: '#FFF', textAlign: 'right'}}>{this.state.user.firstName}</Text>
                            <Text style={{fontFamily: 'iranyekanwebregular', color: '#FFF', textAlign: 'right'}}>{this.state.user.lastName === '' || this.state.user.lastName === null ? '-': this.state.user.lastName}</Text>
                            <Text style={{fontFamily: 'iranyekanwebregular',  color: '#FFF'}}>{this.state.user.user_type}</Text>
                        </Body>
                        <Right style={{borderBottomWidth: 0}}>

                            <Thumbnail large source={require('../../assets/images/placeholder_user.png')} />

                        </Right>
                    </ListItem>
                    <ListItem style={{borderBottomWidth: 0}} onPress={this.openDownloadScreen}>
                        <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>خرید های من</Text></Body>
                        <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="download" style={{color: '#FFF'}}/></Right>
                    </ListItem>
                    {/*<ListItem style={{borderBottomWidth: 0}}>*/}
                        {/*<Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>بیزینس کوچینگ</Text></Body>*/}
                        {/*<Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="person" style={{color: '#FFF'}}/></Right>*/}
                    {/*</ListItem>*/}
                    <ListItem style={{borderBottomWidth: 0}} onPress={this.openDownloadCertificateScreen}>
                        <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>مدارک اخذ شده</Text></Body>
                        <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="document" style={{color: '#FFF'}}/></Right>
                    </ListItem>
                    <ListItem style={{borderBottomWidth: 0}} onPress={this.openShoppingCardScreen}>
                        <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>سبد خرید</Text></Body>
                        <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="cart" style={{color: '#FFF'}}/></Right>
                    </ListItem>
                    <ListItem style={{borderBottomWidth: 0}} onPress={this.openWalletScreen}>
                        <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>کیف پول</Text></Body>
                        <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="cash" style={{color: '#FFF'}}/></Right>
                    </ListItem>
                    {/*<ListItem style={{borderBottomWidth: 0}}>*/}
                        {/*<Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>پرسش و پاسخ</Text></Body>*/}
                        {/*<Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="chatbubbles" style={{color: '#FFF'}}/></Right>*/}
                    {/*</ListItem>*/}
                    <ListItem style={{borderBottomWidth: 0}} onPress={this.openTelegramLink}>
                        <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>تلگرام</Text></Body>
                        <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="send" style={{color: '#FFF'}}/></Right>
                    </ListItem>
                    {/*<ListItem style={{borderBottomWidth: 0}}>*/}
                        {/*<Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>تنظیمات</Text></Body>*/}
                        {/*<Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="settings" style={{color: '#FFF'}}/></Right>*/}
                    {/*</ListItem>*/}
                    <ListItem style={{borderBottomWidth: 0}} onPress={this.contactUs}>
                        <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>تماس با ما</Text></Body>
                        <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="call" style={{color: '#FFF'}}/></Right>
                    </ListItem>

                    <ListItem style={{borderBottomWidth: 0}} onPress={this.businessCoaching}>
                        <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>کوچینگ کسب و کار</Text></Body>
                        <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="people" style={{color: '#FFF'}}/></Right>
                    </ListItem>


                    <ListItem style={{borderBottomWidth: 0}} onPress={this.openFAQScreen}>
                        <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>سوالات متداول</Text></Body>
                        <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="help" style={{color: '#FFF'}}/></Right>
                    </ListItem>
                    <ListItem style={{borderBottomWidth: 0}} onPress={this.logOutH}>
                        <Body><Text style={{fontFamily: 'iranyekanwebregular', color: "#FFF", textAlign: 'right', fontSize: 15}}>خروج</Text></Body>
                        <Right style={{ alignItems: 'center', justifyContent: 'center'}}><Icon name="log-out" style={{color: '#FFF'}}/></Right>
                    </ListItem>
                </List>
                {/*<Button block light>*/}
                    {/*<Text>log out</Text>*/}
                {/*</Button>*/}
                </ScrollView>
            </View>
        )

    }
}
const style = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: '#F94E4E',
        flex: 1
    }
});
export default Drawer;