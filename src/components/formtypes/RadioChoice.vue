<script setup lang="ts">
import { ref, defineProps } from 'vue';
import type FormConfig from '@/interfaces/FormConfig.interface';
import type RadioOptions from '@/interfaces/RadioOptions.interface';

const props = defineProps<{
    formConfig: FormConfig;
    fieldValue: string;
}>();

const emit = defineEmits([
    'update-value'
]);

const options = ref<RadioOptions[]>(props.formConfig.options as RadioOptions[]);
const selectedOption = ref<string>(props.fieldValue);

function updateValue(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    emit('update-value', newValue);
}

</script>

<template>
    <main class="vertical">
        <div class="horizontal">
            <label class="field-title">
                {{  formConfig.label }}
            </label>
            <div class="required-star" v-if="formConfig.required">*</div>
        </div>
        <div class="vertical">
            <div v-for="option in options" :key="option.label" class="horizontal">
                <input 
                    type="radio" 
                    :id="option.label" 
                    :name="formConfig.label" 
                    :value="option.value"
                    @input="updateValue"
                    v-model="selectedOption"
                />
                <label :for="option.label">
                    {{ option.label }}
                </label>
            </div>
        </div>
    </main>
</template>

<style scoped>
.horizontal {
    margin-bottom: 10px;
}

.horizontal > input {
    margin-right: 5px;  
}

input[type="text"] {
    height: 30px;
    border-radius: 5px;
    outline: 0;
    border: 0.5px solid #ccc;
    padding-left: 5px
}
</style>