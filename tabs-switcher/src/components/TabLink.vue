<script setup lang="ts">
import type { Tab, TabType } from '@/utils/types';
import { computed } from 'vue';

const props = defineProps<{
    currentTab: string,
    tab: Tab
}>();

const emit = defineEmits<{
    click: [tabKey: TabType]
}>()

const isActive = computed(() => props.currentTab === props.tab.key);

</script>

<template>
    <button @click="emit('click', tab.key)"
        :class="{
            'hover:cursor-pointer': true,'p-4 border-b-2': true, 
            'border-transparent': !isActive, 'border-b-blue-400 text-blue-600': isActive,
            }"> 
        {{ tab.label }} 
    </button>

</template>