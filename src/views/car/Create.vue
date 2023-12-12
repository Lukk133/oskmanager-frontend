<template>
    <div>
        <Header @save="save" />
        <Create ref="create" />
    </div>
</template>
    <!--To było list.vue-->
<script>
import Header from '../../components/instructor/create/Header.vue';
import Create from '../../components/instructor/create/Create.vue';

export default {
    components: {
        Header,
        Create
    },
    computed: {
        car() {
            return this.$store.getters.getCar
        }
    },
    methods: {
        initFileInfo() {
            this.$store.commit("initFileInfo")
        },
        initCar() {
            this.$store.commit("initCar")
        },
        listCategories() {
            this.$store.dispatch("listCategories")
        },
        async save() {
            if (this.$refs.create.validate()) {
                const schoolId = this.$route.params.schoolId
                this.car.schoolId = schoolId
                this.car.categoryId = this.car.category.id
                this.car.carId = this.car.car.id
                await this.$store.dispatch("createCar")
                    .then(response => {
                        if (response) {
                            const id = response.data.user.id
                            this.$router.push({ name: "CarShow", params: { id: id, schoolId: schoolId } })
                        }
                    })
                    .catch(error => {
                        const message = error.message
                    })
            }
        }
    },
    mounted() {
        this.initFileInfo()
        this.initCar()
        this.listCategories()
    }
}
</script>
