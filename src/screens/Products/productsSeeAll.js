import React from 'react';
import {View, Image, Text, AsyncStorage, TouchableOpacity} from 'react-native';
import {Container,Tabs,Tab,ScrollableTab,TabHeading, Content, Grid, Col, Row, Spinner} from 'native-base';
import axios from "axios";
class productsSeeAll extends React.Component {
    state = {
        Pro: [],
        SpinnerIcon: false,
        // SpinnerIcon: false,
    };
    componentDidMount() {
        this.setState({
            SpinnerIcon: true
        });
        let tempPro = [];
        let temp2DPro = [];
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/product',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                // console.log('free-all response: ',response);
                for (let i = 0; i < response.data.data.length; i++) {
                    if(response.data.data[i].categories_id === this.props.itemID) {
                        tempPro.push(response.data.data[i]);
                    }
                }
                //***** fill 2DPro *****//
                for (let i = 0, k = -1; i < tempPro.length; i++) {
                    if (i % 2 === 0) {
                        k++;
                        temp2DPro[k] = [];
                    }
                    temp2DPro[k].push(tempPro[i]);
                }
                //***** fill 2DPro *****//


                this.setState({
                    Pro: temp2DPro,
                    SpinnerIcon: false
                })
            }).catch(error => {
            });
        });



    };
    goToOfferItemsDetail = (id) => {
        this.props.navigator.push({
            screen: 'OfferItemsDetailScreen',
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
    render() {

        return (
            <Container>

                        <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                            }
                            <Grid>
                                {
                                    this.state.Pro.map(
                                        (value1, index1) => {
                                            return (
                                                <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                    {
                                                        value1.map(
                                                            (value2, index2) => {
                                                                return (
                                                                    <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                        <TouchableOpacity onPress={() => this.goToProductsDetail(value2.id)}  style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>

                                                                            <Image resizeMode='contain' style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images === '' ? 'http://via.placeholder.com/350x150': value2.images}}/>
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
export default productsSeeAll
