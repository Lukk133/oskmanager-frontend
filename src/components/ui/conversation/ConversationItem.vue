<template>
    <div class="d-flex align-center">
        <AvatarImg />
        <div class="ml-2">
            <div class="label">
                <div class="light-font">
                    {{ formatLastMessageDate(conversation?.lastMessageAt) }}
                </div>
                {{ getFirstUserName() }}
                <div class="light-font">
                    {{ conversation?.lastMessage }}
                </div>
            </div>
            <div class="sub-label" v-if="additionalInfo">
                {{ additionalInfo }}
            </div>
        </div>
    </div>
</template>

<script>
import AvatarImg from '../imgs/AvatarImg.vue';

export default {
    components: {
        AvatarImg
    },
    props: {
        conversation: {
            type: Object,
            required: true
        },
        additionalInfo: {
            type: String,
            default: null
        },
        width: {
            type: Number,
            default: 40
        },
        height: {
            type: Number,
            default: 40
        }
    },
    methods: {
        formatLastMessageDate(dateArray) {
            if (!dateArray || dateArray.length !== 7) {
                return ''; // Handle invalid date format
            }

            const [year, month, day, hours, minutes, seconds, milliseconds] = dateArray;
            const formattedDate = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);

            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
            return formattedDate.toLocaleDateString(undefined, options);
        },
        getFirstUserName() {
            const firstUser = this.conversation?.users?.[0];

            if (firstUser) {
                return `${firstUser.name} ${firstUser.lastName}`;
            }

            return '';
        }
    }
}
</script>

<style scoped>
.light-font {
    font-weight: 400;
    font-size: 12px;
    color: #9B9B9B;

}

.label {
    color: var(--d-9-d-9-d-9, #3C4B52);
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.sub-label {
    color: var(--a, #41494E);
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
}
</style>
