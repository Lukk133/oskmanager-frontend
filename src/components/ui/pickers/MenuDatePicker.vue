<template>
    <div>
        <v-menu v-model="menu" :close-on-content-click="false" style="z-index:999999">
            <template v-slot:activator="{ props }">
                <v-sheet class="d-flex align-center bg-solitude " :class="[editable ? 'c-pointer' : '']" @click="open"
                    v-bind="props">
                    <slot name="activator"></slot>
                </v-sheet>

            </template>
            <v-sheet class="pa-2" v-if="editable">

                <v-date-picker color="primary" v-model="date"></v-date-picker>
                <div class="d-flex flex-row-reverse ">

                    <v-btn color="red" size="x-small" icon="mdi-window-close" @click="close"> </v-btn>
                </div>
            </v-sheet>

        </v-menu>
    </div>
</template>
<script>
export default {
    props: {
        modelValue: {
            required: true
        },
        editable: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            menu: false,
        }
    },
    computed: {
        date: {
            get() {
                return new Date(this.modelValue)
            },
            set(value) {
                this.$emit('update:modelValue', this.$moment(value))
            }
        }
    },
    methods: {
        open() {
            this.menu = true;
        },
        close() {
            this.menu = false;
        }
    }

}

</script>