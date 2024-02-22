<template>
    <div class="main-page">
        <div class="header-cover"></div>
        <div v-if="isList" style="background-color: rgb(112,20,33);">
            <div class="page-top">
                <div class="records-top">
                    <img @click="close" :src="require('../../assets/close.png')" />
                </div>
                <div class="record-tools">
                    <div :class="{ 'active': gameDateType == 1 }" style="width: 35%" @click="changeGameRecords(1)">{{
                        GLOBAL.lanLocal['today'] }}</div>
                    <div :class="{ 'active': gameDateType == 2 }" style="width: 35%" @click="changeGameRecords(2)">{{
                        GLOBAL.lanLocal['yesterday'] }}</div>
                    <div :class="{ 'active': gameDateType == 3 }" style="width: 30%">
                        <input type="date" style="width: 100px;" v-model="gameRecordDate" @change="setGameRecords"
                            placeholder="select" />
                    </div>
                </div>
                <div class="table-title">
                    <div style="width: 35%">{{ GLOBAL.lanLocal['gamename'] }}</div>
                    <div style="width: 35%">{{ GLOBAL.lanLocal['winlose'] }}</div>
                    <div style="width: 30%;">
                        {{ GLOBAL.lanLocal['time'] }}
                    </div>
                </div>
            </div>
            <div class="records-table" @scroll="handleScroll" :style="{ 'height': (innerHeight - pageTopHeight - 10) + 'px' }">
                <div class="table-item" :class="{ 'game-multi': index == 0 || index % 2 == 0 }"
                    v-for="(item, index) in gameRecord" @click="toDetail(item.ServerID)">
                    <div style="width: 35%">{{ item.NodeName }}</div>
                    <div class="amount lose" style="width: 35%" v-if="item.GameMoney < 0">{{ item.GameMoneyShow }}</div>
                    <div class="amount" style="width: 35%" v-else>+{{ item.GameMoneyShow }}</div>
                    <div class="desc" style="width: 30%;">
                        {{ item.DayTime }}
                        <img :src="require('../../assets/me/game_arrow.png')" />
                    </div>
                </div>
                <div class="no-record" v-if="!gameRecord || gameRecord.length <= 0">
                    <img :src="require('../../assets/icon/empty.png')" />
                    <div class="tips">{{ GLOBAL.lanLocal['norecord'] }}</div>
                </div>
            </div>
        </div>
        <div v-if="!isList" style="background-color: #0f1523;">
            <div class="page-top">
                <div class="records-top detail-top">
                    {{ GLOBAL.lanLocal['gamedetails'] }}
                    <img @click="closeDetail" :src="require('../../assets/close.png')" />
                </div>
                <div class="table-title">
                    <div style="width: 10%">ID</div>
                    <div style="width: 30%">{{ GLOBAL.lanLocal['gamename'] }}</div>
                    <div style="width: 30%">{{ GLOBAL.lanLocal['winlose'] }}</div>
                    <div style="width: 30%;">
                        {{ GLOBAL.lanLocal['time'] }}
                    </div>
                </div>
            </div>
            <div class="detail-table" @scroll="handleDetailScroll"
                :style="{ 'height': (innerHeight - pageDetailTopHeight - 10) + 'px' }">
                <div class="table-item" :class="{ 'game-multi': index == 0 || index % 2 == 0 }"
                    v-for="(item, index) in gameRecordDetail">
                    <div style="width: 10%">{{ index + 1 }}</div>
                    <div style="width: 30%">{{ item.NodeName }}</div>
                    <div class="amount lose" style="width: 30%" v-if="item.Money < 0">{{ item.MoneyShow }}</div>
                    <div class="amount" style="width: 30%" v-else>+{{ item.MoneyShow }}</div>
                    <div class="desc" style="width: 30%;">
                        {{ item.AddTime }}
                    </div>
                </div>
                <div class="no-record" v-if="!gameRecord || gameRecord.length <= 0">
                    <img :src="require('../../assets/icon/empty.png')" />
                    <div class="tips">{{ GLOBAL.lanLocal['norecord'] }}</div>
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
import Clipboard from 'clipboard'
import { doPost } from '../../api/api.js'
import md5 from 'js-md5';
import decodeApiLan from '../../api/decodeApiLan.js'
import Turntable from '../turntable/turntable.vue'
import Sign from '../sign/sign.vue'
export default {
    name: 'GameRecord',
    components: { Turntable, Sign },
    data() {
        return {
            isList: true,
            loading: false,
            count: 0,
            detailCount: 0,
            Page: 1,
            PageSize: 50,
            DetailPage: 1,
            DetailPageSize: 50,
            gameDateType: 1,
            showGameRecordsModal: false,
            gameDate: '',
            gameRecord: [],
            gameRecordDetail: [],
            gameRecordDate: '',
            pageTopHeight: 0,
            pageDetailTopHeight: 0,
            ServerID: 0,
        }
    },
    watch: {

    },
    props: {

    },
    computed: {

    },
    mounted() {
        let pageTop = document.querySelector('.page-top');
        this.pageTopHeight = pageTop.clientHeight
    },
    created() {
        this.gameDate = this.GLOBAL.lanLocal['selectionperiod']
        this.innerHeight = window.innerHeight - 130
        this.getGameRecord()
    },
    methods: {
        handleScroll() {
            const container = document.querySelector('.records-table');
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollTop + clientHeight + 10 >= scrollHeight) {
                if ((this.Page * this.PageSize) < this.count) {
                    this.Page += 1
                    this.getGameRecord()
                }
            }
        },
        handleDetailScroll() {
            const container = document.querySelector('.detail-table');
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollTop + clientHeight + 10 >= scrollHeight) {
                if ((this.DetailPage * this.DetailPageSize) < this.detailCount) {
                    this.DetailPage += 1
                    this.getGameRecordDetail()
                }
            }
        },
        setGameRecords(e) {
            this.gameDateType = 3
            this.gameRecordDate = e.target.value
            this.Page = 1
            this.getGameRecord()
        },
        changeGameRecords(type) {
            this.gameDateType = type
            if (this.gameDateType == 1) {
                var today = new Date()
                var year = today.getFullYear()
                var month = today.getMonth() + 1
                var day = today.getDate()
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                this.gameRecordDate = year + "-" + month + "-" + day
            } else if (this.gameDateType == 2) {
                var today = new Date()
                var yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
                var year = yesterday.getFullYear()
                var month = yesterday.getMonth() + 1
                var day = yesterday.getDate()
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                this.gameRecordDate = year + "-" + month + "-" + day
            }
            this.Page = 1
            this.getGameRecord()
        },
        getGameRecord() {
            this.loading = true
            if (this.Page == 1) {
                const scrollEle = document.querySelector('.records-table')
                scrollEle.scrollTo({ top: 0, behavior: 'smooth' })
            }
            if (this.gameRecordDate == '') {
                var today = new Date()
                var year = today.getFullYear()
                var month = today.getMonth() + 1
                var day = today.getDate()
                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day
                }
                this.gameRecordDate = year + "-" + month + "-" + day
            }
            doPost({
                n: 'AppGame',
                a: 'get_game_record',
                accountid: this.GLOBAL.userInfo.accountid,
                Page: this.Page,
                PageSize: this.PageSize,
                record_date: this.gameRecordDate,
            }).then((res) => {
                if (res.code === 0) {
                    let result = decodeApiLan(res, this.GLOBAL.lanArr);
                    this.count = result.count
                    if (this.Page == 1) {
                        this.gameRecord = result.data
                    } else {
                        this.gameRecord = this.gameRecord.concat(result.data)
                    }
                    this.loading = false
                }
            })
        },
        getGameRecordDetail() {
            this.loading = true
            doPost({
                n: 'AppGame',
                a: 'get_game_record_detail',
                accountid: this.GLOBAL.userInfo.accountid,
                Page: this.DetailPage,
                PageSize: this.DetailPageSize,
                record_date: this.gameRecordDate,
                ServerID: this.ServerID,
            }).then((res) => {
                if (res.code === 0) {
                    let result = decodeApiLan(res, this.GLOBAL.lanArr);
                    this.detailCount = result.count
                    if (this.DetailPage == 1) {
                        this.gameRecordDetail = result.data
                        let pageTop = document.querySelector('.page-top');
                        this.pageDetailTopHeight = pageTop.clientHeight
                    } else {
                        this.gameRecordDetail = this.gameRecordDetail.concat(result.data)
                    }
                    this.loading = false
                }
            })
        },
        close() {
            localStorage.setItem("back", 4)
            this.$emit('close')
        },
        toDetail(ServerID) {
            this.isList = false
            this.ServerID = ServerID
            this.DetailPage = 1
            this.getGameRecordDetail()
        },
        closeDetail() {
            this.isList = true
            this.ServerID = 0
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-page {
    height: 100%;
    width: 100%;
    max-width: 500px;
    padding: 60px 0;
    box-sizing: border-box;
    text-align: left;
    margin: 0 auto;
    position: relative;

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

.page-top {
    width: 100%;
}

.detail-top {
    color: #fff !important;
    font-size: 16px !important;
    text-align: center !important;
    justify-content: center !important;
    position: relative;

    >img {
        position: absolute !important;
        right: 10px !important;
    }
}

.records-top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 12px 10px;

    >img {
        cursor: pointer;
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
    border-bottom: 1px solid rgb(41, 47, 54);

    >div {
        flex: 1;
        font-size: 13px;
        color: #f3f3f3;
        text-align: center;
    }

    .active {
        font-size: 15px;
        font-weight: 600;
        color: #fff;
        border-bottom: 1px solid #fff;
    }
}

.record-tools {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 14px;
    padding: 10px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #333;

    >div {
        cursor: pointer;
        text-align: center;
    }

    .active {
        color: #ffb600;
    }
}

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

.records-table::-webkit-scrollbar,
.detail-table::-webkit-scrollbar {
    width: 0;
}

.records-table,
.detail-table {
    overflow-y: scroll;

    .game-multi {
        background-color: rgb(42, 41, 55);
    }

    .no-record {
        text-align: center;
        padding-top: 100px;

        img {
            height: 50px;
            width: auto;
        }

        .tips {
            text-align: center;
            font-size: 14px;
            color: #efcf7f;
        }
    }
}

.table-item::-webkit-scrollbar {
    width: 0;
}

.table-item {
    cursor: pointer;
    overflow-y: scroll;
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

    .multi {
        background-color: rgb(30, 36, 43);
    }

    .lose {
        color: red;
    }

    .desc {
        position: relative;

        >img {
            position: absolute;
            top: 2px;
            right: 6px;
            height: 10px;
            width: auto;
        }
    }
}</style>
  