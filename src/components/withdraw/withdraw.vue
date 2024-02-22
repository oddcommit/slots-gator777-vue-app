<template>
    <div class="main-page">
        <div class="page-title">
            {{ GLOBAL.lanLocal['withdraw'] }}
            <a class="close" @click="close">
                <i aria-hidden="true" class="v-icon notranslate mdi mdi-close-circle theme--dark"></i>
            </a>
        </div>
        <div class="page-desc">
            <div class="profile-content">
                <div class="item-container">
                    <div class="item" style="background: linear-gradient(rgb(0, 0, 0), rgb(13, 72, 5));">
                        <img class="item-img" :src="require('../../assets/coin.png')" />
                        <div>
                            <span>{{ amount }}</span>
                            <button @click="doLogin" type="button"
                                class="v-btn v-btn--is-elevated v-btn--fab v-btn--has-bg v-btn--round theme--dark v-size--default">
                                <span class="v-btn__content">
                                    <i aria-hidden="true" class="v-icon notranslate mdi mdi-cached theme--dark"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="login-info-item bank-item">
                    <div class="v-box">
                        <label class="v-label v-label-active">{{ GLOBAL.lanLocal['bankname'] }}</label>
                        <input class="v-input" type="text" disabled="disabled" v-model="cardInfo.CardOpenBank" />
                    </div>
                </div>
                <div class="login-info-item bank-item">
                    <div class="v-box">
                        <label class="v-label v-label-active">{{ GLOBAL.lanLocal['bankno'] }}</label>
                        <input class="v-input" type="text" disabled="disabled" v-model="cardInfo.CardNo" />
                    </div>
                </div>
                <div class="login-info-item bank-item">
                    <div class="v-box">
                        <label class="v-label v-label-active">{{ GLOBAL.lanLocal['accountname'] }}</label>
                        <input class="v-input" type="text" disabled="disabled" v-model="cardInfo.CardName" />
                    </div>
                </div>
                <div id="name-box" class="login-info-item" @click="moneyFocus">
                    <div class="v-box">
                        <label class="v-label" :class="loginClass">{{ GLOBAL.lanLocal['withdrawalamount'] }}</label>
                        <input class="v-input" ref="money" type="number" @focus="moneyFocus" v-model="money" />
                    </div>
                </div>
                <div class="button-box">
                    <input class="login-button" :class="money == '' || money <= 0 ? 'login-button-disable' : ''"
                        type="button" @click="doWithdraw" :value="GLOBAL.lanLocal['subapplication']" />
                </div>
                <div class="s-box c-box">
                    <div class="button">
                        <input class="register-button" type="button" @click="toC()" :value="GLOBAL.lanLocal['contact']" />
                    </div>
                </div>
            </div>
        </div>
        <div class="loading-masking" v-if="loading">
            <div class="loading-page">
                <vue-simple-spinner size="large" line-fg-color="#f69b09"></vue-simple-spinner>
            </div>
        </div>
    </div>
</template>
  
