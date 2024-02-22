<template>
    <div class="login-masking" @click="close">
        <div style="width: 100%;" @click.stop="func1()">
            <div class="main-page" v-if="tag == 1">
                <img class="logo" :src="require('../../../static/logo.png')" />
                <div class="page-title">
                    <div class="title-item" :class="tag == 1 ? 'active' : ''" @click="changeTag(1)">
                        <div>{{ GLOBAL.lanLocal['login-low'] }}</div>
                    </div>
                    <div class="title-item" :class="tag == 2 ? 'active' : ''" @click="changeTag(2)">
                        <div>{{ GLOBAL.lanLocal['regnow'] }}</div>
                    </div>
                </div>
                <div class="input-box">
                    <span class="name-pre">+55</span>
                    <input class="input name-input" type="text" v-model="loginname"
                        :placeholder="GLOBAL.lanLocal['account']" />
                </div>
                <div class="input-box">
                    <input class="input password-input" type="text" v-if="isEye" v-model="passcode"
                        :placeholder="GLOBAL.lanLocal['passcode']" />
                    <input class="input password-input" type="password" v-else v-model="passcode"
                        :placeholder="GLOBAL.lanLocal['passcode']" />
                    <span class="input-eye" v-if="!isEye" @click="changeEye">
                        <img class="eye-img" :src="require('../../assets/login/pwd-normal.png')" />
                    </span>
                    <span class="input-eye" v-else @click="changeEye">
                        <img class="eye-img" :src="require('../../assets/login/pwd-show.png')" />
                    </span>
                </div>
                <div class="login-desc">
                    <img class="hd" v-if="isRemember" @click="changeRemember"
                        :src="require('../../assets/login/selected.png')" />
                    <img class="hd" v-else @click="changeRemember" :src="require('../../assets/login/normal.png')" />
                    <div class="bd">{{ GLOBAL.lanLocal['keeplogin'] }}</div>
                </div>
                <div class="err-info" :style="{ visibility: loginErr == '' ? 'hidden' : 'visible' }">{{ loginErr ? loginErr
                    : 'info' }}
                </div>
                <div class="login-btn" @click="doLogin">{{ GLOBAL.lanLocal['login'] }}</div>
            </div>
            <div class="main-page" v-if="tag == 2">
                <img class="logo" :src="require('../../../static/logo.png')" />
                <div class="page-title">
                    <div class="title-item" :class="tag == 1 ? 'active' : ''" @click="changeTag(1)">
                        <div>{{ GLOBAL.lanLocal['login-low'] }}</div>
                    </div>
                    <div class="title-item" :class="tag == 2 ? 'active' : ''" @click="changeTag(2)">
                        <div>{{ GLOBAL.lanLocal['regnow'] }}</div>
                    </div>
                </div>
                <div class="input-box">
                    <span class="name-pre">+55</span>
                    <input class="input name-input" type="text" v-model="loginname"
                        :placeholder="GLOBAL.lanLocal['account']" />
                </div>
                <div class="input-box">
                    <input class="input password-input" type="text" v-if="isEye" v-model="passcode"
                        :placeholder="GLOBAL.lanLocal['passcode']" />
                    <input class="input password-input" type="password" v-else v-model="passcode"
                        :placeholder="GLOBAL.lanLocal['passcode']" />
                    <span class="input-eye" v-if="!isEye" @click="changeEye">
                        <img class="eye-img" :src="require('../../assets/login/pwd-normal.png')" />
                    </span>
                    <span class="input-eye" v-else @click="changeEye">
                        <img class="eye-img" :src="require('../../assets/login/pwd-show.png')" />
                    </span>
                </div>
                <div class="input-box">
                    <input class="input password-input" type="text" v-if="isEye2" v-model="passcode2"
                        :placeholder="GLOBAL.lanLocal['passcode']" />
                    <input class="input password-input" type="password" v-else v-model="passcode2"
                        :placeholder="GLOBAL.lanLocal['passcode']" />
                    <span class="input-eye" v-if="!isEye2" @click="changeEye2">
                        <img class="eye-img" :src="require('../../assets/login/pwd-normal.png')" />
                    </span>
                    <span class="input-eye" v-else @click="changeEye2">
                        <img class="eye-img" :src="require('../../assets/login/pwd-show.png')" />
                    </span>
                </div>
                <div class="input-box">
                    <input class="input" type="text" v-model="nickname" :placeholder="GLOBAL.lanLocal['name']" />
                </div>
                <div class="input-box">
                    <input class="input" type="text" v-model="shareid" :placeholder="GLOBAL.lanLocal['shareid']" />
                </div>
                <div class="login-desc">
                    <img class="hd" v-if="isAgree" @click="changeAgree" :src="require('../../assets/login/selected.png')" />
                    <img class="hd" v-else @click="changeAgree" :src="require('../../assets/login/normal.png')" />
                    <div class="bd">{{ GLOBAL.lanLocal['agreement'] }}<span @click="changeTag(3)">
                            {{ GLOBAL.lanLocal['readmore'] }} </span></div>
                </div>
                <div class="err-info" :style="{ visibility: loginErr == '' ? 'hidden' : 'visible' }">{{ loginErr ? loginErr
                    : 'info' }}
                </div>
                <div class="login-btn"
                    :class="(loginname != '' && passcode != '' && passcode2 != '' && nickname != '' && isAgree) ? '' : 'login-btn-disable'"
                    @click="doRegister">{{ GLOBAL.lanLocal['confirm'] }}</div>
            </div>
            <div class="main-page" v-if="tag == 3">
                <h3>{{ GLOBAL.lanLocal['registeragree'] }}</h3>
                <p>
                    1. {{ GLOBAL.lanLocal['agree11'] }}
                    {{ GLOBAL.lanLocal['agree12'] }}
                    {{ GLOBAL.lanLocal['agree13'] }}
                </p>
                <p>
                    2. {{ GLOBAL.lanLocal['agree21'] }}
                    {{ GLOBAL.lanLocal['agree22'] }}
                </p>
                <p>3. {{ GLOBAL.lanLocal['agree31'] }}</p>
                <p>
                    4. {{ GLOBAL.lanLocal['agree41'] }}
                    {{ GLOBAL.lanLocal['agree42'] }}
                </p>
                <p>
                    5. {{ GLOBAL.lanLocal['agree51'] }}
                    {{ GLOBAL.lanLocal['agree52'] }}
                </p>
                <div class="login-btn" @click="agreeProtocal">{{ GLOBAL.lanLocal['agree'] }}</div>
            </div>
            <div class="close">
                <img @click="close" :src="require('../../assets/login/close.png')" />
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
    name: 'login',
    data() {
        return {
            isEye: false,
            isRemember: true,
            loginname: '',
            passcode: '',
            passcode2: '',
            innerHeight: 0,
            loginErr: '',
            tag: 1,
            isEye2: false,
            nickname: '',
            isAgree: false,
            isProtocal: false,
            shareid: '',
        }
    },
    watch: {
        isReg: {
            immediate: true,
            handler(newValue, oldValue) {
                if (newValue) {
                    this.changeTag(2)
                }
            }
        },
    },
    props: {
        isReg: {
            type: Boolean,
            default: false
        },
    },
    created() {
        this.innerHeight = window.innerHeight - 60
        let shareid = localStorage.getItem(md5("__shareid___"))
        if (shareid) {
            this.shareid = shareid
        } else {
            doPost({
                n: 'AppShare',
                a: 'get_share_id',
                udid: this.GLOBAL.deviceid
            }).then((res) => {
                if (res.code === 0 && res.data) {
                    this.shareid = res.data
                }
            })
        }
    },
    methods: {
        func1() {
        },
        close() {
            this.$emit('close')
        },
        changeTag(tag) {
            if (this.tag != tag) {
                this.isEye = false
                this.isEye2 = false
                this.isRemember = true
                this.loginname = ''
                this.passcode = ''
                this.passcode2 = ''
                this.loginErr = ''
                this.nickname = ''
                this.isAgree = false
                this.tag = tag
            }
        },
        changeEye() {
            this.isEye = !this.isEye
        },
        changeEye2() {
            this.isEye2 = !this.isEye2
        },
        changeRemember() {
            this.isRemember = !this.isRemember
        },
        changeAgree() {
            this.isAgree = !this.isAgree
        },
        showProtocal() {
            this.isProtocal = true
        },
        agreeProtocal() {
            this.changeTag(2)
            this.isAgree = true
        },
        checkName(needResult = false) {
            let loginname = this.loginname.trim()
            if (loginname.length <= 0) {
                this.loginErr = this.GLOBAL.lanLocal['plzinput']
                if (needResult) {
                    return false
                }
            } else {
                if (needResult) {
                    return true
                }
            }
        },
        checkRegName(needResult = false) {
            var numReg = /^[0-9]*$/
            var numRe = new RegExp(numReg)
            let loginname = this.loginname.trim()
            if (loginname.length <= 0) {
                this.loginErr = this.GLOBAL.lanLocal['plzinput']
                if (needResult) {
                    return false
                }
            } else if (!numRe.test(loginname) || loginname.length < 10 || loginname.length > 11) {
                this.loginErr = this.GLOBAL.lanLocal['mobilelengtherror']
                if (needResult) {
                    return false
                }
            } else {
                if (needResult) {
                    return true
                }
            }
        },
        checkPasscode(needResult = false) {
            if (this.passcode.length <= 0) {
                this.loginErr = this.GLOBAL.lanLocal['plzinput']
                if (needResult) {
                    return false
                }
            } else if (this.passcode.length < 6) {
                this.loginErr = this.GLOBAL.lanLocal['sixpasscode']
                if (needResult) {
                    return false
                }
            } else {
                if (needResult) {
                    return true
                }
            }
        },
        doLogin() {
            let that = this
            this.loginErr = ''
            if (this.checkName(true) && this.checkPasscode(true)) {
                const passcode = md5(this.passcode)
                let loginname = this.loginname.trim()
                doPost({
                    n: 'AppGame',
                    a: 'do_login',
                    mobile: loginname,
                    password: passcode
                }).then((res) => {
                    if (res.code === 0) {
                        const json = loadFile("static/nonce", true);
                        if (json != null) {
                            let api_aes_key = json['api_aes_key']
                            localStorage.setItem(md5('__name__'), AES.encrypt(loginname, api_aes_key))
                            localStorage.setItem(md5('__pwd_'), AES.encrypt(passcode, api_aes_key))

                            this.GLOBAL.userInfo.name = loginname
                            this.GLOBAL.userInfo.passcode = passcode

                            that.$emit('success');
                        }
                    } else {
                        const data = decodeApiLan(res, this.GLOBAL.lanArr);
                        this.loginErr = data.message
                    }
                })
            }
        },
        checkPasscode2(needResult = false) {
            if (this.passcode != this.passcode2) {
                this.loginErr = this.GLOBAL.lanLocal['samepasscode']
                if (needResult) {
                    return false
                }
            } else {
                if (needResult) {
                    return true
                }
            }
        },
        checkNickname(needResult = false) {
            if (this.nickname.length <= 0) {
                this.loginErr = this.GLOBAL.lanLocal['plzinput']
                if (needResult) {
                    return false
                }
            } else {
                if (needResult) {
                    return true
                }
            }
        },
        doRegister() {
            this.loginErr = ''
            if (this.checkRegName(true) && this.checkNickname(true) && this.checkPasscode(true) && this.checkPasscode2(true) && this.isAgree) {
                const passcode = md5(this.passcode)
                let loginname = this.loginname
                doPost({
                    n: 'AppEx',
                    a: 'simple_phone_register',
                    username: loginname,
                    mobile: loginname,
                    password: passcode,
                    rolename: this.nickname,
                    deviceid: this.GLOBAL.deviceid,
                    shareid: this.shareid
                }).then((res) => {
                    if (res.code === 0) {
                        const json = loadFile("static/nonce", true);
                        if (json != null) {
                            let api_aes_key = json['api_aes_key']
                            localStorage.setItem(md5('__name__'), AES.encrypt(loginname, api_aes_key))
                            localStorage.setItem(md5('__pwd_'), AES.encrypt(passcode, api_aes_key))

                            this.GLOBAL.userInfo.name = loginname
                            this.GLOBAL.userInfo.passcode = passcode

                            localStorage.setItem('reg', 1);
                            this.$emit('success');
                        }
                    } else {
                        const data = decodeApiLan(res, this.GLOBAL.lanArr);
                        this.loginErr = data.message
                    }
                })
            }
        },
    }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@media screen and (max-height: 600px) {
    .login-masking {
        align-items: flex-start !important;
    }

    .main-page {
        margin-top: 20px !important;
    }
}

