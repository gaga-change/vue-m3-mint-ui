<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <hr>
        <ul>
            <li v-for="item in nav">
                <router-link :to="{name:item.name}" v-text="item.name"></router-link>
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
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
