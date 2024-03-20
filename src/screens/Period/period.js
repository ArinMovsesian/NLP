import React from 'react';
import {View, Image, Text, AsyncStorage, TouchableOpacity} from 'react-native';
import {Container,Tabs,Tab,ScrollableTab,TabHeading, Content, Grid, Col, Row, Spinner} from 'native-base';
import axios from "axios";
class Period extends React.Component {
    state = {
        Period: [],
        SpinnerIcon: false,
        // SpinnerIcon: false,
    };
    componentDidMount() {
        this.setState({
            SpinnerIcon: true
        });
        let tempPeriod = [];
        let temp2DPeriod = [];
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/period',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                // console.log('free-all response: ',response);
                for (let i = 0; i < response.data.data.length; i++) {
                        tempPeriod.push(response.data.data[i]);
                }
                //***** fill 2DPro *****//
                for (let i = 0, k = -1; i < tempPeriod.length; i++) {
                    if (i % 2 === 0) {
                        k++;
                        temp2DPeriod[k] = [];
                    }
                    temp2DPeriod[k].push(tempPeriod[i]);
                }
                //***** fill 2DPro *****//


                this.setState({
                    Period: temp2DPeriod,
                    SpinnerIcon: false
                })
            }).catch(error => {
            });
        });



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
    render() {

        return (
            <Container>

                <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                    {
                        this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                    }
                    <Grid>
                        {
                            this.state.Period.map(
                                (value1, index1) => {
                                    return (
                                        <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                            {
                                                value1.map(
                                                    (value2, index2) => {
                                                        return (
                                                            <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                <TouchableOpacity style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}} onPress={() => this.goToPeriodItemsDetail(value2.id)}>

                                                                    <Image style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images === '' ? 'http://via.placeholder.com/350x150': value2.images}}/>
                                                                    <Text style={{
                                                                        color: '#707070',
                                                                        fontSize: 12,
                                                                        fontFamily: 'iranyekanwebregular',
                                                                        padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                    <View style={{paddingBottom: 10}}>
                                                                        <Text style={{color: '#707070', textAlign: 'center', fontFamily: 'iranyekanwebregular',}}>
                                                                            {value2.price} ت
                                                                        </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </Col>
                                                        )
                                                    }
                                                )
                                            }
                                        </Row>
                                    )
                                }
                            )
                        }
                    </Grid>
                </Content>
            </Container>
        )
    }
}
export default Period
