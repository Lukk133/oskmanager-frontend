<template>
    <slot></slot>
</template>

<script>
export default {
    methods: {
        validate(refs) {
            let filteredRefs = Object.keys(refs)
                .filter(key => refs[key].canValidate)
                .map(key => refs[key]);
            let validated = true
            for (let ref of filteredRefs) {
                if (ref.validate() == false) {
                    validated = false
                }
            }
            return validated
        }
    }
}
</script>
