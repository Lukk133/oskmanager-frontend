<template>
    <div class="d-flex">
        <div class="info">
            <AvatarInput :disabled="true" :width="72" :height="72" :src="getSrc(student.avatar?.path)">
                <template #title>
                    <div class="ml-4">
                        <div class="avatar-title">{{ student.name }}</div>
                        <div class="avatar-subtitle">{{ student.lastName }}</div>
                    </div>
                </template>
            </AvatarInput>
            <v-divider class="my-5"></v-divider>
            <div v-for="info in infos" :key="info.label" class="d-flex mt-1">
                <div class="mr-2">
                    <img :width="18" :src="`/icons/${info.icon}`" alt="">
                </div>
                <div class="info-label">
                    {{ info.label }}
                </div>
            </div>
            <v-divider class="my-5"></v-divider>
            <div>
                <div class="info-label">
                    Przypisany instruktor
                </div>
                {{ student.instructor?.name }}
            </div>
        </div>
    </div>
</template>
<script>
import AvatarInput from '../../ui/inputs/AvatarInput.vue';
export default {
    components: {
        AvatarInput
    },
    computed: {
        student() {
            return this.$store.getters.getStudent
        },
        infos() {
            return [
                {
                    icon: "user.svg",
                    label: `${this.student?.name} ${this.student?.lastName}`
                },
                {
                    icon: "phone.svg",
                    label: `${this.student?.phoneNumber}`
                },
                {
                    icon: "message.svg",
                    label: `${this.student?.email}`
                },
                {
                    icon: "category.svg",
                    label: `${this.student?.category?.name}`
                },
            ]
        }
    },
    data() {
        return {
        }
    },
    methods: {
        getSrc(src) {
            if (!src) {
                return null;
            }
            return `${axios.defaults.baseURL}files?path=${src}`
        },
    }
}
</script>
<style scoped>
.info-label {
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: Rubik;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
}
</style>