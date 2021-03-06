import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import {add_action, fetch_welfare_signup} from '../../action/index';
import {connect} from 'react-redux';
import {Color} from 'LocalReference';
import API from '../../services/API'


class Welfare extends Component {
  static navigationOptions = ({navigation}) => {
      // console.log(navigation);
       return {
        headerTitle: "福利",
        headerTintColor:Color.HSWhiteColor,
        tabBarVisible:false,
        headerStyle: { backgroundColor: Color.HSHeaderBgColor, elevation:0, borderBottomWidth: 0 },
        headerBackTitle: null,
       }
  }

  componentDidMount(){
    const {fetch_welfare_signup} = this.props;
    fetch_welfare_signup();
  }

  detailBtn(){
    this.props.navigation.navigate('Detail', { title: '下一页'})
  }

  signUpBtn(){
     this.props.navigation.navigate('SignUp', { title: '签到'})
  }

  //请求签到接口：
  getSignUpInfo(){
      console.log('进来了吗');
      fetch(API.welfare.signUp, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "baseInfo": {
                  "versionCode": 356,
                  "sign": "fbb4636f6f6f43467543609abacd8bc9",
                  "deviceCode": "fae64ac10908e06e1e53d52cfd9f2893",
                  "userId": "13365512366",
                  "platform": 2
              }
          })
      })
      .then((response) => response.json())
      .then((result) => {
              console.log('嘻嘻',result);
              if(result.resultCode == '0' && result.userTotal){
                     
              }
          })
          .catch((error) => {
              console.log("error = " + error)
          })
  }

  render() {
    const {count, addCount, fetch_welfare_signup} = this.props;
    let networkArry = [
        {
          uri:'connect_netSpeed',
          text:'网络测速'
        },
        {
          uri:'connect_netCheck',
          text:'网络诊断'
        },
        {
          uri:'connect_netDes',
          text:'网络流量'
        }
      ];
    let signDay = [1,2,3,4,5,6,7];
    return (
        <View style={{flex:1, backgroundColor: Color.HSHeaderBgColor}}>


      <ScrollView style={styles.bigBox}>
        <StatusBar
            backgroundColor={Color.HSHeaderBgColor}
            barStyle="light-content"
        />
        <View style={styles.bigBoxView}>
          <View style={styles.heightView}>
            <View style={styles.circleView}>

            </View>
          </View>

          <View style={styles.networkBox}>
              <View style={styles.networkTop}>
                <View style={styles.wifiView}>
                  <Image source={{uri: 'connect_success'}} style={{width:20,height:20}} />
                  <Text style={styles.connectText}>已连接XiaoMi-307</Text>
                </View>
                <Text style={styles.wifiColor}>点击切换地铁WiFi</Text>
              </View>
            <View style={{flexDirection:'row', marginTop:15}}>
            {
              networkArry.map((item,index)=>{
                  return(
                    <View key={index} style={styles.iconView}>
                        <Image source={{uri: item.uri}} style={{width:40, height:40}} />
                        <Text style={{fontSize:13, marginTop:8,color: Color.HSSix8Color}}>{item.text}</Text>
                    </View>
                  );
              })
            }
            </View>

            <View style={styles.netBottom}>
              <Text style={{flex:1, textAlign:'center', justifyContent:'center'}}>38.26G <Text style={{color: Color.HSSix6Color}}>已省流量</Text></Text>
              <Text style={{flex:1, textAlign:'center', justifyContent:'center'}}>1170元 <Text style={{color: Color.HSSix6Color}}>已省话费</Text></Text>
            </View>
          </View>

          {/* 签到 */}
          <View style={styles.signUp}>
              <View style={styles.signUpTop}>
                  <Text style={{marginLeft:15, color: Color.HSSix6Color}}>签到7天享KFC早餐优惠</Text>
                  <TouchableOpacity style={{flex:1,flexDirection:'row'}} onPress={()=>this.signUpBtn()}>
                      <Text style={{fontSize:13, flex:1, textAlign:'right', marginRight:5, color: Color.HSSixCColor}}>查看更多</Text>
                      <Image source={{uri:'arrowhead'}} style={{width:8,height:14, marginRight:15}}/>
                  </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', marginTop:15}}>
              {
                  signDay.map((item,index)=>{
                      return(
                          <View style={styles.daySign} key={index}>
                              <Text style={{fontSize:10, color: Color.HSSix9Color, marginBottom:5}}>第{item}天</Text>
                              <Image source={{uri:'current_go_sign'}} style={{width:30, height:35, resizeMode:Image.resizeMode.contain}}/>
                          </View>

                      );
                  })
              }
              </View>
          </View>

          {/* 花粉福利 */}
          <View style={styles.fangjinsuo}>
            <Image source={require('../../content/img/fjs.png')} style={{width:60, height:40, marginLeft:15, marginRight:20}}/>
            <Text style={{color:Color.HSSix9Color}}>贷款就找房金所</Text>
            <Text style={{color:Color.HSConnectTextColor, flex:1, textAlign:'right', marginRight:15}}>点击领取</Text>
          </View>



          <View style={styles.container}>
            <Text>查看数字：{count}</Text>
            <TouchableOpacity onPress={()=>addCount()} style={styles.addBtn}>
              <Text> +1 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.detailBtn()} style={styles.detailBtn}>
              <Text> 点击进入详情 </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <View>
                  <Text></Text>
                </View>
            </TouchableOpacity>   
          </View>
        </View>
        
      </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    bigBox:{
      flex:1,
      backgroundColor: Color.HSGrayBgColor,

    },
    container: {
       margin:150,
       alignItems:'center',
    },
    addBtn:{
       width:50,
       height:20,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor: 'orange',
    },
    detailBtn:{
      margin:50,
      width:100,
      height:40,
      justifyContent:'center',
       alignItems:'center',
       backgroundColor: 'yellowgreen',
    },
    networkBox:{
      width: Dimensions.get('window').width -30,
      height: 210,
      borderRadius: 6,
      backgroundColor:Color.HSWhiteColor,
        marginTop:-150
    },
    bigBoxView:{
      justifyContent:'center',
      alignItems:'center'
    },
    wifiView:{
      flexDirection: 'row',
        marginTop:25,
        justifyContent:'center',
        alignItems:'center'
    },
    connectText:{
        color: Color.HSConnectTextColor,
        fontSize:18,
        fontWeight:'600',
        marginLeft:5
    },
    networkTop:{
        justifyContent:'center',
        alignItems:'center',
    },
    wifiColor:{
        color: Color.HSSix9Color,
        fontSize:12,
        marginTop:5
    },
    iconView:{
        width: (Dimensions.get('window').width-30) /3,
        justifyContent:'center',
        alignItems:'center'
    },
    netBottom:{
        marginHorizontal:20,
        borderTopWidth:0.5,
        borderTopColor:Color.HSSixCColor,
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    circleView:{
        width:600,
        height:600,
        borderRadius:300,
        backgroundColor: Color.HSHeaderBgColor,
        top:-450,
    },
    heightView:{
        height:150,
        overflow:'hidden',
    },
    fangjinsuo:{
        width: Dimensions.get('window').width-30,
        height:60,
        backgroundColor: Color.HSWhiteColor,
        marginTop:15,
        borderRadius:6,
        flexDirection:'row',
        alignItems:'center'
    },
    signUp:{
        width: Dimensions.get('window').width-30,
        height:120,
        backgroundColor: Color.HSWhiteColor,
        marginTop:15,
        borderRadius:6,
        flexDirection:'column',
        paddingVertical:15
    },
    signUpTop:{
        flexDirection:'row',
    },
    daySign:{
        width: (Dimensions.get('window').width-30 )/7,
        justifyContent:'center',
        alignItems:'center',
    }
})

const mapStateToProps = (state) => ({
    count: state.addReducer.count,
    data: state.signReducer.data
})

const mapDispatchToProps = (dispatch) =>({
    addCount: ()=>{
      dispatch(add_action())
    },
    fetch_welfare_signup: ()=>{
        dispatch(fetch_welfare_signup())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Welfare);