.login-masking {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);

    .close {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            height: 36px;
            width: auto;
            cursor: pointer;
        }
    }

    .main-page::-webkit-scrollbar {
        width: 0;
    }

    .main-page {
        margin: 0 auto;
        background-color: rgba(142,38,39);
        background-image: linear-gradient(to bottom, rgba(233,69,69), rgba(142,38,39));
        background-size: 100% 20px;
        background-repeat: no-repeat;
        width: 85%;
        max-width: 400px;
        max-height: 100%;
        overflow-y: scroll;
        padding: 26px 30px 30px;
        border-radius: 8px;
        border: 2px solid rgb(254,230,124);
        box-sizing: border-box;
        box-shadow: 3px 2px 3px rgb(113,28,33) inset,
            0 2px 3px rgb(113,28,33) inset,
            0 2px 3px rgb(113,28,33) inset,
            0 2px 3px rgb(113,28,33) inset;

        h3,
        p {
            color: #fff;
        }

        p {
            text-align: left;
        }

        .page-title {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;

            .title-item {
                color: rgb(235,96,101);
                font-size: 16px;
                width: 45%;
                text-align: center;
                line-height: 1.2;
                cursor: pointer;
                height: 40px;
                line-height: 40px;
            }

            .active {
                color: rgb(248,241,109);
                background-color: rgb(112,20,33);
                border-radius: 40px;
            }
        }

        .logo {
            margin: 0 auto 14px;
            width: 140px;
            height: auto;
        }

        .input-box {
            position: relative;
            margin: 0 auto;

            .input {
                background-color: rgb(112,20,33) !important;
                height: 36px;
                line-height: 36px;
                width: 100%;
                border-radius: 10px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) inset,
                    0 1px 2px rgb(151,37,37);
                border-width: 0;
                padding: 0 12px;
                font-size: 18px;
                color: #fff;
                box-sizing: border-box;
                margin-bottom: 16px;
            }

            .input:focus-visible {
                outline: 0px;
            }

            .input::placeholder {
                font-size: 16px;
                color: rgb(212,67,72);
            }

            .name-pre {
                height: 36px;
                line-height: 36px;
                font-size: 15px;
                color: #fff;
                position: absolute;
                top: 0;
                left: 0;
                width: 50px;
                text-align: center;
            }

            .name-input {
                padding-left: 50px;
            }

            .input-eye {
                height: 36px;
                line-height: 36px;
                position: absolute;
                top: 0;
                right: 0;
                width: 30px;
                text-align: center;
                display: flex;
                align-items: center;

                .eye-img {
                    height: 20px;
                    width: auto;
                }
            }

            .password-input {
                padding-right: 30px;
            }
        }

        .login-desc {
            display: flex;
            align-items: center;
            box-sizing: border-box;

            .hd {
                height: 20px;
                width: auto;
            }

            .bd {
                flex: 1;
                padding-left: 6px;
                color: #fff;
                font-size: 14px;
                text-align: left;

            }

        }

        .err-info {
            margin-top: 10px;
            color: #dd2c00;
            font-size: 14px;
            text-align: left;
        }

        .login-btn {
            margin: 4px auto 0;
            width: 90%;
            height: 38px;
            line-height: 38px;
            border-radius: 38px;
            text-align: center;
            color: rgb(140,36,43);
            cursor: pointer;
            font-size: 15px;
            background-image: linear-gradient(to bottom, rgba(251,239,181), rgba(217,173,108));
        }

        .login-btn-disable {
            opacity: 0.5;
        }
    }
}</style>
  