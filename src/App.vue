<template>
    <div id="app">
        <a-layout style="height: 100%">
            <a-layout-sider theme="light" :width="250" :style="{'overflow': 'hidden'}">
                <div class="logo">

                </div>
                <a-menu theme="light"
                    mode="inline"
                    :defaultSelectedKeys="['1']"
                    :defaultOpenKeys="['sub1']"
                >
                    <a-sub-menu key="sub1">
                        <span slot="title"><a-icon type="user" />subnav 1</span>
                        <a-menu-item key="1">主页1</a-menu-item>
                        <a-menu-item key="2">主页1</a-menu-item>
                        <a-menu-item key="3">主页1</a-menu-item>
                        <a-menu-item key="4">主页1</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub2">
                        <span slot="title"><a-icon type="user" />subnav 1</span>
                        <a-menu-item key="5">主页1</a-menu-item>
                        <a-menu-item key="6">主页1</a-menu-item>
                        <a-menu-item key="7">主页1</a-menu-item>
                        <a-menu-item key="8">主页1</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub3">
                        <span slot="title"><a-icon type="user" />subnav 1</span>
                        <a-menu-item key="9">主页1</a-menu-item>
                        <a-menu-item key="10">主页1</a-menu-item>
                        <a-menu-item key="11">主页1</a-menu-item>
                        <a-menu-item key="12">主页1</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub4">
                        <span slot="title"><a-icon type="user" />subnav 1</span>
                        <a-menu-item key="13">主页1</a-menu-item>
                        <a-menu-item key="14">主页1</a-menu-item>
                        <a-menu-item key="15">主页1</a-menu-item>
                        <a-menu-item key="16">主页1</a-menu-item>
                    </a-sub-menu>
                </a-menu>

            </a-layout-sider>
            <a-layout>
                <a-layout-header>Header</a-layout-header>
                <a-layout-content>Content</a-layout-content>
                <a-layout-footer>Footer</a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
    components: {
    }
})
export default class App extends Vue {



}
</script>



<style lang="scss">

body {
    overflow-x: hidden;
}

.ant-layout-sider-children {
    width: 264px;
    overflow-x: hidden;
    overflow-y: scroll;
}

.ant-menu-submenu {
    border-bottom: 1px solid #eee;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
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
