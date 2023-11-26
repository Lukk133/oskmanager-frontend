<template>
    <div>
        <Create @created="listCars" />
        <List @list="listCars" />
    </div>
</template>

<script>
import List from '../../components/car/List.vue';
import Create from '../../components/car/Create.vue';

export default {
    components: {
        List,
        Create
    },
    methods: {
        listCars() {
            this.$store.dispatch("listCars");
        },
        setSchoolId() {
            const schoolId = this.$route.params.schoolId;
            var params = this.$store.getters.getCarsParams;
            params.schoolId = schoolId;
            this.$store.commit("setCarsParams", params);
        }
    },
    mounted() {
        this.setSchoolId();
        this.listCars();
    }
}
</script>
