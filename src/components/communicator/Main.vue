<template>
    <div class="mr-2">
        <div class="rides-container">
            <Filter />
        </div>
        <div class="rides-content">
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
    methods: {
        getSrc(src) {
            if (!src) {
                return null;
            }
            return `${axios.defaults.baseURL}files?path=${src}`
        },
    }
}
</script>
<style scoped>
.rides-container {
    display: flex;
    flex-direction: column;
}

.rides-content {
    display: flex;
    flex: 1;
}
</style>