<template>
    <div class="main-page">
        <div class="header-cover"></div>
        <div class="detail">
            <img :src="detail.img" />
            <div class="title">{{ detail.name }}</div>
            <div class="content" v-html="detail.content"></div>
        </div>
    </div>
</template>
  
<script>
import { doPost } from '../../api/api.js'
import decodeApiLan from '../../api/decodeApiLan.js'
import loadFile from "../../api/loadFile.js"
export default {
    name: 'activityDetail',
    data() {
        return {
            detail: [],  //活动列表
            innerHeight: 0,
        }
    },
    props: {
        id: {
            type: Number,
            default: 0
        }
    },
    created() {
        this.innerHeight = window.innerHeight - 130
        if (this.id != 0) {
            let list = loadFile("static/activity.json", false);
            if (list) {
                list.forEach(item => {
                    if (item.id == this.id) {
                        let detail = item
                        let suffix = detail.img.slice(-4)
                        detail.img = detail.img.replace(suffix, "_" + this.GLOBAL.lanCode + suffix)
                        let names = detail.name.split("||")
                        names.forEach(name => {
                            let arr = name.split("|")
                            if (arr[0] == this.GLOBAL.lanCode) {
                                detail.name = arr[1]
                            }
                        });
                        let contents = detail.content.split("||")
                        contents.forEach(content => {
                            let arr = content.split("|")
                            let code = arr[0].replaceAll("</p><p>", "").replaceAll("<p>", "")
                            if (code == this.GLOBAL.lanCode) {
                                let content = "<p>" + arr[1] + "</p>"
                                detail.content = content
                            }
                        });
                        this.detail = detail
                    }
                });
            } else {
                this.isEmpty = true
            }

        }

    },
    computed: {

    },
    mounted() {
    },
    methods: {
    }
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@media screen and (min-width: 950px) {
    img {
        max-width: 600px !important;
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

    .detail {
        max-width: 950px;
        padding: 16px;
    }

    img {
        width: 100%;
        height: auto;
        border-radius: 14px;
    }

    .title {
        font-size: 16px;
        color: white;
        padding: 14px 0 8px;
    }

    .content {
        font-size: 14px;
        color: #fff;
    }
}
</style>
  