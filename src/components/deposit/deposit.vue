<template>
    <div class="main-page">
        <div class="header-cover"></div>
        <div class="main-detail">
            <div class="page-title">
            <div class="title-tab" @click="changeType(1)" :class="type == 1 ? 'active' : ''">{{ GLOBAL.lanLocal['deposit']
            }}</div>
            <div class="title-tab" @click="changeType(2)" :class="type == 2 ? 'active' : ''">{{ GLOBAL.lanLocal['withdraw']
            }}</div>
            <!-- <a class="close">
                <img class="icon" @click="close" :src="require('../../assets/amount/close.png')" />
            </a> -->
        </div>
        <div class="content" v-if="type == 1">
            <div>
                <div class="recharge-box">
                    <div v-for="(item, index) in moneyData" :key="index + 1" class="recharge-item"
                        @click="genMoney(item.PayMoney)"
                        :class="{ 'active': money == item.PayMoney, 'recharge-item-mid': (((index - 1 == 0) || ((index - 1) % 3 == 0))) }">
                        {{ GLOBAL.currencySymbol }}{{ item.PayMoney }}
                        <img :src="require('../../assets/amount/select-icon.png')" />
                        <div class="first-box" v-if="item.IsFirst">{{ GLOBAL.lanLocal['first'] }}</div>
                        <div class="add-box" v-if="item.AddMoney">+{{ item.AddMoney }}</div>
                    </div>
                </div>
                <div class="s-box" v-if="canInput == 1">
                    <div class="link">
                        <div class="tips">{{ GLOBAL.lanLocal['entervalue'] }}</div>
                        <div class="login-info-item">
                            <div class="v-pre">{{ GLOBAL.currencySymbol }}</div>
                            <div class="v-box">
                                <input v-model="money" class="v-input" type="number" placeholder="0" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="s-box">
                    <div class="button">
                        <input class="login-button" type="button" @click="doDeposit" :value="GLOBAL.lanLocal['submit']" />
                    </div>
                </div>
                <div class="s-box c-box">
                    <div class="button">
                        <input class="register-button" type="button" @click="toC()" :value="GLOBAL.lanLocal['contact']" />
                    </div>
                </div>
            </div>
        </div>
        <div class="content" v-if="type == 2">
            <div v-if="isRechage">
                <div class="withdraw-title">{{ GLOBAL.lanLocal['candraw'] }}:{{ GLOBAL.currencySymbol }}&nbsp;{{ userAmount }}
                </div>
                <div class="recharge-box">
                    <div v-for="(item, index) in withdrawAmount" :key="index + 1" class="recharge-item"
                        @click="genAmount(item)"
                        :class="{ 'active': amount == item, 'recharge-item-mid': (((index - 1 == 0) || ((index - 1) % 3 == 0))) }">
                        {{ GLOBAL.currencySymbol }}{{ item }}<img :src="require('../../assets/amount/select-icon.png')" />
                    </div>
                </div>
                <div class="s-box">
                    <div class="link">
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="text" disabled="disabled" v-model="cardInfo.CardName" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="s-box">
                    <div class="link">
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="text" disabled="disabled" v-model="cardInfo.CardNo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="s-box">
                    <div class="link">
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="text" disabled="disabled" v-model="cardInfo.whatsapp" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="s-box">
                    <div class="link">
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="text" disabled="disabled" v-model="cardInfo.email" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="s-box">
                    <div class="link">
                        <div class="login-info-item">
                            <div class="v-box2">
                                <input class="v-input2" type="number" v-model="amount" @input="genRealAmount"
                                    :disabled="withdrawConfig.IsManual != 1"
                                    :placeholder="GLOBAL.lanLocal['withdrawalamount']" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="desc">
                    {{ GLOBAL.lanLocal['fee'] }}: {{ withdrawConfig.Fee }}%,
                    {{ GLOBAL.lanLocal['realamount'] }}:{{ GLOBAL.currencySymbol }} {{ realAmount }}
                </div>
                <div class="withdrawal-type">
                    {{ GLOBAL.lanLocal['withdrawaltype'] }}:&nbsp
                    <select class="withdrawal-select" v-model="pix">
                        <option value="-1">{{ GLOBAL.lanLocal['pleasechoose'] }}</option>
                        <option v-for="(item, i) in pixList" :value="i">{{ item }}</option>
                    </select>
                </div>
                <div class="s-box" style="margin-top: 60px">
                    <div class="button">
                        <input class="login-button" type="button" @click="doWithdraw" :value="GLOBAL.lanLocal['submit']" />
                    </div>
                </div>
                <div class="s-box c-box">
                    <div class="button">
                        <input class="register-button" type="button" @click="toC()" :value="GLOBAL.lanLocal['contact']" />
                    </div>
                </div>
                <div class="content" v-html="withdrawConfig.Descript"></div>
            </div>
            <div v-else>
                <div class="content" v-html="withdrawConfig.NoChargeDescript"></div>
            </div>
        </div>
        <div class="card-masking" v-show="showCardModal" @click="changeCardModal">
            <div class="card-modal" @click.stop="func1()">
                <div class="card-title">
                    {{ GLOBAL.lanLocal['payresult'] }}
                </div>
                <div class="card-footer">
                    <input class="ok-btn" type="button" @click="close" :value="GLOBAL.lanLocal['paysuccess']" />
                    <input class="cancel-btn" type="button" @click="changeCardModal"
                        :value="GLOBAL.lanLocal['paycancel']" />
                </div>
            </div>
        </div>
        <div class="loading-masking" v-if="loading">
            <div class="loading-page">
                <vue-simple-spinner size="large" line-fg-color="#f69b09"></vue-simple-spinner>
            </div>
        </div>
        </div>
    </div>
