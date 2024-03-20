import React from 'react';
import {Image, View} from 'react-native';
import  {Container, Content, List, ListItem, Text} from 'native-base';
class Fail extends React.Component {
    render() {
        return (
            <Container style={{backgroundColor: '#F6F6F6'}}>
                <Content>
                    <List>
                        <ListItem noBorder style={{backgroundColor: '#FFF', borderRadius: 10, margin: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{marginTop: 50}}>
                                <Image source={require('../../assets/images/Wrong/drawable-xhdpi/baseline-error-24px.png')} style={{width: 130, height: 130}}/>
                            </View>
                            <View syle={{marginTop: 20, marginBottom: 10}}>
                                <Text style={{color: '#F94E4E',fontFamily: 'iranyekanwebregular', fontSize: 20}}>متاسفیم</Text>
                            </View>
                            <View style={{padding: 30}}>
                                <Text style={{color: '#F94E4E',fontFamily: 'iranyekanwebregular', fontSize: 12, textAlign:'center'}}>شما موفق به قبولی در این آزمون نشده اید شما میتوانید فقط آزمون این دوره را دوباره خریداری کنید و آزمون را تکمیل کنید</Text>
                            </View>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}
export default Fail;