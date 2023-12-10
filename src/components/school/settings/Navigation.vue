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
                    "label": "Lokalizacje",
                    "icon": "briefcase.svg",
                    "name": "locations"
                },
                {
                    "label": "Typy kursów",
                    "icon": "lightbulb.svg",
                    "name": "course-types"
                },
            ]
        }
    },
    methods: {
        goTo(navElement) {
            const schoolId = this.$route.params.schoolId
            if (navElement.name) {
                this.$router.push({ name: "SchoolSettings", params: { schoolId: schoolId }, query: { tab: navElement.name } })
            } else {
                this.$router.push({ name: "SchoolSettings", params: { schoolId: schoolId } })

            }
        },
        isActive(navElement) {
            return navElement.name == this.$route.query.tab
        }
    }
}
</script>