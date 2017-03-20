<template>
    <div>
        <!--
            指令
                v-infinite-scroll = 'loadMore'(Function) 无限滚动的指令，给HTML元素添加即可使用。
            属性
                infinite-scroll-distance(Number) 触发加载方法的滚动距离阈值（px） 默认为0
                infinite-scroll-disabled(Boolean)  若为真，无限滚动不会被触发。 默认为 false（会触发）
                infinite-scroll-immediate-check(Boolean)如果真，屏幕没满，自动调用方法去填充内容。默认为true(自动填充)
                    屏幕自动填充，后期改动无效
            事件
                infinite-scroll-listen-for-event(Function) 被执行时会立即检测是否需要执行加载方法
        -->
        <h1>!</h1>
        <h1 style="position: absolute; width: 100% ;top: 0">上拉加载</h1>
        <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <ul
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-immediate-check="test"
                    infinite-scroll-distance="100"
            >
                <li v-for="item in list" v-text="item"></li>
            </ul>
            <p v-show="loading && init && !allLoading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                加载中...
            </p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {InfiniteScroll, spinner} from 'mint-ui';
    Vue.use(InfiniteScroll);
    Vue.component(spinner.name, spinner);
    import http from './http'
    export  default {
        data(){
            return {
                list: [],
                loading: true, // 不会触发
                init: false,
                allLoading: false,
                wrapperHeight: 0
            }
        },
        methods: {
            loadMore() {
                this.loading = true;
                let last = this.list[this.list.length - 1] || 0;
                http.loadMore(last).then((res) => {
                    if (res.length == 0) {
                        console.log("加载完毕");
                        this.allLoading = true;
                        return;
                    }
                    this.list.push(...res);
                    this.loading = false;
                });
            }
        },
        created(){
            setTimeout(() => {
                this.loadMore();
                this.init = true;
            }, 50)
        },
        mounted(){
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
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
        li {
            border-bottom: 1px solid gainsboro;
            background-color: #ffe5f7;
            padding: 20px 10px;
            &:nth-child(even) {
                background-color: #bbefa0;
            }
        }
    }
</style>


<style lang="scss" rel="stylesheet/scss">
    .page-infinite-loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
        div {
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
        }
    }
</style>
