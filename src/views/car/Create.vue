<template>
    <div>
        <Header @save="save" />
        <Create ref="create" />
    </div>
</template>
    <!--To było list.vue-->
<script>
import Header from '../../components/car/create/Header.vue';
import Create from '../../components/car/create/Create.vue';

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
        redirect() {
            this.$router.push({ name: "CarList", params: { schoolId: this.$route.params.schoolId } })
        },
        async save() {
            if (this.$refs.create.validate()) {
                const schoolId = this.$route.params.schoolId
                this.car.modelId = this.car.model.id
                this.car.brandId = this.car.brand.id
                this.car.gearboxId = 1
                this.car.schoolId = schoolId
                this.car.categoryId = 1
                // this.car.category.id
                await this.$store.dispatch("createCar")
                    .then(response => {
                        this.redirect()
                        const id = response.data.user.id
                        this.$router.push({ name: "CarList", params: { id: id, schoolId: schoolId } })
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
