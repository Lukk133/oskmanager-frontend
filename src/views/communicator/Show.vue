<template>
    <div>
        <Header />
        <div class="ml-5 mt-10">
            <Main v-if="isActual(null)" />
        </div>
    </div>
</template>
<script>
import Header from '../../components/communicator/Header.vue'
import Main from '../../components/communicator/Main.vue'
export default {
    components: {
        Header,
        Main,
    },
    methods: {
        isActual(name) {
            return this.$route.query.tab == name
        },
    },
}

</script>