<template>
    <svg width="88" height="42" viewBox="0 0 88 42" :transform="`rotate(${left ? 180 : 0}, 0, 0)`" fill="none"
        class="c-pointer">
        <path @click="next"
            d="M34 0H8C3.58172 0 0 3.58172 0 8V34C0 38.4183 3.58172 42 8 42H34C38.4183 42 42 38.4183 42 34V8C42 3.58172 38.4183 0 34 0Z"
            :fill="defaultColor" />
        <path d="M18.5 25.23L22.86 20.87L18.5 16.51" stroke="#41494E" stroke-linecap="round" />
        <path @click="end"
            d="M80 0H54C49.5817 0 46 3.58172 46 8V34C46 38.4183 49.5817 42 54 42H80C84.4183 42 88 38.4183 88 34V8C88 3.58172 84.4183 0 80 0Z"
            fill="#E8ECF4" />
        <path d="M61 25.73L65.36 21.37L61 17.01" stroke="#41494E" stroke-linecap="round" />
        <path d="M69 25.73L73.36 21.37L69 17.01" stroke="#41494E" stroke-linecap="round" />
    </svg>
</template>
<script>
export default {
    props: {
        left: {
            default: false
        },
        page: {
            required: true
        },
        totalPages: {
            required: true
        }
    },
    emits: ['update:page'],
    computed: {
        multiple() {
            return this.left ? -1 : 1;
        }
    },
    data() {
        return {
            defaultColor: "#E8ECF4",
            hoverColor: "#41494E"
        }
    },
    methods: {
        change(value) {
            let nextPage = this.page + value
            if (nextPage <= 0) {
                nextPage = 1
            }
            if (nextPage > this.totalPages) {
                nextPage = this.totalPages
            }

            this.$emit('update:page', nextPage)
        },
        next() {
            console.log(111)
            this.change(this.multiple)
        },
        end() {
            this.change(this.multiple * this.totalPages)
        }
    }
}
</script>