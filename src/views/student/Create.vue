<template>
    <div>
        <Header @save="save" />
        <Create ref="create" />
    </div>
</template>
<script>
import Header from '../../components/student/create/Header.vue';
import Create from '../../components/student/create/Create.vue';
export default {
    components: {
        Header,
        Create
    },
    computed: {
        student() {
            return this.$store.getters.getStudent
        }
        //czy potrzebne
    },
    methods: {
        initFileInfo() {
            this.$store.commit("initFileInfo")
        },
        initStudent() {
            this.$store.commit("initStudent")
        },
        redirect() {
            this.$router.push({ name: "StudentList", params: { schoolId: this.$route.params.schoolId } })
        },
        async save() {
            if (this.$refs.create.validate()) {
                const schoolId = this.$route.params.schoolId
                this.student.schoolId = schoolId
                this.student.password = "123"
                //      this.student.categoryId = this.student.category.id
                //    this.student.carId = this.student.car.id
                await this.$store.dispatch("createStudent")
                    .then(response => {
                        this.redirect()
                        const id = response.data.user.id
                        this.$router.push({ name: "StudentShow", params: { id: id, schoolId: schoolId } })
                    })
                    .catch(error => {
                        const message = error.message
                    })
            }
        }
    },
    mounted() {
        this.initFileInfo()
        this.initStudent()
    }
}
</script>