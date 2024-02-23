<template>
    <div class="main-page">
        <div class="header-cover"></div>
        <div class="header">
            <img src="../../assets/vip/back.png" @click="close" />
            <div>{{ GLOBAL.lanLocal['vipbenefits'] }}</div>
        </div>
        <div class="content">
            <div class="vip-body">
                <div class="vip-pross">
                    <div class="pross-box">
                        <div class="vip-level">
                            <div>V{{ myVip }}</div>
                            <div>V{{ nextVip }}</div>
                        </div>
                        <div class="pross-title">
                            <div class="hd">{{ GLOBAL.lanLocal['topup'] }}</div>
                            <div class="ft">
                                <div class="pross-num">{{ rechargeAmount }}/{{ nextRechargeAmount }}</div>
                            </div>
                        </div>
                        <div class="pross-item">
                            <div :style="{ width: rechargePross + '%' }" class="pross-bg"></div>
                        </div>
                        <div class="pross-title" style="margin-top: 5px;">
                            <div class="hd">{{ GLOBAL.lanLocal['bet'] }}</div>
                            <div class="ft">
                                <div class="pross-num">{{ scoreAmount }}/{{ nextScoreAmount }}</div>
                            </div>
                        </div>
                        <div class="pross-item">
                            <div style="background-color: rgb(21,255,170);" :style="{ width: scorePross + '%' }"
                                class="pross-bg">
                            </div>
                        </div>
                    </div>
                    <div class="my-vip">
                        <img src="../../assets/vip/vip_icon.png" />
                        <div class="vip-num">{{ myVip }}</div>
                    </div>
                </div>
                <div class="slid">
                    <img src="../../assets/vip/slid.png" />
                </div>
                <div class="update-btn" @click="toDeposit">{{ GLOBAL.lanLocal['toupdate'] }}</div>
            </div>
            <div class="vip-body">
                <div class="benefits-title">{{ GLOBAL.lanLocal['vipbenefits'] }}</div>
                <div class="benefits-list">
                    <div class="benefits-item" :key="i + 1" @click="changeVip(i)" v-for="(item, i) in vipList">
                        <img class="vip-bg" src="../../assets/vip/vip_bg.png" />
                        <img class="vip-active" v-if="vipId == i" src="../../assets/vip/vip_bg_active.png" />
                        <div class="vip-num">{{ item.LevelID }}</div>
                    </div>
                </div>
            </div>

            <div class="amount-detail">
                <div class="detail-item vip-body">
                    <img src="../../assets/vip/draw.png" />
                    <div>
                        <div class="detail-title">{{ GLOBAL.lanLocal['totaldeposit'] }}</div>
                        <div class="detail-content">{{ vipDetail['Recharge'] }} {{ GLOBAL.currency }}</div>
                    </div>
                </div>
                <div class="detail-item vip-body">
                    <img src="../../assets/vip/score.png" />
                    <div>
                        <div class="detail-title">{{ GLOBAL.lanLocal['totalbet'] }}</div>
                        <div class="detail-content">{{ vipDetail['Score'] }} {{ GLOBAL.currency }}</div>
                    </div>
                </div>
            </div>
            <div class="vip-body">
                <div class="condition-title">{{ GLOBAL.lanLocal['withdrawalpermissions'] }}</div>
                <div class="condition-text">{{ GLOBAL.lanLocal['fee'] }}: {{ vipDetail['DrawRate'] }}</div>
                <div class="condition-text">{{ GLOBAL.lanLocal['withdrawallimit'] }}: {{ vipDetail['Draw'] }}
                    {{ GLOBAL.currency }}({{ GLOBAL.lanLocal['perrequest'] }})</div>
                <div class="condition-text">{{ GLOBAL.lanLocal['numberofwithdrawals'] }}: {{ vipDetail['DrawNum'] }}
                    {{ GLOBAL.lanLocal['timeday'] }}</div>
                <div class="condition-text" style="color: #ffd045" v-if="vipDetail['Bonus'] > 0">
                    {{ GLOBAL.lanLocal['promotionalbonus'] }}: {{ vipDetail['Bonus'] }} {{ GLOBAL.currency }}</div>

                <div class="condition-title" style="margin-top: 30px;">{{ GLOBAL.lanLocal['viprules'] }}</div>
                <div class="condition-text">{{ GLOBAL.lanLocal['rule1'] }}</div>
                <div class="condition-text">{{ GLOBAL.lanLocal['rule2'] }}</div>
                <div class="condition-text">{{ rule3 }}</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import md5 from 'js-md5';
