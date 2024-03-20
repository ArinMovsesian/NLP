import React from 'react';
import {View, Text, ScrollView, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import {Container,Left,Content,Right,Body,Header, Spinner} from 'native-base';
import axios from "axios";
class Products extends React.Component {
  state = {
      writingProducts: [],
      audioProducts: [],
      videoProducts: [],
      SpinnerIcon: false,
  };
  componentDidMount() {
      this.setState({
          SpinnerIcon: true,
      });
      AsyncStorage.getItem('token').then((value) => {
          let tempWritingProducts = [];
          let tempAudioProducts = [];
          let tempVideoProducts = [];
          axios.get('/Api/V1/product',
              {
                  headers: {
                      "uuid": "test-arin",
                      "token": value
                  },
              }).then(response => {
              console.log('response',response);
              for (let i = 0 ; i < response.data.data.length; i++) {
                  if (response.data.data[i].categories_id === 1) {
                        tempWritingProducts.push(response.data.data[i]);
                  }else if (response.data.data[i].categories_id === 2){
                      tempAudioProducts.push(response.data.data[i]);
                  } else {
                      tempVideoProducts.push(response.data.data[i]);
                  }
              }
              this.setState({
                  writingProducts: tempWritingProducts,
                  audioProducts: tempAudioProducts,
                  videoProducts: tempVideoProducts,
                  SpinnerIcon: false,
              })
          }).catch(error => {
              console.log('error',error.response.data.data);
          });
      });

  }
  goToProductsDetail = (id) => {
        this.props.navigator.push({
            screen: 'ProductsDetailScreen',
            title: 'جزییات محصول',
            navigatorStyle: {
                navBarTextFontFamily: 'iranyekanwebregular',
                navBarTextColor: '#707070'
            },
            passProps: {
                itemID: id,
            },
        })
        // alert(id);
  };
  goToSeeAllProducts = (index, Title) => {
      this.props.navigator.push({
          screen: 'productsSeeAllScreen',
          title: Title,
          navigatorStyle: {
              navBarTextFontFamily: 'iranyekanwebregular',
              navBarTextColor: '#707070',
              // navBarBackgroundColor: '#665EFF',
              navBarButtonColor: '#707070'
              // topBarElevationShadowEnabled: false
          },
          passProps: {
              itemID: index,
          },
      })
          // alert(index);
  };
  render() {
    return (
      <Container>
      <Content style={{backgroundColor: '#F6F6F6'}}>
          <Header style={{backgroundColor: "#F6F6F6"}}>

              <Left><Text style={{
                          color: '#3497FD',
                          fontSize: 14,
                          fontFamily: 'iranyekanwebregular'}} onPress={() => this.goToSeeAllProducts(1, 'محصولات نوشتاری')}>دیدن همه</Text></Left>

              <Right><Text style={{
                          color: '#707070',
                          fontSize: 14,
                          fontFamily: 'iranyekanwebregular'}}>محصولات نوشتاری</Text></Right>
          </Header>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
              }
              {
                  this.state.writingProducts.map(
                      (value, index) => {
                          return (
                              <TouchableOpacity onPress={() => this.goToProductsDetail(value.id)} key={value.id} style={{width: 130, margin: 5, borderRadius: 5, backgroundColor: '#FFF'}}>

                                      <Image style={{width: '100%', height: 130, borderRadius: 10}} source={{uri: value.images === '' ? 'http://via.placeholder.com/350x150': value.images}}/>
                                      <Text style={{
                                          color: '#707070',
                                          fontSize: 12,
                                          fontFamily: 'iranyekanwebregular',
                                          padding: 5}}>{value.title.slice(0,15)}...</Text>

                                      <Text style={{
                                          color: '#707070',
                                          fontSize: 11,
                                          fontFamily: 'iranyekanwebregular',
                                          padding: 5}}>{value.price} تومان </Text>

                              </TouchableOpacity>
                          )
                      }
                  )
              }
          </ScrollView>

          <Header style={{backgroundColor: "#F6F6F6"}}>

              <Left><Text style={{
                          color: '#3497FD',
                          fontSize: 14,
                          fontFamily: 'iranyekanwebregular'}} onPress={() => this.goToSeeAllProducts(2, 'محصولات صوتی')}>دیدن همه</Text></Left>

              <Right><Text style={{
                          color: '#707070',
                          fontSize: 14,
                          fontFamily: 'iranyekanwebregular'}}>محصولات صوتی</Text></Right>
          </Header>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
              }
              {
                  this.state.audioProducts.map(
                      (value, index) => {
                          return (
                              <TouchableOpacity onPress={() => this.goToProductsDetail(value.id)} key={value.id} style={{width: 130, margin: 5, borderRadius: 5, backgroundColor: '#FFF'}}>
                                  <Image style={{width: '100%', height: 130, borderRadius: 10}} source={{uri: value.images === '' ? 'http://via.placeholder.com/350x150': value.images}}/>
                                  <Text style={{
                                      color: '#707070',
                                      fontSize: 12,
                                      fontFamily: 'iranyekanwebregular',
                                      padding: 5}}>{value.title.slice(0,15)}...</Text>

                                  <Text style={{
                                      color: '#707070',
                                      fontSize: 11,
                                      fontFamily: 'iranyekanwebregular',
                                      padding: 5}}>{value.price} تومان </Text>
                              </TouchableOpacity>
                          )
                      }
                  )
              }
          </ScrollView>

          <Header style={{backgroundColor: "#F6F6F6"}}>

              <Left><Text style={{
                          color: '#3497FD',
                          fontSize: 14,
                          fontFamily: 'iranyekanwebregular'}} onPress={() => this.goToSeeAllProducts(3, 'محصولات تصویری')}>دیدن همه</Text></Left>

              <Right><Text style={{
                          color: '#707070',
                          fontSize: 14,
                          fontFamily: 'iranyekanwebregular'}}>محصولات تصویری</Text></Right>
          </Header>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
              }
              {
                  this.state.videoProducts.map(
                      (value, index) => {
                          return (
                              <TouchableOpacity onPress={() => this.goToProductsDetail(value.id)} key={value.id} style={{width: 130, margin: 5, borderRadius: 5, backgroundColor: '#FFF'}}>
                                  <Image style={{width: '100%', height: 130, borderRadius: 10}} source={{uri: value.images === '' ? 'http://via.placeholder.com/350x150': value.images}}/>
                                  <Text style={{
                                      color: '#707070',
                                      fontSize: 12,
                                      fontFamily: 'iranyekanwebregular',
                                      padding: 5}}>{value.title.slice(0,15)}...</Text>

                                  <Text style={{
                                      color: '#707070',
                                      fontSize: 11,
                                      fontFamily: 'iranyekanwebregular',
                                      padding: 5}}>{value.price} تومان </Text>
                              </TouchableOpacity>
                          )
                      }
                  )
              }
          </ScrollView>
          </Content>
      </Container>
    )
  }
}
export default Products
