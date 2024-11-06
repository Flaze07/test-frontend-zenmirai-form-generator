<script setup lang="ts">
import { defineProps, defineEmits, ref} from 'vue';

import type FormConfig from '@/interfaces/FormConfig.interface';
import TextField from './formtypes/TextField.vue';
import RadioChoice from './formtypes/RadioChoice.vue';
import TextArea from './formtypes/TextArea.vue';
import AutocompleteField from './formtypes/AutocompleteField.vue';

const props = defineProps<{
    formConfig: FormConfig;
    fieldValue: string;
}>();

const emit = defineEmits([
    'update-value'
])

function updateValue(event: string) {
    emit('update-value', event);
}

</script>

<template>
    <TextField 
        v-if="formConfig.type=='textfield'" 
        :formConfig="formConfig"
        @update-value="updateValue"
        :fieldValue="fieldValue"
        />
    <RadioChoice 
        v-else-if="formConfig.type=='radio'" 
        :formConfig="formConfig"
        @update-value="updateValue"
        :fieldValue="fieldValue"
        />
    <TextArea 
        v-else-if="formConfig.type=='textarea'" 
        :formConfig="formConfig"
        @update-value="updateValue"
        :fieldValue="fieldValue"
        />
    <AutocompleteField 
        v-else-if="formConfig.type=='autocomplete'" 
        :formConfig="formConfig"
        @update-value="updateValue"
        :fieldValue="fieldValue"
        />
</template>

<style scoped>
</style>