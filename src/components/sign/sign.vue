<template>
    <div>
        <div v-if="signCover" class="sign-cover" @click="close">
            <div class="sign-box" @click.stop="func1()">
                <div class="title">
                    <div>{{GLOBAL.lanLocal['signin']}}</div>
                    <img   @click="close" :src="require('../../assets/me/close.png')" />
                </div>
                <div class="body">
                    <div class="left">
                        <div class="body-item" :class="{'signed': days >= 1, 'ready': days == 0 && !isSign}">
                            <div>{{GLOBAL.lanLocal['day']}} 1</div>
                            <img class="coin" :src="require('../../assets/me/coin.png')"/>
                            <div class="amount">{{signList.Sign1}}{{GLOBAL.currency}}</div>
                            <div class="signed-icon">
                                <img :src="require('../../assets/me/signed.png')"/>
                            </div>
                        </div>
                        <div class="body-item" :class="{'signed': days >= 2, 'ready': days == 1 && !isSign}">
                            <div>{{GLOBAL.lanLocal['day']}} 2</div>
                            <img class="coin" :src="require('../../assets/me/coin.png')"/>
                            <div class="amount">{{signList.Sign2}}{{GLOBAL.currency}}</div>
                            <div class="signed-icon">
                                <img :src="require('../../assets/me/signed.png')"/>
                            </div>
                        </div>
                        <div class="body-item" :class="{'signed': isSign >= 3, 'ready': days == 2 && !isSign}">
                            <div>{{GLOBAL.lanLocal['day']}} 3</div>
                            <img class="coin" :src="require('../../assets/me/coin.png')"/>
                            <div class="amount">{{signList.Sign3}}{{GLOBAL.currency}}</div>
                            <div class="signed-icon">
                                <img :src="require('../../assets/me/signed.png')"/>
                            </div>
                        </div>
                        <div class="body-item" :class="{'signed': isSign >= 4, 'ready': days == 3 && !isSign}" style="margin-top: 8px">
                            <div>{{GLOBAL.lanLocal['day']}} 4</div>
                            <img class="coin" :src="require('../../assets/me/coin.png')"/>
                            <div class="amount">{{signList.Sign4}}{{GLOBAL.currency}}</div>
                            <div class="signed-icon">
                                <img :src="require('../../assets/me/signed.png')"/>
                            </div>
                        </div>
                        <div class="body-item" :class="{'signed': isSign >= 5, 'ready': days == 4 && !isSign}" style="margin-top: 8px">
                            <div>{{GLOBAL.lanLocal['day']}} 5</div>
                            <img class="coin" :src="require('../../assets/me/coin.png')"/>
                            <div class="amount">{{signList.Sign5}}{{GLOBAL.currency}}</div>
                            <div class="signed-icon">
                                <img :src="require('../../assets/me/signed.png')"/>
                            </div>
                        </div>
                        <div class="body-item" :class="{'signed': isSign >= 6, 'ready': days == 5 && !isSign}" style="margin-top: 8px">
                            <div>{{GLOBAL.lanLocal['day']}} 6</div>
                            <img class="coin" :src="require('../../assets/me/coin.png')"/>
                            <div class="amount">{{signList.Sign6}}{{GLOBAL.currency}}</div>
                            <div class="signed-icon">
                                <img :src="require('../../assets/me/signed.png')"/>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="body-item" :class="{'signed': isSign >= 7, 'ready': days == 6 && !isSign}">
                            <div class="days">{{GLOBAL.lanLocal['day']}} 7</div>
                            <img class="coin" :src="require('../../assets/me/final.png')"/>
                            <div class="amount">{{signList.Sign7}}{{GLOBAL.currency}}</div>
                            <div class="signed-icon">
                                <img :src="require('../../assets/me/signed.png')"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn" :class="(canSign && !isSign) ? '': 'btn-disable'" @click="userSign">{{GLOBAL.lanLocal['signinnow']}}</div>
                <div class="desc">
                    <div class="rule">{{GLOBAL.lanLocal['signrule']}}:</div>
                    <div class="rules">{{GLOBAL.lanLocal['signcontent']}}</div>
                    <div class="rules">{{signcontent}}</div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
