<template>
    <svg v-if="isLeft()" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
        <rect width="42" height="42" rx="12" fill="#3C4B52" />
        <path
            d="M19.3117 20.9817L23.2693 16.9344C23.5603 16.6368 23.5603 16.1487 23.2693 15.8511C22.9783 15.5535 22.5011 15.5535 22.2101 15.8511L17.717 20.4461C17.4376 20.7317 17.426 21.196 17.6937 21.5055L22.1984 26.1243C22.4778 26.4338 22.955 26.4576 23.2577 26.1719C23.5603 25.8862 23.5836 25.3981 23.3042 25.0886C23.2926 25.0767 23.2693 25.0529 23.2577 25.041L19.3001 20.9817H19.3117Z"
            fill="white" />
    </svg>
    <svg v-if="isRight()" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
        <rect x="42" y="42" width="42" height="42" rx="12" transform="rotate(-180 42 42)" fill="#3C4B52" />
        <path
            d="M22.6883 21.0183L18.7307 25.0656C18.4397 25.3632 18.4397 25.8513 18.7307 26.1489C19.0217 26.4465 19.4989 26.4465 19.7899 26.1489L24.283 21.5539C24.5624 21.2683 24.574 20.804 24.3063 20.4945L19.8016 15.8757C19.5222 15.5662 19.045 15.5424 18.7423 15.8281C18.4397 16.1138 18.4164 16.6019 18.6958 16.9114C18.7074 16.9233 18.7307 16.9471 18.7423 16.959L22.6999 21.0183L22.6883 21.0183Z"
            fill="white" />
    </svg>
</template>
<script>
export default {
    props: {
        direction: {
            type: String,
            default: 'left'
        }
    },
    data() {
        return {
            width: 42,
            height: 42,
        }
    },
    methods: {
        isLeft() {
            return this.direction === 'left';
        },
        isRight() {
            return this.direction === 'right';
        }
    }
}
</script>