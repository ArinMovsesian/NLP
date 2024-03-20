import React from 'react';
import {Image, View, TouchableOpacity, AsyncStorage, } from 'react-native';
import {
    Container,
    Content,
    Radio,
    Right,
    Grid,
    Col,
    Row,
    Text,
    Header,
    DeckSwiper,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Body,
    Button,
    List,
    ListItem,
    CheckBox,
    Spinner
} from 'native-base';
import Dimensions from 'Dimensions';
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import {Navigation} from "react-native-navigation";
const {width, height} = Dimensions.get('window');
export default class UserExam extends React.Component {
    state = {
        examCount: 0,
        answerArray: [],
        Title: undefined,
        Time: 0,
        time: {},
        seconds: 0,
        dynamicBtn: true,
        examPermissionText: false,
        SpinnerIcon: false,
        itemSelected: undefined,
    };
    selectedAnswer = undefined;
    indexCounter = 0;
    constructor() {
        super();
        //------> timer part
        // this.state = { time: {}, seconds: 3 };
        this.timer = 0;
        // this.state = {seconds: this.state.Time * 60};
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        // start timer automatically
        this.startTimer();
    }
    secondsToTime = (secs) =>{
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    };

    componentDidMount() {
        this.setState({
            SpinnerIcon: true,
        });
        //------> timer part
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        //------> timer part
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/exam/'+ this.props.itemID +'/?shopping_id=' + this.props.shoppingID,
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {

                console.log('response: ',response);

                this.setState({
                    examCount: response.data.data.examInfo.questions_answer,
                    Title: (this.indexCounter+1) + ' - ' + response.data.data.examQuestion[0].title,
                    answerArray: response.data.data.examQuestion[0].answer,
                    time: timeLeftVar,
                    seconds: response.data.data.examInfo.time * 60,
                    SpinnerIcon: false,
                })
            }).catch(error => {
                if(error.response){
                    if(error.response.data.status === false) {
                        this.setState({
                            examPermissionText: true,
                            SpinnerIcon: false,
                        });
                    }
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        });
    };

    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            //*************************************
            this.props.navigator.push({
                screen: 'ExamResultScreen',
                title: 'نتیجه آزمون',
                backButtonHidden: true,
                navigatorStyle: {
                    navBarTextFontFamily: 'iranyekanwebregular',
                    navBarTextColor: '#03F9B5',
                    navBarBackgroundColor: '#FFF',
                    topBarElevationShadowEnabled: false,
                },
                passProps: {
                    itemID: this.props.itemID,
                    shoppingID: this.props.shoppingID,
                },
            })
        }
    }

    RadioHandler = (value) => {
        this.selectedAnswer = value;
        // alert(value);
        this.setState({
            itemSelected: value,
        });
    };
    nextQuestion = (nextValue) => {

            if (this.selectedAnswer === undefined) {
                alert('یکی گزینه را انتخاب نمایید.');
            } else {
                this.indexCounter++;
                // alert(this.selectedAnswer + nextValue + this.indexCounter);
                AsyncStorage.getItem('token').then((value) => {
                    axios.post('/Api/V1/exam/' + this.props.itemID + '/get-question',
                        {
                            'type': nextValue,
                            'questionIndex': this.indexCounter,
                            'answerCheck': this.selectedAnswer,
                        },
                        {
                            headers: {
                                "uuid": "test-arin",
                                "token": value
                            },
                        }).then(responseNextQuestion => {

                        console.log('responseNextQuestion: ', responseNextQuestion);
                        this.selectedAnswer = undefined;
                        if(this.indexCounter === this.state.examCount) {
                            this.setState({
                                Title: 'اتمام سوالات',
                                answerArray: [],
                                dynamicBtn: false,
                            });
                        }else {
                            this.setState({
                                Title: (this.indexCounter+1) + ' - ' + responseNextQuestion.data.examQuestions.title,
                                answerArray: responseNextQuestion.data.examQuestions.answer_exam,
                            });
                        }
                    }).catch(error => {
                        if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }
                    });
                });
            }

    };
    previousQuestion = (prevValue) => {
        if(this.indexCounter <= 0) {
            alert('سوال قبلی ای وجود ندارد.')
        }else {
                this.indexCounter--;
                // alert(this.selectedAnswer + prevValue + this.indexCounter);
                AsyncStorage.getItem('token').then((value) => {
                    axios.post('/Api/V1/exam/' + this.props.itemID + '/get-question',
                        {
                            'type': prevValue,
                            'questionIndex': this.indexCounter,
                            // 'answerCheck': this.selectedAnswer,
                        },
                        {
                            headers: {
                                "uuid": "test-arin",
                                "token": value
                            },
                        }
                        ).then(responseNextQuestion => {
                        console.log('responseNextQuestion: ', responseNextQuestion);
                        this.setState({
                            Title: (this.indexCounter+1) + ' - ' + responseNextQuestion.data.examQuestions.title,
                            answerArray: responseNextQuestion.data.examQuestions.answer_exam,
                            itemSelected: undefined,
                            dynamicBtn: true,
                        });
                        }).catch(error => {
                            if (error.response) {
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            }
                        });
                    });
        }
    };
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    goToExamResult = () => {
        clearInterval(this.timer);
        this.props.navigator.push({
            screen: 'ExamResultScreen',
            title: 'نتیجه آزمون',
            backButtonHidden: true,
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#03F9B5',
                navBarBackgroundColor: '#FFF',
                topBarElevationShadowEnabled: false,
            },
            passProps: {
                itemID: this.props.itemID,
                shoppingID: this.props.shoppingID,
            },
        })
    };
    goToHomeScreen = () => {
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
                this.state.examPermissionText === true
                ?
                <Container>
                    <Text style={{textAlign: 'center',fontSize:15, width: '100%',fontFamily: 'iranyekanwebregular',color: '#FFF', backgroundColor: '#D9D9D9', paddingBottom: 20, paddingTop: 20}}>تعداد دفعات مجاز برای آزمون ۳ مرتبه می باشد.</Text>
                    <Button block warning onPress={this.goToHomeScreen}>
                        <Text style={{textAlign: 'center',fontSize:13, width: '100%',fontFamily: 'iranyekanwebregular',color: '#FFF'}}>بازگشت</Text>
                    </Button>
                </Container>
                :
                <Container>
                    <Content>
                        <ListItem noBorder>
                            <Grid>
                                <Col size={50}>
                                    <Text style={{textAlign: 'left',fontSize:13, width: '100%', paddingRight: 10, fontFamily: 'iranyekanwebregular',color: '#4A4A4A'}}> m: {this.state.time.m} s: {this.state.time.s}</Text>
                                </Col>
                                <Col size={50}>
                                    <Text style={{textAlign: 'right',fontSize:13, width: '100%', paddingRight: 10, fontFamily: 'iranyekanwebregular',color: '#4A4A4A'}}> تعداد سوالات: {this.state.examCount}</Text>
                                </Col>
                            </Grid>
                        </ListItem>
                        <ListItem noBorder>
                            <Grid>
                                <Col>
                                    <Text style={{textAlign: 'right',fontSize:13, width: '100%', paddingRight: 10, fontFamily: 'iranyekanwebregular',color: '#4A4A4A'}}>{this.state.Title}</Text>
                                </Col>
                            </Grid>
                        </ListItem>
                        {
                            this.state.answerArray.map(
                                (value, index) => {
                                    return (
                                        <ListItem noBorder key={index} onPress={() => this.RadioHandler(value.id)}>
                                            <Grid>
                                                <Col size={90}>
                                                    <Text style={{textAlign: 'right',fontSize:12, width: '100%', paddingRight: 10, fontFamily: 'iranyekanwebregular',color: '#4A4A4A'}}>{value.title}</Text>
                                                </Col>
                                                <Col size={10}>
                                                    <Radio onPress={() => this.RadioHandler(value.id)} selected={this.state.itemSelected === value.id}/>
                                                </Col>
                                            </Grid>
                                        </ListItem>
                                    )
                                }
                            )
                        }

                    </Content>
                    <Grid style={{position: 'absolute', bottom:0}}>
                        <Col size={50}>
                            <TouchableOpacity onPress={() => this.previousQuestion('previous')}>
                                <Text style={{textAlign: 'center',fontSize:15, width: '100%', fontFamily: 'iranyekanwebregular',color: '#FFF', backgroundColor: '#04E6B8', paddingBottom: 20, paddingTop: 20}}>قبلی</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col size={50}>
                            {
                                    this.state.dynamicBtn === true
                                    ?
                                    <TouchableOpacity onPress={() => this.nextQuestion('next')}>
                                        <Text style={{textAlign: 'center',fontSize:15, width: '100%',fontFamily: 'iranyekanwebregular',color: '#FFF', backgroundColor: '#D9D9D9', paddingBottom: 20, paddingTop: 20}}>بعدی</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={this.goToExamResult}>
                                        <Text style={{textAlign: 'center',fontSize:15, width: '100%',fontFamily: 'iranyekanwebregular',color: '#FFF', backgroundColor: '#D9D9D9', paddingBottom: 20, paddingTop: 20}}>پایان آزمون</Text>
                                    </TouchableOpacity>
                            }

                        </Col>
                    </Grid>
                </Container>
        )
    }
}