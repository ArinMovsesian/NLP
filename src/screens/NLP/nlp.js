import React from 'react';
import {StyleSheet, View, ScrollView, Text, AsyncStorage, TouchableOpacity} from 'react-native';
import {
    Tabs,
    Tab,
    ScrollableTab,
    Container,
    Header,
    Icon,
    TabHeading,
    List,
    ListItem,
    Left,
    Right,
    Body,
    Button,
    Thumbnail,
    Spinner,
    Content
} from 'native-base';
import axios from "axios";
import ShoppingCard from "../ShoppingCard/shoppingCard";
class NLP extends React.Component {
    state = {
        subDegreeInfoLocalArray: [],
        SpinnerIcon: false,
    };
    // person = {
    //     names: [1,2,3],
    // };
    componentDidMount() {
        this.setState({
            ...this.state,
            SpinnerIcon: true
        });
        // console.log(this.person.names[0]);
        // log('willMount');
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/nlp',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                console.log('response',response);
                //
                this.setState({
                    ...this.state,
                    subDegreeInfoLocalArray: response.data.data.subDegreeInfo,
                    SpinnerIcon: false
                });
            }).catch(error => {
                console.log('error',error.response.data.data);
            });
        });
    }
    goToNLPDetail = (id) => {
        this.props.navigator.push({
            screen: 'NLPDetailScreen',
            title: 'جزییات محصول',
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
        console.log(this.state.subDegreeInfoLocalArray);
        let Prerequisite = undefined;

        return (
            <Container>
                <Tabs tabContainerStyle={{elevation:0, height:100}}
                      tabBarUnderlineStyle={{ backgroundColor: '#FFF'}}>
                    <Tab heading={
                        <TabHeading style={{backgroundColor: '#4AA4FF'}}>
                            <Text style={styles.metaLife_tabHeadingTextStyle}>حضوری</Text>
                        </TabHeading>
                    }>
                        <ScrollView style={{backgroundColor: '#F6F6F6'}}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                            }
                            <List>
                                {
                                    this.state.subDegreeInfoLocalArray.map(
                                        (value, index) => {
                                            if (value.type === 1) {
                                                if(value.rating === 1) {
                                                    if (value.degree_id === 2) {
                                                        Prerequisite = 'دارد'
                                                    }else {
                                                        Prerequisite = 'ندارد'
                                                    }
                                                } else {
                                                  Prerequisite = 'دارد'
                                                }

                                                return (

                                                    <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, marginTop: 5, marginRight: 20, marginBottom: 5}} key={index} onPress={() => this.goToNLPDetail(value.id)}>
                                                        <Body>

                                                        <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>{value.title}</Text>
                                                        <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.description.replace(/<[^>]*>/g, '').slice(0,20)}...</Text>
                                                        <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>قیمت: <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12, padding: 30, color: "#4A4A4A"}}>{value.price === "" || value.price === null ? 'قیمت ندارد': value.price}</Text></Text>
                                                        <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}> پیش نیاز: {Prerequisite}</Text>

                                                        </Body>
                                                        <Right style={{flex: 0.5,alignItems:'center'}}>
                                                            <Thumbnail style={{borderRadius:5, height: 100}} large square source={{ uri: value.image }} />
                                                        </Right>
                                                    </ListItem>
                                                )
                                            }
                                        }
                                    )
                                }
                            </List>
                        </ScrollView>
                    </Tab>
                    <Tab heading={
                        <TabHeading style={{backgroundColor: '#4AA4FF'}}>
                            <Text style={styles.metaLife_tabHeadingTextStyle}>غیر حضوری</Text>
                        </TabHeading>
                    }>
                        <ScrollView style={{backgroundColor: '#F6F6F6'}}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                            }
                            <List>
                                {
                                    this.state.subDegreeInfoLocalArray.map(
                                        (value, index) => {
                                            if (value.type === 0) {
                                                if(value.rating === 1) {
                                                    if (value.degree_id === 2) {
                                                        Prerequisite = 'دارد'
                                                    }else {
                                                        Prerequisite = 'ندارد'
                                                    }
                                                } else {
                                                    Prerequisite = 'دارد'
                                                }
                                                return (

                                                    <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, marginTop: 5, marginRight: 20, marginBottom: 5}} key={index} onPress={() => this.goToNLPDetail(value.id)}>
                                                        <Body>

                                                        <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>{value.title}</Text>
                                                        <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>{value.description.replace(/<[^>]*>/g, '').slice(0,20)}...</Text>
                                                        <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}>قیمت: <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12, padding: 30, color: "#4A4A4A"}}>{value.price === "" || value.price === null ? 'قیمت ندارد': value.price}</Text></Text>
                                                        <Text style={{color: "#8D8D8D",fontFamily: 'iranyekanwebregular', fontSize: 12}}> پیش نیاز: {Prerequisite}</Text>


                                                        </Body>
                                                        <Right style={{flex: 0.5,alignItems:'center'}}>

                                                            <Thumbnail style={{borderRadius:5, height: 100}} large square source={{ uri: value.image }} />

                                                        </Right>
                                                    </ListItem>

                                                )
                                            }
                                        }
                                    )
                                }
                            </List>
                        </ScrollView>
                    </Tab>
                </Tabs>

            </Container>
        )
    }
}
const styles = StyleSheet.create({
    metaLife_tabHeadingTextStyle: {
        color: '#FFF',
        fontSize: 17,
        fontFamily: 'iranyekanwebregular',
    }
});
export default NLP;
