import React from 'react';
import {AsyncStorage, Image, View} from 'react-native';
import {Content, Container, ListItem, List, Col, Row, Text, Button} from 'native-base';
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import {Navigation} from "react-native-navigation";
class ExamResult extends React.Component {
    state = {
      examCount: 0,
      Title: undefined,
      Interpret: undefined,
      Desc: undefined,
      Point : 0,
      Type: undefined,
      CountTrueAnswer: 0,
      CountFalseAnswer: 0,
      PrivateExamStatus: undefined,
    };
    componentDidMount() {
        console.log('-----> componentDidMountT:');
        // this.mounted = true;
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/profile/exam/'+ this.props.itemID +'/?shopping_id=' + this.props.shoppingID,
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }).then(response => {

                console.log('response:----->> ',response);
                    if(response.data.data.type === 'public'){
                        this.setState({
                            examCount: response.data.data.examInfo.questions_answer,//
                            Title: response.data.data.examInfo.title,//
                            Interpret: response.data.data.examPublicInfo.interpret,//
                            Desc: response.data.data.examPublicInfo.desc,//
                            Point: response.data.data.point,//
                            Type: response.data.data.type,//
                            // CountTrueAnswer: response.data.data.countTrueAnswer,
                            // CountFalseAnswer: response.data.data.countFalseAnswer,
                            // PrivateExamStatus: response.data.data.status
                        });
                    }else {// IF Private
                        this.setState({
                            Type: response.data.data.type,//
                            CountTrueAnswer: response.data.data.countTrueAnswer,//
                            CountFalseAnswer: response.data.data.countFalseAnswer,//
                            PrivateExamStatus: response.data.data.status//
                        });
                    }

                    console.log('status in axios:----->', this.state.Type);
            }).catch(error => {
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        });
        console.log('-----> componentDidMountB:');
    }
    goToHomePage = () =>{
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
        console.log('status in render: ----->', this.state.Type);
        if(this.state.Type === "public") {
            return (
                <Container style={{backgroundColor: '#F6F6F6'}}>
                    <Content>
                        <List>
                            <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                                <Text style={{width: '100%', color: "#4A4A4A",fontFamily: 'iranyekanwebregular', fontSize: 15}}>{this.state.Title}</Text>
                            </ListItem>
                            <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                                <Row>
                                    <Col size={50}>
                                        <Text style={{width: '100%', color: "#4A4A4A",fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign: 'right'}}>{this.state.examCount}</Text>
                                    </Col>
                                    <Col size={50}>
                                        <Text style={{width: '100%', color: "#4A4A4A",fontFamily: 'iranyekanwebregular', fontSize: 12}}>تعداد سوالات</Text>
                                    </Col>
                                </Row>
                            </ListItem>
                            <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                                <Row>
                                    <Col size={50}>
                                        <Text style={{width: '100%', color: "#4A4A4A",fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign: 'right'}}>{this.state.Point}</Text>
                                    </Col>
                                    <Col size={50}>
                                        <Text style={{width: '100%', color: "#4A4A4A",fontFamily: 'iranyekanwebregular', fontSize: 12}}>امتیاز شما</Text>
                                    </Col>
                                </Row>
                            </ListItem>
                            <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                    <Text style={{ color: "#04E230",fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign: 'right', width: '100%', paddingRight: 13, paddingTop: 20}}>تفسیر آزمون</Text>
                                    <Text style={{ color: "#4A4A4A",fontFamily: 'iranyekanwebregular', fontSize: 12, lineHeight: 20, width: '100%', padding: 13}}>{this.state.Interpret}</Text>
                                </View>
                            </ListItem>
                            <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                    <Text style={{ color: "#665EFF",fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign: 'right', width: '100%', paddingRight: 13, paddingTop: 20}}>توضیحات</Text>
                                    <Text style={{ color: "#4A4A4A",fontFamily: 'iranyekanwebregular', fontSize: 12, lineHeight: 20, width: '100%', padding: 13}}>{this.state.Desc}</Text>
                                </View>
                            </ListItem>
                        </List>
                        <Button full success onPress={this.goToHomePage}>
                            <Text style={{color: "#FFF",fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign: 'center', width: '100%'}}>بازگشت به صفحه اصلی</Text>
                        </Button>
                    </Content>
                </Container>
            )
        }else if(this.state.Type === "private") {
            return (
                <Container style={{backgroundColor: '#F6F6F6'}}>
                    <Content>
                        <List>
                            {
                                this.state.PrivateExamStatus === "عدم قبولی"
                                    ?
                                    <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={{marginTop: 50}}>
                                            <Image source={require('../../assets/images/Wrong/drawable-xhdpi/baseline-error-24px.png')} style={{width: 130, height: 130}}/>
                                        </View>
                                        <View syle={{marginTop: 20, marginBottom: 10}}>
                                            <Text style={{color: '#F94E4E',fontFamily: 'iranyekanwebregular', fontSize: 20}}>متاسفیم</Text>
                                        </View>
                                        <View style={{padding: 30}}>
                                            <Text style={{color: '#F94E4E',fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign:'center'}}>شما موفق به قبولی در این آزمون نشده اید شما میتوانید فقط آزمون این دوره را دوباره خریداری کنید و آزمون را تکمیل کنید</Text>
                                        </View>
                                    </ListItem>
                                    :
                                    <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={{marginTop: 50}}>
                                            <Image source={require('../../assets/images/Done/drawable-xhdpi/Group404.png')} style={{width: 130, height: 130}}/>
                                        </View>
                                        <View syle={{marginTop: 20, marginBottom: 10}}>
                                            <Text style={{color: '#2FB500',fontFamily: 'iranyekanwebregular', fontSize: 20}}>تبریک</Text>
                                        </View>
                                        <View style={{padding: 30}}>
                                            <Text style={{color: '#2FB500',fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign:'center'}}>تبریک، شما موفق به کسب نمره قبولی در این آزمون شدید. مدرک شما حسب نوع آن به آدرس پستی شما ارسال می‌گردد. در صورتی که مدرک الکترونیکی باشد میتوانید مدرک قبولی را از قسمت زیر دریافت نمایید همچنین این مدرک در منو-مدارک کسب شده هم قابل دسترس است.</Text>
                                        </View>
                                    </ListItem>
                            }

                            <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12}}> تعداد پاسخ های درست شما: {this.state.CountTrueAnswer}</Text>
                            </ListItem>
                            <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12,}}> تعداد پاسخ های اشتباه شما: {this.state.CountFalseAnswer}</Text>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
            )
        }else {
            return (
                <View>
                    <Text>لطفا منتظر بمانید...</Text>
                </View>
            )
        }
    }
}
export default ExamResult;