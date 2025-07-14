<script setup lang="ts">
import { computed } from 'vue';
import CustomButton from './CustomButton.vue';
import SectionCard from './SectionCard.vue';
import { LoaderCircle, Check } from 'lucide-vue-next';

const props = defineProps<{
    eventTitle: string,
    status: string
}>();

const emit = defineEmits<{
    removeBooking: []
}>()

const isPending = computed(() => props.status === 'pending');
const icon = computed(() => (isPending.value ? LoaderCircle : Check));

</script>

<template>
    <SectionCard>
        <div class="flex justify-between">
            <div class="flex space-x-2">
                <div>{{ props.eventTitle }}</div>
                <div>
                    <component :is="icon" :class="isPending ? 'text-red-500 animate-spin' : 'text-green-500'" />
                </div>
            </div>
            <CustomButton variant="danger" @click="emit('removeBooking')">Cancel</CustomButton>
        </div>
    </SectionCard>
</template>