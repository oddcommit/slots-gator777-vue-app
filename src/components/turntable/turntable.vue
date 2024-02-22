<template>
    <div>
      <div class="turntable_masking" v-if="isNormalT">
            <div class="turntalbe-box">
                <img class="close" @click="changeNormalT" :src="require('../../assets/me/t_close.png')" />
                <img class="arrow" :src="require('../../assets/me/t_arrow.png')" />
                <img class="turntable-content" :class="turntableId > 0 ? 'turntable-content'+turntableId : ''" :src="require('../../assets/me/t_normal.png')" />
                <div class="num">{{normalCount}}/{{normalConfig.DayNum ? normalConfig.DayNum : 0}}</div>
                <div class="btn" :class="(this.loading || normalCount >= (normalConfig.DayNum ? normalConfig.DayNum : 0)) ? 'btn-disable' : ''" @click="turntable(1)" >{{GLOBAL.lanLocal['clicktoclaim']}}</div>
                <div class="rules">
                    <p style="margin-bottom: 6px;">{{GLOBAL.lanLocal['signrule']}}:</p>
                    <p style="font-size: 13px;">{{turntablecondition}}</p>
                </div>
            </div>
        </div>
        <div class="turntable_masking" v-if="isHightT">
            <div class="turntalbe-box">
                <img class="close" @click="changeHightT" :src="require('../../assets/me/t_close.png')" />
                <img class="arrow" :src="require('../../assets/me/hight_arrow.png')" />
                <img class="turntable-content" :class="turntableId > 0 ? 'turntable-content'+turntableId : ''" :src="require('../../assets/me/t_hight.png')" />
                <div class="num">{{normalCount}}/{{normalConfig.DayNum ? normalConfig.DayNum : 0}}</div>
                <div class="btn" :class="(this.loading || normalCount >= (normalConfig.DayNum ? normalConfig.DayNum : 0)) ? 'btn-disable' : ''" @click="turntable(2)" >{{GLOBAL.lanLocal['clicktoclaim']}}</div>
                <div class="rules">
                    <p style="margin-bottom: 6px;">{{GLOBAL.lanLocal['signrule']}}:</p>
                    <p style="font-size: 13px;">{{turntablecondition}}</p>
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
            isNormalT: false,
            turntableId: 0,
            normalCount: 0,
            normalConfig: [],
            turntablecondition: '',
            loading: false,
            isHightT: false,
      };
    },
    watch: {
        type: {
            immediate: true,
            handler(newValue, oldValue) {
              if(this.type == 1)
              {
                this.changeNormalT()
              }else if(this.type == 2)
              {
                this.changeHightT()
              }
            }
        },
    },
    props: {
        type: {
            type: Number,
            default: 0
        }
    },
    created(){
      
    },
    methods: {
      turntable(type) {
            if(this.normalCount >= this.normalConfig.DayNum || this.loading)
            {
                return ;
            }
            this.loading = true
            this.turntableId = 0;
            if(type == 1)
            {
                doPost({
                    n: 'AppEx',
                    a: 'receive_normal_turntable',
                    accountid: this.GLOBAL.userInfo.accountid
                }).then((res) => {
                    if (res.code === 0) {
                        let turntableId = res.data.id
                        let amount = res.data.amount
                        if(turntableId > 0)
                        {
                            this.turntableId = turntableId
                            this.normalCount ++
                            setTimeout(() => {
                                let content = this.GLOBAL.lanLocal['turntablesuccess'].replace("%d", amount)
                                this.$toast.success(content, {
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
                                this.loading = false
                                localStorage.setItem("only_data", 1)
                                this.$emit("reload")
                            }, 2500);
                        }
                    }
                })
            }else {
                doPost({
                    n: 'AppEx',
                    a: 'receive_hight_turntable',
                    accountid: this.GLOBAL.userInfo.accountid
                }).then((res) => {
                    if (res.code === 0) {
                        let turntableId = res.data.id
                        let amount = res.data.amount
                        if(turntableId > 0)
                        {
                            this.turntableId = turntableId
                            this.normalCount ++
                            setTimeout(() => {
                                let content = this.GLOBAL.lanLocal['turntablesuccess'].replace("%d", amount)
                                this.$toast.success(content, {
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
                                this.loading = false
                                localStorage.setItem("only_data", 1)
                                this.$emit("reload")
                            }, 2500);
                        }
                    }
                })
            }
        },
        changeNormalT() {
            this.turntableId = 0;
            if(!this.isNormalT)
            {
                doPost({
                    n: 'AppEx',
                    a: 'user_turntable',
                    accountid: this.GLOBAL.userInfo.accountid,
                    type: 1,
                }).then((res) => {
                    if (res.code === 0) {
                        this.normalCount = res.data.count
                        this.normalConfig = res.data.turntable
                        this.turntablecondition = this.GLOBAL.lanLocal['turntablecondition'].replace("%d", this.normalConfig.Recharge)
                        this.isNormalT = !this.isNormalT
                    }
                })
            }else {
                this.isNormalT = !this.isNormalT
                this.$emit("changeTurntable", 0)
            }
        },
        changeHightT() {
            this.turntableId = 0;
            if(!this.isHightT)
            {
                doPost({
                    n: 'AppEx',
                    a: 'user_turntable',
                    accountid: this.GLOBAL.userInfo.accountid,
                    type: 2,
                }).then((res) => {
                    if (res.code === 0) {
                        this.normalCount = res.data.count
                        this.normalConfig = res.data.turntable
                        this.turntablecondition = this.GLOBAL.lanLocal['turntablecondition'].replace("%d", this.normalConfig.Recharge)
                        this.isHightT = !this.isHightT
                    }
                })
            }else {
                this.isHightT = !this.isHightT
                this.$emit("changeTurntable", 0)
            }
        },
    }
  };
  </script>
  
  <style lang="less" scoped>
  @media screen and (min-width: 950px) {
      .turntable_masking {
          padding-left: 150px !important;
      }
  }

.turntable_masking {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    .turntalbe-box{
        max-height: 700px;
        position: relative;
        text-align:center;
        .close {
            cursor: pointer;
            position:absolute;
            top: -40px;
            right: 20px;
            height: 40px;
            width: auto;
        }
        .arrow {
            position:absolute;
            top: -11px;
            left: calc(50% - 28px);
            z-index: 1;
            width: 56px;
            height: auto;
        }
        .turntable-content {
            max-width: 500px;
            width: 98%;
            height: auto;
        }

        .turntable-content1 {
            animation: rotate1 2s ease-in-out;
            transform: rotate(720deg);
        }

        @keyframes rotate1 {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(720deg);
            }
        }

        .turntable-content2 {
            animation: rotate2 2s ease-in-out;
            transform: rotate(675deg);
        }

        @keyframes rotate2 {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(675deg);
            }
        }

        .turntable-content3 {
            animation: rotate3 2s ease-in-out;
            transform: rotate(630deg);
        }

        @keyframes rotate3 {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(630deg);
            }
        }

        .turntable-content4 {
            animation: rotate4 2s ease-in-out;
            transform: rotate(585deg);
        }

        @keyframes rotate4 {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(585deg);
            }
        }
        .num {
            font-size: 15px;
            color: #fff;
            text-align:center;
        }
        .btn {
            cursor: pointer;
            margin: 2px auto 0;
            width: 160px;
            padding: 8px 0;
            color:#333;
            font-size: 15px;
            background-color: rgb(255,175,46);
            border-radius: 8px;
            font-weight: 500;
        }
        .btn-disable {
            background-color: #8f6d37;
        }
        .rules {
            width:85%;
            background:#fff;
            border-radius: 8px;
            text-align: left;
            color: #333;
            font-size: 14px;
            line-height: 18px;
            margin: 20px auto 0;
            padding: 14px 16px;
            p {
                margin: 0;
            }
        }
    }
}
  </style>