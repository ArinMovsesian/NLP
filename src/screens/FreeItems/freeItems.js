import React from 'react';
import {View, Image, Text, AsyncStorage, TouchableOpacity} from 'react-native';
import {Container,Tabs,Tab,ScrollableTab,TabHeading, Content, Grid, Col, Row, Spinner} from 'native-base';
import axios from "axios";
import Exams from "../Exams/exams";
class FreeItems extends React.Component {
  state = {
      Books: [],
      Voices: [],
      Images: [],
      Events: [],
      Exams: [],
      SpinnerIcon: false,
      guestState: false,
      // SpinnerIcon: false,
  };
  componentDidMount() {
    this.setState({
        SpinnerIcon: true
    });
    let tempBooks = [];
    let temp2DBooks = [];
    let tempVoices = [];
    let temp2DVoices = [];
    let tempImages = [];
    let temp2DImages = [];
    let temp2DEvents = [];
    let temp2DExams = [];
    AsyncStorage.getItem('token').then((value) => {
        if(value === null) {
            this.setState({
                guestState: true
            })
        }
        axios.get('/Api/V1/free-all',
            {
                headers: {
                    "uuid": "test-arin",
                    "token": value
                },
            }).then(response => {
            // console.log('free-all response: ',response);
            for (let i = 0; i < response.data.product.length; i++) {
              if(response.data.product[i].categories_id === 1) {
                tempBooks.push(response.data.product[i]);
              }else if (response.data.product[i].categories_id === 2){
                tempVoices.push(response.data.product[i]);
              }else {
                tempImages.push(response.data.product[i]);
              }
            }
            //***** fill 2DBooks *****//
            for (let i = 0, k = -1; i < tempBooks.length; i++) {
                if (i % 2 === 0) {
                    k++;
                    temp2DBooks[k] = [];
                }
                temp2DBooks[k].push(tempBooks[i]);
            }
            //***** fill 2DBooks *****//



            //***** fill 2DVoices *****//
            for (let i = 0, k = -1; i < tempVoices.length; i++) {
                if (i % 2 === 0) {
                    k++;
                    temp2DVoices[k] = [];
                }
                temp2DVoices[k].push(tempVoices[i]);
            }
            //***** fill 2DVoices *****//


            //***** fill 2DImages *****//
            for (let i = 0, k = -1; i < tempImages.length; i++) {
                if (i % 2 === 0) {
                    k++;
                    temp2DImages[k] = [];
                }
                temp2DImages[k].push(tempImages[i]);
            }
            //***** fill 2DImages *****//

            //***** fill 2DEvents *****//
            for (let i = 0, k = -1; i < response.data.event.length; i++) {
                if (i % 2 === 0) {
                    k++;
                    temp2DEvents[k] = [];
                }
                temp2DEvents[k].push(response.data.event[i]);
            }
            //***** fill 2DEvents *****//


            //***** fill 2DExams *****//
            for (let i = 0, k = -1; i < response.data.exam.length; i++) {
                if (i % 2 === 0) {
                    k++;
                    temp2DExams[k] = [];
                }
                temp2DExams[k].push(response.data.exam[i]);
            }
            //***** fill 2DExams *****//

                console.log('tempBooks: ',temp2DBooks);
                console.log('tempVoices: ',temp2DVoices);
                console.log('tempImages: ',temp2DImages);
                console.log('tempImages: ',temp2DEvents);
                console.log('tempImages: ',temp2DExams);

                this.setState({
                  Books: temp2DBooks,
                  Voices: temp2DVoices,
                  Images: temp2DImages,
                  Events: temp2DEvents,
                  Exams: temp2DExams,
                  SpinnerIcon: false
                })
        }).catch(error => {
        });
    });



  };

