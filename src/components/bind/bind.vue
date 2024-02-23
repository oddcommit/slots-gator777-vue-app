<template>
    <div class="main-page">
        <div class="header-cover"></div>
        <div class="page-title">
            {{ GLOBAL.lanLocal['bindcard'] }}
            <a class="close" @click="close">
                <img class="icon" @click="close" :src="require('../../assets/amount/close.png')" />
            </a>
        </div>
        <div class="content">
            <div>
                <!-- <div class="s-box">
                    <div class="link">
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="text" v-model="bankname"
                                    :placeholder="GLOBAL.lanLocal['bankname']" />
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="s-box">
                    <div class="link">
                        <div class="info-title">{{GLOBAL.lanLocal['name']}}</div>
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="text" v-model="accountname"
                                    :placeholder="GLOBAL.lanLocal['plzname']" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="s-box">
                    <div class="link">
                        <div class="info-title">{{GLOBAL.lanLocal['CPF']}}</div>
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="text" v-model="bankno"
                                    :placeholder="GLOBAL.lanLocal['plzcpf']" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="s-box">
                    <div class="link">
                        <div class="info-title">{{GLOBAL.lanLocal['mobile']}}</div>
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="text" v-model="phone"
                                    :placeholder="GLOBAL.lanLocal['plzmobile']" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="s-box">
                    <div class="link">
                        <div class="info-title">{{GLOBAL.lanLocal['email']}}</div>
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="text" v-model="email"
                                    :placeholder="GLOBAL.lanLocal['plzemail']" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="s-box">
                    <div class="link">
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="text" v-model="ifsc"
                                    :placeholder="GLOBAL.lanLocal['ifsc']" />
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="s-box" style="margin-top: 60px">
                    <div class="button">
                        <input class="login-button" type="button" @click="doBind" :value="GLOBAL.lanLocal['submit']" />
                    </div>
                </div>
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
    name: 'bind',
    data() {
        return {
            bankname: '',
            bankno: '',
            accountname: '',
            ifsc: '',
            email: '',
            phone: '',
            nicknameerror: false,
            nicknamefocus: false,
            nicknameempty: true,
            nicknameinfo: '',
            passcodeerror: false,
            passcodefocus: false,
            passcodeempty: true,
            passcodeinfo: '',
            passcodeerror2: false,
            passcodefocus2: false,
            passcodeempty2: true,
            passcodeinfo2: '',
            ifscerror: false,
            ifscfocus: false,
            ifscempty: true,
            ifscinfo: '',
            innerHeight: 0,
        }
    },
    computed: {
        nicknameClass() {
            return {
                'error-info': this.nicknameerror,
                'normal-info': !this.nicknameerror && this.nicknamefocus,
                'v-label-active': this.nicknamefocus || !this.nicknameempty
            }
        },
        loginClass() {
            return {
                'error-info': this.nameerror,
                'normal-info': !this.nameerror && this.namefocus,
                'v-label-active': this.namefocus || !this.nameempty
            }
        },
        codeClass() {
            return {
                'error-info': this.codeerror,
                'normal-info': !this.codeerror && this.codefocus,
                'v-label-active': this.codefocus || !this.codeempty
            }
        },
        passcodeClass() {
            return {
                'error-info': this.passcodeerror,
                'normal-info': !this.passcodeerror && this.passcodefocus,
                'v-label-active': this.passcodefocus || !this.passcodeempty
            }
        },
        passcodeClass2() {
            return {
                'error-info': this.passcodeerror2,
                'normal-info': !this.passcodeerror2 && this.passcodefocus2,
                'v-label-active': this.passcodefocus2 || !this.passcodeempty2
            }
        },
        ifscClass() {
            return {
                'error-info': this.ifscerror,
                'normal-info': !this.ifscerror && this.ifscfocus,
                'v-label-active': this.ifscfocus || !this.ifscempty
            }
        },
    },
    created() {
        this.innerHeight = window.innerHeight - 130
    },
    methods: {
        close() {
            this.$emit('close')
        },
        checkParams() {
            if (this.accountname.length <= 0) {
                return this.GLOBAL.lanLocal['plzname']
            }
            var numReg = /^[0-9]*$/
            var numRe = new RegExp(numReg)
            if (this.bankno.length <= 0) {
                return this.GLOBAL.lanLocal['plzcpf']
            }
            if (this.bankno.indexOf(".") !== -1) {
                return this.GLOBAL.lanLocal['nodot']
            }
            if(!numRe.test(this.bankno) || this.bankno.length != 11)
            {
                return this.GLOBAL.lanLocal['cpflengtherror']
            }
            if (this.phone.length <= 0) {
                return this.GLOBAL.lanLocal['plzmobile']
            }
            if (!numRe.test(this.phone) || this.phone.length < 10 || this.phone.length > 11) {
                return this.GLOBAL.lanLocal['mobilelengtherror']
            }
            if (this.email.length <= 0) {
                return this.GLOBAL.lanLocal['plzemail']
            }
            if (this.email.indexOf("@") === -1) {
                return this.GLOBAL.lanLocal['emailerror']
            }
            return ''
        },
        doBind() {
            let err = this.checkParams()
            if (err) {
                this.$toast.error(err, {
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
                })
                return
            }
            doPost({
                n: 'AppDraw',
                a: 'update_card_info',
                accountid: this.GLOBAL.userInfo.accountid,
                // CardOpenBank: this.bankname,
                CardNo: this.bankno,
                CardName: this.accountname,
                email: this.email,
                whatsapp: this.phone,
                // bank_ifsc: this.ifsc,
            }).then((res) => {
                if (res.code === 0) {
                    this.$emit("close")
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
        },
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@media screen and (min-width: 950px) {

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
    padding: 60px 0 100px;
    box-sizing: border-box;
    position: relative;
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


.page-title {
    padding: 20px 16px 8px;
    display: flex;
    align-items: center;
    color: white;
    border-bottom: 2px solid rgb(221,203,157);
    position: relative;
    font-weight: 700;
    font-size: 18px;

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
        height: 100%;
        display: flex;
        align-items: center;

        .icon {
            width: 24px;
            height: 24px;
        }
    }
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

.d-flex {
    display: flex !important;
    margin: 0 32px;
    padding-bottom: 12px;

    .v-input-box {
        align-items: flex-start;
        display: flex;
        font-size: 16px;
        letter-spacing: normal;
        max-width: 100%;
        text-align: left;
        flex: 0 1 auto;
        margin-top: 5px;
        padding-top: 5px;

        .v-input__control {
            display: flex;
            flex-direction: column;
            height: auto;
            flex-grow: 1;
            flex-wrap: wrap;
            min-width: 0;
            width: 100%;

            .v-input__slot {
                align-items: center;
                color: inherit;
                display: flex;
                margin-bottom: 8px;
                min-height: inherit;
                position: relative;
                transition: .3s cubic-bezier(.25, .8, .5, 1);
                width: 100%;
                cursor: pointer;

                .v-input--selection-controls__input {
                    color: inherit;
                    display: inline-flex;
                    flex: 0 0 auto;
                    height: 24px;
                    position: relative;
                    transition: .3s cubic-bezier(.25, .8, .5, 1);
                    transition-property: transform;
                    width: 24px;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    margin-right: 8px;

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
                        width: 100%;
                    }

                    .primary--text {
                        color: #1976d2 !important;
                        caret-color: #1976d2 !important;
                    }

                    .mdi:before {
                        content: "\F0131";
                        display: inline-block;
                        font: normal normal normal 24px/1 Material Design Icons;
                        font-size: inherit;
                        text-rendering: auto;
                        line-height: inherit;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }

                    .v-icon.v-icon:after {
                        background-color: currentColor;
                        border-radius: 50%;
                        content: "";
                        display: inline-block;
                        height: 100%;
                        left: 0;
                        opacity: 0;
                        pointer-events: none;
                        position: absolute;
                        top: 0;
                        transform: scale(1.3);
                        width: 100%;
                        transition: opacity .2s cubic-bezier(.4, 0, .6, 1);
                    }

                    .v-input--selection-controls__ripple {
                        border-radius: 50%;
                        cursor: pointer;
                        height: 34px;
                        position: absolute;
                        transition: inherit;
                        width: 34px;
                        left: -12px;
                        top: calc(50% - 24px);
                        margin: 7px;
                    }

                    .v-input--selection-controls__ripple:before {
                        border-radius: inherit;
                        bottom: 0;
                        content: "";
                        position: absolute;
                        opacity: .2;
                        left: 0;
                        right: 0;
                        top: 0;
                        transform-origin: center center;
                        transform: scale(.2);
                        transition: inherit;
                    }
                }
            }
        }
    }

    .more-information {
        color: #fff;

        >span {
            background: linear-gradient(180deg, #ffdf46, #ffdc42 23.96%, #feeb52 49.48%, #fbc316 71.87%, #f69b09);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 600;
            cursor: pointer;
        }
    }
}

.login-info-item input:focus {
    outline: none;
}

.msg-box {
    min-height: 20px;
    overflow: hidden;
    margin: 0 32px;
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

.protocal {
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    background-color: #000 !important;
    color: white;
    font-family: Noto Sans Thai, Roboto !important;
    font-size: 14px !important;
    text-align: left;
    height: 100%;
    align-items: center;

    .container {
        width: 100%;
        padding: 12px;
        margin-right: auto;
        margin-left: auto;
        box-sizing: border-box;

        .text-center {
            text-align: center !important;
        }
    }
}

.protocal-show {
    display: flex !important;
    ;
}

.row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: -12px;
    margin-top: 12px;

    .dailog-notuser-register {
        color: #fff !important;
        text-align: center;
        margin-bottom: 1rem;

        >a {
            font-size: 17px;
            color: #fff !important;
            text-decoration: underline;
        }
    }

    .col-12 {
        width: 100%;
        padding: 0;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        justify-content: center;
        flex: 0 0 100%;
        max-width: 100%;
    }

    .dailog-call-center {
        display: flex;
        color: #fff !important;
        text-align: center;
        margin-bottom: 1rem;

        >a {
            font-size: 14px;
            text-decoration: none;
            display: flex;
            cursor: pointer;

            >div {
                margin: 0 10px;
                color: #ffd600;
            }

            >img {
                width: 25px;
                height: 25px;
            }
        }
    }
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
    cursor: pointer;
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

.input-disabled {
    color: #dcdcdc;
}

.content {
    margin-top: 40px;
    padding: 0 24px 60px;

    .s-box {
        margin-top: 15px;
        display: flex;
        box-sizing: border-box;
        justify-content: center;

        .link {
            width: 100%;
            text-align: left;
        }

        .button {
            width: 100%;
        }
    }
}
.info-title {
    color: #fff;
    font-size: 14px;
    font-family: Arial;
    padding-bottom: 2px;
}
.login-info-item {
    text-align: left;
    background: #641BE9;
    height: 44px;
    border-radius: 4px;
    position: relative;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 14px;
}

.v-box2 {
    width: 100%;
}

.v-input2 {
    width: 100%;
    color: #fff;
    background: transparent;
    border: 0;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    letter-spacing: normal;
    text-align: left;
}

input::placeholder {
    color: white;
}

.login-button {
    cursor: pointer;
    background-image: linear-gradient(180deg,#FFBD36 0%,#FF2200 100%),linear-gradient(180deg,rgb(255,239,177),rgb(242,172,0));
    box-shadow: 0 0 40px rgba(19,1,49,.6), 0 1px 6px rgba(24,0,73,.7), inset 0 0 5px rgba(255,108,0,.85);
    color: white !important;
    height: 44px;
    width: 100%;
    font-size: 18px !important;
    letter-spacing: 0 !important;
    border-radius: 16px !important;
    border: 3px solid white;
    text-align: center;
}
</style>
  