<template>
    <div class="index-page">
        <!-- <div class="index-bg"></div> -->
        <!-- <div :style="{ display: isShowSlider ? 'block' : 'none' }" class="slider-menu-masking" @click="changeSlider">
            <div class="slider-menu" @click.stop="func1()">
                <div class="user-info" :class="GLOBAL.userInfo.accountid > 0 ? '' : 'user-info-hidden'">
                    <img class="avatar" src="../../assets/me/default.png" />
                    <div class="info-value">
                        <div class="nickname"><span>{{ GLOBAL.userInfo.nickname }}</span></div>
                        <div class="username">{{ GLOBAL.lanLocal['id'] }}:{{ GLOBAL.userInfo.accountid }}</div>
                    </div>
                </div>
                <div class="menu-list">
                    <div class="menu-item" :class="tabIndex == 1 ? 'active' : ''" @click="showPage(1)">
                        <img class="icon" :src="require('../../assets/slider/home.png')" />
                        <div class="bd">{{ GLOBAL.lanLocal['lobby'] }}</div>
                    </div>
                    <div class="menu-item" :class="tabIndex == 2 ? 'active' : ''" @click="showPage(2)">
                        <img class="icon" :src="require('../../assets/slider/activity.png')" />
                        <div class="bd">{{ GLOBAL.lanLocal['activity'] }}</div>
                    </div>
                    <div class="menu-item" :class="tabIndex == 10 ? 'active' : ''" @click="showPage(10)">
                        <img class="icon" :src="require('../../assets/slider/bonus.png')" />
                        <div class="bd">{{ GLOBAL.lanLocal['bonus'] }}</div>
                    </div>
                    <div class="menu-item" :class="tabIndex == 6 ? 'active' : ''" @click="showPage(6)">
                        <img class="icon" :src="require('../../assets/slider/recharge.png')" />
                        <div class="bd">{{ GLOBAL.lanLocal['recharge'] }}</div>
                    </div>
                    <div class="menu-item" :class="tabIndex == 4 ? 'active' : ''" @click="showPage(4)">
                        <img class="icon" :src="require('../../assets/slider/me.png')" />
                        <div class="bd">{{ GLOBAL.lanLocal['me'] }}</div>
                    </div>
                    <div class="menu-item" :class="tabIndex == 11 ? 'active' : ''" @click="showPage(11)">
                        <img class="icon" :src="require('../../assets/slider/vip.png')" />
                        <div class="bd">{{ GLOBAL.lanLocal['vip'] }}</div>
                    </div>
                    <div class="menu-item menu-save" @click="saveDesktop">
                        <img class="icon" :src="require('../../assets/slider/save.png')" />
                        <div class="bd">{{ GLOBAL.lanLocal['savetodesktop'] }}</div>
                    </div>
                    <div class="menu-item" @click="showPage(3)">
                        <img class="icon" :src="require('../../assets/slider/email.png')" />
                        <div class="bd">{{ GLOBAL.lanLocal['email'] }}</div>
                    </div>
                    <a class="menu-item" v-if="customer != ''" :href="customer" target="_blank">
                        <img class="icon" v-if="customerType == 1" :src="require('../../assets/line.png')" />
                        <img class="icon" v-if="customerType == 2" :src="require('../../assets/fb.png')" />
                        <img class="icon" v-if="customerType == 3" :src="require('../../assets/slider/whatsapp.png')" />
                        <img class="icon" v-if="customerType == 4" :src="require('../../assets/twitter.png')" />
                        <img class="icon" v-if="customerType == 5" :src="require('../../assets/slider/telegram.png')" />
                        <div class="bd">{{ GLOBAL.lanLocal['contact'] }}</div>
                    </a>
                    <div class="menu-item" @click="changeLan">
                        <template v-for="(item, index) in lanData">
                            <img v-if="lanCode == item.code" class="icon" :src="item.img" />
                            <div class="bd" v-if="lanCode == item.code">{{ item.title }}</div>
                            <img class="ft" v-if="lanCode == item.code" :src="require('../../assets/icon/down.png')" />
                        </template>
                        <div class="lan-box" v-if="isShowLan">
                            <div class="lan-item" v-for="(item, index) in lanData" @click="changeLanCode(item.code)">
                                <img class="icon" :src="item.img" />
                                <div>{{ item.title }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="loading-masking" v-if="loading">
            <div class="loading-page">
                <vue-simple-spinner size="large" line-fg-color="#f69b09"></vue-simple-spinner>
            </div>
        </div>
        <NavHeader v-if="tabIndex != 5 && tabIndex != 51 && tabIndex != 11" @changeSlider="changeSlider"
            @setLan="changeLanCode" @toLogin="toLogin(false)" @toReg="toLogin(true)" @toRecharge="showPage(6)"
            @close="closeModal" :accountid="GLOBAL.userInfo.accountid" :amount="amount" :lanData="lanData"
            :tabIndex="tabIndex"></NavHeader>
        <HomePage v-if="tabIndex == 1" @toGame="toGame" @toLogin="toLogin(false)" @recharge="showPage(6)"
            @saveDesktop="saveDesktop" @vip="showPage(11)" @toForgot="showPage(7)" @detail="activityDetail"></HomePage>
        <ActivityPage v-if="tabIndex == 2" @detail="activityDetail"></ActivityPage>
        <ActivityDetailPage v-if="tabIndex == 21" :id="id" @close="closeModal"></ActivityDetailPage>
        <EmailPage v-if="tabIndex == 3" @detail="emailDetail"></EmailPage>
        <EmailDetailPage v-if="tabIndex == 31" :id="id" @close="closeModal"></EmailDetailPage>
        <MyPage v-if="tabIndex == 4" @reload="reload" @logout="logout" @email="showPage(3)" @forgot="toForgot"
            :amount="amount" @vip="showPage(11)" @gameRecord="showPage(12)"></MyPage>
        <DepositPage v-if="tabIndex == 6" @close="closeModal" @toBind="toBind" @toService="showPage(8)" @reload="reload">
        </DepositPage>
        <ServicePage v-if="tabIndex == 8" @close="closeModal"></ServicePage>
        <BindPage v-if="tabIndex == 9" @close="closeModal"></BindPage>
        <SharePage v-if="tabIndex == 10" @close="closeModal" @reload="reload"></SharePage>
        <VipPage v-if="tabIndex == 11" @close="closeModal" @toDeposit="toDeposit"></VipPage>
        <GameRecordPage v-if="tabIndex == 12" @close="closeModal"></GameRecordPage>
        <!-- <Tabbar :accountid="GLOBAL.userInfo.accountid" v-if="tabIndex != 5 && tabIndex != 51" :index="tabIndex" :emailCount="emailCount" @change="showPage">
        </Tabbar> -->
        <div class="page-masking" v-if="activeList.length > 0 && ((activetype == 1 && activeList[0]['active'] != ''))">
            <div class="active-content">
                <img class="img" v-if="activetype == 1" :src="activeList[0]['active']" />
                <div class="topage" v-if="activetype == 1" @click="toLogin(true)">{{ GLOBAL.lanLocal['registernow'] }}</div>
                <img class="close" @click="closeActive" src="@/assets/active-close.png" />
            </div>
        </div>
        <div class="page-masking" v-if="activeList.length > 0 && ((activetype == 2 && activeList[1]['active'] != ''))">
            <div class="active-content">
                <img class="img" v-if="activetype == 2" :src="activeList[1]['active']" />
                <div class="topage" v-if="activetype == 2" @click="toDeposit">{{ GLOBAL.lanLocal['rechargenow'] }}</div>
                <img class="close" @click="closeActive" src="@/assets/active-close.png" />
            </div>
        </div>
        <ForgotPage v-if="isForgot" @close="closeModal" @forgotDone="forgotDone"></ForgotPage>
        <LoginPage v-if="isLogin" :isReg="isReg" @close="toLogin(false)" @success="reload"></LoginPage>
        <Sign v-if="signCover > 0" @reload="reload" @close="changeSign"></Sign>
        <Turntable @reload="reload" @changeTurntable="changeTurntable" :type="turntableType"></Turntable>
        <div class="frameBack" v-show="url">
            <img @click="changeCloseMasking" src="@/assets/index/back.png" />
        </div>
        <div class="close-masking" v-if="closeMasking">
            <div class="close-box">
                <div class="close-title">{{ GLOBAL.lanLocal['hint'] }}</div>
                <div class="close-content">{{ GLOBAL.lanLocal['closegamehint'] }}</div>
                <div class="close-btn">
                    <div class="cancel" @click="changeCloseMasking">{{ GLOBAL.lanLocal['cancel'] }}</div>
                    <div class="confirm" @click="closeFrame">{{ GLOBAL.lanLocal['ok'] }}</div>
                </div>
            </div>
        </div>
        <div class="save-masking" v-if="saveMasking">
            <div class="save-box">
                <img @click="changeSaveMasking" class="close-icon" src="@/assets/slider/close.png" />
                <div class="save-title" v-if="saveType == 1">{{ GLOBAL.lanLocal['savetitle'] }}</div>
                <div class="save-title" v-else>{{ GLOBAL.lanLocal['savetitle'] }}</div>
                <div class="save-content" v-if="saveType == 1">
                    <div class="tips">{{ GLOBAL.lanLocal['savetipsandroid'] }}</div>
                    <div class="save-guide android">
                        <img class="guide-bg" src="@/assets/slider/guide-android.png" />
                        <div>{{ webUrl.toLowerCase() }}</div>
                    </div>
                    <img class="tutorial" src="@/assets/slider/tutorial-android.png" />
                </div>
                <div class="save-content" v-else>
                    <div class="tips">{{ GLOBAL.lanLocal['savetipsiphone'] }}</div>
                    <div class="save-guide">
                        <img class="guide-bg" src="@/assets/slider/guide.png" />
                        <div>{{ 'https://www.' + webUrl.toLowerCase() }}</div>
                    </div>
                    <img class="tutorial" src="@/assets/slider/tutorial.png" />
                </div>
                <div class="save-desc">{{ GLOBAL.lanLocal['savedesc'] }}</div>
            </div>
        </div>
        <div class="gameFrame-masking" v-if="url">
            <iframe id="gameFrame" :src="url" class="gameFrame" scrolling="no"
                sandbox="allow-scripts allow-top-navigation allow-same-origin"></iframe>
        </div>
    </div>
</template>
<script>
import loadFile from "../../api/loadFile.js"
import md5 from 'js-md5';
import HomePage from '../home/home.vue'
import ActivityPage from '../activity/activity.vue'
import ActivityDetailPage from '../activity/activityDetail.vue'
import LoginPage from '../login/login.vue'
import MyPage from '../my/my.vue'
import DepositPage from '../deposit/deposit.vue'
import EmailPage from '../email/email.vue'
import EmailDetailPage from '../email/emailDetail.vue'
import ForgotPage from '../forgot/forgot.vue'
import ServicePage from '../service/service.vue'
import BindPage from '../bind/bind.vue'
import SharePage from '../share/share.vue'
import VipPage from '../vip/vip.vue'
import NavHeader from '../navheader/navheader.vue'
import Tabbar from '../tabbar/tabbar.vue'
import AES from "../../common/AES.js"
import { doPost } from '../../api/api.js'
import { v4 as uuidv4 } from 'uuid'
import Turntable from '../turntable/turntable.vue'
import Sign from '../sign/sign.vue'
import GameRecordPage from '../gameRecord/gameRecord.vue'
export default {
    name: 'index',
    components: {
        NavHeader, HomePage, Tabbar, LoginPage, MyPage, ActivityPage, DepositPage, EmailPage, ActivityDetailPage, EmailDetailPage
        , ForgotPage, ServicePage, BindPage, SharePage, VipPage, Turntable, Sign, GameRecordPage
    },
    data() {
        return {
            id: 0,
            url: '',
            lanCode: '',
            lanData: [
                { 'code': 'por', 'img': require('../../assets/slider/por.png'), 'title': 'Portugal' },
                { 'code': 'en', 'img': require('../../assets/slider/en.png'), 'title': 'English' },
            ],
            tabIndex: 1,
            isShowSlider: false,
            activityList: [],
            loading: false,
            isShowLan: false,
            amount: '0.00',
            loginType: 1,
            innerHeight: 0,
            emailTimer: null,
            emailCount: 0,
            activeList: [],
            activetype: 0,
            customer: '',
            customerType: 0,
            isReg: false,
            turntableType: 0,
            signCover: 0,
            closeMasking: false,
            saveMasking: false,
            saveType: 0,
            webUrl: '',
            isLogin: false,
            isForgot: false,
        }
    },
    created() {
        this.innerHeight = window.innerHeight - 130
        let lanCode = localStorage.getItem(md5('__lanCode__'))
        if (lanCode) {
            this.GLOBAL.lanCode = lanCode
        }
        this.lanCode = this.GLOBAL.lanCode
        const lanLocal = loadFile("static/json/" + this.GLOBAL.lanCode + ".json", false);
        this.GLOBAL.lanLocal = lanLocal

        let config = loadFile("static/config.json", false)
        this.webUrl = config.weburl

        this.activeList[0] = []
        this.activeList[1] = []
        this.activeList[0]['active'] = config['noLoggedPic'] ? config['noLoggedPic'] : ''
        this.activeList[1]['active'] = config['loginPic'] ? config['loginPic'] : ''
        this.activeList.forEach(item => {
            if (item.active != '') {
                let suffix = item.active.slice(-4)
                item.active = item.active.replace(suffix, "_" + this.GLOBAL.lanCode + suffix)
            }
        });

        const json = loadFile("static/nonce", true);
        if (json != null) {
            this.GLOBAL.apiAesKey = json['api_aes_key'];
            this.GLOBAL.api_key = json['api_key'];
            this.GLOBAL.apiUrl = json['ip'];
        }
        let deviceid = localStorage.getItem(md5('__deviceid__'))
        if (deviceid) {
            deviceid = AES.decrypt(deviceid, this.GLOBAL.apiAesKey)
        } else {
            deviceid = uuidv4()
            localStorage.setItem(md5('__deviceid__'), AES.encrypt(deviceid, this.GLOBAL.apiAesKey))
        }
        this.GLOBAL.deviceid = deviceid
        doPost({
            n: 'AppEx',
            a: 'get_lan',
            lan: this.GLOBAL.lanCode
        }).then((res) => {
            if (res.code === 0) {
                this.GLOBAL.lanArr = JSON.parse(res.data[this.GLOBAL.lanCode])
            }
        })
        this.getCusomter()
        this.reload()
    },
    computed: {

    },
    mounted() {
        window.parent.postMessage(
            {
                cmd: 'jump',
                params: {
                    val: 1
                }
            }, '*'
        )
        window.addEventListener('message', event => {
            let data = event.data
            if (data.cmd === 'jump') {
                localStorage.setItem("only_data", 1)
                this.reload()
            }
        })
    },
    methods: {
        toForgot() {
            this.isForgot = !this.isForgot
        },
        forgotDone() {
            this.showPage(1)
            this.toLogin(false)
        },
        toLogin(isReg) {
            this.showPage(this.tabIndex)
            this.isReg = isReg
            this.isLogin = !this.isLogin
        },
        changeSaveMasking() {
            this.saveMasking = !this.saveMasking
        },
        saveDesktop() {
            if (this.isShowSlider) {
                this.changeSlider()
            }
            const ua = navigator.userAgent.toLowerCase()
            if (ua.indexOf('android') != -1) {
                this.saveType = 1
            } else if (ua.indexOf('iphone') != -1) {
                this.saveType = 2
            }
            this.changeSaveMasking()
        },
        changeCloseMasking() {
            this.closeMasking = !this.closeMasking
        },
        closeFrame() {
            localStorage.setItem("only_data", 1)
            this.changeCloseMasking()
            this.reload()
        },
        getUserSign() {
            doPost({
                n: 'AppEx',
                a: 'get_user_sign',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                if (res.code === 0) {
                    this.isSign = res.data.isSign
                    this.canSign = res.data.canSign
                    if (this.canSign && !this.isSign) {
                        this.changeSign(1)
                    } else {
                        this.changeNormalT()
                    }
                }
            })
        },
        changeSign(signCover) {
            this.signCover = signCover;
            if (this.signCover == 0) {
                this.changeNormalT()
            }
        },
        changeTurntable(type) {
            let turntableType = this.turntableType
            this.turntableType = 0
            if (type == 0 && turntableType == 1) {
                this.changeHightT()
            }
        },
        changeNormalT() {
            if (this.turntableType == 1 || this.turntableType == -1) {
                return
            }
            doPost({
                n: 'AppEx',
                a: 'user_turntable',
                accountid: this.GLOBAL.userInfo.accountid,
                type: 1,
            }).then((res) => {
                if (res.code === 0) {
                    let normalCount = res.data.count
                    let DayNum = res.data.turntable.DayNum
                    DayNum = DayNum ? DayNum : 0
                    if (normalCount < DayNum) {
                        this.turntableType = 1
                    } else {
                        this.changeHightT()
                    }
                }
            })
        },
        changeHightT() {
            doPost({
                n: 'AppEx',
                a: 'user_turntable',
                accountid: this.GLOBAL.userInfo.accountid,
                type: 2,
            }).then((res) => {
                if (res.code === 0) {
                    let normalCount = res.data.count
                    let DayNum = res.data.turntable.DayNum
                    DayNum = DayNum ? DayNum : 0
                    if (normalCount < DayNum) {
                        this.turntableType = 2
                    }
                }
            })
        },
        getCusomter() {
            doPost({
                n: 'AppEx',
                a: 'get_customer_list',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                if (res.code === 0) {
                    let customerList = res.data['customer']
                    customerList.forEach((item) => {
                        if (this.customer == '') {
                            if (item['CfgType'] == 290) {
                                let url = item['CfgValue']
                                if (url.includes("line")) {
                                    this.customerType = 1
                                } else if (url.includes("facebook")) {
                                    this.customerType = 2
                                } else if (url.includes("whatsapp")) {
                                    this.customerType = 3
                                } else if (url.includes("twitter")) {
                                    this.customerType = 4
                                } else {
                                    this.customerType = 5
                                }
                                this.customer = url
                            }
                        }

                    })
                }
            })
        },
        closeActive() {
            if (this.activetype == 1) {
                this.activetype = -1
            } else if (this.activetype == 2) {
                this.activetype = -2
            }
            if (this.GLOBAL.userInfo.name) {
                this.getUserSign()
            }
        },
        toGame(url) {
            this.loading = true
            this.url = url
        },
        reg() {
            this.showPage(51)
        },
        signin() {
            this.showPage(5)
        },
        logout() {
            this.GLOBAL.userInfo.accountid = 0
            this.GLOBAL.userInfo.name = ''
            this.GLOBAL.userInfo.passcode = ''
            localStorage.removeItem(md5('__name__'))
            localStorage.removeItem(md5('__pwd_'))
            clearInterval(this.emailTimer)
            this.showPage(1)
        },
        activityDetail(id) {
            this.id = Number(id)
            localStorage.setItem("back", this.tabIndex)
            if (this.isShowSlider) {
                this.changeSlider()
            }
            this.showPage(21)
        },
        emailDetail(id) {
            this.id = Number(id)
            localStorage.setItem("back", this.tabIndex)
            this.showPage(31)
        },
        func1() { },
        changeLan() {
            this.isShowLan = !this.isShowLan
        },
        reload() {
            this.loading = true
            this.isLogin = false
            this.url = ""
            let that = this
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
            let reg = localStorage.getItem('reg')
            localStorage.removeItem('reg')
            let onlyData = localStorage.getItem("only_data")
            localStorage.removeItem('only_data')
            if (name && pwd) {
                doPost({
                    n: 'AppGame',
                    a: 'do_login',
                    mobile: name,
                    password: pwd,
                    isFirst: reg ? reg : 0
                }).then((res) => {
                    if (res.code === 0) {
                        localStorage.setItem(md5('__name__'), AES.encrypt(name, that.GLOBAL.apiAesKey))
                        localStorage.setItem(md5('__pwd_'), AES.encrypt(pwd, that.GLOBAL.apiAesKey))

                        that.GLOBAL.userInfo.accountid = res.data.accountid
                        that.GLOBAL.userInfo.nickname = res.data.nickname
                        that.GLOBAL.userInfo.name = name
                        that.GLOBAL.userInfo.passcode = pwd
                        that.GLOBAL.userInfo.isVirtual = res.data.isVirtual
                        that.GLOBAL.userInfo.isP = res.data.isP
                        that.amount = res.data.amount

                        // that.getEmailCount(true)
                        if (!onlyData) {
                            that.tabIndex = 1

                            if (that.activetype >= -1) {
                                that.activetype = 2
                                if (that.activeList.length <= 0 || that.activeList[1]['active'] == '') {
                                    that.getUserSign()
                                }
                            }
                        }
                    } else {
                        if (that.activetype >= 0) {
                            that.activetype = 1
                        }
                        this.logout()
                    }
                    this.loading = false
                })
            } else {
                if (that.activetype >= 0) {
                    that.activetype = 1
                }
                this.loading = false
            }

        },
        showPage(index) {
            this.isForgot = false
            this.isShowLan = false
            this.signCover = -1
            this.turntableType = -1
            this.isShowSlider = false
            if ((!this.GLOBAL.userInfo.name || !this.GLOBAL.userInfo.pwd) & (index == 3 || index == 4 || index == 6 || index == 10)) {
                this.toLogin(false)
                return;
            }
            if (this.tabIndex != index) {
                this.tabIndex = index
                this.closeActive()
                window.scrollTo(0, 0)
            }
        },
        changeSlider() {
            if (this.isShowSlider) {
                this.isShowSlider = !this.isShowSlider
                this.isShowLan = false
            } else {
                this.isShowSlider = !this.isShowSlider
            }
        },
        toDeposit() {
            if (!this.GLOBAL.userInfo.accountid || this.GLOBAL.userInfo.accountid == 0) {
                this.$toast.error(this.GLOBAL.lanLocal['nologin'], {
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
                return
            }
            localStorage.setItem("back", this.tabIndex)
            this.showPage(6)
        },
        toBind() {
            localStorage.setItem("back", this.tabIndex)
            this.showPage(9)
        },
        closeModal() {
            let back = localStorage.getItem("back")
            if (back) {
                this.showPage(Number(back))
                localStorage.removeItem("back")
            } else {
                this.showPage(1)
            }
            this.id = 0
        },
        changeLanCode(lanCode) {
            if (lanCode == this.lanCode) {
                this.showLan = false
                return
            }
            this.loading = true
            this.lanCode = lanCode
            localStorage.setItem(md5('__lanCode__'), this.lanCode)
            setTimeout(() => {
                window.location.reload()
            }, 100)
        },
    }
}
</script>

<style lang="less" scoped>
@media screen and (min-width: 950px) {
    .gameFrame-masking {
        padding-left: 450px;
    }

    .slider-menu-masking {
        width: 300px !important;
        display: block !important;
    }

    .slider-menu {
        width: 300px !important;
    }

    .menu-save {
        display: none !important;
    }

    .frameBack {
        left: 324px !important;
    }

    .slider-menu-masking {
        top: 0 !important;
        height: 100% !important;
    }

    .slider-menu {
        height: -moz-calc(100vh) !important;
        height: -webkit-calc(100vh) !important;
        height: calc(100vh) !important;
    }

    .user-info-hidden {
        visibility: hidden;
        display: block;
    }

    .index-bg {
        left: 300px !important;
        width: calc(100% - 300px) !important;
    }
}

.index-bg {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-image: url("../../assets/index/bg.jpg");
    background-size: 100% auto;
    background-repeat: repeat-y;
}

.main-page {
    max-width: 950px;
}

.slider-menu-masking {
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    height: calc(100% - 60px);
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
}

.slider-menu::-webkit-scrollbar {
    width: 0;
}

.slider-menu {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgb(142, 38, 39);
    height: -moz-calc(100vh - 60px);
    height: -webkit-calc(100vh - 60px);
    height: calc(100vh - 60px);
    width: 75%;
    overflow-y: scroll;
    padding: 0 18px 160px;
    text-align: left;
    box-sizing: border-box;

    .user-info-hidden {
        display: none;
    }

    .user-info {
        padding: 26px 6px;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        .avatar {
            width: 44px;
            height: 44px;
        }

        .info-value {
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
                color: #fff;
            }
        }
    }

    .activity-title {
        color: rgb(233, 222, 124);
        font-size: 16px;
    }

    .activity-list {
        margin: 10px 0 30px;

        .activity-item {
            margin-bottom: 6px;

            img {
                width: 100%;
                height: auto;
                border-radius: 6px;
            }
        }
    }

    .menu-list {
        margin-bottom: 30px;
    }

    .active {
        .bd {
            font-weight: 600;
        }
    }

    .menu-item {
        width: 100%;
        display: flex;
        align-items: center;
        border-radius: 3px;
        position: relative;
        padding: 10px 6px;
        box-sizing: border-box;
        text-decoration: none;
        position: relative;
        border-bottom: 1px solid rgb(124, 30, 31);
        cursor: pointer;

        .icon {
            height: auto;
            width: 32px;
            margin-right: 10px;
        }

        .bd {
            flex: 1;
            color: #fff;
            font-size: 14px;
            font-family: Arial;
            line-height: 1;
        }

        .ft {
            width: 22px;
            height: auto;
        }

        .lan-box {
            position: absolute;
            left: 0;
            top: 52px;
            width: 100%;
            background-color: rgb(112, 20, 33);
            border-radius: 6px;

            .lan-item {
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                position: relative;
                padding: 0 20px;
                box-sizing: border-box;
                // border-bottom: 1px solid rgb(44, 50, 57);

                .icon {
                    height: 30px;
                    width: 30px;
                    margin-right: 8px;
                }

                div {
                    color: rgb(144, 151, 161);
                    font-size: 16px;
                }
            }
        }
    }

    .menu-top {
        margin-top: 6px;
    }
}


.active-content {
    width: calc(100vw - 40px);
    max-height: 100%;

    .img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
        overflow: hidden;
    }

    .topage {
        background: rgb(233, 116, 20);
        color: #fff;
        width: 115px;
        margin: 15px auto;
        border-radius: 20px;
        cursor: pointer;
    }

    .close {
        width: 16px;
        height: 16px;
        border-radius: 16px;
        border: 1px solid #fff;
        padding: 5px;
        cursor: pointer;
    }
}

.page-masking {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.frameBack {
    position: fixed;
    top: 20px;
    left: 24px;
    z-index: 9999;

    >img {
        height: 40px;
        width: 40px;
    }
}

.save-masking {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .save-box {
        background-color: rgba(0, 0, 0, 0.8);
        border: 1px solid rgba(200, 200, 200, 0.8);
        width: 80%;
        max-width: 400px;
        border-radius: 6px;
        padding: 6px;
        text-align: right;
        color: #fff;
        font-family: Arial;

        .close-icon {
            height: 24px;
            width: auto;
        }

        .save-title {
            text-align: center;
            font-size: 18px;
        }

        .save-content {
            padding: 14px;

            .tips {
                font-size: 16px;
                text-align: left;
                line-height: 1.3;
            }

            .save-guide {
                position: relative;
                margin-top: 16px;

                .guide-bg {
                    width: 100%;
                    height: auto;
                }

                >div {
                    position: absolute;
                    top: 14px;
                    left: 0;
                    width: 100%;
                    font-size: 14px;
                    text-align: center;
                }
            }

            .android {
                >div {
                    color: #333;
                    top: calc(50% - 10px);
                    text-align: left;
                    padding-left: 62px;
                    width: 110px;
                    overflow: hidden;
                }
            }

            .tutorial {
                margin-top: 8px;
                width: 100%;
                height: auto;
            }
        }

        .save-desc {
            padding: 6px 26px 12px;
            font-size: 14px;
            color: #55abff;
            text-align: left;
            line-height: 1.3;
        }
    }
}

.close-masking {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .close-box {
        background-color: rgba(0, 0, 0, 0.8);
        width: 80%;
        max-width: 450px;
        border-radius: 6px;
        padding: 0 26px;
        box-sizing: border-box;

        .close-title {
            text-align: center;
            color: #fff;
            font-size: 18px;
            padding: 16px 0 10px;
        }

        .close-content {
            border-radius: 6px;
            padding: 18px 12px;
            font-size: 14px;
            text-align: left;
            color: #fff;
        }

        .close-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .cancel,
            .confirm {
                cursor: pointer;
                border-radius: 4px;
                height: 42px;
                line-height: 42px;
                width: 120px;
                font-size: 16px;
                text-align: center;
                margin: 18px 0;
                font-family: Arial;
                font-weight: 400;
                letter-spacing: 1.2px;
            }

            .cancel {
                background-color: rgb(204, 75, 25);
                color: #fff;
            }

            .confirm {
                background-color: rgb(58, 140, 37);
                color: #fff;
            }
        }
    }
}


.gameFrame-masking {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #201f27;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.gameFrame {
    height: 100%;
    width: 100%;
    max-width: 750px;
    border: 0;
    background-color: #201f27;
}

.empty {
    padding-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        height: 50px;
        width: auto;
    }

    .tips {
        text-align: center;
        font-size: 14px;
        color: #efcf7f;
    }
}</style>