import { doPost } from '../../api/api.js'
import md5 from 'js-md5';
import decodeApiLan from '../../api/decodeApiLan.js'
  export default {
    name: "turntable",
    data() {
      return {
        signCover: false,
            signList: [],
            isSign: false,
            canSign: false,
            days: 1,
            signcontent: '',
      };
    },
    created(){
      this.getUserSign()
    },
    methods: {
        func1() {
        },
        getUserSign() {
            doPost({
                n: 'AppEx',
                a: 'get_user_sign',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                if (res.code === 0) {
                    this.signList = res.data.list
                    this.signcontent = this.GLOBAL.lanLocal['signcontent2'].replace("%d", this.signList.Recharge).replace("%s", this.signList.Score)
                    this.isSign = res.data.isSign
                    this.canSign = res.data.canSign
                    this.days = res.data.days
                    this.signCover = true
                }
            })
        },
        userSign() {
            if(this.canSign && !this.isSign)
            {
                doPost({
                n: 'AppEx',
                a: 'user_sign',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                if (res.code === 0) {
                    this.$toast.success(this.GLOBAL.lanLocal['signsuccess'], {
                            position: "top-center",
                            timeout: 2000,
                            closeOnClick: true,
                            pauseOnFocusLoss: true,
                            pauseOnHover: true,
                            draggable: true,
                            draggablePercent: 0.6,
                            showCloseButtonOnHover: false,
                            hideProgressBar: true,
                            closeButton: false,
                            icon: true,
                            rtl: false
                        });
                    this.getUserSign()
                    localStorage.setItem("only_data", 1)
                    this.$emit("reload")
                } else {
                        const data = decodeApiLan(res, this.GLOBAL.lanArr);
                        this.$toast.error(data.message, {
                            position: "top-center",
                            timeout: 2000,
                            closeOnClick: true,
                            pauseOnFocusLoss: true,
                            pauseOnHover: true,
                            draggable: true,
                            draggablePercent: 0.6,
                            showCloseButtonOnHover: false,
                            hideProgressBar: true,
                            closeButton: false,
                            icon: true,
                            rtl: false
                        });
                    }
            })
            }
            
        },
        close() {
            this.$emit("close", 0)
        },
    }
  };
  </script>
  
  <style lang="less" scoped>
  @media screen and (min-width: 950px) {
      .sign-cover {
        padding-left: 150px !important;
      }
  }
  .sign-cover {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      height: 100%;
      width: 100%;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      .sign-box {
          background: #fff;;
          width: 350px;
          border-radius: 16px;
          .title {
              height: 50px;
              line-height: 50px;
              background-color: rgb(255,174,46);
              border-top-left-radius: 16px;
              border-top-right-radius: 16px;
              position: relative;
              >div {
              height: 50px;
              line-height: 50px;
                  text-align: center;
                  font-size: 20px;
                  font-weight: 500;
                  color: #333;
              }
              >img {
                  position: absolute;
                  top: 15px;
                  right: 16px;
                  height:20px;
                  width: auto;
                  z-index: 1;
                  cursor: pointer;
              }
          }
          .body {
              padding: 16px 18px;
              display: flex;
              align-items: center;
              box-sizing: border-box;
              .left {
                  flex: 1;
                  display: flex;
                  align-items: center;
                  justify-content:space-between;
                  box-sizing: border-box;
                  flex-wrap: wrap;
                  .body-item {
                      padding-top: 4px;
                      width: 65px;
                      height: 80px;
                      background-color: rgb(229,210,255);
                      text-align: center;
                      font-size: 12px;
                      color: rgb(144,104,200);
                      border-radius: 10px;
                      box-sizing: border-box;
                      border-bottom: 3px solid rgb(198,169,239);
                      position:relative;
                      .coin {
                          padding-top: 4px;
                          height: 24px;
                          width:auto;
                      }
                      .amount {
                          font-size: 14px;
                          font-weight: 700;
                      }
                      .signed-icon {
                          display: none;
                          position: absolute;
                          top:0;
                          left: 0;
                          height: 100%;
                          width: 100%;
                          align-items:center;
                          justify-content:center;
                          >img {
                              margin-left: 3px;
                              margin-bottom: 3px;
                              height: 30px;
                              width:auto;
                          }
                      }
                  }
                  .signed, .ready {
                      color: #fff;
                      background-color: rgb(255,174,46);
                      border-bottom: 3px solid rgb(241,133,53);
                  }
                  .signed {
                      .signed-icon {
                          display: flex;
                      }
                  }
              }
              .right {
                  display: flex;
                  align-items: center;
                  justify-content:space-between;
                  box-sizing: border-box;
                  margin-left: 8px;
                  .body-item {
                      width: 98px;
                      height: 168px;
                      background-color: rgb(229,210,255);
                      border-radius: 10px;
                      box-sizing: border-box;
                      border-bottom: 3px solid rgb(198,169,239);
                      position:relative;
                      display: flex;
                      align-items:center;
                      justify-content:center;
                      .days {
                          text-align: center;
                          font-size: 12px;
                          color: rgb(144,104,200);
                          position: absolute;
                          top: 4px;
                          left: 0;
                          width: 100%;
                      }
                      .coin {
                          height: 65px;
                          width:auto;
                      }
                      .amount {
                          position: absolute;
                          bottom: 0;
                          left: 0;
                          width: 100%;
                          font-size: 14px;
                          font-weight: 700;
                          color: rgb(144,104,200);
                          text-align: center;
                      }
                      .signed-icon {
                          display: none;
                          position: absolute;
                          top:0;
                          left: 0;
                          height: 100%;
                          width: 100%;
                          align-items:center;
                          justify-content:center;
                          >img {
                              margin-left: 3px;
                              margin-bottom: 3px;
                              height: 70px;
                              width:auto;
                          }
                      }
                  }
                  .signed, .ready {
                      color: #fff;
                      background-color: rgb(255,174,46);
                      border-bottom: 3px solid rgb(241,133,53);
                  }
                  .signed {
                      .signed-icon {
                          display: flex;
                      }
                  }
              }
          }
          .btn {
            cursor: pointer;
              margin: 10px auto;
              height: 45px;
              line-height: 45px;
              width: 160px;
              text-align:center;
              border-radius: 10px;
              font-size: 18px;
              color: #000;
              font-weight: 500;
              background-color: rgb(255,174,46);
          }
          .btn-disable {
              opacity: 0.5;
          }
          .desc {
            text-align:left;
              margin: 0 18px;
              padding: 12px 0 18px;
              border-top: 1px solid #e6e6e6;
              color:rgb(94,76,72);
              .rules {
                  margin-top: 4px;
                  line-height: 16px;
              }
          }
      }
  }
  </style>