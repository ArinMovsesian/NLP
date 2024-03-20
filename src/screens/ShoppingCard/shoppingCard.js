import React from 'react';
import {View, Text, AsyncStorage, TouchableOpacity, Linking} from 'react-native';
import {
    Container,
    Content,
    ListItem,
    List,
    Thumbnail,
    Left,
    Body,
    Right,
    Icon,
    Item,
    Input,
    Button,
    Row,
    Col,
    Spinner
} from "native-base";
import axios from "axios";
class ShoppingCard extends React.Component {
    state = {
        shopping_Bag: [],
        totalPrice: 0,
        oneTimeCoupon: false,
        disablePaymentBtn: false,
        SpinnerIcon: false,
        showPaymentBtn: undefined, // if 0 ? 'wallet': 'port
    };
    couponValue = undefined;
    componentDidMount() {
        this.setState({
            SpinnerIcon: true
        });
        let tempTotalPrice = 0;
        let tempShoppingBag = [];
        let tempOneTimeCoupon = undefined;
        let tempDisablePaymentBtn = undefined;
        let tempShowPaymentBtn = undefined;
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/shopping-bag',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },

                }).then(responseShoppingBag => {
                console.log('shopping-bag: ',responseShoppingBag);

                    axios.get('/Api/V1/profile?type=wallet',
                        {
                            headers: {
                                "uuid": "test-arin",
                                "token": value
                            },

                        }).then(responseWallet => {
                        console.log('profile?type=wallet: ',responseWallet);

                        if (tempShoppingBag.length === 0) {
                            tempOneTimeCoupon = true;
                            tempDisablePaymentBtn = true
                        } else {
                            tempOneTimeCoupon = false;
                            tempDisablePaymentBtn = false
                        }
                        if(responseWallet.data.data.walletPrice < tempTotalPrice) {
                            tempShowPaymentBtn = 1 // go to PORT(payment)
                        } else {
                            tempShowPaymentBtn = 0 // go to Wallet
                        }
                        this.setState({
                            shopping_Bag: tempShoppingBag,
                            totalPrice: tempTotalPrice,
                            oneTimeCoupon: tempOneTimeCoupon,
                            disablePaymentBtn: tempDisablePaymentBtn,
                            SpinnerIcon: false,
                            showPaymentBtn: tempShowPaymentBtn

                        });

                    }).catch(error => {
                        if(error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }
                    });


                tempTotalPrice = responseShoppingBag.data.data.total;
                tempShoppingBag = responseShoppingBag.data.data.shopping_bag;


            }).catch(error => {
               if(error.response) {

                   console.log(error.response.data);
                   console.log(error.response.status);
                   console.log(error.response.headers);
               }
            });
        });



        // AsyncStorage.getItem('token').then((value) => {
        //     axios.get('/Api/V1/profile?type=wallet',
        //         {
        //             headers: {
        //                 "uuid": "test-arin",
        //                 "token": value
        //             },
        //
        //         }).then(response => {
        //         console.log('response',response);
        //
        //     }).catch(error => {
        //         if(error.response) {
        //             console.log(error.response.data);
        //             console.log(error.response.status);
        //             console.log(error.response.headers);
        //         }
        //     });
        // });


    }
    deleteProducts = (shoppingBagID) => {
        AsyncStorage.getItem('token').then((value) => {
            axios.post('/Api/V1/shopping-bag/delete/' + shoppingBagID,
                {},
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },

                }).then(response => {
                    console.log('response',response);
                    this.componentDidMount();
                }).catch(error => {
                    if(error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });
        });
        // alert(shoppingBagID);
    };
    getCouponValue = (value) => {
        this.couponValue = value;
    };
    couponAction = () => {
        if(this.couponValue === undefined) {
            alert('کوپن خود را وارد نمایید.');
        }else {
            AsyncStorage.getItem('token').then((value) => {
                axios.post('/Api/V1/coupon',
                    {
                        "code": this.couponValue,
                    },
                    {
                        headers: {
                            "uuid": "test-arin",
                            "token": value
                        },

                    }).then(response => {

                    console.log('response',response);
                    this.setState({
                        totalPrice: response.data.total,
                        oneTimeCoupon: true
                    });
                    // this.componentDidMount();
                }).catch(error => {
                    // alert('کوپن با موفقیت افزوده گردید.');
                    // this.setState({
                    //     oneTimeCoupon: true
                    // });
                    if(error.response) {
                        alert("کوپن وارد شده صحیح نمی باشد.");
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });
            });
        }
        // alert('123');
    };
    payViaWallet = () => {
        AsyncStorage.getItem('token').then((value) => {
            axios.post('/Api/V1/pay-wallet',
                {
                    "price_all": this.state.totalPrice,
                },
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },

                }).then(response => {
                console.log('response',response);
                alert('مبلغ از کیف پول شما کسر گردید.');
                this.componentDidMount();
            }).catch(error => {
                if(error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        });
    };
    payViaPort = () => {
        AsyncStorage.getItem('token').then((value) => {
            axios.post('/Api/V1/checkout',
                {
                    "price_all": this.state.totalPrice,
                },
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },

                }).then(response => {

                console.log('response',response);
                Linking.canOpenURL(response.data.url).then(supported => {
                    if (supported) {
                        Linking.openURL(response.data.url);
                    } else {
                        console.log("Don't know how to open URI: " + response.data.url);
                    }
                });
            }).catch(error => {
                if(error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        });
    };
    render() {
        return (
            <Container>
                {
                    this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                }
                <Content style={{backgroundColor: '#F6F6F6'}}>
                    <List>
                        {
                            this.state.shopping_Bag.length === 0 ?
                                <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                                    <Text style={{textAlign: 'center', color: '#000', fontSize: 20, fontFamily: 'iranyekanwebregular', width: '100%', padding: 20}}>سبد خرید خالی می باشد.</Text>
                                </ListItem>
                                :
                                null
                        }

                        {
                            this.state.shopping_Bag.map(
                                (value, index) => {
                                    return (
                                        <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}} key={index}>
                                            <Left>
                                                <TouchableOpacity onPress={() => this.deleteProducts(value.shopping_bag_id)}>
                                                    <Icon name="trash" style={{color: '#8D8D8D', marginLeft: 5}}/>
                                                </TouchableOpacity>
                                            </Left>
                                            <Body style={{paddingRight: 17}}>
                                            <Text style={{color: "#4A4A4A",fontFamily: 'iranyekanwebregular', fontSize: 15}}>{value.title}</Text>
                                            {
                                                    value.UserTypeSeeder === null || value.UserTypeSeeder === '' || value.UserTypeSeeder === undefined || value.UserTypeSeeder.length === 0
                                                    ?
                                                    <View>
                                                        <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 10}}>قیمت: <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 10, padding: 30, color: "#4A4A4A"}}>{value.price}</Text></Text>

                                                    </View>
                                                    :
                                                    value.UserTypeSeeder.map(
                                                        (value2, index2) => {
                                                            return (
                                                                <View key={value2.id}>
                                                                    <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 10}}>{value2.user_type_id} <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 10, padding: 30, color: "#4A4A4A"}}>{value2.price}</Text></Text>
                                                                </View>
                                                            )
                                                        }
                                                    )

                                            }
                                            <View>
                                                <Text style={{color: "#8D8D8D", fontFamily: 'iranyekanwebregular', fontSize: 10}}><Text style={{fontFamily: 'iranyekanwebregular', fontSize: 10, color: '#4A4A4A'}}>{value.count}</Text> عدد از محصول در سبد خرید موجود می باشد.</Text>
                                            </View>
                                            <View>
                                                <Text style={{color: "#8D8D8D", fontFamily: 'iranyekanwebregular', fontSize: 10}}> قیمت اصلی: <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 10, color: '#4A4A4A'}}>{value.price}</Text></Text>
                                            </View>
                                            </Body>
                                            <Right>
                                                    <Thumbnail style={{borderRadius: 5}} large square source={{ uri: value.images === "" || value.images === null ? 'http://via.placeholder.com/350x150': value.images }}/>
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            )
                        }


                        <ListItem thumbnail noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10}}>
                            <View style={{ width: '100%'}}>
                                <Text style={{color: "#4A4A4A",fontFamily: 'iranyekanwebregular', fontSize: 15, marginTop: 15, marginRight: 13}}>همایش متالایف و افق‌های نو</Text>
                                <Text style={{color: "#918E8E",fontFamily: 'iranyekanwebregular', fontSize: 12, marginRight: 13}}>در صورتی که کد تخفیف دارید آنرا در قسمت زیر وارد نمایید</Text>
                                <Row style={{margin: 20 }}>
                                    <Col size={30} style={{justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
                                        <Button disabled={this.state.oneTimeCoupon} danger style={{width: '100%',height: '100%',justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 10, marginRight: -10}} onPress={this.couponAction}>
                                            <Text style={{color: "#FFF",fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign: 'center'}}>اعمال</Text>
                                        </Button>
                                    </Col>
                                    <Col size={70} style={{}}>


                                        <Item regular style={{borderRadius: 10}}>
                                            <Input style={{fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign: 'center'}} onChangeText={this.getCouponValue} placeholder='کد تخفیف خود را وارد نمایید.'/>
                                        </Item>
                                    </Col>
                                </Row>
                            </View>
                        </ListItem>
                    </List>
                    <View style={{width: '100%', marginTop: 50}}>
                        <Row style={{backgroundColor: '#E9E9E9'}}>
                            <Col size={50}>
                                <Text style={{color: "#707070",fontFamily: 'iranyekanwebregular', fontSize: 14, textAlign: 'center', padding: 20,}}>{this.state.totalPrice} تومان </Text>
                            </Col>
                            <Col size={50}>
                                <Text style={{color: "#707070",fontFamily: 'iranyekanwebregular', fontSize: 14, textAlign: 'center', padding: 20,}}>جمع مبلغ پرداختی</Text>
                            </Col>
                        </Row>
                        {
                            this.state.showPaymentBtn === 1 ?
                            <Button disabled={this.state.disablePaymentBtn} onPress={this.payViaPort} info style={{backgroundColor: '#04E6B8', width: '100%'}}>
                                <Text style={{color: "#FFF",fontFamily: 'iranyekanwebregular', fontSize: 14, textAlign: 'center', padding: 20, width: '100%'}}>پرداخت از طریق درگاه</Text>
                            </Button>
                                :
                            <Button disabled={this.state.disablePaymentBtn} onPress={this.payViaWallet} info style={{backgroundColor: '#04E6B8', width: '100%'}}>
                                <Text style={{color: "#FFF",fontFamily: 'iranyekanwebregular', fontSize: 14, textAlign: 'center', padding: 20, width: '100%'}}>پرداخت کیف پول</Text>
                            </Button>
                        }

                    </View>
                </Content>

            </Container>
        )
    }
}
export default ShoppingCard;