  goToFreeItemsDetail = (id) => {
        this.props.navigator.push({
            screen: 'FreeItemsDetailScreen',
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
  goToFreeExamDetail = (id) => {
      this.props.navigator.push({
          screen: 'FreeExamDetailScreen',
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
  goToFreeEventDetail = (id) => {
      this.props.navigator.push({
          screen: 'FreeEventDetailScreen',
          title: 'جزییات رویداد',
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
          {
              this.state.guestState !== true
                  ?
                      <Tabs style={{marginRight: 10, marginLeft: 10}}
                        tabContainerStyle={{elevation:0}}
                        tabBarUnderlineStyle={{ backgroundColor: '#F94E4E', borderRadius: 5}}
                    >

                      <Tab heading={
                          <TabHeading style={{  backgroundColor: '#FFF'}}>
                              <Text style={{
                                  color: '#707070',
                                  fontSize: 15,
                                  fontFamily: 'iranyekanwebregular'}}>کتاب</Text>
                          </TabHeading>
                      }>
                          <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                              {
                                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                              }
                              <Grid>
                                  {
                                      this.state.Books.map(
                                          (value1, index1) => {
                                              return (
                                                  <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                      {
                                                          value1.map(
                                                              (value2, index2) => {

                                                                  return (
                                                                      <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                          <TouchableOpacity onPress={() => this.goToFreeItemsDetail(value2.id)} style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>

                                                                              <Image style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images}}/>
                                                                              <Text style={{
                                                                                  color: '#707070',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                              <Text style={{
                                                                                  color: '#04E6B8',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>رایگان</Text>

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

                      <Tab heading={
                          <TabHeading style={{  backgroundColor: '#FFF'}}>
                              <Text style={{
                                  color: '#707070',
                                  fontSize: 15,
                                  fontFamily: 'iranyekanwebregular'}}>صوت</Text>
                          </TabHeading>
                      }>
                          <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                              {
                                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                              }
                              <Grid>
                                  {
                                      this.state.Voices.map(
                                          (value1, index1) => {
                                              return (
                                                  <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                      {
                                                          value1.map(
                                                              (value2, index2) => {

                                                                  return (
                                                                      <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                          <TouchableOpacity onPress={() => this.goToFreeItemsDetail(value2.id)} style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>
                                                                              <Image resizeMode='contain' style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images}}/>
                                                                              <Text style={{
                                                                                  color: '#707070',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                              <Text style={{
                                                                                  color: '#04E6B8',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>رایگان</Text>
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

                      <Tab heading={
                          <TabHeading style={{  backgroundColor: '#FFF'}}>
                              <Text style={{
                                  color: '#707070',
                                  fontSize: 15,
                                  fontFamily: 'iranyekanwebregular'}}>فیلم</Text>
                          </TabHeading>
                      }>
                          <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                              {
                                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                              }
                              <Grid>
                                  {
                                      this.state.Images.map(
                                          (value1, index1) => {
                                              return (
                                                  <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                      {
                                                          value1.map(
                                                              (value2, index2) => {

                                                                  return (
                                                                      <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                          <TouchableOpacity onPress={() => this.goToFreeItemsDetail(value2.id)} style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>
                                                                              <Image style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images}}/>
                                                                              <Text style={{
                                                                                  color: '#707070',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                              <Text style={{
                                                                                  color: '#04E6B8',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>رایگان</Text>
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
                      <Tab heading={
                          <TabHeading style={{  backgroundColor: '#FFF'}}>
                              <Text style={{
                                  color: '#707070',
                                  fontSize: 15,
                                  fontFamily: 'iranyekanwebregular'}}>آزمون</Text>
                          </TabHeading>
                      }>
                          <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                              {
                                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                              }
                              <Grid>
                                  {
                                      this.state.Exams.map(
                                          (value1, index1) => {
                                              return (
                                                  <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                      {
                                                          value1.map(
                                                              (value2, index2) => {

                                                                  return (
                                                                      <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                          <TouchableOpacity onPress={() => this.goToFreeExamDetail(value2.id)} style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>
                                                                              <Image style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.image}}/>
                                                                              <Text style={{
                                                                                  color: '#707070',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                              <Text style={{
                                                                                  color: '#04E6B8',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>رایگان</Text>
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

                      <Tab heading={
                          <TabHeading style={{  backgroundColor: '#FFF'}}>
                              <Text style={{
                                  color: '#707070',
                                  fontSize: 15,
                                  fontFamily: 'iranyekanwebregular'}}>سمینار</Text>
                          </TabHeading>
                      }>
                          <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                              {
                                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                              }
                              <Grid>
                                  {
                                      this.state.Events.map(
                                          (value1, index1) => {
                                              return (
                                                  <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                      {
                                                          value1.map(
                                                              (value2, index2) => {

                                                                  return (
                                                                      <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                          <TouchableOpacity onPress={() => this.goToFreeEventDetail(value2.id)} style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>
                                                                              <Image style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images}}/>
                                                                              <Text style={{
                                                                                  color: '#707070',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                              <Text style={{
                                                                                  color: '#04E6B8',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>رایگان</Text>
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
                  :
                      <Tabs style={{marginRight: 10, marginLeft: 10}}
                        tabContainerStyle={{elevation:0}}
                        tabBarUnderlineStyle={{ backgroundColor: '#F94E4E', borderRadius: 5}}
                  >
                      <Tab heading={
                          <TabHeading style={{  backgroundColor: '#FFF'}}>
                              <Text style={{
                                  color: '#707070',
                                  fontSize: 15,
                                  fontFamily: 'iranyekanwebregular'}}>کتاب</Text>
                          </TabHeading>
                      }>
                          <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                              {
                                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                              }
                              <Grid>
                                  {
                                      this.state.Books.map(
                                          (value1, index1) => {
                                              return (
                                                  <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                      {
                                                          value1.map(
                                                              (value2, index2) => {

                                                                  return (
                                                                      <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                          <TouchableOpacity onPress={() => this.goToFreeItemsDetail(value2.id)} style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>

                                                                              <Image style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images}}/>
                                                                              <Text style={{
                                                                                  color: '#707070',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                              <Text style={{
                                                                                  color: '#04E6B8',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>رایگان</Text>

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

                      <Tab heading={
                          <TabHeading style={{  backgroundColor: '#FFF'}}>
                              <Text style={{
                                  color: '#707070',
                                  fontSize: 15,
                                  fontFamily: 'iranyekanwebregular'}}>صوت</Text>
                          </TabHeading>
                      }>
                          <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                              {
                                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                              }
                              <Grid>
                                  {
                                      this.state.Voices.map(
                                          (value1, index1) => {
                                              return (
                                                  <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                      {
                                                          value1.map(
                                                              (value2, index2) => {

                                                                  return (
                                                                      <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                          <TouchableOpacity onPress={() => this.goToFreeItemsDetail(value2.id)} style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>
                                                                              <Image resizeMode='contain' style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images}}/>
                                                                              <Text style={{
                                                                                  color: '#707070',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                              <Text style={{
                                                                                  color: '#04E6B8',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>رایگان</Text>
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

                      <Tab heading={
                          <TabHeading style={{  backgroundColor: '#FFF'}}>
                              <Text style={{
                                  color: '#707070',
                                  fontSize: 15,
                                  fontFamily: 'iranyekanwebregular'}}>فیلم</Text>
                          </TabHeading>
                      }>
                          <Content style={{backgroundColor: '#F6F6F6'}} showsVerticalScrollIndicator={false}>
                              {
                                  this.state.SpinnerIcon === true ? <Spinner color='blue' /> : null
                              }
                              <Grid>
                                  {
                                      this.state.Images.map(
                                          (value1, index1) => {
                                              return (
                                                  <Row style={{marginTop: 5, marginBottom: 5}} key={index1}>
                                                      {
                                                          value1.map(
                                                              (value2, index2) => {

                                                                  return (
                                                                      <Col style={{alignItems: 'flex-start', padding: 5, width: '50%'}} key={index2}>
                                                                          <TouchableOpacity onPress={() => this.goToFreeItemsDetail(value2.id)} style={{width: '100%', backgroundColor: '#FFF', borderRadius: 10,}}>
                                                                              <Image style={{width: '100%', height: 163.53, borderRadius: 10}} source={{uri: value2.images}}/>
                                                                              <Text style={{
                                                                                  color: '#707070',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>{value2.title.slice(0,15)}...</Text>
                                                                              <Text style={{
                                                                                  color: '#04E6B8',
                                                                                  fontSize: 12,
                                                                                  fontFamily: 'iranyekanwebregular',
                                                                                  padding: 5}}>رایگان</Text>
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
          }


      </Container>
    )
  }
}
export default FreeItems
