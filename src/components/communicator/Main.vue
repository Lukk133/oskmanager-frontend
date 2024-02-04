<template>
    <div class="mr-2">
        <div class="d-flex flex-column">
            <Filter />
        </div>
        <div class="rides-content d-flex">
            <UserMessages />
            <Messages />
        </div>
    </div>
</template>
<script>
import Filter from './Filter.vue'
import UserMessages from './UserMessages.vue'
import Messages from './Messages.vue'
export default {
    components: {
        Filter,
        UserMessages,
        Messages
    },
    // methods: {
    //     getSrc(src) {
    //         if (!src) {
    //             return null;
    //         }
    //         return `${axios.defaults.baseURL}files?path=${src}`
    //     },
    // } co to jest?
}
</script>
<style scoped>
/* .rides-content {
    flex: 1;
    czm
} */
</style>