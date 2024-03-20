import React from 'react';
import {View, Text, Linking, AsyncStorage} from 'react-native';
import {
    Body,
    Container,
    Content,
    Input,
    Item,
    List,
    ListItem,
    Form,
    Button,
    Grid,
    Col,
    Row,
    Spinner,
    Label,
    CardItem,
    Card,
    Right,
    Icon
} from 'native-base';
class Test extends React.Component{

    render() {
        return (
            <Container>
                <Content>


                    <Form>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                    </Form>








                </Content>
                <Button full info>
                    <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12, color: '#FFF'}}>پرداخت</Text>
                </Button>
            </Container>
        )
    }
}
export default Test;