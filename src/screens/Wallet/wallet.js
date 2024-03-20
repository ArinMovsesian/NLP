import React from 'react';
import {View, Text, Linking, AsyncStorage} from 'react-native';
import {
    Body,
    Container,
    Content,
    Input,
    Item,
    List,
    ListItem,
    Form,
    Button,
    Grid,
    Col,
    Row,
    Spinner,
    Label
} from 'native-base';
import axios from "axios";
class Wallet extends React.Component{
    state = {
        WalletValueShow: undefined,
        InvoiceWallet: [],
        SpinnerIcon: false
    };
    WalletValue = undefined;
    componentDidMount() {
        this.setState({
            SpinnerIcon: true
        });
        let tempInvoiceWallet = [];
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/profile?type=wallet',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                    console.log('response',response);
                    tempInvoiceWallet = response.data.data.invoiceWallet;
                    for(let i = 0; i < tempInvoiceWallet.length; i++){
                        if(tempInvoiceWallet[i].price_increase !==0 && tempInvoiceWallet[i].status === 1){
                            tempInvoiceWallet[i].price = tempInvoiceWallet[i].price_increase + '+';
                        }else if(tempInvoiceWallet[i].price_decreases !==0 && tempInvoiceWallet[i].status === 1) {
                            tempInvoiceWallet[i].price = tempInvoiceWallet[i].price_decreases + '-';
                        } else if(tempInvoiceWallet[i].status !== 1){
                            tempInvoiceWallet[i].price = 0;
                        } else if(tempInvoiceWallet[i].price_increase !==0){
                            tempInvoiceWallet[i].price = tempInvoiceWallet[i].price_increase + '+';
                        } else if(tempInvoiceWallet[i].price_decreases !==0){
                            tempInvoiceWallet[i].price = tempInvoiceWallet[i].price_decreases + '-';
                        }
                    }
                    console.log('price: ',tempInvoiceWallet);
                    this.setState({
                        WalletValueShow: response.data.data.walletPrice,
                        InvoiceWallet: tempInvoiceWallet,
                        SpinnerIcon: false
                    })
                });
            }).catch(error => {
                console.log('error',error.response.data.data);
            });
    };
    walletValue = (value) => {
        this.WalletValue = value;
    };
    increaseWallet = () => {
            AsyncStorage.getItem('token').then((value) => {
                axios.post('/Api/V1/increase-payment',
                    {
                        "price_all": this.WalletValue,
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
                    alert('سقف افزایش مبلغ کیف پول پنجاه میلیون تومان می باشد.');
                    console.log('error',error.response.data.data);
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
                        <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, marginTop: 20, marginRight: 20, marginBottom: 5}}>
                            <Body>
                            <View>
                                <Text style={{color: "#04E6B8",fontFamily: 'iranyekanwebregular', fontSize: 50, fontWeight: 'bold', textAlign: 'center'}}>{this.state.WalletValueShow}</Text>
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={{color: "#04E6B8",fontFamily: 'iranyekanwebregular', fontSize: 20, textAlign: 'center'}}>تومان</Text>
                            </View>
                            </Body>
                        </ListItem>
                        <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, marginTop: 20, marginRight: 20, marginBottom: 5}}>
                            <Body>
                                <Form>
                                    <Input onChangeText={this.walletValue} style={{fontFamily: 'iranyekanwebregular', fontSize: 12, padding: 5, marginLeft: 10}}  keyboardType={'numeric'}  placeholderTextColor="#D9D9D9"  placeholder='مبلغ مورد نظر به ریال'/>
                                </Form>
                            </Body>
                        </ListItem>
                    </List>

                    <List>
                        <ListItem noBorder style={{backgroundColor: '#ececec', borderRadius: 10, marginTop: 20, marginRight: 20, marginBottom: 5}}>
                            <Grid>
                                <Row>
                                    <Col size={30}>
                                        <Text style={{textAlign: 'center', color: '#333', fontFamily: 'iranyekanwebregular', fontSize: 12}}>شماره تراکنش</Text>
                                    </Col>
                                    <Col size={30}>
                                        <Text style={{textAlign: 'center', color: '#333', fontFamily: 'iranyekanwebregular', fontSize: 12}}>مبلغ</Text>
                                    </Col>
                                    <Col size={30}>
                                        <Text style={{textAlign: 'center', color: '#333', fontFamily: 'iranyekanwebregular', fontSize: 12}}>نوع رویداد</Text>
                                    </Col>
                                    <Col size={10}>
                                        <Text style={{textAlign: 'center', color: '#333', fontFamily: 'iranyekanwebregular', fontSize: 12}}>-</Text>
                                    </Col>
                                </Row>
                            </Grid>
                        </ListItem>
                    </List>
                    {
                        this.state.InvoiceWallet.map(
                            (value, index) => {
                                return (
                                    <List key={value.id}>
                                        <ListItem noBorder style={{backgroundColor: '#ececec', borderRadius: 10, marginTop: 5, marginRight: 20, marginBottom: 5}}>
                                            <Grid>
                                                <Row>
                                                    <Col size={30}>
                                                        <Text style={{textAlign: 'center', color: '#333', fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.payment_token}</Text>
                                                    </Col>
                                                    <Col size={30}>
                                                        <Text style={{textAlign: 'center', color: '#333', fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.price}</Text>
                                                    </Col>
                                                    <Col size={30}>
                                                        <Text style={{textAlign: 'center', color: '#333', fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.status === 1 ? 'عملیات موفق': 'عملیات ناموفق'}</Text>
                                                    </Col>
                                                    <Col size={10}>
                                                        <Text style={{textAlign: 'center', color: '#333', fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.id}</Text>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </ListItem>
                                    </List>
                                )
                            }
                        )
                    }

                </Content>
                <Button full info onPress={this.increaseWallet}>
                    <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12, color: '#FFF'}}>پرداخت</Text>
                </Button>
            </Container>
        )
    }
}
export default Wallet;