<script setup lang="ts">
import { useNotification } from '@/composables/useNotifications';

const { notifications, removeNotification } = useNotification();
</script>

<template>
    <Teleport to="body">
        <ol class="notification-list">
            <li     
                class="notification-item"
                v-for="notification in notifications" :key="notification.id">
                <div class="text-sm font-semibold">
                    {{notification.message}}
                </div>
                <button
                    @click="removeNotification(notification.id)" 
                    class="notification-ack-button">
                    OK
                </button>
            </li>
        </ol>
    </Teleport>
</template>