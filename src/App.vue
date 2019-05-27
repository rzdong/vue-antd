<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <a-button type="primary" class=""><a-icon type="step-backward" />rewqrewq</a-button>
                <router-view/>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import {Button} from 'ant-design-vue';
// const Button = require('ant-design-vue/lib/button');
import Button from 'ant-design-vue/lib/button'
const Icon = require('ant-design-vue/lib/icon')
@Component({
    components: {
        aButton: Button,
        aIcon: Icon,
    }
})
export default class App extends Vue {



}
</script>



<style lang="scss" scoped>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    transform: translate(1px, 2px);
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
