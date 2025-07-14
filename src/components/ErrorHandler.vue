<script setup lang="ts">
import SectionCard from './SectionCard.vue';
import CustomButton from './CustomButton.vue';

const props = defineProps<{
    error: string,
    retry: () => Promise<void>
}>();

</script>

<template>
    <SectionCard>
        <div class="flex flex-col items-center space-y-4">
            <div class="text-red-500">
                {{props.error}}
            </div>
            <CustomButton v-if="props.retry" @click="props.retry">Retry</CustomButton>
        </div>
    </SectionCard>
</template>