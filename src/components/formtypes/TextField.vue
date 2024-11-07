<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type FormConfig from '@/interfaces/FormConfig.interface';

const props = defineProps<{
    formConfig: FormConfig;
    fieldValue: string;
}>();

const emit = defineEmits([
    'update-value'
]);

</script>

<template>
    <main class="vertical">
        <div class="horizontal">
            <label class="field-title">
                {{  formConfig.label }}
            </label>
            <div class="required-star" v-if="formConfig.required">*</div>
        </div>
        <input 
            type="text" 
            :placeholder="formConfig.placeholder" 
            :required="formConfig.required"
            @input="(event) => emit('update-value', (event.target as HTMLInputElement).value)"
            :value="fieldValue"
        />
    </main>
</template>

<style scoped>
.field-title {
    margin-bottom: 0.5rem;
}

input[type="text"] {
    height: 30px;
    border-radius: 5px;
    outline: 0;
    border: 0.5px solid #ccc;
    padding-left: 5px;
    /* background-color: transparent; */
}
</style>