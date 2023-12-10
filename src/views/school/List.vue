<template>
    <div>
        <Create @created="listSchools" />
        <Filter @filter="listSchools" />
        <List @list="listSchools" />
    </div>
</template>
<script>
import Create from '../../components/school/list/Create.vue';
import Filter from '../../components/school/list/Filter.vue';
import List from '../../components/school/list/List.vue';
export default {
    components: {
        Create,
        Filter,
        List
    },
    methods: {
        listSchools() {
            this.$store.dispatch("listSchools")
        }
    },
    mounted() {
        this.listSchools()
    }
}
</script> 