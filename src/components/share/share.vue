<template>
    <div class="main-page">
        <div class="header-cover"></div>
        <div class="content">
            <div class="share-info">
                <img v-if="qrcodeUrl" :src="qrcodeUrl" />
                <div class="info-box">
                    <div class="info-title">{{ GLOBAL.lanLocal['share'] }}</div>
                    <div class="info-content">
                        <input readonly="readonly" class="v-input" type="text" :value="shareUrl" />
                        <input class="button" type="button" :data-clipboard-text="shareUrl" @click="copy"
                            :value="GLOBAL.lanLocal['copy']" />
                    </div>
                    <div class="info-title" style="margin-top: 3px;">{{ GLOBAL.lanLocal['shareid'] }}</div>
                    <div class="info-content">
                        <input readonly="readonly" class="v-input" type="text" :value="GLOBAL.userInfo.accountid" />
                        <input class="button" type="button" :data-clipboard-text="GLOBAL.userInfo.accountid" @click="copy"
                            :value="GLOBAL.lanLocal['copy']" />
                    </div>
                </div>
            </div>
            <div class="award-info">
                <div class="award-item">
                    <img :src="require('../../assets/share/team.png')" />
                    <div class="award-title">{{ GLOBAL.lanLocal['teamsize'] }}</div>
                    <div class="award-content">{{ chest.team }}</div>
                </div>
                <!-- <div class="award-item">
                    <img :src="require('../../assets/share/first.png')" />
                    <div class="award-title">{{GLOBAL.lanLocal['firstcharge']}}</div>
                    <div class="award-content">{{chest.first}}</div>
                </div> -->
                <div class="award-item">
                    <img :src="require('../../assets/share/amount.png')" />
                    <div class="award-title">{{ GLOBAL.lanLocal['bonuslow'] }}</div>
                    <div class="award-content">{{ chest.reward }}</div>
                </div>
            </div>
            <div class="box-title">
                <div class="text">{{ GLOBAL.lanLocal['rechargeinvitationrewards'] }}</div>
                <div class="menu">
                    <img @click="changeDetailModal" :src="require('../../assets/share/detail.png')" />
                    <img @click="changeRecordsModal" :src="require('../../assets/share/log.png')" />
                </div>
            </div>
            <!-- <div class="box-title2">{{ GLOBAL.lanLocal['inviteinfo'] }}</div> -->
            <div class="invite-box">
                <div class="invite-item">
                    <div class="invite-num">{{ chest.todayInvite }}</div>
                    <img :src="require('../../assets/share/solid.png')" />
                    <div class="invite-title">{{ GLOBAL.lanLocal['todaysinvitation'] }}</div>
                </div>
                <div class="invite-item">
                    <div class="invite-num">{{ chest.beforeInvite }}</div>
                    <img :src="require('../../assets/share/solid.png')" />
                    <div class="invite-title">{{ GLOBAL.lanLocal['yesterdaysinvitation'] }}</div>
                </div>
            </div>
            <!-- <div class="reward-desc" v-html="rewarddesc"></div> -->
            <div class="box-title">
                <div class="text">{{ GLOBAL.lanLocal['invitationalachievement'] }}</div>
            </div>
            <div class="box-title2">{{ GLOBAL.lanLocal['achievementinfo'] }}</div>
            <div class="reward-info">
                <div class="reward-box">
                    <div class="reward-list">
                        <div class="reward-item" v-for="(item, index) in chest.list" @click="receiveChestRecords(item)">
                            <div class="amount">{{ GLOBAL.currencySymbol }}&nbsp;{{ item.Amount }}</div>
                            <div class="chest-box">
                                <img class="checked" v-if="item.received == 1"
                                    :src="require('../../assets/share/checked.png')" />
                                <img class="chest-cover" v-if="item.received == 1"
                                    :src="require('../../assets/share/chest-cover.png')" />
                                <img class="chest" :src="require('../../assets/share/chest.png')" />
                            </div>
                            <div class="num">{{ chest.team }}/{{ item.Num }}</div>
                            <span v-if="item.received == 1" class="receive">{{ GLOBAL.lanLocal['received'] }}</span>
                            <span v-else class="receive">{{ GLOBAL.lanLocal['receive'] }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="records-masking" v-show="showRecordsModal" @click="changeRecordsModal">
            <div class="records-modal" @click.stop="func1()">
                <div class="records-title">
                    <div>{{ GLOBAL.lanLocal['awardrecord'] }}</div>
                    <img @click="changeRecordsModal" :src="require('../../assets/close.png')" />
                </div>
                <div class="records-table">
                    <div class="table-title">
                        <div>ID</div>
                        <div>{{ GLOBAL.lanLocal['time'] }}</div>
                        <div>{{ GLOBAL.lanLocal['rewardamount'] }}</div>
                        <div>{{ GLOBAL.lanLocal['illustrate'] }}</div>
                    </div>
                    <div class="table-item" v-for="(item, index) in records">
                        <div :class="index == 0 || index % 2 == 0 ? 'multi' : ''">{{ index + 1 }}</div>
                        <div :class="index == 0 || index % 2 == 0 ? 'multi' : ''">{{ item.AddTime }}</div>
                        <div class="amount" :class="index == 0 || index % 2 == 0 ? 'multi' : ''">{{ item.Amount }}</div>
                        <div :class="index == 0 || index % 2 == 0 ? 'multi' : ''">{{ item.Descript }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-masking" v-show="showDetailModal" @click="changeDetailModal">
            <div class="detail-modal" @click.stop="func1()">
                <div class="detail-title">
                    <div>{{ GLOBAL.lanLocal['datadetails'] }}</div>
                    <img @click="changeDetailModal" :src="require('../../assets/share/close.png')" />
                </div>
                <div class="detail-content">
                    <div class="detail-data">
                        <div class="data-item">
                            <div class="item-title">{{ GLOBAL.lanLocal['totalinvite'] }}</div>
                            <div class="item-content">{{ detail.total }}</div>
                        </div>
                        <div class="data-item">
                            <div class="item-title">{{ GLOBAL.lanLocal['today'] }}</div>
                            <div class="item-content">{{ detail.today }}</div>
                        </div>
                        <div class="data-item">
                            <div class="item-title">{{ GLOBAL.lanLocal['yesterday'] }}</div>
                            <div class="item-content">{{ detail.yesterday }}</div>
                        </div>
                        <div class="data-item">
                            <div class="item-title">{{ GLOBAL.lanLocal['sevendays'] }}</div>
                            <div class="item-content">{{ detail.sevenDay }}</div>
                        </div>
                    </div>
                    <div class="detail-list">
                        <div class="list-title">
                            <div class="title-text">{{ GLOBAL.lanLocal['firstusers'] }}</div>
                            <!-- <div class="title-progress">
                                <div class="progress-bg" :style="{ width: detail.firstProgress + '%' }"></div>
                                <div class="progress-value">{{ detail.firstProgress + '%' }}</div>
                            </div> -->
                        </div>
                        <div class="detail-data">
                            <!-- <div class="data-item">
                                <div class="item-title">{{ GLOBAL.lanLocal['regnum'] }}</div>
                                <div class="item-content">{{ detail.firstReg }}</div>
                            </div> -->
                            <div class="data-item">
                                <div class="item-title">{{ GLOBAL.lanLocal['rechargenum'] }}</div>
                                <div class="item-content">{{ detail.firstRechargeNum }}</div>
                            </div>
                            <!-- <div class="data-item">
                                <div class="item-title">{{ GLOBAL.lanLocal['rechargemoney'] }}</div>
                                <div class="item-content">{{ detail.firstRechargeMoney }}</div>
                            </div> -->
                            <div class="data-item">
                                <div class="item-title">{{ GLOBAL.lanLocal['withdrawalmoney'] }}</div>
                                <div class="item-content">{{ detail.firstWithdrawMoney }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="detail-list">
                        <div class="list-title">
                            <div class="title-text">{{ GLOBAL.lanLocal['secondusers'] }}</div>
                            <!-- <div class="title-progress">
                                <div class="progress-bg" :style="{ width: detail.secondProgress + '%' }"></div>
                                <div class="progress-value">{{ detail.secondProgress + '%' }}</div>
                            </div> -->
                        </div>
                        <div class="detail-data">
                            <!-- <div class="data-item">
                                <div class="item-title">{{ GLOBAL.lanLocal['regnum'] }}</div>
                                <div class="item-content">{{ detail.secondReg }}</div>
                            </div> -->
                                <div class="data-item">
                                    <div class="item-title">{{ GLOBAL.lanLocal['rechargenum'] }}</div>
                                    <div class="item-content">{{ detail.secondRechargeNum }}</div>
                                </div>
                            <!-- <div class="data-item">
                                <div class="item-title">{{ GLOBAL.lanLocal['rechargemoney'] }}</div>
                                <div class="item-content">{{ detail.secondRechargeMoney }}</div>
                            </div> -->
                            <div class="data-item">
                                <div class="item-title">{{ GLOBAL.lanLocal['withdrawalmoney'] }}</div>
                                <div class="item-content">{{ detail.secondWithdrawMoney }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Clipboard from 'clipboard'
import { doPost } from '../../api/api.js'
import decodeApiLan from '../../api/decodeApiLan.js'
import md5 from 'js-md5';
export default {
    name: 'share',
    data() {
        return {
            innerHeight: 0,
            shareUrl: '',
            qrcodeUrl: '',
            chest: [],
            records: [],
            detail: [],
            loading: false,
            showRecordsModal: false,
            showDetailModal: false,
            rewarddesc: '',
        }
    },
    watch: {
    },
    props: {
    },
    computed: {
    },
    created() {
        this.innerHeight = window.innerHeight - 130
        this.rewarddesc = this.GLOBAL.lanLocal['rewarddesc'].replaceAll('%d', this.GLOBAL.currency)
        this.getShareInfo()
        this.getChestInfo()
    },
    methods: {
        func1() {
        },
        changeRecordsModal() {
            this.showRecordsModal = !this.showRecordsModal
            if (this.showRecordsModal) {
                this.getChestRecords()
            }
        },
        changeDetailModal() {
            if (!this.showDetailModal) {
                this.getDetailRecords()
            } else {
                this.showDetailModal = !this.showDetailModal
            }
        },
        getDetailRecords() {
            doPost({
                n: 'AppEx',
                a: 'get_promote_detail',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                const data = decodeApiLan(res, this.GLOBAL.lanArr) //语言包解析匹配
                if (data.code === 0) {
                    this.detail = data.data;
                    this.showDetailModal = true;
                }
            })
        },
        getShareInfo() {
            doPost({
                n: 'AppShare',
                a: 'get_url_info',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                if (res.code === 0) {
                    let data = res.data;
                    this.shareUrl = data.share
                    // this.shareUrl = data.share_full
                    let time = parseInt(new Date().getTime() / 1000)
                    let params = {
                        n: 'AppShare',
                        a: 'get_share_qrcode',
                        url: this.shareUrl,
                        time: time
                    }
                    let arr = new Array()
                    let num = 0
                    for (let i in params) {
                        arr[num] = i
                        num++
                    }
                    let sortArr = arr.sort()
                    let md5_str = ""
                    sortArr.forEach((key) => {
                        if (md5_str !== "") {
                            md5_str += "&"
                        }
                        md5_str += key + '=' + params[key]
                    });
                    md5_str += "&md=" + this.GLOBAL.api_key
                    let key = md5(md5_str)
                    this.qrcodeUrl = `${this.GLOBAL.apiUrl}?n=AppShare&a=get_share_qrcode&url=${this.shareUrl}&time=${time}&key=${key}`

                }
            })
        },
        getChestInfo() {
            doPost({
                n: 'AppEx',
                a: 'get_chest_info',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                if (res.code === 0) {
                    this.chest = res.data;
                }
            })
        },
        getChestRecords() {
            doPost({
                n: 'AppEx',
                a: 'get_chest_records',
                accountid: this.GLOBAL.userInfo.accountid
            }).then((res) => {
                const data = decodeApiLan(res, this.GLOBAL.lanArr) //语言包解析匹配
                if (data.code === 0) {
                    this.records = data.data;
                }
            })
        },
        receiveChestRecords(item) {
            if (item.Num > this.chest.team || item.received == 1) {
                return;
            }
            doPost({
                n: 'AppEx',
                a: 'receive_chest_rewards',
                accountid: this.GLOBAL.userInfo.accountid,
                chestid: item.ID
            }).then((res) => {
                if (res.code === 0) {
                    this.getChestInfo()
                    this.$toast.success(this.GLOBAL.lanLocal['receivedsuccessfully'], {
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
                    const data = decodeApiLan(res, this.GLOBAL.lanArr)
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
        copy() {
            var clipboard = new Clipboard('.button')
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
                const data = decodeApiLan(res, this.GLOBAL.lanArr)
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
    .invite-box {
        justify-content: space-around !important;
    }

    .invite-item {
        max-width: 260px !important;

        .invite-num {
            font-size: 50px !important;
        }

        .invite-title {
            font-size: 16px !important;
            bottom: 20%;
        }
    }

    .detail-masking,
    .records-masking {
        padding-left: 150px !important;
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
    padding: 60px 12px 100px;
    box-sizing: border-box;
    position: relative;
    margin: 0 auto;
    text-align: left;

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
    margin-top: 20px;



    .data {
        width: 100%;
        border-radius: 8px;
        background-image: url('../../assets/amount-bg.png');
        background-size: 100% 100%;
        display: flex;

        .data-item {
            width: 100%;
            padding: 6px 12px 20px;

            .title {
                font-weight: 700;
                color: rgb(125, 140, 159);
            }

            .data-content {
                margin-top: 15px;
                display: flex;
                align-items: center;
                justify-content: center;

                >img {
                    height: 50px;
                    width: 50px;
                    margin-right: 8px;
                }

                .data-num {
                    font-weight: 600;
                    font-size: 28px;
                    color: rgb(255, 198, 37);
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
        margin-top: 10px;
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
            cursor: pointer;

            >input {
                padding: 0 !important;
                height: 40px !important;
                width: 100%;
            }
        }
    }
}

.promote-info {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    .promote-item {
        width: 46%;
        height: auto;
        border-radius: 6px;
        background-size: 100% 100%;
        position: relative;

        >img {
            width: 100%;
            height: auto;
        }

        .promote-data {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;

            .data-title {
                font-size: 14px;
                color: #fff;
                text-align: center;
            }

            .data-content {
                margin-top: 4px;
                font-size: 24px;
                color: rgb(255, 182, 0);
                text-align: center;
            }
        }
    }
}

.reward-title {
    margin-top: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .reward-text {
        font-size: 14px;
        color: #7d8c9f;
    }

    .reward-log {
        font-size: 10px;
        color: rgb(255, 182, 0);
        padding: 2px 10px;
        border-radius: 20px;
        border: 1px solid rgb(255, 182, 0);
    }
}

.reward-desc {
    background-color: rgba(14,57,185, 0.6);
    padding: 14px 12px;
    color: #fff;
    font-size: 14px;
}

.reward-info {
    background-color: rgba(91,16,23, 0.9);
    margin-top: 10px;
    width: 100%;
    height: auto;
    border-radius: 6px;
    overflow: hidden;
    position: relative;

    >img {
        width: 100%;
        height: auto;
    }

    .reward-box {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .reward-list {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            height: 100%;
            width: 100%;
            padding: 8px 0 30px;

            .reward-item {
                margin-top: 15px;
                width: 33.333333%;
                text-align: center;
                font-size: 0;

                .chest-box {
                    position: relative;
                    margin: 2px auto 0;
                    width: 76px;
                    height: auto;
                }

                .checked {
                    position: absolute;
                    top: 12px;
                    left: 20px;
                    z-index: 2;
                    width: 33px;
                    height: auto;
                }

                .chest-cover {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    width: 76px;
                    height: auto;
                }

                .chest {
                    width: 76px;
                    height: auto;
                }

                .amount {
                    color: #ffd727;
                    font-size: 12px;
                }

                .progress {
                    height: 16px;
                    width: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;

                    .line-box {
                        height: 6px;
                        width: 100%;

                        .line {
                            height: 6px;
                            width: 100%;
                            background-color: rgb(15, 21, 28);
                        }

                        .g {
                            background-color: rgb(14, 184, 34);
                        }

                        .g1 {
                            border-top-left-radius: 6px;
                            border-bottom-left-radius: 6px;
                        }

                        .g2 {
                            border-radius: 6px;
                        }

                        .g3 {
                            border-top-right-radius: 6px;
                            border-bottom-right-radius: 6px;
                        }
                    }

                    >img {
                        position: absolute;
                        top: 0;
                        left: calc(50% - 10px);
                        height: 16px;
                        width: auto;
                    }
                }

                .num {
                    margin-top: 3px;
                    margin-bottom: 6px;
                    font-size: 12px;
                    color: #fff;
                }

                .receive {
                    padding: 3px 10px;
                    font-size: 12px;
                    color: #333;
                    background-color: #ffc515;
                    border-radius: 6px;
                }
            }
        }
    }
}

.detail-masking {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;

    .detail-content::-webkit-scrollbar {
        width: 0;
    }

    .detail-content {
        height: calc(100% - 42px);
        overflow-y: scroll;
    }

    .detail-modal {
        width: 92%;
        max-width: 500px;
        max-height: 75%;
        background-color: rgb(142,38,39);
        border-radius: 8px;
        border: 2px solid rgb(248,231,115);
        box-sizing: border-box;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3) inset;

        .detail-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 10px;
            height: 42px;
            line-height: 42px;
            border-bottom: 1px solid rgb(114,29,30);

            >div {
                flex: 1;
                font-size: 16px;
                color: #fff;
                padding-left: 16px;
                text-align: center;
            }

            >img {
                width: 16px;
                height: auto;
                cursor: pointer;
            }
        }

        .detail-data {
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            flex-wrap: wrap;
            padding: 0 20px 20px;

            .data-item {
                width: 46%;
                margin-top: 10px;

                .item-title {
                    color: rgb(255,232,133);
                    font-size: 13px;
                    padding-left: 4px;
                }

                .item-content {
                    background: rgb(111,19,32);
                    font-size: 14px;
                    color: #fff;
                    border-radius: 6px;
                    padding: 6px;
                    text-align: center;
                }
            }
        }

        .detail-list {
            .list-title {
                background: rgb(112,20,33);
                padding: 6px 0 12px;
                text-align: center;

                .title-text {
                    color: rgb(255,232,133);
                    font-size: 16px;
                }

                .title-progress {
                    background: rgb(16,38,123);
                    height: 18px;
                    width: 60%;
                    border-radius: 18px;
                    margin: 0 auto;
                    text-align: center;
                    position: relative;
                    color: #fff;

                    .progress-bg {
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 1;
                        height: 18px;
                        line-height: 18px;
                        border-radius: 18px;
                        background: rgb(240,211,19);
                    }

                    .progress-value {
                        font-size: 13px;
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 2;
                        height: 18px;
                        line-height: 18px;
                        width: 100%;
                        text-align: center;
                    }
                }
            }
        }
    }
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
        background-color: rgb(28,82,217);
        border-radius: 8px;
        padding: 0 4px;

        .records-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 12px 10px;
            border-bottom: 1px solid rgb(20,65,179);

            >div {
                flex: 1;
                font-size: 18px;
                color: #fff;
                padding-left: 16px;
                text-align: center;
            }

            >img {
                width: 16px;
                height: auto;
                cursor: pointer;
            }
        }

        .records-table {
            .table-title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 0;

                >div {
                    color: rgb(89,194, 255);
                    font-size: 12px;
                    width: 25%;
                    text-align: center;
                }
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

                .multi {
                    background-color: rgb(30, 36, 43);
                }
            }
        }
    }
}

.share-info {
    margin-top: 10px;
    background-color: rgba(91,16,23, 0.9);
    width: 100%;
    padding: 16px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 10px;

    >img {
        height: 90px;
        width: 90px;
        margin-right: 12px;
    }

    .info-box {
        flex: 1;

        .info-title {
            font-family: Arial;
            font-size: 12px;
            color: #fff;
            padding-bottom: 2px;
        }

        .info-content {
            display: flex;
            align-items: center;
            box-sizing: border-box;

            input {
                background-color: rgb(139,36,37);
                color: #ffd727;
                font-size: 12px;
                border-radius: 4px;
                padding: 4px 8px;
            }

            .button {
                cursor: pointer;
                margin-left: 6px;
            background-image: linear-gradient(to bottom, rgba(251,239,181), rgba(217,173,108));
                color: rgb(140,36,43) !important;
                font-weight: 400;
                box-shadow: unset;
                height: 28px;
                width: 70px;
                font-size: 13px !important;
                letter-spacing: 0 !important;
                transition: all .2s cubic-bezier(.02, .54, .58, 1);
                border: none;
                font-family: Noto Sans Thai;
                text-align: center;
            }
        }

    }
}

.award-info {
    margin-top: 10px;
    background-color: rgba(91,16,23, 0.9);
    width: 100%;
    padding: 16px 20px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 10px;

    .award-item {
        width: 40%;
        text-align: center;

        >img {
            height: 32px;
            width: auto;
        }

        .award-title {
            font-family: Arial;
            color: #fff;
            font-size: 12px;
        }

        .award-content {
            margin-top: 2px;
            font-size: 18px;
            font-weight: 600;
            color: #ffd727;
        }
    }
}

.box-title {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    color: #fff;

    .text {
        font-size: 18px;
        color: #fff;
        flex: 1;
    }

    .menu {
        >img {
            cursor: pointer;
            margin-left: 5px;
            height: 28px;
            width: auto;
            padding-bottom: 3px;
        }
    }
}

.box-title2 {
    color: #fff;
    font-size: 14px;
    font-size: 14px;
    line-height: 18px;
}

.invite-box {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    .invite-item {
    background-color: rgba(91,16,23, 0.9);
        border-radius: 6px;
        width: 48%;
        position: relative;
        padding: 0 20px;
        font-size: 0;
        box-sizing: border-box;

        .invite-num {
            text-align: center;
            font-size: 32px;
            font-weight: 600;
            color: #ffd727;
            padding: 20px 0 14px;
        }

        img {
            height: auto;
            width: 100%;
        }

        .invite-title {
            text-align: center;
            font-size: 13px;
            color: #fff;
            padding: 14px 0;
        }
    }
}</style>
  