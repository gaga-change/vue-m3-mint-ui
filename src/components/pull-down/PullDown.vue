<template>
    <div>
        <!--
            属性
            ref: 为了获取loadmore组件实例
            autoFill: 是否自动填充(填充也不是执行topMethod方法)
            topMethod： 下拉更新执行的方法
            事件
            top-status-change：顶部状态发生变化

            组件里面如果只放入列表。mt-loadmore会自动包两层。
            最好用一个slot。把ul的部分也放入（组件封装组件）

        -->
        <h1>!</h1>
        <h1 style="position: absolute; width: 100% ;top: 0">下拉更新</h1>
        <mt-loadmore
                ref="loadmore"
                :autoFill=false
                :topMethod='topMethod'
                @top-status-change='topStatusChange'
        >
            <ul>
                <li v-for="item in list" v-text="item"></li>
            </ul>
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'">
                    <span v-if="msgShow">更新成功</span>
                    <mt-spinner type="snake" v-if="!msgShow"></mt-spinner>

                </span>
            </div>
        </mt-loadmore>

    </div>
</template>

<script>
    import Vue from 'vue'
    import {Loadmore, spinner} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.component(spinner.name, spinner);
    import http from './http'
    export  default {
        data(){
            return {
                list: [1, 2, 3, 4, 5],
                topStatus: '',
                msgShow: false,
//                successMsg: ''
            }
        },
        methods: {
            topStatusChange(status){
                // 下拉和释放状态，主要用于控制下拉的样式效果
                this.topStatus = status;
            },
            topMethod() {
                this.msgShow = false;
                http.getTop(this.list[0]).then(res => {
                    console.log(res);
                    this.list.unshift(...res);
                    this.msgShow = true;
                    setTimeout(() => {
                        this.$refs.loadmore.onTopLoaded();
                    }, 500);
                });
            }
        }
    }
</script>

<style scoped>
    .mint-loadmore-top {
        z-index: -100;
    }

    .mint-loadmore-top span {
        display: inline-block;
        transition: .2s linear;
        vertical-align: middle;

    }

    .rotate {
        transform: rotate(180deg);
    }

    .mint-loadmore {
        overflow: visible;
    }

    h1 {
        text-align: center;
        background-color: antiquewhite;
        z-index: 10;
        margin: 0;
        padding: 20px;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    ul li {
        border-bottom: 1px solid gainsboro;
        background-color: #ffe5f7;
        padding: 20px 10px;
    }

    ul li:nth-child(even) {
        background-color: #bbefa0;
    }
</style>
