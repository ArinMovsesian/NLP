import React from 'react';
import {StyleSheet, View, ScrollView, Text, AsyncStorage, TouchableOpacity, Image} from 'react-native';
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
    Col,
    Row, Content, Grid,
} from 'native-base';
import axios from "axios";
class ExamsWithTabs extends React.Component {
    state = {
        examsDataWithPackage: [],
        examsData: [],
        SpinnerIcon: false,
    };
    componentDidMount() {
        this.setState({
            SpinnerIcon: true
        });

        let tempExamData = [];
        let temp2DExamData = [];
        let tempExamsDataWithPackage = [];
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/exam-public-search-result',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                // console.log('response1: ',response);
                tempExamsDataWithPackage = response.data.data.categoryExamPublicInfo;
                axios.get('/Api/V1/exam',
                    {
                        headers: {
                            "uuid": "test-arin",
                            "token": value
                        },
                    }).then(response2 => {
                    // console.log('response2: ',response2);
                    for (let i = 0; i < response2.data.examInfo.length; i++) {
                        // if(response2.data.data[i].category === '0' || response2.data.data[i].category === 0) {
                            tempExamData.push(response2.data.examInfo[i]);
                        // }
                    }
                    console.log('response2tempExamData: ',tempExamData);
                    for (let i = 0, k = -1; i < tempExamData.length; i++) {
                        if (i % 2 === 0) {
                            k++;
                            temp2DExamData[k] = [];
                        }
                        temp2DExamData[k].push(tempExamData[i]);
                    }
                    // console.log('response2temp2DExamData: ',temp2DExamData);
                    this.setState({
                        examsDataWithPackage: tempExamsDataWithPackage,
                        examsData: temp2DExamData,
                        SpinnerIcon: false
                    });
                }).catch(error => {
                    // console.log('error',error.response.data.data);
                });
                // console.log('examData: ',this.state.examsData);
            }).catch(error => {
                // console.log('error',error.response.data.data);
            });
        });




    }
    goToSDetail = (id) => {
        // this.props.navigator.push({
        //     screen: 'MetaLifeDetailScreen',
        //     title: 'جزییات محصول',
        //     navigatorStyle: {
        //         navBarTextFontFamily: 'iranyekanwebregular',
        //         navBarTextColor: '#707070'
        //     },
        //     passProps: {
        //         itemID: id,
        //     },
        // })
        alert(id);
    };
    goToExamPackageDetail = (id) => {
        // alert(id);
        this.props.navigator.push({
            screen: 'ExamsScreen',
            title: 'محصولات بسته آزمون',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070'
            },
            passProps: {
                itemID: id,
            },
        })
    };
    addToShoppingCard = (id) => {
        AsyncStorage.getItem('token').then((value) => {
            axios.post('/Api/V1/shopping-bag',
                {
                    "count": 1,
                    "categories_exam_public_id": id
                },
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },

                }).then(response => {
                console.log('response',response);
                switch(response.data.check) {
                    case "user-type-forbidden":
                        alert("'شما قبلا این دوره رو خریداری نموده اید. اگر در ازمون مردود شده اید. خرید مجدد آزمون به تنهای امکان پذیر است.")
                        break;
                    case "require-begginer-nlp":
                        alert("کاربر گرامی پیش نیاز این دوره , گذراندن دوره مقدماتی ان.ال.پی  میباشد.");
                        break;
                    case "success-added":
                        alert("دوره با موفقیت به سبد خرید شما افزوده شد.");
                        break;
                    case "pass-previous-course":
                        alert("کاربر گرامی , بدلیل عدم گذراندن دوره‌های قبلی، امکان خرید این دوره میسر نمی‌باشد.");
                        break;
                    case "access-denied":
                        alert("شما مجاز به خرید سطح انتخابی نیستید.");
                        break;
                    case "4-month-pass-course":
                        alert("مشترک گرامی شما مجاز به خرید سطح جدید پس از گذشت ۴ ماه از خرید دوره فعلی هستید.");
                        break;
                    case "first-course":
                        alert("شما تنها مجاز به خرید اولین دوره میباشید.");
                        break;
                    case "product-course-buy":
                        alert("امکان خرید محصول تنها از طریق خرید دوره میسر میباشد.");
                        break;
                    case "exist-product":
                        alert("شما قبلا این محصول را خریداری نموده اید.");
                        break;
                    case "event-exist":
                        alert("شما قبلا این همایش را خریداری نموده اید.");
                        break;
                    case "exam-package-exist":
                        alert("بسته آزمون در سبد خرید موجود است.");
                        break;
                    case "exam-course-buy":
                        alert("امکان خرید آزمون تنها از طریق خرید دوره مربوطه میسر است. در صورت عدم قبولی در آزمون امکان خرید آزمون آن دوره به تنهایی وجود دارد.");
                        break;
                    case "exam-pass-succeeded":
                        alert("کاربر گرامی, شما قبلا آزمون مورد نظر را قبول شدید. امکان خرید آزمون انتخابی برای شما میسر نمیباشد.");
                        break;
                    case "exam-exist":
                        alert("آزمون در سبد خرید موجود است.");
                        break;
                    case "exist":
                        alert("آزمون در سبد خرید موجود است.");
                        break;
                    default:
                }
                if(response.data.data === true){
                    alert('بسته به سبد خرید افزوده گردید.')
                } else if(response.data.data === false) {
                    alert('بسته به دانلود ها افزوده گردید.')
                }

            }).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
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
            <Container>
                <Tabs tabContainerStyle={{elevation:0, height:100}}
                      tabBarUnderlineStyle={{ backgroundColor: '#FFF'}}>
                    <Tab heading={
                        <TabHeading style={{backgroundColor: '#665EFF'}}>
                            <Text style={styles.metaLife_tabHeadingTextStyle}>خودشناسی</Text>
                        </TabHeading>
                    }>
                        <Content style={{backgroundColor: '#F6F6F6'}}>
                            {
                                this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                            }
                            <List>
                                {
                                    this.state.examsDataWithPackage.map(
                                        (value, index) => {
                                            return (
                                                <ListItem onPress={ () => this.goToExamPackageDetail(value.id)} key={value.id} noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                                    <Row>
                                                        <Col size={20}>
                                                            <TouchableOpacity onPress={() => this.addToShoppingCard(value.id)}>
                                                                <Icon name="cart" style={{color: '#3497FD', marginLeft: 15}}/>
                                                            </TouchableOpacity>
                                                        </Col>
                                                        <Col size={80}>
                                                            <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 13, color: "#4A4A4A"}}>{value.title}</Text>
                                                            <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12, color: "#3497FD"}}>آزمون در این پکیج موجود است</Text>
                                                            <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12, color: "#4A4A4A"}}>{value.description.slice(0,20)}...</Text>
                                                            <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12, color: "#4A4A4A"}}>{value.price} تومان</Text>
                                                        </Col>
                                                    </Row>
                                                </ListItem>
                                            )
                                        }
                                    )
                                }

                            </List>
                        </Content>
                    </Tab>
                    <Tab heading={
                        <TabHeading style={{backgroundColor: '#665EFF'}}>
                            <Text style={styles.metaLife_tabHeadingTextStyle}>تکاورانه</Text>
                        </TabHeading>
                    }>
                        <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                            <Grid>
                                {
                                    this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                                }
                                {
                                    this.state.examsData.map(
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
                                                                                color: '#04E6B8',
                                                                                fontSize: 12,
                                                                                fontFamily: 'iranyekanwebregular',
                                                                                padding: 5}}>{value2.price} تومان </Text>
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
const styles = StyleSheet.create({
    metaLife_tabHeadingTextStyle: {
        color: '#FFF',
        fontSize: 17,
        fontFamily: 'iranyekanwebregular',
    }
});
export default ExamsWithTabs;
