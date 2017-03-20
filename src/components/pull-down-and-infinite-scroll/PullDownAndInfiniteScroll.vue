<template>
    <div>
        <h1>!</h1>
        <h1 style="position: absolute; width: 100% ;top: 0">下拉刷新，上拉加载</h1>
        <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore
                    ref="loadmore"
                    :autoFill=false
                    :topMethod='topMethod'
                    @top-status-change='topStatusChange'

                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-immediate-check="test"
                    infinite-scroll-distance="100"
            >
                <ul>
                    <li v-for="item in list" v-text="item"></li>
                </ul>
                <p v-show="loading && init && !allLoading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">
                    <span v-if="msgShow">更新成功</span>
                    <mt-spinner type="snake" v-if="!msgShow"></mt-spinner>

                </span>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Loadmore, spinner, InfiniteScroll} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.component(spinner.name, spinner);
    Vue.use(InfiniteScroll);

    import http from './http'
    export  default {
        data(){
            return {
                list: [1, 2, 3, 4, 5],
                topStatus: '',
                msgShow: false,

                loading: true, // 不会触发
                init: false,
                allLoading: false,
                wrapperHeight: 0
            }
        },
        mounted(){
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            setTimeout(() => {
                this.loadMore();
                this.init = true;
            }, 50)
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
            },
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
