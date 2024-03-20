import React from 'react';
import {View, Text, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import {Col, Content, Grid, Row, Spinner} from "native-base";
import axios from "axios";
class Exams extends React.Component {
    state = {
        publicExamItems: [],
        SpinnerIcon: false,
    };
    componentDidMount() {
        this.setState({
            SpinnerIcon: true
        });
        let tempPublicExamItems = [];
        let temp2DPublicExamItems = [];
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/exam-public-search-result',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                // console.log('free-all response: ',response);
                for (let i = 0; i < response.data.data.categoryExamPublicInfo.length; i++) {
                    if(response.data.data.categoryExamPublicInfo[i].id === this.props.itemID) {
                        tempPublicExamItems = response.data.data.categoryExamPublicInfo[i].examInfo;
                    }
                }
                //***** fill temp2DPublicExamItems *****//
                for (let i = 0, k = -1; i < tempPublicExamItems.length; i++) {
                    if (i % 2 === 0) {
                        k++;
                        temp2DPublicExamItems[k] = [];
                    }
                    temp2DPublicExamItems[k].push(tempPublicExamItems[i]);
                }
                //***** fill temp2DPublicExamItems *****//

                this.setState({
                    publicExamItems: temp2DPublicExamItems,
                    SpinnerIcon: false
                })
            }).catch(error => {});
        });
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
            <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                {
                    this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                }
                <Grid>
                    {
                        this.state.publicExamItems.map(
                            (value1, index1) => {
                                return (
                                    <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                        {
                                            value1.map(
                                                (value2, index2) => {

                                                    return (
                                                        <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                            <TouchableOpacity onPress={() => this.goToFreeItemsDetail(value2.id)} style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>

                                                                <Image resizeMode='contain' style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.image}}/>
                                                                <Text style={{
                                                                    color: '#707070',
                                                                    fontSize: 12,
                                                                    fontFamily: 'iranyekanwebregular',
                                                                    padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                <Text style={{
                                                                    color: '#3497FD',
                                                                    fontSize: 12,
                                                                    fontFamily: 'iranyekanwebregular',
                                                                    padding: 5, textAlign: 'center'}}>{value2.price} تومان </Text>

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
        )
    }
}
export default Exams;