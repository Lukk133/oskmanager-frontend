<template>
    <div>
        <Header />
        <v-container class="layout-container">

            <Main />
            <SideBar />
        </v-container>
    </div>
</template>
<script>
import Header from '../../components/calendar/Header.vue';
import SideBar from '../../components/calendar/SideBar.vue';
import Main from '../../components/calendar/Main.vue';

export default {
    components: {
        Header,
        Main,
        SideBar
    },
}
</script>
<style>
.layout-container {
    display: flex;
}
</style>
