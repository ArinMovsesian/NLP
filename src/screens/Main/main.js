import React from 'react';
import {View, StyleSheet, Image,AsyncStorage} from 'react-native';
import { Container,Form,Item, Button, Text,Label,Input, Content, Card,CardItem,Right} from 'native-base';
import {Navigation} from 'react-native-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
class Main extends React.Component {
    goToAuth = () => {

        this.props.navigator.push({
            screen: 'OtpRegistrationScreen',
            title: 'Otp',
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
        //         title: 'Otp',
        //         navigatorStyle: {
        //             navBarHidden: true, // make the nav bar hidden
        //         },
        //     },
        //     appStyle: {
        //         orientation: 'portrait',
        //     },
        // });
    };
    goToHomeScreenFormOfGuest = () => {
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
    render() {
        return (
            <Container>
                <View style={styles.main_bgContainer}>
                    <Image
                        style={styles.main_imgBgContainer}
                        source={require('../../assets/images/Mainbg.png')}
                    />
                </View>
                <View style={styles.main_container}>
                    <View style={styles.main_containerWrapper}>
                        {/*<Text style={{textAlign: 'center', color: '#A5A5A5', fontSize: 50, fontWeight: 'bold', fontStyle: 'italic'}}>NLP <Text style={{color: '#63EE83', fontSize: 30}}>Life</Text></Text>*/}
                        <View style={styles.main_NlpLifeImgContainer}>
                            <Image source={require('../../assets/images/logo.png')}/>
                        </View>
                        <Text style={[styles.main_textStyle,{fontSize: 20, marginTop: 30, marginBottom: 10}]}>مهندسی ذهن با دکتر سعیدی</Text>
                        <Text style={[styles.main_textStyle,{fontSize: 15, marginBottom: 20}]}>در اندیشکده ذهن ثبت نام کنید</Text>
                        <Text style={[styles.main_textStyle,{fontSize: 15, marginBottom: 15}]}>ورود/ثبت نام</Text>
                        <Button block info onPress={this.goToAuth}>
                            <Text style={styles.main_loginBtnStyle}>ورود</Text>
                        </Button>
                        <Button block info onPress={this.goToHomeScreenFormOfGuest} style={{marginTop: 10}}>
                            <Text style={styles.main_loginBtnStyle}>ورود به صورت مهمان</Text>
                        </Button>
                    </View>
                </View>

            </Container>
        )
    }
}
const styles = StyleSheet.create({
   main_bgContainer: {
       position: 'absolute',
       top: 0,
       left: 0,
       width: '100%',
       height: '100%',
   },
   main_imgBgContainer: {
       width: '100%',
       height: '50%'
   },
   main_container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       borderWidth: 1,
       flexDirection: 'column',
       padding: 20,
   },
   main_containerWrapper: {
       width: '100%',
   },
   main_NlpLifeImgContainer: {
       alignItems: 'center'
   },
   main_textStyle: {
       textAlign: 'center',
       color: '#707070',
       fontFamily: 'iranyekanwebregular'
   },
   main_loginBtnStyle: {
       fontSize: 14,
       fontFamily: 'iranyekanwebregular'
   }
});
//*********** mapDispatchToProps **********//
// const mapStateToProps = state => {
//     return {
//         place: state.places,
//         item: state.items,
//     }
// };
//*********** mapDispatchToProps **********//


//*********** mapDispatchToProps **********//
// const mapDispatchToProps = dispatch => {
//     return {
//         Method: () => dispatch({type: 'TEST'}),
//     }
// };
//*********** mapDispatchToProps **********//

export default Main;