<template>
    <div class="d-flex justify-space-between">
        <div class="d-flex align-center mb-4">
            <div v-if="previousRoute" @click="redirectBack()" class="c-pointer">
                <img src="/icons/goback-arrow.svg" alt="">
            </div>
            <img :src="`/icons/${icon}`" class="mx-2" width="36">
            <div class="ml-1">
                <div class="title">
                    {{ title }}
                </div>
                <div class="label">
                    {{ label }}
                </div>
            </div>
        </div>
        <slot name="button"></slot>
    </div>
    <slot name="navigation" class="subnavigation-label"></slot>
    <v-divider></v-divider>
</template>

<script>
import RedirectButton from '../buttons/RedirectButton.vue';
export default {
    components: {
        RedirectButton
    },
    props: {
        icon: {
            required: true
        },
        title: {
            required: true
        },
        label: {
            required: true
        },
        previousRoute: {
            default: null
        }
    },
    methods: {
        redirectBack() {
            if (window.history.length > 1) {
                this.$router.go(-1);
            } else {
                const defaultRoute = "SchoolSettings"
                const schoolId = this.$route.params.schoolId
                this.$router.push({ name: this.previousRoute, params: { schoolId: schoolId } });
            }
        }

    }
}
</script>
<style>
.label {
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.36px;
}

.title {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.subnavigation-label {
    font-family: Rubik;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
</style>