import AES from "../../common/AES.js"
import { doPost } from '../../api/api.js'
export default {
    name: 'vip',
    data() {
        return {
            innerHeight: 0,
            vipList: [],
            scoreAmount: '0.00',
            rechargeAmount: '0.00',
            nextScoreAmount: '0.00',
            nextRechargeAmount: '0.00',
            myVip: '',
            nextVip: '',
            vipId: 0,
            vipDetail: [],
            nextVipDetail: [],
            scorePross: 0,
            rechargePross: 0,
            rule3: '',
        }
    },
    watch: {
    },
    props: {
    },
    computed: {
    },
    created() {
        this.innerHeight = window.innerHeight - 70
        this.getVipConfig()
        this.getVipDays()
    },
    methods: {
        getVipDays() {
            doPost({
                n: 'AppEx',
                a: 'get_vip_days',
            }).then((res) => {
                let rule3 = this.GLOBAL.lanLocal['rule3']
                let vipdays = res.data
                this.rule3 = rule3.replace("%d", vipdays)
            })
        },
        close() {
            this.$emit('close')
        },
        toDeposit() {
            this.$emit('toDeposit')
        },
        changeVip(i) {
            if (i != this.vipId) {
                this.vipId = i
                this.vipDetail = this.vipList[i]
            }
        },
        getVipConfig() {
            doPost({
                n: 'AppEx',
                a: 'get_vip_config',
                lan: this.GLOBAL.lanCode
            }).then((res) => {
                if (res.code === 0) {
                    this.vipList = res.data
                    this.vipDetail = this.vipList[0]
                    this.getUserVip()
                }
            })
        },
        getUserVip() {
            doPost({
                n: 'AppEx',
                a: 'get_user_vip',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                if (res.code === 0) {
                    let vip = Number(res.data.level)
                    let nextLevel = res.data.nextLevel
                    this.scoreAmount = Number(res.data.score).toFixed(2)
                    this.rechargeAmount = Number(res.data.charge).toFixed(2)
                    this.myVip = vip
                    if (vip < this.vipList.length) {
                        this.nextVip = nextLevel.LevelID
                        this.nextVipDetail = nextLevel
                        this.nextScoreAmount = Number(this.nextVipDetail.Score).toFixed(2)
                        this.nextRechargeAmount = Number(this.nextVipDetail.Recharge).toFixed(2)
                        this.scorePross = this.scoreAmount / this.nextScoreAmount * 100
                        this.rechargePross = this.rechargeAmount / this.nextRechargeAmount * 100
                    }
                }
            })
        },
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@media screen and (min-width: 950px) {
    .header {
        padding: 0 0 0 300px !important;

        >img {
            display: none;
        }
    }

    .header-cover {
        left: 300px !important;
        width: calc(100% - 300px) !important;
    }
}

.main-page::-webkit-scrollbar {
    width: 0;
}

.main-page {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    margin: 0 auto;

    .header-cover {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 997;
        height: 60px;
        width: 100%;
        // background-image: url("../../assets/index/bg.jpg");
        // background-size: 100% auto;
    }
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    height: 70px;
    line-height: 70px;
    width: 100%;
    max-width: 1250px;
    padding: 0 18px 0 12px;
    color: #fff;
    font-size: 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    >img {
        height: auto;
        width: 18px;
    }

    >div {
        flex: 1;
        text-align: center;
    }
}

.content {
    padding: 88px 12px;

    .vip-body {
        border-radius: 16px;
        background-color: #641BE9;
        padding: 20px 14px;
        box-sizing: border-box;
        margin-bottom: 20px;
    }

    .vip-pross {
        display: flex;
        align-items: center;
        justify-content: space-around;
        box-sizing: border-box;

        .my-vip,
        .next-vip {
            height: 112px;
            position: relative;

            img {
                height: 112px;
                width: 75px;
            }

            .vip-num {
                position: absolute;
                bottom: 11px;
                right: 33px;
                font-size: 18px;
                color: #fff;
            }
        }

        .vip-level {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-bottom: 6px;

            >div {
                font-size: 20px;
                color: #fff;
            }
        }

        .pross-box {
            flex: 1;
            width: 100%;
            margin: 0 16px;

            .pross-title {
                color: #fff;
                font-size: 11px;
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                padding: 0 8px 0 4px;
            }

            .pross-item {
                height: 8px;
                width: 100%;
                background-color: rgb(153,43,44);
                border-radius: 6px;
                position: relative;
            }

            .pross-bg {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                height: 8px;
                border-radius: 8px;
                background-color: rgb(249, 233, 59);
            }

            .pross-num {
                font-size: 10px;
                color: #fff;
                text-align: center;
            }
        }
    }

    .condition-title {
        text-align: left;
        font-size: 16px;
        color: #ffd045;
    }

    .condition-text {
        margin-top: 6px;
        color: #fff;
        font-size: 14px;
    }

    .slid {
        width: 100%;
        padding: 0 12px;
        height: auto;
        margin: 20px 0;
        box-sizing: border-box;

        img {
            width: 100%;
            height: auto;
        }
    }

    .update-btn {
        margin: 0 12px;
        background-image: linear-gradient(to bottom, rgba(251,239,181), rgba(217,173,108));
            color: rgb(140,36,43);
        height: 40px;
        line-height: 40px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        cursor: pointer;
    }

    .benefits-title {
        text-align: left;
        font-size: 16px;
        color: #fff;
    }

    .benefits-list {
        margin-top: 16px;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;

        .benefits-item {
            cursor: pointer;
            position: relative;
            height: 80px;
            margin-right: 18px;
            display: flex;
            align-items: center;
            justify-content: center;

            .vip-bg {
                height: 66px;
                width: 47px;
            }

            .vip-active {
                position: absolute;
                top: 7px;
                left: 0;
                z-index: 1;
                height: 63px;
                width: 47px;
                transform: scale(1.2);
            }

            .vip-num {
                position: absolute;
                bottom: 13px;
                font-size: 11px;
                color: #fff;
            }
        }

    }

    .benefits-list::-webkit-scrollbar {
        display: none;
    }

    .amount-detail {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .detail-item {
            width: 48%;
            display: flex;
            align-items: center;
            box-sizing: border-box;

            >img {
                height: 40px;
                width: auto;
            }

            >div {
                margin-left: 10px;

                .detail-title {
                    font-size: 14px;
                    color: #f6f6f6;
                }

                .detail-content {
                    font-size: 14px;
                    color: #ffd045;
                }
            }
        }
    }
}</style>
  