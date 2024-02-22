<template>
    <div class="main-page">
        <div class="page-desc">
            <div class="dialog-deposit-select">
                <template  v-for="item in customers">
                    <div v-if="item.href !=''" class="item-select" style="background: rgb(112,20,33);">
                        <img class="avatar" :src="item.avatar" alt=""/>
                        <div class="info">
                            <div class="name">{{item.name}}</div>
                            <div class="desc" v-if="item.id == 0">
                                <img v-if="item.type == 1" :src="require('../../assets/line.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/fb.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/whats.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/twitter.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/telegram.png')"/>
                            </div>
                            <div class="desc" v-if="item.id == 290">
                                <img v-if="item.type == 1" :src="require('../../assets/line.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/fb.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/whats.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/twitter.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/telegram.png')"/>
                                {{ GLOBAL.lanLocal['topup'] }}
                            </div>
                            <div class="desc" v-if="item.id == 291">
                                <img v-if="item.type == 1" :src="require('../../assets/line.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/fb.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/whats.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/twitter.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/telegram.png')"/>
                                {{ GLOBAL.lanLocal['withdrawmoney'] }}
                            </div>
                            <div class="desc" v-if="item.id == 292">
                                <img v-if="item.type == 1" :src="require('../../assets/line.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/fb.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/whats.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/twitter.png')"/>
                                <img v-if="item.type == 1" :src="require('../../assets/telegram.png')"/>
                                {{ GLOBAL.lanLocal['gamecustomerservice'] }}
                            </div>
                        </div>
                        <div class="contact">
                            <a :href="item.href" target="_blank">
                                {{GLOBAL.lanLocal['link']}}
                            </a>
                        </div>
                    </div>
                </template>
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
    name: 'service',
    data() {
        return {
            amount: 0,
            money: '',
            moneyfocus: false,
            innerHeight: 0,
            tabIndex: 0,
            customers: [
                {'id': 0, 'avatar': require('../../assets/c4.jpg'), 'name': 'Customer service', 'type': 0, 'href': ''},
                {'id': 290, 'avatar': require('../../assets/c2.jpg'), 'name': 'Crystal', 'type': 0, 'href': ''},
                {'id': 291, 'avatar': require('../../assets/c1.jpg'), 'name': 'Lily', 'type': 0, 'href': ''},
                {'id': 292, 'avatar': require('../../assets/c3.jpg'), 'name': 'Alice', 'type': 0, 'href': ''},
                // {'id': 293, 'avatar': require('../../assets/c4.jpg'), 'name': 'Lucy', 'contact': 'Lucas111', 'icon': require('../../assets/twitter.png'), 'href': ''},
                // {'id': 294, 'avatar': require('../../assets/c5.jpg'), 'name': 'Cherry', 'contact': 'Lucas111', 'icon': require('../../assets/telegram.png'), 'href': ''}
            ]
        }
    },
    created() {
        this.innerHeight = window.innerHeight - 130
        // this.doLogin()
        doPost({
            n: 'AppEx',
            a: 'get_customer_list',
            accountid: this.GLOBAL.userInfo.accountid
        }).then((res) => {
            if (res.code === 0) {
                let customerList = res.data['customer']
                customerList.forEach(item => {
                    this.customers.forEach((item2, index) => {
                        if(item['CfgType'] == item2['id'])
                        {
                            let url = item['CfgValue']
                            this.customers[index]['href'] = url
                                            if(url.includes("line"))
                                            {
                                                this.customers[index]['type'] = 1
                                            }else if(url.includes("facebook"))
                                            {
                                                this.customers[index]['type'] = 2
                                            }else if(url.includes("whatsapp"))
                                            {
                                                this.customers[index]['type'] = 3
                                            }else if(url.includes("twitter"))
                                            {
                                                this.customers[index]['type'] = 4
                                            }else{
                                                this.customers[index]['type'] = 5
                                            }
                        }
                    })
                });
            }
        })
    },
    computed: {
        loginClass() {
            return {
                'v-label-active': this.moneyfocus
            }
        },
    },
    methods: {
        doLogin() {
            let that = this
            const json = loadFile("static/nonce", true);
            if (json != null) {
                let api_aes_key = json['api_aes_key']
                let name = localStorage.getItem(md5('__name__'))
                let pwd = localStorage.getItem(md5('__pwd_'))
                if (name) {
                    name = AES.decrypt(name, api_aes_key)
                    if (name) {
                        this.GLOBAL.userInfo.name = name
                    }
                }
                if (pwd) {
                    pwd = AES.decrypt(pwd, api_aes_key)
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
                            that.GLOBAL.userInfo.accountid = res.data.accountid
                            that.amount = res.data.amount
                        }
                    })
                }
            }
        },
        moneyFocus() {
            this.$refs.money.focus()
            this.moneyfocus = true
        },
        checkMoney(needResult = false) {
            if (this.money && this.money > 100) {
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
                    PayType: 1
                }).then((res) => {
                    if (res.code === 0) {
                        this.$toast.success('ส่งเรียบร้อยแล้ว', {
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
                        this.doLogin()
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
    margin: 0 auto;
    position: relative;
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

    /* display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center; */
    .item-container {
        display: flex;
        justify-content: center;
        margin-top: 30px;

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
        width: 100%;
        margin: 0.5rem;
        padding: 12px;
        background: linear-gradient(180deg, #38d851, #0f6a00);
        box-sizing: border-box;
        border-radius: 8px;
        display: flex;
        align-items: center;
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 40px;
        }
        .info {
            flex: 1;
            text-align: left;
            margin-left: 10px;
            .name {
                color: #fff;
                font-size: 18px;
            }
            .desc {
                color: #ffd727;
                font-size: 13px;
                display: flex;
                align-items: center;
                >img {
                    height: 16px;
                    width: 16px;
                    margin-right: 4px;
                }
            }
        }
        .contact {
            border-radius: 6px;
            padding: 6px 14px;
            background: linear-gradient(rgb(237, 120, 57), rgb(254, 182, 7));
            >a {
                color: #000;
                font-size: 14px;
                text-decoration: none;
                font-weight: 600;
            }
        }
    }
}</style>
  