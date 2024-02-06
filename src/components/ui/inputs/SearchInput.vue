<template>
    <div v-if="title" class="select-title mb-1">
        {{ title }}
    </div>
    <div>
        <div class="text-input-label">
            {{ label }}
        </div>
        <v-sheet class="input-wrapper" :width="width" height="36">
            <div class="input-container align-end">
                <input v-model="value" class="text-input" :placeholder="placeholder" />
                <span class="input-icon" v-if="icon">
                    <img src="/icons/loop.svg" />
                </span>
            </div>
        </v-sheet>
    </div>
</template>
<script>
export default {
    props: {
        modelValue: {
            required: true
        },
        label: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: "Szukaj"
        },
        icon: {
            type: Boolean,
            default: true
        },
        width: {
            type: Number,
            default: 264
        },
        title: {
            type: String,
            default: null
        },
    },
    emits: ['update:modelValue'],
    computed: {
        value: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    },
}
</script>
<style scoped>
.select-title {
    color: #707070;
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.input-container {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}

.text-input-label {
    font-family: Rubik;
    font-size: 12px;
    font-weight: 400;
}

textarea,
input {
    outline: none;
}

.input-wrapper {
    display: flex;
    align-items: center;
    border-radius: 12px;
    border: 1px solid #41494E;
    background: var(--Color, #FFF);
}

.text-input {
    flex-grow: 1;
    padding: 10px 12px;
    border: none;
    border-radius: 12px 0 0 12px;
    font-family: Rubik;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.input-icon {
    padding: 10px;
    padding-top: 13px;
    border-radius: 0 12px 12px 0;
    /* Adjusted to only have border-radius on the right side */
    font-size: 16px;
    /* Adjust size as needed */
    cursor: pointer;
    /* If the icon should be clickable */
}
</style>
