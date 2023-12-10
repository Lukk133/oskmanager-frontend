<template>
    <img :src="`/icons/${icon}.svg`" :style="`width:${width}px;height:${height}px;`" alt="">
</template>
<script>
export default {
    props: {
        width: {
            type: Number,
            default: 20
        },
        height: {
            type: Number,
            default: 20
        },
        icon: {
            type: String,
            required: true
        },
    }
}
</script>
