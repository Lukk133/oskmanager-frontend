<template>
    <div>
        <Header @save="save" />
        <Create ref="create" />
    </div>
</template>
<script>
import Header from '../../components/instructor/create/Header.vue';
import Create from '../../components/instructor/create/Create.vue';
export default {
    components: {
        Header,
        Create
    },
    computed: {
        instructor() {
            return this.$store.getters.getInstructor
        }
    },
    methods: {
        initFileInfo() {
            this.$store.commit("initFileInfo")
        },
        initInstructor() {
            this.$store.commit("initInstructor")
        },
        listCategories() {
            this.$store.dispatch("listCategories")
        },
        async save() {
            if (this.$refs.create.validate()) {
                console.log("HALO");
                const schoolId = this.$route.params.schoolId
                this.instructor.schoolId = parseInt(schoolId)
                this.instructor.categoryId = this.instructor.category.id
                this.instructor.carId = this.instructor.car.id
                await this.$store.dispatch("createInstructor")
                    .then(response => {
                        if (response) {
                            const id = response.data.user.id
                            this.$router.push({ name: "InstructorShow", params: { id: id, schoolId: schoolId } })
                        }
                    })
                    .catch(error => {
                        const message = error.message
                    })
            } else console.log("NIE");
        }
    },
    mounted() {
        this.initFileInfo()
        this.initInstructor()
        this.listCategories()
    }
}
</script>