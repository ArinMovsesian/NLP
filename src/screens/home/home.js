import React from 'react';
import {View,Text, AsyncStorage, StyleSheet, Image,ScrollView, TouchableOpacity, TouchableNativeFeedback, Dimensions, ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper';
import {Grid, Row, Col} from 'native-base';
import Texture from '../../assets/images/texture.png';
import ExamsWithTabs from "../Exams/examsWithTabs";
const deviceHeight = Dimensions.get('window').height;
class Home extends React.Component {
    state = {
        // token: undefined,
        guestState: false
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    onNavigatorEvent(event) {
        this.props.navigator.setDrawerEnabled({
            side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
            enabled: false // should the drawer be enabled or disabled (locked closed)
        });
        if(event.type === 'NavBarButtonPress') {
            if(event.id === 'sideDrawerBtn') {
                this.props.navigator.toggleDrawer({
                    side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
                });
            }
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('token').then((value) => {
            // this.setState({
            //     'token': value,
            // });
            if(value === null)
                this.setState({
                    guestState: true,
                })
            }
        )
    }
    openMetaLifeScreen = () => {

        this.props.navigator.push({
            screen: 'MetaLifeScreen', // unique ID registered with Navigation.registerScreen
            title: 'META LIFE',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#FFF',
                navBarBackgroundColor: '#4AA4FF',
                navBarButtonColor: '#FFF',
                orientation: 'portrait',
                topBarElevationShadowEnabled: false,
            },
        });
    };
    openFreeItemsScreen = () => {
      this.props.navigator.push({
          screen: 'FreeItemsScreen',
          title: 'رایگان ها',
          navigatorStyle: {
              navBarTextFontFamily: 'iranyekanwebregular',
              navBarTextColor: '#707070',
              navBarBackgroundColor: '#FFF',
              topBarElevationShadowEnabled: false
          }
      });
      // alert(1);
    };

    openOfferItemsScreen = () => {
        this.props.navigator.push({
            screen: 'OfferItemsScreen',
            title: 'تخفیف ویژه',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070',
                navBarBackgroundColor: '#FFF',
                topBarElevationShadowEnabled: false
            }
        });
        // alert(123);
    };

    openProductScreen = () => {
      this.props.navigator.push({
          screen: 'ProductsScreen',
          title: 'محصولات',
          navigatorStyle: {
              navBarTextFontFamily: 'iranyekanwebregular',
              navBarTextColor: '#707070',
              navBarBackgroundColor: '#FFF',
              // topBarElevationShadowEnabled: false
          }
      });
      // alert(1)
    };
    openEventScreen = () => {
        this.props.navigator.push({
            screen: 'EventsScreen',
            title: 'رویدادها',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#FFF',
                navBarBackgroundColor: '#F94E4E',
                navBarButtonColor: '#FFF'
                // topBarElevationShadowEnabled: false
            }
        });
    };
    openExamsScreen = () => {
        this.props.navigator.push({
            screen: 'ExamsScreen',
            title: 'آزمون ها',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#FFF',
                navBarBackgroundColor: '#665EFF',
                navBarButtonColor: '#FFF'
                // topBarElevationShadowEnabled: false
            }
        });
    };
    openExamWithTabs = () => {
        this.props.navigator.push({
            screen: 'ExamsWithTabsScreen',
            title: 'آزمون ها',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#FFF',
                navBarBackgroundColor: '#665EFF',
                navBarButtonColor: '#FFF',
                topBarElevationShadowEnabled: false,
                // topBarElevationShadowEnabled: false
            }
        });
    };
    openNLPScreen = () => {
        this.props.navigator.push({
            screen: 'NLPScreen',
            title: 'NLP',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#FFF',
                navBarBackgroundColor: '#4AA4FF',
                navBarButtonColor: '#FFF',
                orientation: 'portrait',
                topBarElevationShadowEnabled: false,
                // topBarElevationShadowEnabled: false
            }
        });
    };
    openPeriodScreen = () => {
        this.props.navigator.push({
            screen: 'PeriodScreen',
            title: 'دوره های آزاد',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#FFF',
                navBarBackgroundColor: '#4AA4FF',
                navBarButtonColor: '#FFF',
                orientation: 'portrait',
                topBarElevationShadowEnabled: false,
                // topBarElevationShadowEnabled: false
            }
        });
    };
    openClubOfMindScreen = () => {
        this.props.navigator.push({
            screen: 'ClubOfMindScreen',
            title: 'باشگاه ذهن',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070',
                navBarBackgroundColor: '#FFF',
                navBarButtonColor: '#707070',
                orientation: 'portrait',
                topBarElevationShadowEnabled: false,
                // topBarElevationShadowEnabled: false
            }
        });
    };
    // snackbar = () => {
    //     this.props.navigator.showSnackbar({
    //         text: 'Hello from Snackbar',
    //         actionText: 'done', // optional
    //         actionId: 'fabClicked', // Mandatory if you've set actionText
    //         actionColor: 'green', // optional
    //         textColor: 'red', // optional
    //         backgroundColor: 'blue', // optional
    //         duration: 'indefinite' // default is `short`. Available options: short, long, indefinite
    //     });
    // };
    render() {
        return (
                <Grid>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Row style={{marginTop: 14}}>
                            <Col size={60} style={{ paddingBottom: 5, paddingRight: 5, paddingLeft: 10, height: '100%'}}>
                                <ImageBackground source={Texture} style={{width: '100%',height: '100%',  borderRadius: 8, overflow: 'hidden', position: 'relative'}}>
                                    <View style={{width: '100%', height: '100%', backgroundColor: '#03B74B', position: 'absolute', top: 0, left: 0, opacity: 0.5, zIndex: 0}}></View>
                                    <TouchableOpacity onPress={this.openNLPScreen}>
                                        <Text style={{fontSize: 20, color: '#FFF', padding: 10}}>NLP</Text>
                                        {/*<Text>image</Text>*/}
                                        <Text  style={{fontSize: 12, color: '#FFF', padding: 10, fontFamily: "iranyekanwebregular",}}>دوره های پنج گانه ان ال پی استاندارد طبق متد آموزش دکتر سعیدی</Text>
                                        <View style={{alignItems: 'flex-start', padding: 20}}>
                                            <Image source={require('../../assets/images/png/brainIconsFree.png')} style={{width: 32, height: 34}}/>
                                        </View>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </Col>
                            <Col size={40} style={{ paddingBottom: 5, paddingRight: 10, paddingLeft: 5, height: '100%'}}>
                                <ImageBackground source={Texture} style={{width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden', position: 'relative'}}>
                                <View style={{width: '100%', height: '100%', backgroundColor: '#DC3F69', position: 'absolute', top: 0, left: 0, opacity: 0.5, zIndex: 0}}></View>
                                <TouchableOpacity onPress={this.openMetaLifeScreen}>
                                    <Text style={{fontSize: 20, color: '#FFF', padding: 10,}}>META LIFE</Text>
                                    <Text  style={{fontSize: 12, color: '#FFF', padding: 10, fontFamily: "iranyekanwebregular",}}>زندگی برتر را خلق کنید</Text>
                                    <View style={{alignItems: 'flex-start', padding: 20}}>
                                        <Image source={require('../../assets/images/png/heartIconsFree.png')} style={{width: 32, height: 34}}/>
                                    </View>
                                </TouchableOpacity>
                                </ImageBackground>
                            </Col>
                        </Row>


                        <Row style={styles.wrapper}>
                            {
                                this.state.guestState === true
                                    ?

                                    <Swiper activeDotColor="#FFF" showsButtons={false}>
                                        <TouchableOpacity onPress={this.openFreeItemsScreen} style={styles.slide1}>
                                            <Image  resizeMode="contain" source={require('../../assets/images/slider1.png')} style={{width: '100%', borderRadius: 10}}/>
                                        </TouchableOpacity>
                                        {/*<View style={styles.slide3}>*/}
                                        {/*<Image resizeMode="contain" source={require('../../assets/images/slider3.png')} style={{width: '100%'}}/>*/}
                                        {/*</View>*/}
                                    </Swiper>
                                    :
                                    <Swiper activeDotColor="#FFF" showsButtons={true}>
                                        <TouchableOpacity onPress={this.openFreeItemsScreen} style={styles.slide1}>
                                            <Image  resizeMode="contain" source={require('../../assets/images/slider1.png')} style={{width: '100%', borderRadius: 10}}/>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={this.openOfferItemsScreen} style={styles.slide2}>
                                            <Image resizeMode="contain" source={require('../../assets/images/slider2.png')} style={{width: '100%', borderRadius: 10}}/>
                                        </TouchableOpacity>
                                        {/*<View style={styles.slide3}>*/}
                                        {/*<Image resizeMode="contain" source={require('../../assets/images/slider3.png')} style={{width: '100%'}}/>*/}
                                        {/*</View>*/}
                                    </Swiper>

                            }
                        </Row>


                        {/*<Row style={{height: deviceHeight/2.5}}>*/}







                        <Row style={{height: 450}}>
                            <Col size={50} style={{ paddingTop: 5,paddingRight: 5, paddingLeft: 10, paddingBottom: 5}}>
                                <View style={this.state.guestState === true? {height:'100%'}:  {height: '60%'}}>
                                    <ImageBackground source={Texture} style={{width: '100%',height: '100%',  borderRadius: 8, overflow: 'hidden', position: 'relative'}}>
                                        <View style={{width: '100%', height: '100%', backgroundColor: '#03B74B', position: 'absolute', top: 0, left: 0, opacity: 0.5, zIndex: 0}}></View>
                                        <TouchableOpacity onPress={this.openClubOfMindScreen}>
                                            <View style={{height: '70%',}}>
                                                <Text style={{fontSize: 20, color: '#FFF', padding: 10, fontFamily:'iranyekanwebregular',}}>باشگاه ذهن</Text>
                                                <Text  style={{fontSize: 12, color: '#FFF', padding: 10, fontFamily: "iranyekanwebregular",}}>از ذهنتان یک شاهکار بیافرینید</Text>
                                            </View>
                                            {/*<Text>image</Text>*/}
                                            <View style={{flexDirection: 'column', justifyContent: 'flex-end', height: '30%', alignItems:'flex-end', padding: 20}}>
                                                <Image source={require('../../assets/images/png/gymIconsFree.png')} style={{width: 32, height: 34}}/>
                                            </View>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>

                                {
                                    this.state.guestState === true
                                        ?
                                        null
                                        :
                                        <View style={{height: '40%'}}>
                                            <ImageBackground source={Texture} style={{width: '100%',height: '100%',  borderRadius: 8, overflow: 'hidden', position: 'relative', marginTop: 9}}>
                                                <View style={{width: '100%', height: '100%', backgroundColor: '#DC3F69', position: 'absolute', top: 0, left: 0, opacity: 0.5, zIndex: 0}}></View>
                                            <TouchableOpacity onPress={this.openExamWithTabs}>
                                                <View style={{height: '70%',}}>
                                                    <Text style={{
                                                        fontSize: 20,
                                                        color: '#FFF',
                                                        padding: 10,
                                                        fontFamily: 'iranyekanwebregular',
                                                    }}>آزمون ها</Text>
                                                    <Text  style={{fontSize: 12, color: '#FFF', padding: 10, fontFamily: "iranyekanwebregular",}}>ترکیبی از آزمون های تکاورانه و تست های خودشناسی</Text>
                                                </View>
                                                {/*<Text>image</Text>*/}
                                                <View style={{flexDirection: 'column', justifyContent: 'flex-end', height: '30%', alignItems:'flex-end', padding: 20}}>
                                                    <Image source={require('../../assets/images/png/testIconsFree.png')}
                                                           style={{width: 32, height: 34}}/>
                                                </View>
                                            </TouchableOpacity>
                                            </ImageBackground>
                                        </View>
                                }

                            </Col>

                            <Col size={50} style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 10, paddingLeft: 5}}>
                                <View style={{height: '40%',}}>
                                    <ImageBackground source={Texture} style={{width: '100%', height: '100%',  borderRadius: 8, overflow: 'hidden', position: 'relative'}}>
                                        <View style={{width: '100%', height: '100%', backgroundColor: '#DC3F69', position: 'absolute', top: 0, left: 0, opacity: 0.5, zIndex: 0}}></View>
                                        <TouchableOpacity onPress={this.openPeriodScreen} style={{width: '100%', height: '100%',}}>
                                            <View style={{height: '70%'}}>
                                                <Text style={{fontSize: 20, color: '#FFF', padding: 10, fontFamily:'iranyekanwebregular',}}>دوره های آزاد</Text>
                                                <Text  style={{fontSize: 12, color: '#FFF', padding: 10, fontFamily: "iranyekanwebregular",}}>برای شرکت در دوره های آزاد ثبت نام کنید</Text>
                                            </View>
                                            <View style={{flexDirection: 'column', justifyContent: 'flex-end', height: '30%', alignItems:'flex-end', padding: 20}}>
                                                <Image source={require('../../assets/images/png/educationIconsFree.png')} style={{width: 32, height: 34}}/>
                                            </View>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                                <View style={{height: '60%',}}>
                                    <ImageBackground source={Texture} style={{width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden', position: 'relative', marginTop: 9}}>
                                        <View style={{width: '100%', height: '100%', backgroundColor: '#EFA30B', position: 'absolute', top: 0, left: 0, opacity: 0.5, zIndex: 0}}></View>
                                        <TouchableOpacity onPress={this.openProductScreen} style={{width: '100%', height: '100%'}}>
                                            <View style={{height: '70%'}}>
                                                <Text style={{fontSize: 20, color: '#FFF', padding: 10, fontFamily:'iranyekanwebregular',}}>محصولات</Text>
                                                <Text  style={{fontSize: 12, color: '#FFF', padding: 10, fontFamily: "iranyekanwebregular",}}>به راحتی از محصولات رایگان و غیر رایگان استفاده نمایید</Text>
                                            </View>
                                            <View style={{flexDirection: 'column', justifyContent: 'flex-end', height: '30%', alignItems:'flex-end', padding: 20}}>
                                                <Image source={require('../../assets/images/png/productIconsFree.png')} style={{width: 32, height: 34}}/>
                                            </View>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            </Col>

                        </Row>
                        {
                            this.state.guestState === true
                                ?
                                <Row>
                                    <Col size={100} style={{paddingTop: 20}}>
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col size={100}
                                         style={{paddingTop: 5, paddingBottom: 20, paddingRight: 10, paddingLeft: 10}}>
                                        <ImageBackground source={Texture} style={{width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden', position: 'relative', marginTop: 9}}>
                                            <View style={{width: '100%', height: '100%', backgroundColor: '#03B74B', position: 'absolute', top: 0, left: 0, opacity: 0.5, zIndex: 0}}></View>
                                            <TouchableOpacity onPress={this.openEventScreen}
                                                              style={{width: '100%', height: '100%'}}>
                                                <Text style={{
                                                    fontSize: 20,
                                                    color: '#FFF',
                                                    padding: 10,
                                                    fontFamily: 'iranyekanwebregular',
                                                }}>سمینار ها</Text>
                                                <Text  style={{fontSize: 12, color: '#FFF', padding: 10, fontFamily: "iranyekanwebregular",}}>سمینار ها و رویداد ها اینجا اعلام میشوند</Text>
                                                <View style={{alignItems: 'flex-start', padding: 20}}>
                                                    <Image source={require('../../assets/images/png/seminarIconsFree.png')}
                                                           style={{width: 32, height: 34}}/>
                                                </View>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </Col>
                                </Row>
                        }



                    </ScrollView>
                </Grid>
        )
    }

}
const styles = StyleSheet.create({
    wrapper: {
        height: deviceHeight/4,
        paddingLeft: 10,
        paddingRight: 10,

    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#76eb4c',
        // backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#97CAE5',

    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#97CAE5',

    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});
export default Home
