import React from 'react';
import {AsyncStorage, NativeModules} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {
    Body,
    Container,
    List,
    Left,
    ListItem,
    Right,
    Spinner,
    Thumbnail,
    Content,
    Tabs,
    TabHeading,
    Tab,
    Icon
} from 'native-base';
import axios from "axios";
import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';

class Download extends React.Component {
    state = {
        writingProducts: [],
        audioProducts: [],
        videoProducts: [],
        UserExamInfo: [], // آزمون انجام شده
        ExamShoppingInfo: [], // آزمون انجام نشده
        EventsItems: [],
        SpinnerIcon: false,
    };

    componentDidMount() {
        AsyncStorage.setItem('pushing',);
        let allData = [];
        let tempWritingProducts = [];
        let tempAudioProducts = [];
        let tempVideoProducts = [];
        let tempEventsItems = [];
        this.setState({
            SpinnerIcon: true,
        });
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/profile/download?type=download',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                for (let i = 0; i < response.data.data.shopping.length; i++) {
                    if (response.data.data.shopping[i].categories_id === 1 || response.data.data.shopping[i].categories_id === '1') {
                        tempWritingProducts.push(response.data.data.shopping[i]);
                    } else if (response.data.data.shopping[i].categories_id === 2 || response.data.data.shopping[i].categories_id === '2') {
                        tempAudioProducts.push(response.data.data.shopping[i]);
                    } else if (response.data.data.shopping[i].event_id !== null) {
                        tempEventsItems.push(response.data.data.shopping[i]);
                    } else {
                        tempVideoProducts.push(response.data.data.shopping[i]);
                    }
                }
                console.log('AllDownloadData: ', allData);
                this.setState({
                    writingProducts: tempWritingProducts,
                    audioProducts: tempAudioProducts,
                    videoProducts: tempVideoProducts,
                    UserExamInfo: response.data.data.userExamInfo,
                    ExamShoppingInfo: response.data.data.examShoppingInfo,
                    EventsItems: tempEventsItems,
                    SpinnerIcon: false,
                })
            }).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        });
    };

    downloadItems = (getUrl) => {
        console.log("file url: " + getUrl);

        let url = getUrl;
        let fileName = url.substring(url.lastIndexOf("/") + 1, url.length);
        console.log("file name: " + fileName);

        const {config, fs} = RNFetchBlob;

        let DownloadDir = fs.dirs.DownloadDir;
        let filePath = DownloadDir + "/" + fileName;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: filePath,
                // description : 'Image'
            }
        };

        NativeModules.ActivityStarter.fileExists(filePath, function () {
            config(options).fetch('GET', url).then((res) => {
                alert("فایل شما با موفقیت دانلود گردید.");
                NativeModules.ActivityStarter.openFile(res.path())
            });
        });
    };
    extention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    };
    goToExamRulesScreen = (id, shopping_id) => {


        this.props.navigator.push({
            screen: 'ExamRulesScreen',
            title: 'قوانین آزمون',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#03F9B5',
                navBarBackgroundColor: '#FFF',
                topBarElevationShadowEnabled: false,
            },
            passProps: {
                itemID: id,
                shoppingID: shopping_id,
            },
        })
        // alert(id);
        // alert(shopping_id);
    };
    goToExamResult = (id, shopping_id) => {
        this.props.navigator.push({
            screen: 'ExamResultScreen',
            title: 'نتیجه آزمون',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#03F9B5',
                navBarBackgroundColor: '#FFF',
                topBarElevationShadowEnabled: false,
            },
            passProps: {
                itemID: id,
                shoppingID: shopping_id,
            },
        })
        // alert('ID: ' + id + 'S: ' + shopping_id);
    };

    render() {
        return (
            <Container>
                <Tabs style={{marginRight: 10, marginLeft: 10}}
                      tabContainerStyle={{elevation: 0}}
                      tabBarUnderlineStyle={{backgroundColor: '#3497FD', borderRadius: 5}}
                >
                    <Tab heading={
                        <TabHeading style={{backgroundColor: '#FFF'}}>
                            <Text style={{
                                color: '#3497FD',
                                fontSize: 15,
                                fontFamily: 'iranyekanwebregular'
                            }}>کتاب</Text>
                        </TabHeading>
                    }>

                        <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue'/> : null
                            }
                            <List>
                                {
                                    this.state.writingProducts.map(
                                        (value, index) => {
                                            return (

                                                <ListItem thumbnail noBorder style={{
                                                    backgroundColor: '#FFF',
                                                    borderRadius: 10,
                                                    margin: 10
                                                }} key={index}>
                                                    <Left>
                                                        <TouchableOpacity
                                                            onPress={() => this.downloadItems(value.items[0].file)}>
                                                            <Icon name="download" style={{
                                                                color: '#3497FD',
                                                                marginLeft: 10,
                                                                fontSize: 30
                                                            }}/>
                                                        </TouchableOpacity>
                                                    </Left>
                                                    <Body style={{paddingRight: 17}}>
                                                    <Text style={{
                                                        fontFamily: 'iranyekanwebregular',
                                                        fontSize: 13,
                                                        color: "#4A4A4A"
                                                    }}>{value.title}</Text>
                                                    <Text style={{
                                                        color: "#8D8D8D",
                                                        fontFamily: 'iranyekanwebregular',
                                                        fontSize: 12
                                                    }}>{value.description.replace(/<[^>]*>/g, '').slice(0, 20)}...</Text>
                                                    </Body>
                                                    <Right>
                                                        <Thumbnail style={{borderRadius: 5, height: 100}} large square
                                                                   source={{uri: value.images}}/>
                                                    </Right>
                                                </ListItem>

                                            )
                                        }
                                    )
                                }
                            </List>
                        </Content>

                    </Tab>

                    <Tab heading={
                        <TabHeading style={{backgroundColor: '#FFF'}}>
                            <Text style={{
                                color: '#3497FD',
                                fontSize: 15,
                                fontFamily: 'iranyekanwebregular'
                            }}>صوت</Text>
                        </TabHeading>
                    }>
                        <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue'/> : null
                            }
                            <List>
                                {
                                    this.state.audioProducts.map(
                                        (value, index) => {
                                            return (

                                                <ListItem thumbnail noBorder style={{
                                                    backgroundColor: '#FFF',
                                                    borderRadius: 10,
                                                    margin: 10
                                                }} key={index}>
                                                    <Left>
                                                        <TouchableOpacity
                                                            onPress={() => this.downloadItems(value.items[0].file)}>
                                                            <Icon name="download" style={{
                                                                color: '#3497FD',
                                                                marginLeft: 10,
                                                                fontSize: 30
                                                            }}/>
                                                        </TouchableOpacity>
                                                    </Left>
                                                    <Body style={{paddingRight: 17}}>
                                                    <Text style={{
                                                        fontFamily: 'iranyekanwebregular',
                                                        fontSize: 13,
                                                        color: "#4A4A4A"
                                                    }}>{value.title}</Text>
                                                    <Text style={{
                                                        color: "#8D8D8D",
                                                        fontFamily: 'iranyekanwebregular',
                                                        fontSize: 12
                                                    }}>{value.description.replace(/<[^>]*>/g, '').slice(0, 20)}...</Text>
                                                    </Body>
                                                    <Right>
                                                        <Thumbnail style={{borderRadius: 5, height: 100}} large square
                                                                   source={{uri: value.images}}/>
                                                    </Right>
                                                </ListItem>

                                            )
                                        }
                                    )
                                }
                            </List>
                        </Content>
                    </Tab>


                    <Tab heading={
                        <TabHeading style={{backgroundColor: '#FFF'}}>
                            <Text style={{
                                color: '#3497FD',
                                fontSize: 15,
                                fontFamily: 'iranyekanwebregular'
                            }}>فیلم</Text>
                        </TabHeading>
                    }>
                        <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue'/> : null
                            }
                            <List>
                                {
                                    this.state.videoProducts.map(
                                        (value, index) => {
                                            return (

                                                <ListItem thumbnail noBorder style={{
                                                    backgroundColor: '#FFF',
                                                    borderRadius: 10,
                                                    margin: 10
                                                }} key={index}>
                                                    <Left>
                                                        <TouchableOpacity
                                                            onPress={() => this.downloadItems(value.items[0].file)}>
                                                            <Icon name="download" style={{
                                                                color: '#3497FD',
                                                                marginLeft: 10,
                                                                fontSize: 30
                                                            }}/>
                                                        </TouchableOpacity>
                                                    </Left>
                                                    <Body style={{paddingRight: 17}}>
                                                    <Text style={{
                                                        fontFamily: 'iranyekanwebregular',
                                                        fontSize: 13,
                                                        color: "#4A4A4A"
                                                    }}>{value.title}</Text>
                                                    <Text style={{
                                                        color: "#8D8D8D",
                                                        fontFamily: 'iranyekanwebregular',
                                                        fontSize: 12
                                                    }}>{value.description.replace(/<[^>]*>/g, '').slice(0, 20)}...</Text>
                                                    </Body>
                                                    <Right>
                                                        <Thumbnail style={{borderRadius: 5, height: 100}} large square
                                                                   source={{uri: value.images}}/>
                                                    </Right>
                                                </ListItem>

                                            )
                                        }
                                    )
                                }
                            </List>
                        </Content>
                    </Tab>

                    <Tab heading={
                        <TabHeading style={{backgroundColor: '#FFF'}}>
                            <Text style={{
                                color: '#3497FD',
                                fontSize: 15,
                                fontFamily: 'iranyekanwebregular'
                            }}>آزمون</Text>
                        </TabHeading>
                    }>
                        {
                            this.state.SpinnerIcon === true ? <Spinner color='blue'/> : null
                        }
                        <Tabs
                            tabContainerStyle={{elevation: 0}}
                            tabBarUnderlineStyle={{backgroundColor: '#7d7d7d', borderRadius: 5}}
                        >

                            <Tab heading={
                                <TabHeading style={{backgroundColor: '#FFF'}}>
                                    <Text style={{
                                        color: '#7d7d7d',
                                        fontSize: 13,
                                        fontFamily: 'iranyekanwebregular'
                                    }}>آزمون های انجام شده</Text>
                                </TabHeading>
                            }>
                                <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                                    {
                                        this.state.UserExamInfo.length === 0
                                            ?
                                            <Text style={{
                                                color: 'red',
                                                fontSize: 14,
                                                fontFamily: 'iranyekanwebregular',
                                                width: '100%',
                                                textAlign: 'center',
                                                marginTop: 10,
                                            }}>آزمون انجام شده ای وجود ندارد.</Text>
                                            :
                                            <List>
                                                {
                                                    this.state.UserExamInfo.map(
                                                        (value, index) => {
                                                            return (

                                                                <ListItem
                                                                    onPress={() => this.goToExamResult(value.id, value.shopping_id)}
                                                                    thumbnail noBorder style={{
                                                                    backgroundColor: '#FFF',
                                                                    borderRadius: 10,
                                                                    margin: 10,
                                                                    padding: 20,
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'flex-end',
                                                                    alignItems: 'flex-end'
                                                                }} key={index}>
                                                                    <View>
                                                                        <Text style={{
                                                                            fontSize: 15,
                                                                            color: '#4A4A4A',
                                                                            fontFamily: 'iranyekanwebregular'
                                                                        }}>{value.title}</Text>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={{
                                                                            fontSize: 12,
                                                                            color: '#8D8D8D',
                                                                            fontFamily: 'iranyekanwebregular'
                                                                        }}>{value.desc.replace(/<[^>]*>/g, '').slice(0, 20)}...</Text>
                                                                    </View>
                                                                </ListItem>

                                                            )
                                                        }
                                                    )
                                                }
                                            </List>
                                    }
                                </Content>

                            </Tab>
                            <Tab heading={
                                <TabHeading style={{backgroundColor: '#FFF'}}>
                                    <Text style={{
                                        color: '#7d7d7d',
                                        fontSize: 13,
                                        fontFamily: 'iranyekanwebregular'
                                    }}>آزمون های انجام نشده</Text>
                                </TabHeading>
                            }>
                                <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                                    {
                                        this.state.ExamShoppingInfo.length === 0
                                            ?
                                            <Text style={{
                                                color: 'red',
                                                fontSize: 14,
                                                fontFamily: 'iranyekanwebregular',
                                                width: '100%',
                                                textAlign: 'center',
                                                marginTop: 10,
                                            }}>آزمون انجام نشده ای وجود ندارد.</Text>
                                            :
                                            <List>
                                                {
                                                    this.state.ExamShoppingInfo.map(
                                                        (value, index) => {
                                                            return (

                                                                <ListItem
                                                                    onPress={() => this.goToExamRulesScreen(value.id, value.shopping_id)}
                                                                    thumbnail noBorder style={{
                                                                    backgroundColor: '#FFF',
                                                                    borderRadius: 10,
                                                                    margin: 10,
                                                                    padding: 20,
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'flex-end',
                                                                    alignItems: 'flex-end'
                                                                }} key={index}>
                                                                    <View>
                                                                        <Text style={{
                                                                            fontSize: 15,
                                                                            color: '#4A4A4A',
                                                                            fontFamily: 'iranyekanwebregular'
                                                                        }}>{value.title}</Text>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={{
                                                                            fontSize: 12,
                                                                            color: '#8D8D8D',
                                                                            fontFamily: 'iranyekanwebregular'
                                                                        }}>{value.desc.replace(/<[^>]*>/g, '').slice(0, 20)}...</Text>
                                                                    </View>
                                                                </ListItem>

                                                            )
                                                        }
                                                    )
                                                }
                                            </List>
                                    }
                                </Content>
                            </Tab>

                        </Tabs>
                    </Tab>

                    <Tab heading={
                        <TabHeading style={{backgroundColor: '#FFF'}}>
                            <Text style={{
                                color: '#3497FD',
                                fontSize: 15,
                                fontFamily: 'iranyekanwebregular'
                            }}>سمینار</Text>
                        </TabHeading>
                    }>
                        <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue'/> : null
                            }
                            <List>
                                {
                                    this.state.EventsItems.map(
                                        (value, index) => {
                                            return (

                                                <ListItem thumbnail noBorder style={{
                                                    backgroundColor: '#FFF',
                                                    borderRadius: 10,
                                                    margin: 10
                                                }} key={index}>
                                                    <Left/>
                                                    <Body style={{paddingRight: 17}}>
                                                    <Text style={{
                                                        fontFamily: 'iranyekanwebregular',
                                                        fontSize: 13,
                                                        color: "#4A4A4A"
                                                    }}>{value.title}</Text>
                                                    <Text style={{
                                                        color: "#8D8D8D",
                                                        fontFamily: 'iranyekanwebregular',
                                                        fontSize: 12
                                                    }}>{value.description.replace(/<[^>]*>/g, '').slice(0, 20)}...</Text>
                                                    </Body>
                                                    <Right>
                                                        <Thumbnail style={{borderRadius: 5, height: 100}} large square
                                                                   source={{uri: value.images}}/>
                                                    </Right>
                                                </ListItem>

                                            )
                                        }
                                    )
                                }
                            </List>
                        </Content>
                    </Tab>
                </Tabs>

            </Container>
        )
    }
}

export default Download;