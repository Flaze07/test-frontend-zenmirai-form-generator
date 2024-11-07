<script setup lang="ts">
import { defineProps } from 'vue';
import type FormConfig from '@/interfaces/FormConfig.interface';
import type FormInputValues from '@/interfaces/FormInputValues.interface';

import FormStep from '@/components/FormStep.vue';

const props = defineProps<{
    formFields: FormConfig[]
    formInputValues: FormInputValues[]
}>();

const emit = defineEmits([
    'update-value'
]);

function updateInputValue(index: number, value: string) {
    emit('update-value', index, value);
}

</script>

<template>
    <FormStep 
        v-for="(formStep, index) in props.formFields" 
        :key="index" 
        :formConfig="formStep"
        :fieldValue="formInputValues[index].value"
        @update-value="(value: string) => updateInputValue(index, value)"
    />
</template>

<style scoped>
</style>