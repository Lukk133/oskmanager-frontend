<template>
    <div class="d-flex align-center">
        <div class="image-icon-wrapper" @click="triggerFileInput">
            <v-img width="80" height="80" class="c-pointer rounded-circle" :src="src ? src : '/icons/instructor.svg'" />
            <v-sheet width="80" height="80" class="bg-black rounded-circle d-flex justify-center align-center c-pointer"
                style="opacity:0.4;margin-top:-80px" v-if="!disabled">
                <div class="overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                        <path
                            d="M2 2H5L7 0H13L15 2H18C18.5304 2 19.0391 2.21071 19.4142 2.58579C19.7893 2.96086 20 3.46957 20 4V16C20 16.5304 19.7893 17.0391 19.4142 17.4142C19.0391 17.7893 18.5304 18 18 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V4C0 3.46957 0.210714 2.96086 0.585786 2.58579C0.960859 2.21071 1.46957 2 2 2ZM10 5C8.67392 5 7.40215 5.52678 6.46447 6.46447C5.52678 7.40215 5 8.67392 5 10C5 11.3261 5.52678 12.5979 6.46447 13.5355C7.40215 14.4732 8.67392 15 10 15C11.3261 15 12.5979 14.4732 13.5355 13.5355C14.4732 12.5979 15 11.3261 15 10C15 8.67392 14.4732 7.40215 13.5355 6.46447C12.5979 5.52678 11.3261 5 10 5ZM10 7C10.7956 7 11.5587 7.31607 12.1213 7.87868C12.6839 8.44129 13 9.20435 13 10C13 10.7956 12.6839 11.5587 12.1213 12.1213C11.5587 12.6839 10.7956 13 10 13C9.20435 13 8.44129 12.6839 7.87868 12.1213C7.31607 11.5587 7 10.7956 7 10C7 9.20435 7.31607 8.44129 7.87868 7.87868C8.44129 7.31607 9.20435 7 10 7Z"
                            fill="white" />
                    </svg>
                </div>
            </v-sheet>
        </div>
        <slot name="title"></slot>
        <input type="file" ref="fileInput" @change="uploadAvatar" style="display: none;" />
    </div>
</template>
  
<script>
export default {
    props: {
        defaultAvatar: {
            type: String
        },
        src: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        uploadAvatar(event) {
            const file = event.target.files[0];
            if (file) {
                this.$emit('changed', file)
            }
        },
        triggerFileInput() {
            if (!this.disabled) {

                this.$refs.fileInput.click();
            }
        },
        uploadAvatar(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.src = e.target.result;
                };
                reader.readAsDataURL(file);
                this.$emit('changed', file);
            }
        }
    }
};
</script>
  
<style>
.image-icon-wrapper {
    position: relative;
    display: inline-block;
}

.image-icon-wrapper img {
    display: block;
}

.icon-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.avatar {
    border-radius: 50%;
}

.avatar-title {
    color: var(--a, #41494E);
    font-family: 'Encode Sans Expanded', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.3px;
}

.avatar-subtitle {
    color: var(--a, #41494E);
    font-family: 'Encode Sans Expanded', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.3px;
}
</style>
  