<template>
    <div class="d-flex align-center">
        <div v-for="(navElement, index) in navElements" :key="index">
            <div class="ml-6 mb-2 d-flex align-center c-pointer" @click="goTo(navElement)">
                <img :src="`/icons/${isActive(navElement) ? 'active-' : ''}${navElement.icon}`" alt="">
                <div class="ml-2 subnavigation-label">
                    {{ navElement.label }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            navElements: [
                {
                    "label": "Informacje ogólne",
                    "icon": "profile-user.svg",
                    "name": null
                },
                {
                    "label": "Dokumenty",
                    "icon": "briefcase.svg",
                    "name": "documents"
                },
                {
                    "label": "Jazdy",
                    "icon": "lightbulb.svg",
                    "name": "rides"
                },
            ]
        }
    },
    methods: {
        goTo(navElement) {
            if (navElement.name) {
                this.$router.push({ name: "InstructorShow", params: { id: this.$route.params.id }, query: { tab: navElement.name } })
            } else {
                this.$router.push({ name: "InstructorShow", params: { id: this.$route.params.id } })

            }
        },
        isActive(navElement) {
            return navElement.name == this.$route.query.tab
        }
    }
}
</script>