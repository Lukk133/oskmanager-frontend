<template>
    <button class="filter-button" :class="[buttonClass, { 'selected': isSelected }]" @click="updateFilter">
        {{ label }}
    </button>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        buttonClass: String
    },
    computed: {
        buttonClass() {
            return this.buttonClass;
        }
    },
    methods: {
        updateFilter() {
            this.$emit('updateFilter', this.value);
            this.isSelected = !this.isSelected;
        }
    }
};
</script>

<style>
.filter-button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #E8ECF4;
    width: 77px;
    height: 35px;
    padding: 9px 20px;
    background-color: #9B9B9B;
    font-family: Rubik;
    font-weight: 400;
    font-size: 14px;
    line-height: 16.59px;
}

.selected {
    background-color: black;
    color: black
}
</style>
