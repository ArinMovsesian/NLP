import {Navigation} from 'react-native-navigation';
import {AsyncStorage} from 'react-native';
import Main from './src/screens/Main/main';
import Auth from './src/screens/LoginAndRegister/auth';
import Home from './src/screens/home/home';
import Drawer from './src/screens/home/drawer';
import OtpRegistration from './src/screens/OTP/otpRegistration';
import OtpLogin from './src/screens/OTP/otpLogin';
import EditProfile from './src/screens/EditProfile/editProfile';
import MetaLife from './src/screens/MetaLife/metaLife';
import MetaLifeDetail from './src/screens/MetaLife/metaLifeDetail';
import FreeItems from './src/screens/FreeItems/freeItems';
import FreeItemsDetail from './src/screens/FreeItems/freeItemsDetail';
import Products from './src/screens/Products/products';
import ProductsDetail from './src/screens/Products/productsDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import OfferItems from './src/screens/OfferItems/offerItems';
import OfferItemsDetail from './src/screens/OfferItems/offerItemsDetail';
import Events from './src/screens/Events/events';
import EventsDetail from './src/screens/Events/eventsDetail';

import Exams from './src/screens/Exams/exams';
import ExamsWithTabs from './src/screens/Exams/examsWithTabs';
import ShoppingCard from './src/screens/ShoppingCard/shoppingCard';
import UserExam from './src/screens/userExam/userExam';
import ExamResult from './src/screens/ExamResult/examResult';
import NLP from './src/screens/NLP/nlp';
import NLPDetail from "./src/screens/NLP/nlpDetail";
import productsSeeAll from './src/screens/Products/productsSeeAll';

import Success from './src/screens/ExamResult/success';
import Fail from './src/screens/ExamResult/fail';
import Download from "./src/screens/download/download";
import ExamDetail from "./src/screens/Exams/examDetail";
import Period from "./src/screens/Period/period";
import PeriodDetail from "./src/screens/Period/periodDetail";
import FAQ from "./src/screens/FAQ/FAQ";
import ClubOfMind from "./src/screens/ClubOfMind/clubOfMind";
import Wallet from "./src/screens/Wallet/wallet";
import ExamRules from "./src/screens/ExamRules/examRules";
import FreeExamDetail from "./src/screens/FreeItems/freeExamDetail";
import FreeEventDetail from "./src/screens/FreeItems/freeEventDetail";
import DownloadCertificate from "./src/screens/Exams/donwloadCertificate";
//****************** Redux Configration ****************/
import configureStore from './src/store/configureStore';
import {Provider} from 'react-redux';
import Test from "./src/screens/Test/test";
import BusinessCoaching from "./src/screens/BusinessCoaching/businessCoaching";









const store = configureStore();
//****************** Redux Configration ****************/
// register all screens of the app (including internal ones)
Navigation.registerComponent('MainScreen', () => Main);
Navigation.registerComponent('AuthScreen', () => Auth);
Navigation.registerComponent('HomeScreen', () => Home);
Navigation.registerComponent('DrawerScreen', () => Drawer);
Navigation.registerComponent('OtpRegistrationScreen', () => OtpRegistration);
Navigation.registerComponent('OtpLoginScreen', () => OtpLogin);
Navigation.registerComponent('EditProfileScreen', () => EditProfile);
Navigation.registerComponent('MetaLifeScreen', () => MetaLife);
Navigation.registerComponent('MetaLifeDetailScreen', () => MetaLifeDetail);
Navigation.registerComponent('FreeItemsScreen', () => FreeItems);
Navigation.registerComponent('FreeItemsDetailScreen', () => FreeItemsDetail);
Navigation.registerComponent('ProductsScreen', () => Products);
Navigation.registerComponent('ProductsDetailScreen', () => ProductsDetail);
Navigation.registerComponent('OfferItemsScreen', () => OfferItems);
Navigation.registerComponent('OfferItemsDetailScreen', () => OfferItemsDetail);
Navigation.registerComponent('EventsScreen', () => Events);
Navigation.registerComponent('EventsDetailScreen', () => EventsDetail);
Navigation.registerComponent('ExamsScreen', () => Exams);
Navigation.registerComponent('ExamsWithTabsScreen', () => ExamsWithTabs);
Navigation.registerComponent('ShoppingCardScreen', () => ShoppingCard);
Navigation.registerComponent('UserExamScreen', () => UserExam);
Navigation.registerComponent('ExamResultScreen', () => ExamResult);
Navigation.registerComponent('ExamDetailScreen', () => ExamDetail);
Navigation.registerComponent('NLPScreen', () => NLP);
Navigation.registerComponent('NLPDetailScreen', () => NLPDetail);
Navigation.registerComponent('productsSeeAllScreen', () => productsSeeAll);
Navigation.registerComponent('SuccessScreen', () => Success);
Navigation.registerComponent('FailScreen', () => Fail);
Navigation.registerComponent('DownloadScreen', () => Download);
Navigation.registerComponent('PeriodScreen', () => Period);
Navigation.registerComponent('PeriodDetailScreen', () => PeriodDetail);
Navigation.registerComponent('FAQScreen', () => FAQ);
Navigation.registerComponent('ClubOfMindScreen', () => ClubOfMind);
Navigation.registerComponent('WalletScreen', () => Wallet);
Navigation.registerComponent('ExamRulesScreen', () => ExamRules);
Navigation.registerComponent('FreeExamDetailScreen', () => FreeExamDetail);
Navigation.registerComponent('FreeEventDetailScreen', () => FreeEventDetail);
Navigation.registerComponent('DownloadCertificateScreen', () => DownloadCertificate);
Navigation.registerComponent('businessCoachingScreen', () => BusinessCoaching);

Navigation.registerComponent('TEST', () => Test);
// start the app
const startScreen = () => {
    AsyncStorage.getItem('token').then((value) => {
        if(value === null) {
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'MainScreen',
                    title: 'Main',
                    navigatorStyle: {
                        navBarHidden: true, // make the nav bar hidden
                    },
                },
                appStyle: {
                    orientation: 'portrait',
                },
            });
        }else {
            Promise.all([
                Icon.getImageSource('bars', 30, '#000'),
            ]).then( source => {
                    Navigation.startSingleScreenApp({
                        screen: {
                            screen: 'HomeScreen',
                            title: 'NLP Life',
                            navigatorStyle: {
                                navBarHidden: false, // make the nav bar hidden
                            },
                            navigatorButtons: {
                                rightButtons: [
                                    {
                                        icon: source[0],
                                        //title: 'menu',
                                        id: 'sideDrawerBtn'
                                    }
                                ]
                            }
                        },
                        drawer: { // optional, add this if you want a side menu drawer in your app
                            right: { // optional, define if you want a drawer from the left
                                screen: 'DrawerScreen', // unique ID registered with Navigation.registerScreen
                            },
                        },
                        appStyle: {
                            orientation: 'portrait',
                            navBarTitleTextCentered: true,
                            navBarTextColor: '#A5A5A5'
                        },
                    });

            });

        }
    });
    // Navigation.startSingleScreenApp({
    //     screen: {
    //         screen: 'MainScreen',
    //         title: 'Main',
    //         navigatorStyle: {
    //             navBarHidden: true, // make the nav bar hidden,
    //         },
    //     },
    //     appStyle: {
    //         orientation: 'portrait',
    //     },
    // });

};
startScreen();
