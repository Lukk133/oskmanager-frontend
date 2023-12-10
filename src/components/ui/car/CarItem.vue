<template>
    <div class="d-flex align-center">
        <AvatarImg :obj="car.model" :width="width" :height="height" />
        <div class="ml-2">
            <div class="label">
                {{ car.brand?.name }}
                {{ car.model?.name }}
            </div>
        </div>
    </div>
</template>
<script>
import AvatarImg from '../imgs/AvatarImg.vue';
export default {
    components: {
        AvatarImg
    },
    props: {
        car: {
            required: true
        },
        additionalInfo: {
            type: String,
            default: null
        },
        width: {
            type: Number,
            default: 40
        },
        height: {
            type: Number,
            default: 40
        }
    }
}
</script>
<style scoped>
.label {
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.sub-label {
    color: var(--a, #41494E);
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
}
</style>