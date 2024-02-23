<template>
    <div class="login-masking">
        <div style="max-height: 70%;width: 100%;margin-top:-30px;">
            <div class="main-page">
                <div class="page-title">
                    <div class="title-item">
                        <div>{{ GLOBAL.lanLocal['changepassword'] }}</div>
                    </div>
                </div>
                <img class="logo" :src="require('../../../static/logo.png')" />
                <div class="input-box">
                    <input class="input" id="oldpwd" name="oldpwd" type="text" v-model="oldpwd"
                        :placeholder="GLOBAL.lanLocal['oldpassword']" />
                </div>
                <div class="input-box">
                    <input class="input password-input" type="text" v-if="isEye" id="passcode" name="passcode" v-model="passcode"
                        :placeholder="GLOBAL.lanLocal['passcode']" />
                    <input class="input password-input" type="password" v-else id="passcode" name="passcode" v-model="passcode"
                        :placeholder="GLOBAL.lanLocal['passcode']" />
                    <span class="input-eye" v-if="!isEye" @click="changeEye">
                        <img class="eye-img" :src="require('../../assets/login/pwd-normal.png')" />
                    </span>
                    <span class="input-eye" v-else @click="changeEye">
                        <img class="eye-img" :src="require('../../assets/login/pwd-show.png')" />
                    </span>
                </div>
                <div class="input-box">
                    <input class="input password-input" type="text" v-if="isEye2" id="passcode2" name="passcode2" v-model="passcode2"
                        :placeholder="GLOBAL.lanLocal['passcode']" />
                    <input class="input password-input" type="password" v-else id="passcode2" name="passcode2" v-model="passcode2"
                        :placeholder="GLOBAL.lanLocal['passcode']" />
                    <span class="input-eye" v-if="!isEye2" @click="changeEye2">
                        <img class="eye-img" :src="require('../../assets/login/pwd-normal.png')" />
                    </span>
                    <span class="input-eye" v-else @click="changeEye2">
                        <img class="eye-img" :src="require('../../assets/login/pwd-show.png')" />
                    </span>
                </div>
                <div class="err-info" :style="{ visibility: loginErr == '' ? 'hidden' : 'visible' }">{{ loginErr ? loginErr : 'info'
                }}
                </div>
                <div class="login-btn" :class="(oldpwd != '' && passcode != '' && passcode2 != '') ? '' : 'login-btn-disable'"
                    @click="doReset">{{ GLOBAL.lanLocal['confirm'] }}</div>
            </div>
            <div class="close">
                <img @click="close" :src="require('../../assets/login/close.png')" />
            </div>
        </div>
    </div>
</template>
  
<script>
import md5 from 'js-md5';
import { doPost } from '../../api/api.js'
import decodeApiLan from '../../api/decodeApiLan.js'
export default {
    name: 'forgot',
    data() {
        return {
            isEye: false,
            isEye2: false,
            oldpwd: '',
            passcode: '',
            passcode2: '',
            loginErr: '',
            innerHeight: 0,
        }
    },
    created() {
        this.innerHeight = window.innerHeight - 60
    },
    methods: {
        close() {
            this.$emit('close')
        },
        checkOldPasscode(needResult = false) {
            if (this.oldpwd.length <= 0) {
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
        doReset() {
            this.loginErr = ''
            if (this.checkOldPasscode(true) && this.checkPasscode(true) && this.checkPasscode2(true)) {
                const password = md5(this.oldpwd)
                const newPassword = md5(this.passcode2)
                doPost({
                    n: 'AppEx',
                    a: 'reset_login_password',
                    mobile: this.GLOBAL.userInfo.name,
                    password: password,
                    newPassword: newPassword,
                }).then((res) => {
                    if (res.code === 0) {
                        const data = decodeApiLan(res, this.GLOBAL.lanArr);
                        this.$toast.success(data.message, {
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
                        this.GLOBAL.userInfo.accountid = 0
                        this.GLOBAL.userInfo.name = ''
                        this.GLOBAL.userInfo.passcode = ''
                        localStorage.removeItem(md5('__name__'))
                        localStorage.removeItem(md5('__pwd_'))
                        this.$emit('forgotDone');
                    } else {
                        const data = decodeApiLan(res, this.GLOBAL.lanArr);
                        this.loginErr = data.message
                    }
                })
            }
        },
        changeEye() {
            this.isEye = !this.isEye;
        },
        changeEye2() {
            this.isEye2 = !this.isEye2;
        },
    }
}
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
        background-image: linear-gradient(266deg, #25037F, #4705B2), linear-gradient(0deg, #DA33FF, transparent);
        // background-image: linear-gradient(to bottom, rgba(233,69,69), rgba(142,38,39));
        // background-size: 100% 20px;
        // background-repeat: no-repeat;
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
                color: white;
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
                background: #641BE9;
                box-shadow: 0 -0.04rem 0.12rem rgba(42,0,128,.8), inset 0 0.02rem 0.04rem #9a62ff, 0 0.01rem 0.02rem #000;
                height: 36px;
                line-height: 36px;
                width: 100%;
                border-radius: 10px;
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
                color: white;
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
            color: white;
            cursor: pointer;
            background-image: linear-gradient(180deg,#A400DE,#3E007C),linear-gradient(180deg,#C8A9D9,#7244BE);
            box-shadow: 0 0.04rem 0.14rem rgba(24,0,73,.7), inset 0 0 0.3rem rgba(233,58,255,.6);
            text-shadow: 0 1px 2px #104376;
            font-weight: 700;
            font-size: 16px;
        }

        .login-btn-disable {
            opacity: 0.5;
        }
    }
}</style>
  