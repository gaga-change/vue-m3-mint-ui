<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <hr>
        <ul>
            <li v-for="item in nav">
                <router-link :to="{name:item.name}" v-text="item.linkName"></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import config from '../router/nav.config.json'

    export default {
        name: 'hello',
        data(){
            return {
                nav: null,
                msg: 'M站的UI组件库'
            }
        },
        created(){
//            Toast(this.msg)
            this.nav = config.navList;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    a{
        text-decoration: none;
    }
    a:link, a:visited, a:hover, a:active {
        color: #222;
    }
    ul li:nth-child(even) {
        background-color: #bbefa0;
    }
</style>
