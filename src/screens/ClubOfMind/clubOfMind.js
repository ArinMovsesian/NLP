import React from 'react';
import {AsyncStorage, Linking, Text, TouchableOpacity} from 'react-native';
import {
    Container,
    Content,
    ListItem,
    Body,
    List,
    Right,
    Left,
    View,
    Spinner,
    Tabs,
    TabHeading,
    Tab,
    Card,
    CardItem,
    Icon, Thumbnail
} from 'native-base';
import axios from "axios";
import {Navigation} from "react-native-navigation";
class ClubOfMind extends React.Component{
    state = {
        SpinnerIcon: false,
        packagesPrice: [],
        guestState: false,
        showState: [],
        subDegreeInfoTitle: '',
        subDegreeInfoDesc: '',
        productInfo: [],
        eventInfo: [],
        periodInfo: [],
        examInfo: []
    };
    componentDidMount() {
        AsyncStorage.getItem('token').then((value) => {
            if(value === null){
                this.setState({
                    guestState: true,
                })
            }
            axios.get('/Api/V1/UserTypeSeeder',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                let subDegree = response.data.data.subDegreeInfo;
                if(subDegree.length === 0){
                    AsyncStorage.getItem('token').then((value) => {
                        axios.get('/Api/V1/packages-price',
                            {
                                headers: {
                                    "uuid": "test-arin",
                                    "token": value
                                },
                            }).then(response => {
                            console.log('response',response);
                            this.setState({
                                // events: response.data.data,
                                SpinnerIcon: false,
                                packagesPrice: response.data.data,
                                showState: subDegree
                            })
                        }).catch(error => {
                            console.log('error',error.response.data.data);
                        });
                    });

                }else {
                    let sdid = subDegree.description.replace(/<\/?[^>]+(>|$)/g, "");
                    this.setState({
                        // events: response.data.data,
                        SpinnerIcon: false,
                        subDegreeInfoTitle: subDegree.title,
                        subDegreeInfoDesc: sdid,
                        showState: subDegree,
                        productInfo:response.data.data.productInfo,
                        eventInfo: response.data.data.eventInfo,
                        periodInfo: response.data.data.periodInfo,
                        examInfo: response.data.data.examInfo
                    })
                }
                console.log('subDegreeInfo', subDegree);
            }).catch(error => {
                console.log('error',error.response.data.data);
            });
        });
        // this.setState({
        //     SpinnerIcon: true,
        // });
        // AsyncStorage.getItem('token').then((value) => {
        //     if(value === null){
        //         this.setState({
        //             guestState: true,
        //         })
        //     }
        //     axios.get('/Api/V1/packages-price',
        //         {
        //             headers: {
        //                 "uuid": "test-arin",
        //                 "token": value
        //             },
        //         }).then(response => {
        //         console.log('response',response);
        //         this.setState({
        //             // events: response.data.data,
        //             SpinnerIcon: false,
        //             packagesPrice: response.data.data
        //         })
        //     }).catch(error => {
        //         console.log('error',error.response.data.data);
        //     });
        // });
    }
    byMindClub = (id) => {
        console.log('id', id);
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/packages-price/' + id,{
                headers: {
                    "uuid": "test-arin",
                    "token": value
                },
            }).then(response => {
                console.log('response',response);
                Linking.canOpenURL(response.data.data.url).then(supported => {
                    if (supported) {
                        Linking.openURL(response.data.data.url);
                    } else {
                        console.log("Don't know how to open URI: " + response.data.data.url);
                    }
                });
            }).catch(error => {
                console.log('error',error.response.data.data);
            });
        })
    };
    goToHomeScreen = () => {
      // alert(123);
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


    goToProductsDetail = (id) => {
        this.props.navigator.push({
            screen: 'ProductsDetailScreen',
            title: 'جزییات محصول',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070'
            },
            passProps: {
                itemID: id,
            },
        })
        // alert(id);
    };

    goToEventsDetail = (id) => {
        this.props.navigator.push({
            screen: 'EventsDetailScreen',
            title: 'جزییات محصول',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070'
            },
            passProps: {
                itemID: id,
            },
        })
        // alert(id);
    };

    goToPeriodItemsDetail = (id) => {
        this.props.navigator.push({
            screen: 'PeriodDetailScreen',
            title: 'جزییات دوره',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070'
            },
            passProps: {
                itemID: id,
            },
        })
        // alert(id);
    };
    goToFreeItemsDetail = (id) => {
        this.props.navigator.push({
            screen: 'ExamDetailScreen',
            title: 'جزییات آزمون',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070'
            },
            passProps: {
                itemID: id,
            },
        })
    };
    render() {
        return (
            // {
            //     this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
            // }
            <Container>
                {
                    this.state.showState.length === 0
                    ?
                        <Content style={{backgroundColor: '#F6F6F6'}}>
                             <List>
                            {
                                this.state.packagesPrice.map(
                                    (value, index) => {
                                        return (
                                            <ListItem key={value.id} onPress={this.state.guestState === true ? this.goToHomeScreen: () => this.byMindClub(value.id)} noBorder style={{backgroundColor: '#03a3ff', borderRadius: 10, marginTop: 20, marginRight: 20, marginBottom: 5}}>
                                                <Body>
                                                <View>
                                                    <Text style={{color: "#FFF",fontFamily: 'iranyekanwebregular', fontSize: 17}}>{value.title}</Text>
                                                </View>
                                                <View style={{marginTop: 5}}>
                                                    <Text style={{color: "#FFF",fontFamily: 'iranyekanwebregular', fontSize: 15}}> مدت اعتبار {value.credit_time} ماه </Text>
                                                </View>
                                                <View>
                                                    <Text style={{color: "#FFF",fontFamily: 'iranyekanwebregular', fontSize: 15, textAlign: 'left', paddingLeft: 20}}>{value.price} تومان </Text>
                                                </View>
                                                </Body>
                                            </ListItem>
                                        )
                                    }
                                )
                            }
                        </List>
                        </Content>
                    :
                            <View style={{height: '100%'}}>

                                <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A",paddingRight: 15, fontWeight: 'bold'}}>{this.state.subDegreeInfoTitle}</Text>
                                <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 10, color: "#4A4A4A", padding: 15}}>{this.state.subDegreeInfoDesc.replace(/&nbsp;/gi,'')}</Text>

                            <Tabs style={{marginRight: 10, marginLeft: 10}}
                                  tabContainerStyle={{elevation:0}}
                                  tabBarUnderlineStyle={{ backgroundColor: '#3497FD', borderRadius: 5}}
                            >

                                <Tab heading={
                                    <TabHeading style={{  backgroundColor: '#FFF'}}>
                                        <Text style={{
                                            color: '#3497FD',
                                            fontSize: 15,
                                            fontFamily: 'iranyekanwebregular'}}>محصولات</Text>
                                    </TabHeading>
                                }>
                                    <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                                        <List>
                                            {
                                                this.state.productInfo.length === 0
                                                ?
                                                    <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                                                        <Body style={{paddingRight: 17}}>
                                                        <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>محصولی وجود ندارد</Text>
                                                        </Body>
                                                    </ListItem>
                                                :
                                                this.state.productInfo.map(
                                                    (value, index) => {
                                                        return(
                                                            <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}} key={index} onPress={() => this.goToProductsDetail(value.id)}>
                                                                <Body style={{paddingRight: 17}}>
                                                                    <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>{value.title}</Text>
                                                                    <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.description}</Text>
                                                                </Body>
                                                            </ListItem>
                                                        )
                                                    }
                                                )
                                            }

                                        </List>
                                    </Content>
                                </Tab>

                                <Tab heading={
                                    <TabHeading style={{  backgroundColor: '#FFF'}}>
                                        <Text style={{
                                            color: '#3497FD',
                                            fontSize: 15,
                                            fontFamily: 'iranyekanwebregular'}}>همایش ها</Text>
                                    </TabHeading>
                                }>
                                    <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                                        <List>
                                            {
                                                this.state.eventInfo.length === 0
                                                    ?
                                                    <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                                                        <Body style={{paddingRight: 17}}>
                                                        <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>همایشی وجود ندارد</Text>
                                                        </Body>
                                                    </ListItem>
                                                    :
                                                    this.state.eventInfo.map(
                                                        (value, index) => {
                                                            return(
                                                                <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}} key={index} onPress={() => this.goToEventsDetail(value.id)}>
                                                                    <Body style={{paddingRight: 17}}>
                                                                    <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>{value.title}</Text>
                                                                    <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.description}</Text>
                                                                    </Body>
                                                                </ListItem>
                                                            )
                                                        }
                                                    )
                                            }

                                        </List>
                                    </Content>
                                </Tab>

                                <Tab heading={
                                    <TabHeading style={{  backgroundColor: '#FFF'}}>
                                        <Text style={{
                                            color: '#3497FD',
                                            fontSize: 15,
                                            fontFamily: 'iranyekanwebregular'}}>دوره ها</Text>
                                    </TabHeading>
                                }>
                                    <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                                        <List>
                                            {
                                                this.state.periodInfo.length === 0
                                                    ?
                                                    <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                                                        <Body style={{paddingRight: 17}}>
                                                        <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>دوره ای وجود ندارد</Text>
                                                        </Body>
                                                    </ListItem>
                                                    :
                                                    this.state.periodInfo.map(
                                                        (value, index) => {
                                                            return(
                                                                <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}} key={index} onPress={() => this.goToPeriodItemsDetail(value.id)}>
                                                                    <Body style={{paddingRight: 17}}>
                                                                    <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>{value.title}</Text>
                                                                    <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.description}</Text>
                                                                    </Body>
                                                                </ListItem>
                                                            )
                                                        }
                                                    )
                                            }

                                        </List>
                                    </Content>
                                </Tab>

                                <Tab heading={
                                    <TabHeading style={{  backgroundColor: '#FFF'}}>
                                        <Text style={{
                                            color: '#3497FD',
                                            fontSize: 15,
                                            fontFamily: 'iranyekanwebregular'}}>آزمون ها</Text>
                                    </TabHeading>
                                }>
                                    <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                                        <List>
                                            {
                                                this.state.examInfo.length === 0
                                                    ?
                                                    <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                                                        <Body style={{paddingRight: 17}}>
                                                        <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>آزمونی وجود ندارد</Text>
                                                        </Body>
                                                    </ListItem>
                                                    :
                                                    this.state.examInfo.map(
                                                        (value, index) => {
                                                            return(
                                                                <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}} key={index} onPress={() => this.goToFreeItemsDetail(value.id)}>
                                                                    <Body style={{paddingRight: 17}}>
                                                                    <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>{value.title}</Text>
                                                                    <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.description}</Text>
                                                                    </Body>
                                                                </ListItem>
                                                            )
                                                        }
                                                    )
                                            }

                                        </List>
                                    </Content>
                                </Tab>
                            </Tabs>
                            </View>

                }
            </Container>
        )
    }
}
export default ClubOfMind;