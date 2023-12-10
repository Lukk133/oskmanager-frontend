<template>
    <div v-if="title" class="select-title mb-1">
        {{ title }}
    </div>
    <div v-if="!editable" class="selected d-flex justify-space-between">
        <AvatarImg v-if="withAvatar && value" :obj="avatarLabeling(value)" :width="24" :height="24" class="mr-2" />
        {{ value ? labelingFunction(value) : placeholder }}
    </div>
    <v-sheet v-else :width="width" min-height="36" class="custom-select bg-solitude" :class="{ disabled: disabled }"
        @blur="closeSelect()" tabindex="0">
        <div class="selected d-flex justify-space-between" :class="{ open: open }" @click="openSelect()">
            <div class="d-flex align-center">
                <AvatarImg v-if="withAvatar && value" :obj="avatarLabeling(value)" :width="24" :height="24" class="mr-2" />
                {{ value ? labelingFunction(value) : placeholder }}
            </div>
            <div>
                <img :src="`/icons/arrow-${open ? 'up' : 'down'}.svg`" alt="">
            </div>
        </div>
        <div class="items" :class="{ selectHide: !open }">
            <div v-for="(item, i) of items" :key="i" @click="select(item)" class="d-flex align-center">
                <AvatarImg v-if="withAvatar" :obj="avatarLabeling(item)" :width="24" :height="24" class="mr-2" />
                {{ labelingFunction(item) }}
            </div>
        </div>
        <span v-if="validationError" class="error-message">{{ validationError() }}</span>
    </v-sheet>
</template>
<script>
import AvatarImg from '../imgs/AvatarImg.vue';
export default {
    components: {
        AvatarImg
    },
    props: {
        width: {
            type: Number,
            default: 264
        },
        items: {
            type: Array,
            required: true,
        },
        modelValue: {
            required: true
        },
        default: {
            type: String,
            required: false,
            default: null,
        },
        placeholder: {
            type: String,
            default: "Wybierz"
        },
        label: {
            type: String,
            default: 'name'
        },
        preLabel: {
            default: null
        },
        rules: {
            type: Array,
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: null
        },
        labelingFunction: {
            type: Function,
            default: item => item.name
        },
        editable: {
            type: Boolean,
            default: true
        },
        withAvatar: {
            type: Boolean,
            default: false
        },
        avatarLabeling: {
            type: Function,
            default: item => item
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            rulesFunctions: {
                required: value => !!value || 'Pole jest wymagane',
                max: value => (value && value.length <= 10) || `${this.label} must be less than 10 characters`,
                email: value => /.+@.+\..+/.test(value) || 'Invalid email',
                phoneNumber: value => /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value) || 'Invalid phone number',

            },
            changed: false,
            canValidate: true,
            open: false,
        };
    },
    computed: {
        value: {
            get() {
                console.log(this.modelValue)
                return this.modelValue
            },
            set(value) {
                console.log("VALUE")
                console.log(value)
                this.$emit('update:modelValue', value)
            }
        }
    },
    methods: {
        closeSelect() {
            this.open = false
        },
        openSelect() {
            if (!this.disabled) this.open = !this.open
        },
        close() {
            console.log(12333)
        },
        validationError() {
            if (!this.changed) {
                return ''
            }
            for (let rule of this.rules) {
                const result = this.rulesFunctions[rule](this.value);
                if (result !== true) {
                    return result;
                }
            }
            return '';
        },
        validate() {
            this.changed = true
            return this.validationError() === ''
        },
        select(item) {
            this.value = item
            this.open = false
        }
    },
};
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

.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.custom-select {
    color: #707070;

    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 36px;
    line-height: 36px;
    background-color: #fff;

}

.custom-select .selected {
    background-color: #fff;
    color: #333;
    border-radius: 12px;
    border: 1px solid #41494E;
    padding-left: 1em;
    padding-right: 1em;
    cursor: pointer;
    user-select: none;

}

.custom-select .selected.open {
    /* border: 1px solid #ad8225; */
    border-bottom-width: 0;
    border-radius: 12px 12px 0px 0px;

}

.items {
    max-height: 200px;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

}

::-webkit-scrollbar {
    display: none;
}

.custom-select .items {
    background-color: #fff;
    color: #333;
    border-radius: 0px 0px 12px 12px;
    border-right: 1px solid #41494E;
    border-left: 1px solid #41494E;
    border-bottom: 1px solid #41494E;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
}

.custom-select .items div {
    color: #333;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
}


.selectHide {
    display: none;

}
</style>
  