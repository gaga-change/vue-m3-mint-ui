<template>
    <ul>
        <li v-for="item in list" v-text="item"></li>
    </ul>
</template>

<script>
    export  default {
        data(){
            return {
                list: [1, 2, 3, 4, 5]
            }
        }
    }
</script>

<style scoped>

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    ul > li {
        border-bottom: 1px solid gainsboro;
        padding: 20px 10px;
    }

    ul > li:nth-child(even) {
        background-color: #bbefa0;
    }
</style>
