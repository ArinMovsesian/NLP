import React from 'react';
import {AsyncStorage, Linking, Text, TextInput} from 'react-native';
import {Container, Content,Item,Label,Input,Form,Button,Toast, ListItem, Body, List, Right, Left, View, Spinner} from 'native-base';
import axios from "axios";
import {Navigation} from "react-native-navigation";
let mobile = '';
let address = '';
let desc = '';
class BusinessCoaching extends React.Component{
    state = {
        getMobile: '',
        getAddress: '',
        getDesc: ''
    };
    constructor(props){
        super(props);
        // AsyncStorage.setItem('downloadToken', JSON.stringify([1,2,3]));
    }
    componentDidMount() {

       AsyncStorage.getItem('downloadToken').then(
           (value) => {
               console.log(JSON.parse(value));
           }
       )


    }
    testis = (name) => {
        console.log(name);
        AsyncStorage.getItem('downloadToken').then(
            (value) => {
               if(value === null) {
                   console.log('in if');
                   let test = [];
                   test.push(name);
                   AsyncStorage.setItem('downloadToken', JSON.stringify(test));
                   AsyncStorage.getItem('downloadToken').then(
                       (value) => {
                           console.log(value);
                       }
                   )
               }else{
                   console.log('else if');
                   AsyncStorage.getItem('downloadToken').then(
                       (value) => {
                           let test = JSON.parse(value);
                           test.push(name);
                           AsyncStorage.setItem('downloadToken', JSON.stringify(test));
                       }
                   )
               }
            }
        );





    };
    BCPhone = (value) => {
        this.setState({
            getMobile: value,
        })
    };
    BCAddress = (value) => {
        this.setState({
            getAddress: value,
        })
    };
    BCDesc = (value) => {
        this.setState({
            getDesc: value,
        })
    };
    submitBCForm = () => {
        if(this.state.getMobile === '' || this.state.getAddress === '' || this.state.getDesc === '') {
           alert('همه فیلدها پر شود.')
        }else {
            AsyncStorage.getItem('token').then((value) => {
                axios.post('/Api/V1/businessCoaching',
                    {
                        "address": this.state.getAddress,
                        "mobile": this.state.getMobile,
                        "description": this.state.getDesc
                    },
                    {
                        headers: {
                            "uuid": "test-arin",
                            "token": value
                        },

                    }).then(response => {
                    console.log('response',response);
                    alert('با موفقیت ارسال گردید.');
                    this.setState({
                        getMobile: '',
                        getAddress: '',
                        getDesc: ''
                    })
                }).catch(error => {
                    console.log('error',error.response.data.data);
                    alert('خطا در ارسال');
                });
            });
        }
    };
    render() {
        return (
            <Container>
                <Content style={{backgroundColor: '#F6F6F6'}}>
                    <Form style={{padding: 20, backgroundColor: '#FFF', margin: 20, borderRadius: 7}}>
                        <Item stackedLabel style={{marginBottom: 40, borderBottomWidth: 0}}>
                            <Label style={{textAlign: 'right',width: '100%', fontFamily: 'iranyekanwebregular'}}>شماره تماس</Label>
                            {/*<Input style={{backgroundColor: 'red',width: '100%'}} value={this.state.getMobile} onChangeText={this.BCPhone}/>*/}
                            <TextInput style={{width: '100%',fontFamily: 'iranyekanwebregular'}} value={this.state.getMobile} onChangeText={this.BCPhone}/>
                        </Item>
                        <Item stackedLabel style={{marginBottom: 40, borderBottomWidth: 0}}>
                            <Label style={{textAlign: 'right',width: '100%', fontFamily: 'iranyekanwebregular'}}>آدرس</Label>
                            <TextInput style={{width: '100%',fontFamily: 'iranyekanwebregular'}} value={this.state.getAddress} onChangeText={this.BCAddress}/>
                            {/*<Input style={{padding: 0, height: 0}} value={this.state.getAddress} onChangeText={this.BCAddress}/>*/}
                        </Item>
                        <Item stackedLabel style={{marginBottom: 40, borderBottomWidth: 0}}>
                            <Label style={{textAlign: 'right',width: '100%', fontFamily: 'iranyekanwebregular'}}>توضیحات</Label>
                            <TextInput style={{width: '100%',fontFamily: 'iranyekanwebregular'}} value={this.state.getDesc} onChangeText={this.BCDesc}/>
                            {/*<Input style={{padding: 0, height: 0}} value={this.state.getDesc} onChangeText={this.BCDesc}/>*/}
                        </Item>
                    </Form>

                </Content>
                <Button full light style={{backgroundColor: '#04E6B8', position: 'absolute', width: '100%',height: 57,bottom: 0}} onPress={this.submitBCForm}>
                    <Text style={{fontFamily: 'iranyekanwebregular', fontSize: 12, color: '#FFF'}}>تایید</Text>
                </Button>
            </Container>
        )
    }
}
export default BusinessCoaching;