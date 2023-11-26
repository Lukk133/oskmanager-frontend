<template>
    <div>
        <!-- TODO TO NIE POWINNO TU BYĆ -->
        {{ school }}
    </div>
</template>
<script>
export default {
    computed: {
        school() {
            return this.$store.getters.getSchool
        }
    },
    methods: {
        getSchool() {
            const id = this.$route.params.id
            this.$store.dispatch("getSchool", id)
        }
    },
    mounted() {
        this.getSchool()
    }
}
</script>