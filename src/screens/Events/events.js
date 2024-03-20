import React from 'react';
import {View, Text, ScrollView, AsyncStorage} from 'react-native';
import {Body, List, ListItem, Right, Spinner, Thumbnail, Container, Content} from "native-base";
import axios from "axios";
class Events extends React.Component {
    state = {
        events: [],
        SpinnerIcon: false,
    };
    componentDidMount() {
        this.setState({
            SpinnerIcon: true,
        });
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/event',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                console.log('response',response);
                this.setState({
                    events: response.data.data,
                    SpinnerIcon: false,
                })
            }).catch(error => {
                console.log('error',error.response.data.data);
            });
        });
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
    render() {
        return (
            <Container>
                <ScrollView style={{backgroundColor: '#F6F6F6'}}>
                    {
                        this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                    }
                    <List>
                        {
                            this.state.events.map(
                                (value, index) => {
                                        return (

                                            <ListItem key={value.id} onPress={() => this.goToEventsDetail(value.id)} noBorder style={{backgroundColor: '#FFF', borderRadius: 10, marginTop: 5, marginRight: 20, marginBottom: 5}}>
                                                <Body>

                                                <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>{value.title}</Text>
                                                <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.description.replace(/<[^>]*>/g, '').slice(0,20)}...</Text>
                                                {/*<Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>کاربر عادی: <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12, padding: 30, color: "#4A4A4A"}}>1000</Text></Text>*/}
                                                {/*<Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>باشگاه ذهن: <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12, padding: 30, color: "#4A4A4A"}}>1000</Text></Text>*/}

                                                </Body>
                                                <Right style={{flex: 0.5,alignItems:'center'}}>

                                                    <Thumbnail style={{borderRadius:5, height: 100}} large square source={{ uri: value.images }} />

                                                </Right>
                                            </ListItem>

                                        )
                                }
                            )
                        }
                    </List>
                </ScrollView>
            </Container>
        )
    }
}
export default Events;