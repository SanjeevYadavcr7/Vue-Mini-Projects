<script setup lang="ts">
import { useNotification } from '@/composables/useNotifications';
import { useSettings } from '@/composables/useSettings';

const { notifications } = useSettings();
const { addNotification } = useNotification();
const save = () => {
    addNotification('Notifcations added!')
}

</script>

<template>
    <div> 
        <h2 class="text-2xl mb-4"> Notifications </h2>
        <form class="space-y-4 mx-auto" @submit.prevent="save">
            <div class="flex gap-2">
                <input type="checkbox" v-model="notifications.email" />
                <label>Email Notifications</label>
            </div>
            <div class="flex gap-2">
                <input type="checkbox" v-model="notifications.sms" />
                <label>SMS Notifications</label>
            </div>
            <button type="submit" class="btn-primary">Save</button>
        </form>
    </div>
</template>