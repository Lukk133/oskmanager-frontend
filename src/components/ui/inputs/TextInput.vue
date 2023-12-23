<template>
    <v-sheet class="input-container bg-solitude my-2" width="264">
        <label class="text-input-label">{{ label }}</label>
        <!-- <icon v-if="icon" :icon="icon" :width="13" :height="13" />
        <input type="text" v-model="value" class="underline-input"> -->
        <!-- <div class="input-with-icon">
            <input type="text" v-model="value" class="underline-input" :placeholder="placeholder">
        </div> -->
        <v-sheet class="input-wrapper bg-solitude" width="264" height="36">
            <input v-model="value" class="text-input underline-input" width="264" height="36" :placeholder="placeholder" />

            <icon v-if="icon" :icon="icon" class="input-icon" :width="13" :height="13" />
        </v-sheet>
        <span v-if="validationError" class="error-message">{{ validationError() }}</span>
    </v-sheet>
</template>
  
<script>
export default {
    props: {
        modelValue: {
            required: true
        },
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: null
        },
        rules: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            rulesFunctions: {
                required: value => !!value || 'Pole jest wymagane',
                max: value => (value && value.length <= 10) || `${this.label} must be less than 10 characters`,
                email: value => /.+@.+\..+/.test(value) || 'Invalid email',
                phoneNumber: value => /^(\+\d{1,3}[- ]?)?\d{9}$/.test(value) || 'Invalid phone number',

            },
            changed: false,
            canValidate: true
        }
    },
    emits: ['update:modelValue'],
    computed: {
        value: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.changed = true
                this.$emit('update:modelValue', value)
            }
        }
    },
    methods: {
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
        }
    }
}
</script>
  
<style>
.input-with-icon {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    margin-top: -4px;
    /* left: 10px; */
    /* Adjust as needed */
}

.text-input {
    width: 264px;

}

.text-input-label {
    color: #707070;

    /* text */
    font-family: Rubik;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.input-container {
    color: #707070;

    font-family: 'Encode Sans Expanded', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.21px;
    display: flex;
    flex-direction: column;
}

.underline-input {
    margin-top: -7px;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #E8ECF4;
    outline: none;
    padding: 8px 20px;

    font-size: 16px;
}

.input-wrapper {
    display: flex;
    align-items: center;
}

textarea,
input {
    outline: none;
}

label {
    padding-bottom: 4px;
}



::placeholder {
    color: #aaa;
    opacity: 1;
}
</style>
  