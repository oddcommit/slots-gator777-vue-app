<template>
    <div>
        <div class="x-footer">
            <div class="x-sub">
                <div class="item" :class="tabIndex == 1 ? 'tab-selected' : ''" @click="toPage(1)">
                    <div class="tab-info">
                        <img class="sub-img" v-if="tabIndex == 1" :src="require('../../assets/index/lobby-selected.png')" />
                        <img class="sub-img" v-else :src="require('../../assets/index/lobby-normal.png')" />
                        <div class="sub-txt">{{ GLOBAL.lanLocal['lobby'] }}</div>
                    </div>
                </div>
            </div>
            <div class="x-sub">
                <div class="item" :class="tabIndex == 2 ? 'tab-selected' : ''" @click="toPage(2)">
                    <div class="tab-info">
                        <img class="sub-img" v-if="tabIndex == 2"
                            :src="require('../../assets/index/activity-selected.png')" />
                        <img class="sub-img" v-else :src="require('../../assets/index/activity-normal.png')" />
                        <div class="sub-txt">{{ GLOBAL.lanLocal['activity'] }}</div>
                    </div>
                </div>
            </div>
            <div class="x-sub">
                <div class="item" :class="tabIndex == 10 ? 'tab-selected' : ''" @click="toPage(10)">
                    <div class="tab-info">
                        <img class="sub-img" v-if="tabIndex == 10"
                            :src="require('../../assets/index/bonus-selected.png')" />
                        <img class="sub-img" v-else :src="require('../../assets/index/bonus-normal.png')" />
                        <div class="sub-txt">{{ GLOBAL.lanLocal['bonus'] }}</div>
                    </div>
                </div>
            </div>
            <div class="x-sub">
                <div class="item" :class="tabIndex == 6 ? 'tab-selected' : ''" @click="toPage(6)">
                    <div class="tab-info">
                        <img class="sub-img" v-if="tabIndex == 6"
                            :src="require('../../assets/index/recharge-selected.png')" />
                        <img class="sub-img" v-else :src="require('../../assets/index/recharge-normal.png')" />
                        <div class="sub-txt">{{ GLOBAL.lanLocal['recharge'] }}</div>
                    </div>
                </div>
            </div>
            <div class="x-sub">
                <div class="item" :class="tabIndex == 4 ? 'tab-selected' : ''" @click="toPage(4)">
                    <div class="tab-info">
                        <img class="sub-img" v-if="tabIndex == 4"
                            :src="require('../../assets/index/me-selected.png')" />
                        <img class="sub-img" v-else :src="require('../../assets/index/me-normal.png')" />
                        <div class="sub-txt">{{ GLOBAL.lanLocal['me'] }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tabbar',
    data() {
        return {
            tabIndex: 1
        }
    },
    created() {

    },
    computed: {

    },
    watch: {
        accountid :{
            immediate: true,
            handler(newValue, oldValue) {
                
            }
        },
        index :{
            immediate: true,
            handler(newValue, oldValue) {
                    this.tabIndex = newValue
            }
        },
        emailCount :{
            immediate: true,
            handler(newValue, oldValue) {
            }
        }
    },
    props: {
        accountid: {
            type: Number,
            default: 0
        },
        index: {
            type: Number,
            default: 1
        },
        emailCount: {
            type: Number,
            default: 0
        }
    },
    mounted() { },
    methods: {
        toPage(type) {
            this.tabIndex = type
            this.$emit('change', type)
        }
    }
}
</script>
<style lang="less" scoped>
.x-footer {
    display: flex;
    align-items: center;
    height: 70px;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 11;
    background: linear-gradient(262deg,#22027A 0%,#4705B2 100%);
    border-top: 1px solid white;
}

.x-sub {
    width: 35%;
    height: 100%;
    display: flex;
    justify-content: center;

    .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        position: relative;
        height: 100%;
        width: 70px;
        .selected-bg {
            display: none;
            position:absolute;
            bottom: 0;
            left: -8px;
            height: 80px;
            width: auto;
        }

        .selected-img {
            display: none;
        }
        .red-dot {
            height: 12px;
            width: 12px;
            position: absolute;
            top: 8px;
            right: 10px;
            z-index: 2;
        }
        .tab-info {
            position: absolute;
            left: 0;
            z-index: 1;
            width: 70px;
            text-align: center;

            .sub-img {
                width: 34px;
                height: 34px;
                -o-object-fit: contain;
                object-fit: contain;
                margin: 0 auto;
            }

            .sub-txt {
                font-family: Arial;
                color: #7f5aff;
                white-space: nowrap;
                font-size: 10px;
                line-height: 1;
            }

            .main-img {
                width: 70px;
                height: 70px;
                -o-object-fit: contain;
                object-fit: contain;
                margin: 0 auto;
            }
        }
    }

    .tab-selected {
        .selected-bg {
            display: block;
        }
        .tab-info {
            .sub-txt {
                color: white;
            }
        }
    }
}

.x-main {
    width: 30% !important;

    .item {
        .tab-info {
            bottom: 0 !important;
            height: 100% !important;
        }
    }
}
</style>