<script>
import md5 from 'js-md5';
import loadFile from "../../api/loadFile.js"
import AES from "../../common/AES.js"
import { doPost } from '../../api/api.js'
import decodeApiLan from '../../api/decodeApiLan.js'
export default {
    name: 'withdraw',
    data() {
        return {
            loading: false,
            amount: 0,
            money: '',
            moneyfocus: false,
            cardInfo: []
        }
    },
    created() {
        this.doLogin()
    },
    computed: {
        loginClass() {
            return {
                'v-label-active': this.moneyfocus
            }
        },
    },
    methods: {
        toC() {
            this.$emit('toC')
        },
        doLogin() {
            this.loading = true
            let name = localStorage.getItem(md5('__name__'))
            let pwd = localStorage.getItem(md5('__pwd_'))
            if (name) {
                name = AES.decrypt(name, this.GLOBAL.apiAesKey)
                if (name) {
                    this.GLOBAL.userInfo.name = name
                }
            }
            if (pwd) {
                pwd = AES.decrypt(pwd, this.GLOBAL.apiAesKey)
                if (pwd) {
                    this.GLOBAL.userInfo.pwd = pwd
                }
            }
            if (name && pwd) {
                doPost({
                    n: 'AppGame',
                    a: 'do_login',
                    mobile: name,
                    password: pwd
                }).then((res) => {
                    if (res.code === 0) {
                        this.GLOBAL.userInfo.accountid = res.data.accountid
                        this.GLOBAL.userInfo.nickname = res.data.nickname
                        this.amount = res.data.amount
                        doPost({
                            n: 'AppDraw',
                            a: 'get_card_info',
                            accountid: this.GLOBAL.userInfo.accountid,
                            PayType: 3
                        }).then((res) => {
                            if (res.code === 0) {
                                this.cardInfo = res.data
                                if (this.cardInfo == undefined || this.cardInfo.CardNo == '') {
                                    this.$emit("toB")
                                }
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
                            this.loading = false
                        })
                    } else {
                        this.logout()
                    }
                })
            }
        },
        logout() {
            this.GLOBAL.userInfo.accountid = 0
            this.GLOBAL.userInfo.name = ''
            this.GLOBAL.userInfo.passcode = ''
            localStorage.removeItem(md5('__name__'))
            localStorage.removeItem(md5('__pwd_'))
            window.location.reload()
        },
        moneyFocus() {
            this.$refs.money.focus()
            this.moneyfocus = true
        },
        checkMoney(needResult = false) {
            if (this.money) {
                if (needResult) {
                    return true
                }
            }
        },
        doWithdraw() {
            if (this.checkMoney(true)) {
                doPost({
                    n: 'AppDraw',
                    a: 'add_draw_money',
                    accountid: this.GLOBAL.userInfo.accountid,
                    money: this.money * 10000,
                    PayType: 3
                }).then((res) => {
                    if (res.code === 0) {
                        this.$toast.success(this.GLOBAL.lanLocal['subsuccess'], {
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
                        this.close()
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
            this.$emit('close')
        },
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-page {
    height: 100%;
    width: 100%;
    padding: 60px 12px 80px;
    box-sizing: border-box;
    background-color: #000;
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

.s-box {
    margin-top: 20px;
    display: flex;
    box-sizing: border-box;
    justify-content: center;

    .link {
        width: 100%;
        padding: 0 12px;
    }

    .button {
        width: 50%;
        padding: 0 12px;

        >input {
            padding: 0 !important;
            height: 36px !important;
            width: 100%;
        }
    }
}
.c-box {
    justify-content: flex-end !important;
}
.register-button {
    text-align: center;
    margin-top: 24px;
    background-color: #f44336 !important;
    border-color: #f44336 !important;
    color: white !important;
    font-weight: 700;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .25);
    height: 44px;
    min-width: 66.66666%;
    padding: 0 19.5555555556px;
    font-size: 16px !important;
    letter-spacing: 0 !important;
    border-radius: 27px !important;
    transition: all .2s cubic-bezier(.02, .54, .58, 1);
    border: none;
    font-family: Noto Sans Thai;
    padding: 0 20px;
}
.bank-item{
    .v-label, .v-input {
        color: #999;
    }
}
.login-info-item {
    text-align: left;
    margin: 24px 40px 4px 40px;
    background: hsla(0, 0%, 100%, .08);
    height: 52px;
    border-radius: 40px;
    position: relative;
    color: hsla(0, 0%, 100%, .7);
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

.v-input {
    width: auto;
    color: #fff;
    background: transparent;
    margin-top: 22px;
    padding: 0 20px;
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
    background: linear-gradient(180deg, #ffdf46, #ffdc42 23.96%, #feeb52 49.48%, #fbc316 71.87%, #f69b09);
    color: #212121 !important;
    font-weight: 700;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .25);
    height: 44px;
    min-width: 66.66666%;
    padding: 0 19.5555555556px;
    font-size: 16px !important;
    letter-spacing: 0 !important;
    border-radius: 27px !important;
    transition: all .2s cubic-bezier(.02, .54, .58, 1);
    border: none;
    font-family: Noto Sans Thai;
    padding: 0 20px;
}

.login-button-disable {
    background-color: hsla(0, 0%, 100%, .12) !important;
    text-shadow: 0 0 #000;
    opacity: .5 !important;
    color: hsla(0, 0%, 100%, .3) !important;
}

.page-title {
    padding: 1rem 0;
    font-weight: 500;
    font-size: 18px;
    color: #fff;
    position: relative;

    .title-img {
        width: 30px;
        aspect-ratio: auto 30 / 30;
        height: 30px;
    }

    .close {
        position: absolute;
        top: 50%;
        bottom: 0;
        transform: translate(-50%, -50%);
        right: 0;

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
        margin-top: 20px;

    /* display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center; */
    .item-container {
        display: flex;
        justify-content: center;

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

.loading-page {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loading-masking {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
  