<template>
    <div class="mr-2">
        <div class="d-flex flex-column">
            <Filter />
        </div>
        <Notifications />
        <Pagination />
    </div>
</template>
<script>
import Filter from './Filter.vue'
import Notifications from './Notifications.vue'
import Pagination from './Pagination.vue'

export default {
    components: {
        Filter,
        Notifications,
        Pagination
    },
}
</script>
