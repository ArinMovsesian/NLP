import React from 'react';
import {View, Text, TouchableOpacity, AsyncStorage,} from 'react-native';
import {Content, ListItem, List, Icon, Container, Card, CardItem, Body} from 'native-base';
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
class DownloadCertificate extends React.Component{
    state = {
      successPrivateExam: [],
    };
    componentDidMount(){
        let i;
        let tempSuccessPrivateExam = [];
        AsyncStorage.getItem('token').then((value) => {
            axios.get('/Api/V1/profile/download?type=download',
                {
                    headers: {
                        "uuid": "test-arin",
                        "token": value
                    },
                }).then(response => {
                console.log('response: ',response);
                for(i = 0; i < response.data.data.userExamInfo.length; i++) {
                    if(response.data.data.userExamInfo[i].participantsValue === 1) {
                        tempSuccessPrivateExam.push(response.data.data.userExamInfo[i]);
                    }
                }
                console.log('tempPr', tempSuccessPrivateExam);
                this.setState({
                    successPrivateExam: tempSuccessPrivateExam,
                })
            }).catch(error => {
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        });
    }
        downloadCertificate = (getUrl) => {
            // alert(123);
            let date = new Date();
            // var url       = "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3";
            // let url = "https://www.antennahouse.com/XSLsample/pdf/sample-link_1.pdf";
            let url = getUrl;
            let ext = this.extention(url);
            ext = "."+ext[0];
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            let options = {
                fileCache: true,
                addAndroidDownloads : {
                    useDownloadManager : true,
                    notification : true,
                    path:  PictureDir + "/ExamCertificate_"+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
                    // description : 'Image'
                }
            };
            config(options).fetch('GET', url).then((res) => {
                alert("مدرک شما با موفقیت دانلود شد.");
            });
        };
        extention = (filename) => {
            return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
        };
    render() {
        return(
          <Container>
           <Content>
               {
                   this.state.successPrivateExam.length == 0
                       ?
                       <Card>
                       <CardItem>
                           <Body>
                               <Text style={{fontFamily: "iranyekanwebregular",textAlign: 'right', fontSize: 15, width: '100%'}}>
                                  مدرکی وجود ندارد.
                               </Text>
                           </Body>
                       </CardItem>
                       </Card>
                       :
                       <List>
                           {
                               this.state.successPrivateExam.map(
                                   (value, index) => {
                                       return (
                                           <ListItem key={index} noBorder style={{ backgroundColor: "#F3F3F3", borderRadius: 10, flexDirection: 'row', justifyContent: 'flex-end', margin: 10}}>
                                               <View>
                                                   <Text style={{fontFamily: "iranyekanwebregular",color: '#4A4A4A', fontSize: 13, marginRight: 10}}>{value.title}</Text>
                                               </View>
                                               <TouchableOpacity style={{width: 56,
                                                   height: 56,
                                                   borderRadius: 56/2,
                                                   backgroundColor: '#3497FD',
                                                   justifyContent: 'center',
                                                   alignItems: 'center',
                                                   shadowOffset:{  width: 10,  height: 10,  },
                                                   shadowColor: 'black',
                                                   shadowOpacity: 1.0,}} onPress={() => this.downloadCertificate(value.participantsFile)}>
                                                   <Icon name='download'  style={{color: '#FFF'}}/>
                                               </TouchableOpacity>
                                           </ListItem>
                                       )
                                   }
                               )
                           }

                       </List>
               }


           </Content>
            </Container>
        );
    }
}
export default DownloadCertificate;