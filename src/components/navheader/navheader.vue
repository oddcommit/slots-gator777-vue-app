<template>
    <div class="nav-header">
        <div class="header-content">
            <img class="menu-icon" v-if="tabIndex == 2 ||tabIndex == 21 || tabIndex == 10 || tabIndex == 4 || tabIndex == 6 || tabIndex == 3 || tabIndex == 31"
                @click="close" :src="require('../../assets/icon/back.png')" />
            <img v-if="tabIndex != 2 && tabIndex != 21 &&  tabIndex != 10 &&  tabIndex != 4 &&  tabIndex != 6 &&  tabIndex != 3 &&  tabIndex != 31" class="menu-icon menu-mobile" @click="changeSlider" :src="require('../../assets/icon/left-menu.png')" />
            <img v-if="tabIndex != 2 && tabIndex != 21 &&  tabIndex != 10 &&  tabIndex != 4 &&  tabIndex != 6 &&  tabIndex != 3 &&  tabIndex != 31" class="menu-icon menu-pc" @click="changeSlider" :src="require('../../assets/icon/left-menu-pc.png')" />
            <img class="main-icon" :src="require('../../../static/logo.png')" />
            <div class="right-item">
                <div class="btn-w" v-if="accountid == 0" @click="toLogin">
                    <div style="flex: 1;padding-top:3px;">{{ GLOBAL.lanLocal['login'] }}</div>
                </div>
                <div class="btn-s" v-if="accountid == 0" @click="toReg">
                    <div style="flex: 1;padding-top:3px;">{{ GLOBAL.lanLocal['register_upper'] }}</div>
                </div>
                <div class="box-amount" v-if="accountid != 0" @click="toRecharge">
                    <div style="flex: 1;padding-top:3px;">{{ GLOBAL.currencySymbol }}&nbsp;{{ amount }}</div>
                    <img :src="require('../../assets/icon/add.png')" />
                </div>
                <div class="btn-w" v-if="accountid != 0" @click="toRecharge">
                    <div style="flex: 1;padding-top:3px;">{{ GLOBAL.lanLocal['recharge'] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'navheader',
    data() {
        return {
            lanCode: '',
            isShowLan: false
        }
    },
    created() {
        this.lanCode = this.GLOBAL.lanCode
    },
    watch: {
        amount: {
            immediate: true,
            handler(newValue, oldValue) {
            }
        },
        accountid: {
            immediate: true,
            handler(newValue, oldValue) {
            }
        },
        tabIndex: {
            immediate: true,
            handler(newValue, oldValue) {
            }
        },
    },
    props: {
        tabIndex: {
            type: Number,
            default: 0
        },
        amount: {
            type: String,
            default: '0.00'
        },
        accountid: {
            type: Number,
            default: 0
        },
        lanData: {
            type: Array,
            default: []
        }
    },
    computed: {

    },
    mounted() { },
    methods: {
        close() {
            this.$emit('close')
        },
        setLan(code) {
            this.$emit("setLan", code)
        },
        changeLan() {
            this.isShowLan = !this.isShowLan
        },
        func1() {

        },
        changeSlider() {
            this.$emit('changeSlider')
        },
        func1() {
        },
        toLogin() {
            this.$emit('toLogin')
        },
        toReg() {
            this.$emit('toReg')
        },
        toRecharge() {
            this.$emit('toRecharge')
        },
    }
}
</script>
<style lang="less" scoped>
.nav-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    height: 90px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background: linear-gradient(262deg,#22027A 0%,#4705B2 100%);
    padding: 0px 30px;

    .header-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 0 16px;
    }

    .menu-icon {
        cursor: pointer;
        height: 32px;
        width: 40px;
        margin-right: 8px;
    }

    .main-icon {
        height:46px !important;
        width: 126px;
        display: flex;
    }

    .menu-mobile {
        display: none;
    }

    .mobile-pc {
        display: flex;
    }

    @media only screen and (max-width: 450px) {
        .main-icon {
            display: none;
        }

        .menu-icon {
            width: 27px;
            height: 21px;
        }

        .menu-mobile {
            display: flex;
        }

        .menu-pc {
            display: none;
        }
    }

    .right-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end !important;

        .btn-s {
            font-family: Arial;
            margin-left: 6px;
            padding: 0 8px;
            line-height: 28px;
            font-size: 10px;
            font-weight: 600;
            border-radius: 10px;
            color: white;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            width: 96px;
            height: 40px;
            font-size: 16px;
            transform: translateY(-1px);
            background: linear-gradient(180deg,#f32e54 0%,#c5003b 100%);
            box-shadow: 0 0 16px rgba(212,15,68,.57), inset 0 2px 6px rgba(255,255,255,.5);
            transition: transform .1s ease-in-out;
            position: relative;
        }

        .btn-w {
            font-family: Arial;
            margin-left: 6px;
            padding: 0 8px;
            line-height: 28px;
            font-size: 10px;
            font-weight: 600;
            border-radius: 10px;
            color: white;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            width: 96px;
            height: 40px;
            font-size: 16px;
            transform: translateY(-1px);
            background: linear-gradient(180deg,#3ca3ff 0%,#0f5fff 100%);
            box-shadow: 0 0 16px rgba(15,76,212,.57), inset 0 2px 6px rgba(255,255,255,.5);
            position: relative;
        }

        .box-amount {
            color: #b03f00;
            font-weight: 700;
            background: #FBD81E;
            box-shadow: 0 0 0.2rem rgba(251,216,30,.3), inset 0 -0.04rem 0.06rem 0.02rem #f6a80b;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            font-size: 12px;
            padding: 0 6px;
            height: 28px;
            line-height: 28px;
            border-radius: 100px;

            >img {
                cursor: pointer;
                height: 20px;
                width: auto;
                margin-left: 6px;
            }
        }

        @media only screen and (max-width: 450px) {
            .btn-s {
                font-family: Arial;
                background: #FBD81E;
                box-shadow: 0 0 0.2rem rgba(251,216,30,.3), inset 0 -0.04rem 0.06rem 0.02rem #f6a80b;
                padding: 0 8px;
                height: 28px;
                line-height: 28px;
                font-size: 10px;
                font-weight: 600;
                border-radius: 100px;
                color: #b03f00;
                font-weight: 500;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                cursor: pointer;
                width: 150px;
            }

            .btn-w {
                display: none;
            }
        }

        .lan-box {
            font-size: 0;
            position: relative;
            padding-right: 10px;
        }

        .wallert {
            background-color: rgb(58, 64, 71);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 8px;
            box-sizing: border-box;
            width: 100px;
            height: 26px;
            border-radius: 8px;

            div {
                font-size: 12px;
                color: #fff;
            }

            img {
                width: 15px;
                height: 15px;
            }
        }

        .me-icon {
            margin-left: 6px;
        }
    }

    .amount-modal {
        position: absolute;
        top: 58px;
        right: 10px;
        height: 70px;
        width: 90px;
        z-index: 999;
        background-color: rgb(44, 52, 62);
        color: #f6f6f6;

        div {
            height: 35px;
            line-height: 35px;
            margin: 0 10px;
            font-size: 13px;
        }

        div:not(:last-child) {
            border-bottom: 1px solid rgb(34, 40, 48);
        }
    }

    .amount-modal::before {
        content: "";
        display: inline-block;
        position: absolute;
        right: 12px;
        top: -9px;
        border-bottom: 10px solid rgb(44, 52, 62);
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
    }
}

@media only screen and (max-width: 450px) {
    .nav-header {
        height: 60px !important;
        padding: 0px 5px;
    }
}

.lan-masking {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    height: 100%;
    width: 100%;
}


.lan-modal::before {
    content: "";
    display: inline-block;
    position: absolute;
    right: 12px;
    top: -9px;
    border-bottom: 10px solid rgb(39, 44, 50);
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
}

.lan-modal {
    position: absolute;
    top: 55px;
    right: 12px;
    background-color: rgb(39, 44, 50);
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
        border-bottom: 1px solid rgb(44, 50, 57);

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
</style>