import React from 'react';
import {Image, View} from 'react-native';
import  {Container, Content, List, ListItem, Text} from 'native-base';
class Success extends React.Component {
    render() {
        return (
            <Container style={{backgroundColor: '#F6F6F6'}}>
                <Content>
                    <List>
                        <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{marginTop: 50}}>
                               <Image source={require('../../assets/images/Done/drawable-xhdpi/Group404.png')} style={{width: 130, height: 130}}/>
                            </View>
                            <View syle={{marginTop: 20, marginBottom: 10}}>
                                <Text style={{color: '#2FB500',fontFamily: 'iranyekanwebregular', fontSize: 20}}>تبریک</Text>
                            </View>
                            <View style={{padding: 30}}>
                                <Text style={{color: '#2FB500',fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign:'center'}}>تبریک، شما موفق به کسب نمره قبولی در این آزمون شدید. مدرک شما حسب نوع آن به آدرس پستی شما ارسال می‌گردد. در صورتی که مدرک الکترونیکی باشد میتوانید مدرک قبولی را از قسمت زیر دریافت نمایید همچنین این مدرک در منو-مدارک کسب شده هم قابل دسترس است.</Text>
                            </View>
                        </ListItem>
                        <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                           <Text>{}تعداد پاسخ های درست شما: </Text>
                        </ListItem>
                        <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Text>{}تعداد پاسخ های اشتباه شما: </Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}
export default Success;