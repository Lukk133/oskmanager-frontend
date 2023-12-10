<template>
    <v-sheet class="bg-solitude">
        <div v-if="selectedItem" class="d-flex justify-space-between">
            <slot name="selected"></slot>
            <v-btn icon="mdi-close" size="x-small" v-if="editable" @click="clear">

            </v-btn>
        </div>
        <TextInput v-else v-model="searchValueCom" :label="label" :icon="icon" />
        <v-sheet class="search-user bg-solitude">
            <slot name="list"></slot>

        </v-sheet>
    </v-sheet>
</template>
<script>
import TextInput from './TextInput.vue'
import AvatarImg from '../imgs/AvatarImg.vue'
export default {
    props: {
        selectedItem: {
            required: true
        },
        searchValue: {
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        labelingFunction: {
            type: Function,
            default: (item) => item.name
        },
        label: {
            type: String,
            default: 'Szukaj'
        },
        icon: {
            type: String,
            default: null
        },
        editable: {
            type: Boolean,
            default: true
        },
    },
    emits: ['update:selectedItem', 'update:searchValue'],
    components: {
        TextInput,
        AvatarImg
    },
    computed: {
        selectedItemCom: {
            get() {
                return this.selectedItem
            },
            set(value) {
                this.founded = true
                this.$emit('update:selectedItem', value)
            }
        },
        searchValueCom: {
            get() {
                return this.searchValue
            },
            set(value) {
                this.$emit('update:selectedItem', null)
                this.founded = false
                this.$emit('update:searchValue', value)
            }
        },
    },
    data() {
        return {
            founded: false
        }
    },
    methods: {
        clear() {
            this.founded = false
            this.selectedItemCom = null
        },
        select(item) {
            this.founded = true
            this.$emit('update:searchValue', this.labelingFunction(item))
            this.$emit('update:selectedItem', item)
        },
    },
}
</script>
<style scoped>
.student-label {
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: Rubik;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.search-user {
    width: 100%;
    /* position: absolute; */
    z-index: 9999;
    background-color: white;
}
</style>