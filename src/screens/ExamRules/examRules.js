import React, {Component} from 'react';
import {Text, Image, View, AsyncStorage} from 'react-native';
import {Container, Content, Card, CardItem, Button, Body} from 'native-base';
import {Navigation} from "react-native-navigation";
class ExamRules extends Component {
    goToUserExamScreen = () => {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'UserExamScreen',
                title: 'آزمون',
                navigatorStyle: {
                    navBarHidden: true, // make the nav bar hidden
                },
            },
            appStyle: {
                orientation: 'portrait',
            },
            passProps: {
                itemID: this.props.itemID,
                shoppingID: this.props.shoppingID,
            },
        });
        // this.props.navigator.push({
        //     screen: 'UserExamScreen',
        //     title: 'آزمون',
        //     navigatorStyle: {
        //         navBarTextFontFamily: 'iranyekanwebregular',
        //         navBarTextColor: '#FFF',
        //         navBarBackgroundColor: '#F94E4E',
        //         topBarElevationShadowEnabled: false,
        //         navBarButtonColor: '#FFF',
        //     },
        //     passProps: {
        //         itemID: this.props.itemID,
        //         shoppingID: this.props.shoppingID,
        //     },
        // })
    };
    render() {
        return (
            <Container>
                <Content showsVerticalScrollIndicator={false}>
                    <Card>
                        <CardItem header style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                           <Image source={{uri: "https://png.icons8.com/metro/50/000000/rules.png"}} style={{width: 50, height: 50}}/>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={{
                                color: '#000',
                                fontSize: 12,
                                fontFamily: 'iranyekanwebregular', lineHeight: 25}}>

                                بلافاصله بعد از اتمام آزمون، نتیجه آزمون را به صورت قبولی یا عدم قبولی با پاسخ‌نامه مشاهده خواهید کرد.
                                هنگامی که در حال انجام آزمون هستید از کلید قبلی و بعدی استفاده کنید،‌ صفحه را Refresh نکنید و از دکمه‌های Back و Forward استفاده نکنید.
                                در صورتی که به هر دلیلی(قطعی اینترنت، خاموش شدن کامپیوتر و ...) آزمون ناتمام بماند. این آزمون به صورت انجام نشده در قسمت آزمون‌ها در پروفایل شما قرار می‌گیرد و شما می‌‌توانید مجدد آزمون را از اول شرکت کنید. هر آزمون حداکثر 3 مرتبه می‌تواند به صورت ناتمام انجام شود. در صورتی که بیش 3 مرتبه آزمون ناتمام انجام شود، شما باید مجددا آزمون را خریداری نمایید.
                                در صورت انجام آزمون و قبولی در آن شما کماکان به محتوای آن دوره در قسمت دانلودها دسترسی دارید و در صورتی که بعد از آزمون و قبولی شما در آن آزمون، به محتوای آن دوره چیزی اضافه شود، آن محتوا برای شما نیز در قسمت دانلودها قابل دسترسی می‌باشد.
                                5- آزمون نمره منفی ندارد.
                                بعد از اتمام سوالات حتما گزینه ثبت نهایی را کلیک کنید.
                                سوالات به صورت تصادفی از بانک سوالات مربوطه انتخاب می‌شود و آزمون هر فرد با دیگری متفاوت خواهد بود.
                                سوالات به صورت چندگزینه‌ای می‌باشد و گزینه‌های هر سوال در آزمون‌های مختلف جابجا می‌شود.
                                توصیه می‌شود از مرورگرهای فایرفاکس یا کروم برای انجام آزمون استفاده گردد.
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                            <Button onPress={this.goToUserExamScreen} info style={{paddingLeft: 10, paddingRight: 10, paddingTop:5, paddingBottom: 5, borderRadius: 5,}}>
                                <Text style={{
                                color: '#FFF',
                                fontSize: 13,
                                fontFamily: 'iranyekanwebregular'}}> قبول دارم </Text>
                            </Button>
                        </CardItem>
                    </Card>
                    {/*<Text>{this.props.itemID}</Text>*/}
                    {/*<Text>{this.props.shoppingID}</Text>*/}

                </Content>
            </Container>
        )
    }
}
export default ExamRules;