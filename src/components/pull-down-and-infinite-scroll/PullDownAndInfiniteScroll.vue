<template>
    <div>
        <h1>!</h1>
        <h1 style="position: absolute; width: 100% ;top: 0">下拉刷新，上拉加载</h1>
        <singleList
                :start="startSingleList"
                :dataArr="list"
                :updateTop="updateTop"
                :updateBottom="updateBottom"
        >
            <ul>
                <li v-for="item in list" v-text="item"></li>
            </ul>
            <div slot="noDataShow">
                没有数据没有数据没有数据没有数据没有数据没有数据没
                有数据没有数据没有数据没有数据没
                有数据没有数据没有数据没有数据没有数据没有数据
            </div>
        </singleList>
    </div>
</template>

<script>
    import Vue from 'vue'
    import singleList from './PullDownAndInfiniteScrollComponent.vue'


    Vue.component('singleList', singleList);
    import http from './http'
    export  default {
        data(){
            return {
                list: null,
                startSingleList: false // 启动列表显示的指令
            }
        },
        created(){
            setTimeout(() => {
                this.list = [];
                this.startSingleList = true;
            }, 100)
        },
        methods: {
            updateTop(){
                return new Promise((resolve) => {
                    http.getTop(this.list[0]).then(res => {
                        this.list.unshift(...res);
                        resolve();
                    });
                })
            },
            updateBottom(){
                return new Promise((resolve) => {
                    let last = this.list[this.list.length - 1] || 0;
                    http.loadMore(last).then((res) => {
                        if (res.length == 0) {

                            resolve("加载完毕")
                        } else {
                            this.list.push(...res);
                            resolve();
                        }
                    });
                });
            }
        }
    }
</script>

<style scoped>
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
