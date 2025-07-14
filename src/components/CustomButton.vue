<script setup lang="ts">

const variants = {
    default: 'border border-gray-200 hover:bg-gray-200',
    danger: 'bg-red-200 enabled:hover:bg-red-100 text-red-900'
}  as const;

type Variant = keyof typeof variants; 

const emit = defineEmits<{
    'click': []
}>();

const props = withDefaults(defineProps<{
    variant?: Variant
}>(), {
    variant: 'default'
});


</script>

<template>
    <button type="button" :class="[
        'text-sm font-medium rounded-full px-3 py-1 cursor-pointer',
        variants[props.variant]
        ]"
        @click="emit('click')">
        <slot></slot>
    </button>
</template>