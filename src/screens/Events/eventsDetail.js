import React from 'react';
import {Image,AsyncStorage} from 'react-native';
import {Container,Spinner,Grid,Col,Row, Header, Content, Accordion, Icon, View, Text, Button, List, ListItem, Left, Right, Body} from 'native-base';
import axios from "axios";
// const dataArray = [
//     { title: "همایش متالایف و افق‌های نو", content: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با" },
// ];
class EventsDetail extends React.Component {
    state = {
        SpinnerIcon: false,
        // SpinnerIcon: false,
        dataArray: [
            {
                title: '',
                content: ''
            },
        ],
        Images: undefined,
        Time: undefined,
        Address: undefined,
        proID: undefined,
        EventUserTypeInfo: [],
    };
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.setState({
            SpinnerIcon: true
        });
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/event/' + this.props.itemID,
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },

                }).then(response => {
                console.log('response: ',response);
                        this.setState({
                            SpinnerIcon: false,
                            dataArray: [
                                {
                                    title: response.data.data.eventInfo.title,
                                    content: response.data.data.eventInfo.description
                                }
                            ],
                            Images: response.data.data.eventInfo.images,
                            Time: response.data.data.eventInfo.time,
                            Address: response.data.data.eventInfo.address,
                            proID: response.data.data.eventInfo.id,
                            EventUserTypeInfo: response.data.data.eventUserTypeInfo,
                        });

            }).catch(error => {
                console.log('error',error.response.data.data);
            });
        });
    }
    _renderHeader = (dataArray, expanded) => {
        return (
            <View
                style={{ flexDirection: "row", paddingTop: 10, paddingBottom:  10, justifyContent: "space-between", backgroundColor: "#FFF",}}
            >
                {
                    expanded
                        ? <Icon style={{ fontSize: 30, color: '#707070' }} name="arrow-dropdown" />
                        : <Icon style={{ fontSize: 30, color: '#707070' }} name="arrow-dropup" />
                }


                <Text style={{fontFamily: "iranyekanwebregular",color: '#4A4A4A', fontSize: 13}}>
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
    addToShoppingCard = () => {
        AsyncStorage.getItem('token').then((value) => {
            axios.post('/Api/V1/shopping-bag',
                {
                    "count": 1,
                    "event_id": this.state.proID
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
                    switch(error.response.data.check) {
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
                    console.log(error.response.headers);
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
                <View>
                    <Image resizeMode='contain' source={{uri: this.state.Images}} style={{height: 200}}/>
                </View>
                <Content padder>
                    <Accordion
                        dataArray={this.state.dataArray}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        style={{borderWidth: 0}}
                    />
                    {/* <Text>{this.state.Title}</Text> */}
                    {
                        this.state.EventUserTypeInfo.map(
                            (value, index) => {
                                return (
                                    <Button full primary style={{borderRadius: 5, marginTop: 10}} key={value.id}>
                                        <View style={{ width: '100%', flexDirection: "row", padding: 10, justifyContent: "space-between"}}>
                                            <Text style={{color: '#FFF', fontFamily: 'iranyekanwebregular'}}>{value.price} تومان </Text>
                                            <Text style={{color: '#FFF', fontFamily: 'iranyekanwebregular'}}>{value.user_type_title}</Text>
                                        </View>
                                    </Button>
                                )
                            }
                        )
                    }
                    <Text style={{color: '#8D8D8D', fontFamily: 'iranyekanwebregular', marginTop: 10, marginBottom: 10}}>مشخصات محصول</Text>
                    <List>
                        <ListItem noIndent style={{ backgroundColor: "#F3F3F3", borderRadius: 5, marginTop: 10 ,borderBottomWidth: 0}}>
                            <Grid>
                                <Col size={80}>
                                    <Text style={{color: '#8D8D8D', fontFamily: 'iranyekanwebregular',borderRightWidth: 1, borderRightColor: "#E8E8E8", fontSize: 12, paddingRight: 20}}>{this.state.Time}</Text>
                                </Col>
                                <Col size={20}>
                                    <Text style={{color: '#8D8D8D', fontFamily: 'iranyekanwebregular', fontSize: 12}}> زمان: </Text>
                                </Col>
                            </Grid>
                        </ListItem>
                        <ListItem noIndent style={{ backgroundColor: "#F3F3F3", borderRadius: 5, marginTop: 10, borderBottomWidth: 0 }}>
                            <Grid>
                                <Col size={80}>
                                    <Text style={{color: '#8D8D8D', fontFamily: 'iranyekanwebregular',borderRightWidth: 1, borderRightColor: "#E8E8E8", fontSize: 12, paddingRight: 20}}>{this.state.Address}</Text>
                                </Col>
                                <Col size={20}>
                                    <Text style={{color: '#8D8D8D', fontFamily: 'iranyekanwebregular', fontSize: 12}}> آدرس: </Text>
                                </Col>
                            </Grid>
                        </ListItem>
                    </List>
                </Content>
                <Button full danger onPress={this.addToShoppingCard}>
                    <Text style={{color: '#FFF', fontFamily: 'iranyekanwebregular'}}>ثبت نام دوره</Text>
                </Button>
            </Container>
        )
    }
}
export default EventsDetail;