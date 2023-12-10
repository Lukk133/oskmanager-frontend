<template>
    <div>
        <v-menu v-model="menu" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
                <v-sheet class="d-flex align-center" width="300">

                    <v-text-field :model-value="$moment(date).format('DD.MM.Y')">
                    </v-text-field><v-btn size="x-small" icon="mdi-calendar-range" v-bind="props"> </v-btn>
                </v-sheet>

            </template>
            <v-sheet class="pa-2">

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
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
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