</template>
  
<script>
import Clipboard from 'clipboard'
import { doPost } from '../../api/api.js'
import { doPostCharge } from '../../api/api_charge.js'
import AES from "../../common/AES.js"
import decodeApiLan from '../../api/decodeApiLan.js'
import md5 from 'js-md5';
export default {
    name: 'deposit',
    data() {
        return {
            money: '',
            moneyStr: '0.00',
            moneyfocus: false,
            tabIndex: 0,
            shareUrl: '',
            qrcodeUrl: '',
            moneyData: [],
            type: 1,
            userAmount: '0.00',
            amount: '',
            cardInfo: [],
            loading: false,
            customerCardInfo: [],
            orderNo: '',
            withdrawConfig: [],
            withdrawAmount: [],
            realAmount: '0.00',
            fee: 0,
            showCardModal: false,
            cardType: '',
            isRechage: true,
            pixList: [],
            pix: -1,
            canInput: 0,
        }
    },
    props: {
        isBindBack: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        loginClass() {
            return {
                'v-label-active': this.moneyfocus
            }
        }
    },
    created() {
        if (this.isBindBack) {
            this.type = 2
            this.doLogin()
        }
        this.getpaychnannels()
        this.getDrawConfig()
    },
    methods: {
        getpaychnannels() {
            doPost({
                n: 'AppEx',
                a: 'get_pay_channels',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                if (res.code === 0) {
                    this.canInput = res.data.canInput
                    let list = res.data.paytypes
                    if (list.length > 0) {
                        this.moneyData = list[0].PayMoneyList
                        this.cardType = list[0].CardType
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
            })
        },
        changeCardModal() {
            this.showCardModal = !this.showCardModal
        },
        func1() {
        },
        genMoney(money) {
            this.money = Number(money)
            if (this.money) {
                this.moneyStr = this.money.toFixed(2)
            }
        },
        genAmount(amount) {
            this.amount = amount
            this.genRealAmount()
        },
        genRealAmount() {
            // this.fee = (this.amount * (this.withdrawConfig.Fee / 100)).toFixed(2)
            var numRe = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
            if (numRe.test(this.amount)) {
                this.realAmount = Number(this.amount - this.fee).toFixed(2)
            } else {
                this.realAmount = '0.00'
            }
        },
        moneyFocus() {
            this.$refs.money.focus()
            this.moneyfocus = true
        },
        doDeposit() {
            if (this.money == '' || this.money <= 0) {
                return;
            }
            var numRe = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
            if (!numRe.test(this.money)) {
                this.$toast.warning(this.GLOBAL.lanLocal['amountformaterror'], {
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
                return;
            }

            let min = Number(this.moneyData[0]['PayMoney'])
            let max = Number(this.moneyData[this.moneyData.length - 1]['PayMoney'])
            if (this.money < min) {
                this.$toast.warning(this.GLOBAL.lanLocal['rechargemoneyless'] + min, {
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
                return;
            }
            if (this.money > max) {
                this.$toast.warning(this.GLOBAL.lanLocal['rechargemoneymore'] + max, {
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
                return;
            }

            this.loading = true
            var windowReference = window.open();
            doPostCharge({
                n: 'App',
                a: 'get_CommonOrder',
                LoginID: this.GLOBAL.userInfo.accountid,
                total_fee: this.money,
                cardType: this.cardType
            }).then((res) => {
                if (res.code === 0) {
                    this.orderNo = res.message

                    doPostCharge({
                        n: 'App',
                        a: 'get_PayCommonOrder',
                        LoginID: this.GLOBAL.userInfo.accountid,
                        cardType: this.cardType,
                        szOrderNo: this.orderNo,
                        total_fee: this.money
                    }).then((res) => {
                        if (res.code === 0) {
                            let data = JSON.parse(res.data)
                            // this.changeCardModal()
                            windowReference.location = data.payurl;
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

                    // doPost({
                    //     n: 'AppEx',
                    //     a: 'getCustomerCard',
                    //     accountid: this.GLOBAL.userInfo.accountid,
                    // }).then((res) => {
                    //     if (res.code === 0) {
                    //         this.customerCardInfo = res.data
                    //         this.changeCardModal()
                    //     } else {
                    //         const data = decodeApiLan(res, this.GLOBAL.lanArr);
                    //         this.$toast.error(data.message, {
                    //             position: "top-center",
                    //             timeout: 2000,
                    //             closeOnClick: true,
                    //             pauseOnFocusLoss: true,
                    //             pauseOnHover: true,
                    //             draggable: true,
                    //             draggablePercent: 0.6,
                    //             showCloseButtonOnHover: false,
                    //             hideProgressBar: true,
                    //             closeButton: false,
                    //             icon: true,
                    //             rtl: false
                    //         });
                    //     }
                    //     this.loading = false
                    // })
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
                    this.loading = false
                }
            })
        },
        doWithdraw() {
            this.loading = true
            if (this.amount % 1 != 0) {
                this.$toast.warning(this.GLOBAL.lanLocal['withdrawint'], {
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
                return
            }

            var numRe = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
            if (!numRe.test(this.amount)) {
                this.$toast.warning(this.GLOBAL.lanLocal['amountformaterror'], {
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
                return;
            }
            if (this.pix < 0) {
                this.$toast.warning(this.GLOBAL.lanLocal['withdrawaltypeerror'], {
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
                return
            }
            if (this.amount && this.amount > 0) {
                doPost({
                    n: 'AppDraw',
                    a: 'add_draw_money',
                    accountid: this.GLOBAL.userInfo.accountid,
                    money: this.amount * 10000,
                    PayType: 3,
                    checkSend: 1,
                    pix: this.pix
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
                    this.loading = false
                })
            } else {
                this.$toast.error(this.GLOBAL.lanLocal['withdrawamoneyerr'], {
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
            }

        },
        toC() {
            this.$emit('toService')
        },
        close() {
            this.$emit('close')
        },
        changeType(type) {
            if (type == 2 && this.isRechage) {
                this.doLogin()
            }
            this.type = type
        },
        getDrawConfig() {
            this.loading = true
            doPost({
                n: 'AppDraw',
                a: 'get_draw_config',
            }).then((res) => {
                if (res.code === 0) {
                    this.withdrawConfig = res.data
                    let quick = this.withdrawConfig.QuickAmount
                    this.withdrawAmount = quick.split(',')
                    // this.getUserRechargeMoney()
                }
                this.loading = false
            })
        },
        getUserRechargeMoney() {
            doPost({
                n: 'AppDraw',
                a: 'user_recharge_money',
                accountid: this.GLOBAL.userInfo.accountid,
                checkSend: 1
            }).then((res) => {
                if (res.code === 0) {
                    let rechargeMoney = res.data.money
                    let isWhite = res.data.isWhite
                    if (isWhite || Number(rechargeMoney) >= Number(this.withdrawConfig.Need)) {
                        this.isRechage = true
                    }
                }
            })
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
                        this.userAmount = res.data.amount
                        doPost({
                            n: 'AppDraw',
                            a: 'get_card_info',
                            accountid: this.GLOBAL.userInfo.accountid,
                            PayType: 3
                        }).then((res) => {
                            if (res.code === 0) {
                                if (res.data == undefined || res.data.CardNo == '') {
                                    this.$emit("toBind")
                                } else {
                                    this.cardInfo = res.data
                                    doPost({
                                        n: 'AppEx',
                                        a: 'get_pix_list',
                                        accountid: this.GLOBAL.userInfo.accountid,
                                    }).then((res) => {
                                        if (res.code === 0) {
                                            this.pixList = res.data
                                        }
                                    })
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
                        this.loading = false
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
.main-detail {
    max-width: 950px;
    margin: 0 auto;
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

.card-modal {
    background: rgb(25, 26, 31);
    border-radius: 4px;
    width: 90%;

    .card-title {
        padding: 20px 16px 8px;
        display: flex;
        align-items: center;
        background: rgb(18, 19, 23);
        color: rgb(255, 182, 0);
        border-bottom: 1px solid rgb(34, 40, 48);
        position: relative;
        font-weight: 400;
        font-size: 18px;
    }

    .card-body {
        padding: 10px 18px;
        text-align: left;

        .body-item {

            .item-title {
                font-size: 13px;
                color: #e6e6e6;
            }

            .item-content {
                font-size: 18px;
                color: #fff;
                user-select: text;
            }

            .item-desc {
                font-size: 18px;
                color: rgb(61, 202, 64);
            }
        }
    }

    .card-footer {
        width: 80%;
        margin: 20px auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .ok-btn,
        .cancel-btn {
            width: 45%;
            height: 44px;
            color: #fff;
            font-size: 18px !important;
            letter-spacing: 0 !important;
            border-radius: 4px !important;
            border: none;
            text-align: center;
        }

        .ok-btn {
            background: #3dca40;
        }

        .cancel-btn {
            background: #999;
        }
    }
}

.card-masking {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

.button-box {
    margin-top: 24px;
}

.v-input2::placeholder {
    color: #888;
}

.login-info-item {
    text-align: left;
    background: rgb(94,17,25);
    height: 44px;
    border-radius: 4px;
    position: relative;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 14px;
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

.tips {
    font-size: 14px;
    color: #fff;
}

.desc {
    font-size: 14px;
    color: #fff;
    text-align: left;
}

.v-box {
    padding: 0 20px;
    width: 100%;
}

.v-box2 {
    width: 100%;
}

.v-pre {
    font-size: 16px;
}

.v-input {
    width: 100%;
    color: rgb(254, 214, 57);
    background: transparent;
    border: 0;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    letter-spacing: normal;
    text-align: left;
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

input::-webkit-input-placeholder {
    /* WebKit browsers */
    font-size: 16px;
}

input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: 16px;
}

input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 16px;
}

input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-size: 16px;
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
    padding-top: 10px;
    width: 26px;
    height: 26px;
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
    padding: 20px 16px 0;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgb(221,203,157);
    position: relative;

    .title-tab {
        cursor: pointer;
        color: yellow;
        font-weight: 400;
        font-size: 16px;
        font-family: Arial;
        padding: 10px 20px;
    }

    .active {
        color: white;
        background: #641BE9;
        box-shadow: 0 -0.04rem 0.12rem rgba(42,0,128,.8), inset 0 0.02rem 0.04rem #9a62ff, 0 0.01rem 0.02rem #000;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
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
    margin-top: 22px;
    padding: 0 24px;

    .info-box {
        padding: 14px 0;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        box-sizing: border-box;

        .avatar {
            width: 60px;
            height: 60px;
        }

        .user-info {
            font-size: 0;
            padding-left: 10px;
            padding-top: 10px;
            text-align: left;

            .username,
            .nickname {
                color: rgb(208, 237, 206);
                font-size: 16px;
            }
        }
    }

    .data {
        width: 100%;
        background-color: white;
        border-radius: 8px;
        display: flex;

        .data-item {
            width: 100%;
            padding: 12px;

            .title {
                font-weight: 700;
                color: #000;
            }

            .data-content {
                display: flex;
                align-items: center;
                justify-content: center;

                >img {
                    height: 40px;
                    width: 40px;
                    margin-right: 8px;
                }

                .data-num {
                    font-weight: 600;
                    font-size: 28px;
                }
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
        margin-top: 4px;
        padding-left: 12px;
        color: #fff;
        font-size: 14px;
        text-align: left;
    }

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

.recharge-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .recharge-item-mid {
        margin-left: 2%;
        margin-right: 2%;
    }

    .recharge-item {
        cursor: pointer;
        width: 32%;
        padding: 9px 0;
        background: #641BE9;
        box-shadow: inset 0 -2px 6px #2a0080,inset 0 1px 2px #9a62ff!important;
        border-radius: 10px;
        color: white;
        font-family: Arial;
        font-size: 18px;
        font-weight: 400;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
        position: relative;

        img {
            height: 19px;
            width: 29px;
            position: absolute;
            bottom: 0;
            right: 0;
            display: none;
        }

        .first-box {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 12px;
            background: #3dca40;
            font-size: 10px;
            font-family: Arial;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 4px;
            color: #fff;
            border-bottom-left-radius: 4px;
            border-top-right-radius: 6px;
        }

        .add-box {
            position: absolute;
            right: 0;
            top: 0;
            height: 12px;
            background-image: url('../../assets/amount/bage.png');
            background-size: 100% 100%;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 4px;
            color: #fff;
        }
    }

    .active {
        background: #FBD81E;
        box-shadow: 0 0 21px rgba(251,216,30,.6),inset 0 -3px 5px 2px #f6a80b!important;
        border-radius: 10px;
        color: #b03f00;

        img {
            display: block !important;
        }
    }
}

.c-box {
    justify-content: flex-end !important;
}

.register-button {
    cursor: pointer;
    background-image: linear-gradient(180deg,#A400DE 0%,#3E007C 100%),linear-gradient(180deg,rgb(200,169,217),rgb(114,68,190));
    box-shadow: 0 0 22px rgba(15,76,212,.57), 0 1px 4px rgba(24,0,73,.7), inset 0 0 9px rgba(233,58,255,.6);
    color: white !important;
    height: 44px;
    width: 100%;
    font-size: 18px !important;
    letter-spacing: 0 !important;
    border-radius: 16px !important;
    border: 3px solid white;
    text-align: center;
}

.withdraw-title {
    color: #fff;
    font-size: 14px;
    padding: 14px 0 30px;
}

.withdrawal-type {
    text-align: left;
    color: #fff;
    margin-top: 8px;
    font-weight: 400;
    font-family: Arial;
    font-size: 15px;

    .withdrawal-select {
        width: 200px;
        font-size: 15px;
        border-radius: 4px !important;
        border: 0 !important;
        height: 36px;
        background: #5e1119;
        color: #fff;
        outline: none !important;
    }

    .withdrawal-select:focus-visible {
        outline: none !important;
    }
}</style>
  