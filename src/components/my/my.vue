<template>
    <div class="main-page">
        <div class="header-cover"></div>
        <div class="content">
            <div>
                <div style="padding: 0 4px;">
                    <!-- <div class="info-box">
                        <img class="avatar" src="../../assets/me/default.png" />
                        <div class="user-info">
                            <div class="nickname"><span>{{ GLOBAL.userInfo.name }}</span></div>
                            <div class="username">{{ GLOBAL.lanLocal['id'] }}:{{ GLOBAL.userInfo.accountid }}</div>
                        </div>
                        <div class="my-auto info-ft" v-if="this.GLOBAL.userInfo.name">
                            <div class="vip-box" @click="toVip">
                                <img src="../../assets/vip/vip_icon.png" />
                                <div class="vip-num">{{ vip }}</div>
                            </div>
                        </div>
                    </div> -->
                    <div class="data">
                        <div class="user-info">
                            <img class="avatar" src="../../assets/me/default.png" />
                            <div class="name-info">
                                <div class="nickname"><span>{{ GLOBAL.userInfo.nickname }}</span></div>
                                <div class="username"><span>{{ GLOBAL.lanLocal['id'] }}:{{ GLOBAL.userInfo.accountid
                                }}</span>
                                </div>
                            </div>
                            <div class="vip-box" @click="toVip">
                                <img src="../../assets/me/vip.png" />
                                <div class="vip-num">{{ vip }}</div>
                            </div>
                        </div>
                        <div class="data-item">
                            <img class="slid" src="../../assets/me/slid.png" />
                            <div class="title">{{ GLOBAL.lanLocal['amount'] }}</div>
                            <div class="data-content">
                                <div class="data-num">{{ GLOBAL.currencySymbol }} {{ amount }}</div>
                            </div>
                            <div class="withdraw-progress">
                                <div class="title">{{ GLOBAL.lanLocal['unlockwithdraw'] }}</div>
                                <div class="progress-bg">
                                    <div class="progress-data">{{ withdrawProgress }}%</div>
                                    <div :style="{ 'width': withdrawProgress + '%' }" class="progress"></div>
                                </div>
                                <div class="progress-tips">{{ GLOBAL.lanLocal['unlockwithdrawtips'] }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="tab">
                        <div class="tab-item" v-for="(item, index) in tab" @click="toTab(index)">
                            <img class="bg" :src="require('../../assets/me/tab-bg.png')" />
                            <img class="cover-img" :src="item.img" />
                            <div class="cover-text">{{ item.text }}</div>
                        </div>
                    </div> -->
                    <div class="menu">
                        <div class="menu-item" @click="toTab(0)">
                            <img class="icon" :src="require('../../assets/me/sign.png')" />
                            <div>{{ GLOBAL.lanLocal['signin'] }}</div>
                            <img class="arrow" :src="require('../../assets/me/arrow.png')" />
                        </div>
                        <div class="menu-item" @click="toTab(1)">
                            <img class="icon" :src="require('../../assets/me/turntable.png')" />
                            <div>{{ GLOBAL.lanLocal['turntable'] }}</div>
                            <img class="arrow" :src="require('../../assets/me/arrow.png')" />
                        </div>
                        <div class="menu-item" @click="toTab(2)">
                            <img class="icon" :src="require('../../assets/me/turntable2.png')" />
                            <div>{{ GLOBAL.lanLocal['advancedturntable'] }}</div>
                            <img class="arrow" :src="require('../../assets/me/arrow.png')" />
                        </div>
                        <div class="menu-item" @click="changeRecordsModal">
                            <img class="icon" :src="require('../../assets/me/deal.png')" />
                            <div>{{ GLOBAL.lanLocal['transactionrecord'] }}</div>
                            <img class="arrow" :src="require('../../assets/me/arrow.png')" />
                        </div>
                        <div class="menu-item" @click="toGameRecord">
                            <img class="icon" :src="require('../../assets/me/game.png')" />
                            <div>{{ GLOBAL.lanLocal['gamelog'] }}</div>
                            <img class="arrow" :src="require('../../assets/me/arrow.png')" />
                        </div>
                        <div class="menu-item" @click="toForgot">
                            <img class="icon" :src="require('../../assets/me/lock.png')" />
                            <div>{{ GLOBAL.lanLocal['changepassword'] }}</div>
                            <img class="arrow" :src="require('../../assets/me/arrow.png')" />
                        </div>
                    </div>
                    <div @click="logout" class="logout">{{ GLOBAL.lanLocal['logout'] }}</div>
                </div>
            </div>
        </div>
        <div class="records-masking" v-show="showRecordsModal" @click="changeRecordsModal">
            <div class="records-modal" @click.stop="func1()">
                <div class="records-top">
                    <img @click="changeRecordsModal" :src="require('../../assets/close.png')" />
                </div>
                <div class="records-title">
                    <div :class="{ 'active': recordType == 1 }" @click="changeRecordType(1)">{{
                        GLOBAL.lanLocal['rechargerecord'] }}</div>
                    <div :class="{ 'active': recordType == 2 }" @click="changeRecordType(2)">{{
                        GLOBAL.lanLocal['withdrawalsrecord'] }}</div>
                </div>
                <div class="records-table" v-if="recordType == 1">
                    <div class="table-title">
                        <div>ID</div>
                        <div>{{ GLOBAL.lanLocal['rewardamount'] }}</div>
                        <div>{{ GLOBAL.lanLocal['status'] }}</div>
                        <div style="width: 40%;">{{ GLOBAL.lanLocal['time'] }}</div>
                    </div>
                    <div class="table-item" v-for="(item, index) in payList"
                        :class="index == 0 || index % 2 == 0 ? 'multi' : ''">
                        <div>{{ index + 1 }}</div>
                        <div class="amount" :class="index == 0 || index % 2 == 0 ? 'multi' : ''">{{ item.TotalFee }}</div>
                        <div class="status"
                            :class="{ 'multi': index == 0 || index % 2 == 0, 'status_suc': item.Status == 1 }">
                            {{ item.StatusDesc }}</div>
                        <div style="width: 40%;" :class="index == 0 || index % 2 == 0 ? 'multi' : ''">{{ item.UpdateTime }}
                        </div>
                    </div>
                </div>
                <div class="records-table" v-else>
                    <div class="table-title">
                        <div>ID</div>
                        <div>{{ GLOBAL.lanLocal['rewardamount'] }}</div>
                        <div>{{ GLOBAL.lanLocal['status'] }}</div>
                        <div style="width: 40%;">{{ GLOBAL.lanLocal['time'] }}</div>
                    </div>
                    <div class="table-item" v-for="(item, index) in drawList"
                        :class="index == 0 || index % 2 == 0 ? 'multi' : ''">
                        <div>{{ index + 1 }}</div>
                        <div class="amount" :class="index == 0 || index % 2 == 0 ? 'multi' : ''">{{ item.Money }}</div>
                        <div class="status"
                            :class="{ 'multi': index == 0 || index % 2 == 0, 'status_suc': item.Status == 1 }">
                            {{ item.StatusDesc }}</div>
                        <div style="width: 40%;" :class="index == 0 || index % 2 == 0 ? 'multi' : ''">{{ item.PayTime }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Sign v-if="signCover" @reload="reload" @close="changeSign"></Sign>
        <Turntable v-if="turntableType > 0" @reload="reload" @changeTurntable="changeTurntable" :type="turntableType">
        </Turntable>
    </div>
</template>
  
<script>
import Clipboard from 'clipboard'
import { doPost } from '../../api/api.js'
import md5 from 'js-md5';
import decodeApiLan from '../../api/decodeApiLan.js'
import Turntable from '../turntable/turntable.vue'
import Sign from '../sign/sign.vue'
export default {
    name: 'my',
    components: { Turntable, Sign },
    data() {
        return {
            showRecordsModal: false,
            money: '',
            moneyfocus: false,
            innerHeight: 0,
            tabIndex: 0,
            shareUrl: '',
            qrcodeUrl: '',
            vip: '',
            tab: [
                { "img": require('../../assets/me/sign.png'), "text": this.GLOBAL.lanLocal['signin'] },
                { "img": require('../../assets/me/turntable.png'), "text": this.GLOBAL.lanLocal['turntable'] },
                { "img": require('../../assets/me/turntable2.png'), "text": this.GLOBAL.lanLocal['advancedturntable'] }
            ],
            payList: [],
            drawList: [],
            recordType: 1,
            turntableType: 0,
            signCover: false,
            withdrawProgress: 0
        }
    },
    watch: {
        amount: {
            immediate: true,
            handler(newValue, oldValue) {
            }
        },
    },
    props: {
        amount: {
            type: String,
            default: '0.00'
        }
    },
    computed: {
        loginClass() {
            return {
                'v-label-active': this.moneyfocus
            }
        },
    },
    created() {
        this.innerHeight = window.innerHeight - 130
        this.getUserVip()
        this.getWithdrawProgress()
    },
    methods: {
        toGameRecord() {
            this.$emit("gameRecord")
        },
        getWithdrawProgress() {
            doPost({
                n: 'AppEx',
                a: 'get_user_draw_progress',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                if (res.code === 0) {
                    this.withdrawProgress = res.data
                }
            })
        },
        reload() {
            this.$emit("reload")
        },
        changeTurntable(type) {
            this.turntableType = type
        },
        changeRecordType(type) {
            if (type != this.recordType) {
                this.recordType = type
            }
        },
        changeRecordsModal() {
            this.showRecordsModal = !this.showRecordsModal
            if (this.showRecordsModal) {
                this.getPayList()
                this.getDrawList()
            }
        },
        toTab(i) {
            if (i == 0) {
                this.changeSign()
            } else if (i == 1) {
                this.changeTurntable(1)
            } else if (i == 2) {
                this.changeTurntable(2)
            }
        },
        func1() {
        },
        toVip() {
            this.$emit("vip")
        },
        getPayList() {
            doPost({
                n: 'AppDraw',
                a: 'draw_pay_list',
                accountid: this.GLOBAL.userInfo.accountid,
                Status: -1,
                Page: 1,
                PageSize: 999,
            }).then((res) => {
                if (res.code === 0) {
                    let result = decodeApiLan(res, this.GLOBAL.lanArr);
                    this.payList = result.data
                }
            })
        },
        getDrawList() {
            doPost({
                n: 'AppDraw',
                a: 'draw_money_list',
                accountid: this.GLOBAL.userInfo.accountid,
                Status: -1,
                Page: 1,
                PageSize: 999,
            }).then((res) => {
                if (res.code === 0) {
                    let result = decodeApiLan(res, this.GLOBAL.lanArr);
                    this.drawList = result.data
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
                    let vip = res.data.level
                    this.vip = vip
                }
            })
        },
        changeSign() {
            this.signCover = !this.signCover;
        },
        logout() {
            this.$emit("logout")
        },
        toForgot() {
            localStorage.setItem("back", 4)
            this.$emit("forgot")
        },
        toEmail() {
            this.$emit("email")
        },
        copy() {
            var clipboard = new Clipboard('.login-button')
            clipboard.on('success', e => {
                this.$toast.success(this.GLOBAL.lanLocal['copysuccess'], {
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
                clipboard.destroy()
            })
            clipboard.on('error', e => {

                this.$toast.error('ระบบไม่รองรับการทำซ้ำ', {
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
                clipboard.destroy()
            })
        },
        close() {
            this.$emit('close')
        },
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@media screen and (min-width: 950px) {
    .tab-item {
        max-width: 200px !important;

        .cover-text {
            font-size: 18px !important;
        }
    }

    .records-masking {
        padding-left: 150px;
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
    padding: 60px 14px 100px;
    box-sizing: border-box;
    position: relative;
    text-align: left;
    margin: 0 auto;

    .header-cover {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
        height: 60px;
        width: 100%;
        background-image: url("../../assets/index/bg.jpg");
        background-size: 100% auto;
    }

}

.login-page {
    height: 100%;
    width: 100%;
    background-color: #000;
}

.login-logo {
    padding-top: 2rem;
    text-align: center;
}

.login-logo-img {
    width: 250px;
    height: 250px;
}

.button-box {
    margin-top: 24px;
}

.login-info-item {
    text-align: left;
    background: rgb(44, 52, 62);
    height: 40px;
    border-radius: 6px;
    position: relative;
    display: flex;
    align-items: center;
}

.v-label {
    position: absolute;
    left: 20px;
    font-size: 16px;
    top: 17px;
    height: 20px;
    line-height: 20px;
    letter-spacing: normal;
    -webkit-animation: v-shake .6s cubic-bezier(.25, .8, .5, 1);
    animation: v-shake .6s cubic-bezier(.25, .8, .5, 1);
    transform-origin: top left;
}

.v-box {
    padding: 0 10px;
    width: 100%;
}

.v-input {
    width: 100%;
    color: #fff;
    background: transparent;
    border: 0;
    font-size: 16px;
    height: 20px;
    line-height: 20px;
    letter-spacing: normal;
}

.login-info-item input:focus {
    outline: none;
}

.msg-box {
    min-height: 20px;
    overflow: hidden;
    margin: 0 40px 8px 40px;
    position: relative;
}

.login-info-message {
    min-height: 14px;
    padding: 0 12px;
    color: #fff;
    line-height: 12px;
    word-break: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    font-size: 12px;
    text-align: left;
}

.forget-passcode {
    word-break: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    font-size: 14px;
    position: absolute;
    right: 1.5rem;
    bottom: 0;
    color: #fff;
}

.error-info {
    color: #dd2c00 !important;
    caret-color: #dd2c00 !important;
}

.normal-info {
    color: #1976d2 !important;
    caret-color: #1976d2 !important;
}

.theme-dark {
    color: #fff;
}

.v-label-active {
    transform: translateY(-10px) scale(.75);
}

.logout-img {
    width: 30px;
    height: 30px;
    -o-object-fit: contain;
    object-fit: contain;
}

@-webkit-keyframes v-shake {
    59% {
        margin-left: 0
    }

    60%,
    80% {
        margin-left: 2px
    }

    70%,
    90% {
        margin-left: -2px
    }
}

@keyframes v-shake {
    59% {
        margin-left: 0
    }

    60%,
    80% {
        margin-left: 2px
    }

    70%,
    90% {
        margin-left: -2px
    }
}

.login-button {
    background-color: unset;
    background-image: url('../../assets/copy-btn.png');
    background-size: 100% 100%;
    color: #212121 !important;
    font-weight: 400;
    box-shadow: unset;
    height: 44px;
    padding: 0 19.5555555556px;
    width: 100%;
    font-size: 13px !important;
    letter-spacing: 0 !important;
    transition: all .2s cubic-bezier(.02, .54, .58, 1);
    border: none;
    font-family: Noto Sans Thai;
    padding: 0 20px;
    text-align: center;
}

.button-color1 {
    background: linear-gradient(180deg, #8be0ff, #009dd8) !important;
}

.login-button-disable {
    background-color: hsla(0, 0%, 100%, .12) !important;
    text-shadow: 0 0 #000;
    opacity: .5 !important;
    color: hsla(0, 0%, 100%, .3) !important;
}

.page-title {
    padding: 1rem 24px;
    font-weight: 500;
    font-size: 30px;
    color: #fff;
    position: relative;
    text-align: left;
    margin-left: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title-img {
        width: 30px;
        aspect-ratio: auto 30 / 30;
        height: 30px;
    }

    .close {
        .v-icon {
            align-items: center;
            display: inline-flex;
            font-feature-settings: "liga";
            font-size: 24px;
            justify-content: center;
            letter-spacing: normal;
            line-height: 1;
            position: relative;
            text-indent: 0;
            transition: .3s cubic-bezier(.25, .8, .5, 1), visibility 0s;
            vertical-align: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    }
}

.v-tab:before {
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0.24;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: .3s cubic-bezier(.25, .8, .5, 1);
}

.page-tab {
    display: flex;
    justify-content: space-around;
    flex: 1 0 auto;
    position: relative;
    transition: .3s cubic-bezier(.25, .8, .5, 1);
    white-space: nowrap;
    color: hsla(0, 0%, 100%, .6);

    .tab-item {
        align-items: center;
        cursor: pointer;
        display: flex;
        flex: 0 1 auto;
        font-size: .875rem;
        font-weight: 500;
        justify-content: center;
        letter-spacing: .0892857143em;
        line-height: normal;
        min-width: 90px;
        outline: none;
        padding: 0 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        transition: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        white-space: normal;
        border-bottom: 1px solid #000;

        .tab-img {
            width: 30px;
            aspect-ratio: auto 30 / 30;
            height: 30px;
            margin-right: 8px !important;
        }
    }
}

.tab-active {
    color: #ffe66f !important;
    border-bottom: 1px solid #ffe66f !important;
}

.container {
    width: 100%;
    margin-top: 24px;
    margin-right: auto;
    margin-left: auto;
}

.alert-show {
    padding: 0.5rem;
    text-align: center;
    background: #948741;
    border: 1px solid #ffe247;
    box-sizing: border-box;
    border-radius: 3px;
    max-width: 360px;
    width: 100%;
    margin: auto;
    color: #fff;
}

.profile-content {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;

    .item-container {
        display: flex;

        .item {
            color: #fff;
            position: relative;
            font-weight: 700;
            font-size: 18px;
            border-radius: 30px;
            margin: 2px;
            padding: 5px 0.5rem 5px 1.5rem;
            margin-right: 0.5rem;

            .item-img {
                position: absolute;
                top: 50%;
                left: 5px;
                width: 30px;
                height: 30px;
                -o-object-fit: contain;
                object-fit: contain;
                transform: translate(-50%, -50%);
                filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .658));
            }

            .v-btn {
                background: none !important;
                box-shadow: none !important;
                width: 20px;
                height: 20px;
                font-size: .875rem;
                color: #fff;
                align-items: center;
                border: none;
                display: inline-flex;
                flex: 0 0 auto;
                font-weight: 500;
                letter-spacing: .0892857143em;
                justify-content: center;
                outline: 0;
                position: relative;
                text-decoration: none;
                text-indent: 0.0892857143em;
                text-transform: uppercase;
                transition-duration: .28s;
                transition-property: box-shadow, transform, opacity;
                transition-timing-function: cubic-bezier(.4, 0, .2, 1);
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                vertical-align: middle;
                white-space: nowrap;
            }

            .v-btn:before {
                background-color: currentColor;
                border-radius: inherit;
                bottom: 0;
                color: inherit;
                content: "";
                left: 0;
                opacity: 0;
                pointer-events: none;
                position: absolute;
                right: 0;
                top: 0;
                transition: opacity .2s cubic-bezier(.4, 0, .6, 1);
            }

            .v-btn:hover:before {
                opacity: .08;
            }

            .v-btn__content {
                align-items: center;
                color: inherit;
                display: flex;
                flex: 1 0 auto;
                justify-content: inherit;
                line-height: normal;
                position: relative;
                transition: inherit;
                transition-property: opacity;

                .v-icon {
                    color: #fff;
                    font-size: 18px;
                    height: 24px;
                    width: 24px;
                    align-items: center;
                    display: inline-flex;
                    font-feature-settings: "liga";
                    justify-content: center;
                    letter-spacing: normal;
                    line-height: 1;
                    position: relative;
                    text-indent: 0;
                    transition: .3s cubic-bezier(.25, .8, .5, 1), visibility 0s;
                    vertical-align: middle;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            }
        }
    }
}

.dialog-deposit-select {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-width: 432px;
    margin: auto;

    .item-select {
        text-align: center;
        max-width: 200px;
        width: 45%;
        margin: 0.5rem;
        padding: 5px;
        background: linear-gradient(180deg, #38d851, #0f6a00);
        box-sizing: border-box;
        border-radius: 8px;

        >a {
            display: flex;
            justify-content: flex-start;
            color: #fff;
            cursor: pointer;

            >img {
                width: 40px;
                height: 40px;
                margin: 0;
            }

            >span {
                padding-left: 8px !important;
                margin: auto 0;
            }
        }
    }
}

.content {
    .info-box {
        padding: 12px 0;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        box-sizing: border-box;

        .avatar {
            width: 44px;
            height: 44px;
        }

        .user-info {
            font-size: 0;
            padding-left: 15px;
            text-align: left;

            .nickname {
                font-size: 18px;
                font-family: Arial;
                color: #fff;
            }

            .username {
                margin-top: 4px;
                font-family: Arial;
                font-size: 14px;
                color: rgb(17, 94, 198);
            }
        }

        .info-ft {
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: flex-end;
            box-sizing: border-box;

            .vip-box {
                cursor: pointer;
                padding-top: 2px;
                margin-right: 8px;
                position: relative;

                >img {
                    width: 44px;
                    height: 40px;
                }

                .vip-num {
                    color: rgb(185, 159, 122);
                    font-size: 10px;
                    position: absolute;
                    bottom: 5px;
                    left: 0;
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }

    .data {
        margin-top: 50px;
        width: 100%;
        border-radius: 16px;
        background-color: #641BE9;
        position: relative;

        .user-info {
            display: flex;
            align-items: center;
            padding: 18px;

            .avatar {
                height: 60px;
                width: auto;
            }
            .name-info {
                flex: 1;
            }
            .nickname {
                text-align: center;
                >span {
                    padding: 3px 24px;
                    text-align: center;
                    font-size: 18px;
                    color: #b03f00;
                    border-radius: 60px;
                    background: #FBD81E;
                    box-shadow: 0 0 0.2rem rgba(251,216,30,.3), inset 0 -0.04rem 0.06rem 0.02rem #f6a80b;
                    font-weight: 700;
                }
            }

            .username {
                margin-top: 10px;
                text-align: center;

                >span {
                    padding: 3px 24px;
                    background: #FBD81E;
                    box-shadow: 0 0 0.2rem rgba(251,216,30,.3), inset 0 -0.04rem 0.06rem 0.02rem #f6a80b;
                    text-align: center;
                    font-size: 14px;
                    border-radius: 60px;
                    color: #b03f00;
                    font-weight: 700;
                }
            }
        }

        .vip-box {
            position: relative;
            img {
                height: 66px;
                width: 45px;
            }

            .vip-num {
                position: absolute;
                bottom: 13px;
                right: 20px;
                font-size: 11px;
                color: #fff;
            }
        }

        .data-item {
            width: 100%;
            padding: 0 12px 20px;
            box-sizing: border-box;

            .slid {
                width: 98%;
                height: auto;
            }

            .title {
                margin-top: 8px;
                font-weight: 500;
                font-size: 14px;
                color: #fff;
                font-family: Arial;
                text-align: center;
            }

            .data-content {
                margin-top: 8px;
                display: flex;
                align-items: center;
                justify-content: center;

                >img {
                    height: 50px;
                    width: 50px;
                    margin-right: 8px;
                }

                .data-num {
                    font-weight: 700;
                    font-size: 30px;
                    font-family: Arial;
                    color: #ffd616;
                }
            }

            .withdraw-progress {
                margin-top: 8px;

                .progress-bg {
                    background-color: rgb(32, 31, 40);
                    width: 85%;
                    height: 12px;
                    margin: 0 auto;
                    margin-top: 6px;
                    border-radius: 6px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    box-sizing: border-box;
                }

                .progress-data {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1;
                    height: 12px;
                    line-height: 12px;
                    font-size: 10px;
                    color: #333;
                    text-align: center;
                }

                .progress {
                    background-color: rgb(21, 255, 170);
                    width: 100%;
                    height: 8px;
                    border-radius: 6px;
                    margin: 0 2px;
                }
            }

            .progress-tips {
                color: #ffd616;
                font-size: 12px;
                margin-top: 8px;
                text-align: center;
            }
        }

        .v-divider--vertical {
            align-self: stretch;
            border: solid;
            border-width: 0 thin 0 0;
            display: inline-flex;
            height: inherit;
            min-height: 100%;
            max-height: 100%;
            max-width: 0;
            width: 0;
            vertical-align: text-bottom;
            margin: 0 -1px;
            border-color: hsla(0, 0%, 100%, .12);
        }
    }

    .income {
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .income-item {
            color: white;

            .title {
                font-weight: 500;
                font-size: 16px;
            }

            .amount {
                color: #ffeb3b !important;
                caret-color: #ffeb3b !important;
                font-weight: 500;
                font-size: 28px;
            }

            >img {
                height: 110px;
                width: 110px;
            }
        }
    }

    .opt {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        box-sizing: border-box;

        .opt-item {
            width: 50%;
            padding: 12px;

            .tips {
                color: #fff;
                font-size: 12px;
            }
        }
    }

    .info {
        margin-top: 8px;
        padding-left: 12px;
        color: hsla(0, 0%, 100%, .7);
        font-weight: bold;
        font-size: 16px;
        text-align: left;
    }

    .info-tips {
        margin-top: 10px;
        padding-left: 12px;
        color: rgb(125, 140, 159);
        font-size: 14px;
        text-align: left;
    }

    .s-box {
        margin-top: 5px;
        display: flex;
        box-sizing: border-box;

        .link {
            padding: 0 4px;
            flex: 1;
        }

        .button {
            padding: 0 4px;
            height: 42px;
            width: 62px;

            >input {
                padding: 0 !important;
                height: 40px !important;
                width: 100%;
            }
        }
    }
}

.tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;

    .tab-item {
        cursor: pointer;
        position: relative;
        width: 30%;

        .bg {
            width: 100%;
            height: auto;
        }

        .cover-img {
            width: 40%;
            height: auto;
            position: absolute;
            top: 16px;
            left: 30%;
            z-index: 1;
        }

        .cover-text {
            position: absolute;
            bottom: 13%;
            left: 0;
            z-index: 1;
            text-align: center;
            width: 100%;
            font-size: 16px;
            color: #fff;
        }
    }
}

.menu {
    margin-top: 20px;
    border-radius: 18px;
    overflow: hidden;

    .menu-item:not(:first-child) {
        border-top: 1px solid rgb(75, 11, 11);
    }

    .menu-item {
        cursor: pointer;
        background-color: #641BE9;
        padding: 10px 22px;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        .icon {
            width: 34px;
            height: auto;
            margin-right: 12px;
        }

        >div {
            flex: 1;
            font-size: 16px;
            color: #fff;
        }

        .arrow {
            width: 8px;
            height: auto;
        }
    }
}

.logout {
    cursor: pointer;
    margin-top: 30px;
    background-color: rgb(241, 162, 18);
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #000;
    text-align: center;
    border-radius: 16px;
    border: 3px solid white;
}

.records-masking {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
    background-color: rgba(25, 17, 56, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;

    .records-modal {
        width: 98%;
        max-width: 500px;
        height: 80%;
        background-color: #641BE9;
        border-radius: 8px;
        padding: 0 4px;

        .records-top {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            box-sizing: border-box;
            padding: 12px 10px;

            >img {
                width: 16px;
                height: auto;
            }
        }

        .records-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 12px 10px;
            border-bottom: 1px solid rgb(221,203,157);

            >div {
                flex: 1;
                font-size: 13px;
                color: #f3f3f3;
                text-align: center;
                cursor: pointer;
            }

            .active {
                font-size: 15px;
                font-weight: 600;
                color: #fff;
                border-bottom: 1px solid #fff;
            }
        }

        .records-table {
            .table-title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 0;

                >div {
                    color: rgb(221,203,157);
                    font-size: 12px;
                    width: 25%;
                    text-align: center;
                }
            }

            .multi {
                background-color: #1338bd !important;
            }

            .table-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 0;

                >div {
                    color: #fff;
                    font-size: 13px;
                    width: 25%;
                    text-align: center;
                    line-height: 1.2;
                }

                .amount {
                    color: #ffb600;
                }

                .status_suc {
                    color: green;
                }
            }
        }
    }
}
</style>
  