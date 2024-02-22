<template>
    <div class="main-page">
        <div class="header-cover"></div>
        <div class="activity-list">
            <div class="activity-box" v-for="(item, index) in list" :key="index" @click="toDetail(item.id)">
                <img :src="item.img" />
                <div class="title">{{ item.name }}</div>
                <div class="more">{{ GLOBAL.lanLocal['clickmore'] }}</div>
            </div>
        </div>
        <div class="empty" :style="{ height: innerHeight + 'px' }" v-if="isEmpty">
            <div>
                <img :src="require('../../assets/icon/empty.png')" />
                <div class="tips">{{ GLOBAL.lanLocal['noactive'] }}</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { doPost } from '../../api/api.js'
import decodeApiLan from '../../api/decodeApiLan.js'
import loadFile from "../../api/loadFile.js"
export default {
    name: 'activity',
    data() {
        return {
            id: '',
            isDetail: false,
            innerHeight: 0,
            isEmpty: false,
            list: []  //活动列表
        }
    },
    created() {
        this.innerHeight = window.innerHeight - 130
        let list = loadFile("static/activity.json", false);
        if (list) {
                list.forEach(item => {
                    let suffix = item.img.slice(-4)
                    item.img = item.img.replace(suffix, "_" + this.GLOBAL.lanCode + suffix)
                    let names = item.name.split("||")
                    names.forEach(name => {
                        let arr = name.split("|")
                        if (arr[0] == this.GLOBAL.lanCode) {
                            item.name = arr[1]
                        }
                    });
                });
                this.list = list
            } else {
                this.isEmpty = true
            }
    },
    computed: {

    },
    mounted() {
    },
    methods: {
        toDetail(id) {
            this.$emit("detail", id)
        }
    }
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@media screen and (min-width: 950px) {
    .activity-box {
        width: 48% !important;
        margin-top: 0 !important;
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

    .activity-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        max-width: 950px;
        padding: 0 16px;
        margin: 0 auto;
    }

    .activity-box:first-child {
        margin-top: 12px;
    }

    .activity-box {
        cursor: pointer;
        background-color: rgba(94,17,25,0.8);
        border-radius: 10px;
        margin-bottom: 12px;
        box-sizing: border-box;

        img {
            box-sizing: border-box;
            width: 100%;
            height: auto;
            border-radius: 14px;
        }

        .title {
            padding: 4px 8px;
            font-size: 16px;
            color: white;
            text-align: left;
        }

        .more {
            padding: 0 8px 8px;
            font-size: 14px;
            color: #fff;
            text-align: left;
        }
    }
}

.empty {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        height: 100px;
        width: auto;
    }

    .tips {
        text-align: center;
        font-size: 16px;
        color: #efcf7f;
    }
}</style>
  