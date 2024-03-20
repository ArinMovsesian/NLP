import React, { Component } from "react";
import {Container, Header, Content, Accordion, View, Icon, Text} from "native-base";
import {AsyncStorage} from "react-native";
import axios from "axios";
const dataArray = [
    { title: "اول", content: "سلام" },
    { title: "دوم", content: "علیکم" },
    { title: "سوم", content: "قربان" }
];
export default class FAQ extends Component {
    state = {
        dataArray: []
    };
    _renderHeader = (dataArray, expanded) => {
        return (
            <View
                style={{ flexDirection: "row", padding: 10,marginTop: 10, justifyContent: "space-between", backgroundColor: "#FFF", borderRadius: 5}}
            >
                {
                    expanded
                        ? <Icon style={{ fontSize: 18, color: '#008CEF' }} name="remove-circle" />
                        : <Icon style={{ fontSize: 18, color: '#008CEF' }} name="add-circle" />
                }


                <Text style={{width: '90%',fontFamily: "iranyekanwebregular",color: '#4A4A4A', fontSize: 12}}>
                    {" "}{dataArray.title}
                </Text>



            </View>
        );
    };
    _renderContent = (dataArray) => {
        return (
            <Text
                style={{padding: 10,fontStyle: "normal", fontFamily: "iranyekanwebregular", color: "#8D8D8D", fontSize: 12, textAlign: 'right',lineHeight: 25}}
            >
                {dataArray.content.replace(/<[^>]*>/g, '')}
            </Text>
        );
    };
    componentDidMount() {
        let i = 0;
        AsyncStorage.getItem('token').then((value) => {
            let getFAQArray = [];
            axios.get('/Api/V1/getFQ',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },

                }).then(response => {
                console.log('response',response);
                for(i; i < response.data.data.length; i++) {
                    getFAQArray.push({title: response.data.data[i].question, content: response.data.data[i].answer});
                }
                console.log('response:: ', getFAQArray);
                this.setState({
                    dataArray: getFAQArray
                });

                }).catch(error => {
                    // console.log('error',error.response.data.data);
                });
        });
    }
    render() {
        return (
            <Container style={{backgroundColor: '#F6F6F6'}}>
                <Content padder showsVerticalScrollIndicator={false}>
                    <Accordion
                        dataArray={this.state.dataArray}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        style={{borderWidth: 0}}
                    />
                </Content>
            </Container>
        );
    }
}