<script setup lang="ts">
import SectionCard from './SectionCard.vue';
import CustomButton from './CustomButton.vue';

defineProps<{
    id: string,
    title: string,
    when: string,
    description: string,
}>();

const emit = defineEmits<{
    register: []
}>();

</script>

<template>
    <SectionCard>
        <template #header> {{title}} </template>
        {{when}}
        <template #footer>
            <div class="space-y-4">
                <p>{{description}}</p>
                <div class="flex justify-end">
                    <CustomButton @click="emit('register')">
                        Register
                    </CustomButton>
                </div>
            </div>
        </template>
    </SectionCard>
</template>