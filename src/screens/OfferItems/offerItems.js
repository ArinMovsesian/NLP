import React from 'react';
import {View, Image, Text, AsyncStorage, TouchableOpacity} from 'react-native';
import {Container,Tabs,Tab,ScrollableTab,TabHeading, Content, Grid, Col, Row, Spinner} from 'native-base';
import axios from "axios";
class OfferItems extends React.Component {
    state = {
        Books: [],
        Voices: [],
        Images: [],
        SpinnerIcon: false,
        // SpinnerIcon: false,
    };
    componentDidMount() {
        this.setState({
            SpinnerIcon: true
        });
        let tempBooks = [];
        let temp2DBooks = [];
        let tempVoices = [];
        let temp2DVoices = [];
        let tempImages = [];
        let temp2DImages = [];
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/event',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                console.log('free-all response: ',response);
                for (let i = 0; i < response.data.data.length; i++) {
                    if(response.data.data[i].categories_id === 1) {
                        tempBooks.push(response.data.data[i]);
                    }else if (response.data.data[i].categories_id === 2){
                        tempVoices.push(response.data.data[i]);
                    }else {
                        tempImages.push(response.data.data[i]);
                    }
                }
                //***** fill 2DBooks *****//
                for (let i = 0, k = -1; i < tempBooks.length; i++) {
                    if (i % 2 === 0) {
                        k++;
                        temp2DBooks[k] = [];
                    }
                    temp2DBooks[k].push(tempBooks[i]);
                }
                //***** fill 2DBooks *****//



                //***** fill 2DVoices *****//
                for (let i = 0, k = -1; i < tempVoices.length; i++) {
                    if (i % 2 === 0) {
                        k++;
                        temp2DVoices[k] = [];
                    }
                    temp2DVoices[k].push(tempVoices[i]);
                }
                //***** fill 2DVoices *****//


                //***** fill 2DImages *****//
                for (let i = 0, k = -1; i < tempImages.length; i++) {
                    if (i % 2 === 0) {
                        k++;
                        temp2DImages[k] = [];
                    }
                    temp2DImages[k].push(tempImages[i]);
                }
                //***** fill 2DImages *****//

                console.log('tempBooks: ',temp2DBooks);
                console.log('tempVoices: ',temp2DVoices);
                console.log('tempImages: ',temp2DImages);

                this.setState({
                    Books: temp2DBooks,
                    Voices: temp2DVoices,
                    Images: temp2DImages,
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
    render() {

        return (
            <Container>
                <Tabs style={{marginRight: 10, marginLeft: 10}}
                      tabContainerStyle={{elevation:0}}
                      tabBarUnderlineStyle={{ backgroundColor: '#F94E4E', borderRadius: 5}}
                >


                    <Tab heading={
                        <TabHeading style={{  backgroundColor: '#FFF'}}>
                            <Text style={{
                                color: '#707070',
                                fontSize: 15,
                                fontFamily: 'iranyekanwebregular'}}>کتاب</Text>
                        </TabHeading>
                    }>
                        <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                            }
                            <Grid>
                                {
                                    this.state.Books.map(
                                        (value1, index1) => {
                                            return (
                                                <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                    {
                                                        value1.map(
                                                            (value2, index2) => {
                                                                return (
                                                                    <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                        <TouchableOpacity onPress={() => this.goToOfferItemsDetail(value2.id)}  style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>

                                                                            <Image resizeMode='contain' style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images}}/>
                                                                            <Text style={{
                                                                                color: '#707070',
                                                                                fontSize: 12,
                                                                                fontFamily: 'iranyekanwebregular',
                                                                                padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                            <Text style={{
                                                                                color: '#707070',
                                                                                fontSize: 12,
                                                                                fontFamily: 'iranyekanwebregular',
                                                                                padding: 5
                                                                            }}>
                                                                                {value2.price}تومان
                                                                            </Text>
                                                                            {/*<View>*/}
                                                                                {/*<Row>*/}
                                                                                    {/*<Col size={80} style={{padding: 5}}>*/}
                                                                                        {/*<Row>*/}
                                                                                            {/*<Col size={50}><Text style={{color: value2.discount === null ? '#04E6B8': '#F94E4E', textDecorationLine: value2.discount === null ? 'none' : 'line-through', fontSize: value2.discount === null ? 14 : 10}}>{value2.price}</Text></Col>*/}
                                                                                            {/*<Col size={50}><Text style={{color: '#04E6B8'}}>{value2.discount === null ? null :  value2.price- ((value2.price * value2.discount.discount) / 100) }</Text></Col>*/}
                                                                                        {/*</Row>*/}
                                                                                    {/*</Col>*/}
                                                                                    {/*<Col size={20} style={{padding: 5}}>*/}
                                                                                        {/*<Text style={{color: '#F94E4E',fontSize: 10, textAlign: 'right'}}>{value2.discount === null ? 0 : value2.discount.discount} %</Text>*/}
                                                                                    {/*</Col>*/}
                                                                                {/*</Row>*/}
                                                                            {/*</View>*/}
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
                    </Tab>





                    <Tab heading={
                        <TabHeading style={{  backgroundColor: '#FFF'}}>
                            <Text style={{
                                color: '#707070',
                                fontSize: 15,
                                fontFamily: 'iranyekanwebregular'}}>صوت</Text>
                        </TabHeading>
                    }>
                        <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                            }
                            <Grid>
                                {
                                    this.state.Voices.map(
                                        (value1, index1) => {
                                            return (
                                                <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                    {
                                                        value1.map(
                                                            (value2, index2) => {

                                                                return (
                                                                    <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                        <TouchableOpacity onPress={() => this.goToOfferItemsDetail(value2.id)}  style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>

                                                                            <Image style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images}}/>
                                                                            <Text style={{
                                                                                color: '#707070',
                                                                                fontSize: 12,
                                                                                fontFamily: 'iranyekanwebregular',
                                                                                padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                            <Text style={{
                                                                                color: '#707070',
                                                                                fontSize: 12,
                                                                                fontFamily: 'iranyekanwebregular',
                                                                                padding: 5
                                                                            }}>
                                                                                {value2.price}تومان
                                                                            </Text>
                                                                            {/*<View>*/}
                                                                                {/*<Row>*/}
                                                                                    {/*<Col size={80} style={{padding: 5}}>*/}
                                                                                        {/*<Row>*/}
                                                                                            {/*<Col size={50}><Text style={{color: value2.discount === null ? '#04E6B8': '#F94E4E', textDecorationLine: value2.discount === null ? 'none' : 'line-through',fontSize: value2.discount === null ? 14 : 10}}>{value2.price}</Text></Col>*/}
                                                                                            {/*<Col size={50}><Text style={{color: '#04E6B8'}}>{value2.discount === null ? null :  value2.price- ((value2.price * value2.discount.discount) / 100) }</Text></Col>*/}
                                                                                        {/*</Row>*/}
                                                                                    {/*</Col>*/}
                                                                                    {/*<Col size={20} style={{padding: 5}}>*/}
                                                                                        {/*<Text style={{color: '#F94E4E',fontSize: 10, textAlign: 'right'}}>{value2.discount === null ? 0 : value2.discount.discount} %</Text>*/}
                                                                                    {/*</Col>*/}
                                                                                {/*</Row>*/}
                                                                            {/*</View>*/}
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
                    </Tab>




                    <Tab heading={
                        <TabHeading style={{  backgroundColor: '#FFF'}}>
                            <Text style={{
                                color: '#707070',
                                fontSize: 15,
                                fontFamily: 'iranyekanwebregular'}}>فیلم</Text>
                        </TabHeading>
                    }>
                        <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                            }
                            <Grid>
                                {
                                    this.state.Images.map(
                                        (value1, index1) => {
                                            return (
                                                <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                    {
                                                        value1.map(
                                                            (value2, index2) => {

                                                                return (
                                                                    <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                        <TouchableOpacity onPress={() => this.goToOfferItemsDetail(value2.id)}  style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>
                                                                            <Image style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images}}/>
                                                                            <Text style={{
                                                                                color: '#707070',
                                                                                fontSize: 12,
                                                                                fontFamily: 'iranyekanwebregular',
                                                                                padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                            <Text style={{
                                                                                color: '#707070',
                                                                                fontSize: 12,
                                                                                fontFamily: 'iranyekanwebregular',
                                                                                padding: 5
                                                                            }}>
                                                                                {value2.price}تومان
                                                                            </Text>
                                                                            {/*<View>*/}
                                                                                {/*<Row>*/}
                                                                                    {/*<Col size={80} style={{padding: 5}}>*/}
                                                                                        {/*<Row>*/}
                                                                                            {/*<Col size={50}><Text style={{color: value2.discount === null ? '#04E6B8': '#F94E4E', textDecorationLine: value2.discount === null ? 'none' : 'line-through', fontSize: value2.discount === null ? 14 : 10}}>{value2.price}</Text></Col>*/}
                                                                                            {/*<Col size={50}><Text style={{color: '#04E6B8'}}>{value2.discount === null ? null :  value2.price- ((value2.price * value2.discount.discount) / 100) }</Text></Col>*/}
                                                                                        {/*</Row>*/}
                                                                                    {/*</Col>*/}
                                                                                    {/*<Col size={20} style={{padding: 5}}>*/}
                                                                                        {/*<Text style={{color: '#F94E4E', textAlign: 'right', fontSize: 10}}>{value2.discount === null ? 0 : value2.discount.discount} %</Text>*/}
                                                                                    {/*</Col>*/}
                                                                                {/*</Row>*/}
                                                                            {/*</View>*/}
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
                    </Tab>
                </Tabs>

            </Container>
        )
    }
}
export default OfferItems
