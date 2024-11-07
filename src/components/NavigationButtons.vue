<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    currentStep: number;
    totalStep: number;
    nextDisabled: boolean;
}>();

const emit = defineEmits([
    'update-value'
]);

function updateValue(newValue: number) {
    emit('update-value', newValue);
}

</script>

<template>
    <div class="horizontal">
        <button v-if="currentStep > 0" @click="() => updateValue(currentStep - 1)" class="previous-button" >
            Previous
        </button>

        <button v-if="currentStep < totalStep - 1" @click="() => updateValue(currentStep + 1)" :disabled="nextDisabled" :class="nextDisabled ? 'next-button-invalid' : 'next-button'" >
            Next
        </button>

        <button v-else :disabled="nextDisabled" @click="() => updateValue(currentStep + 1)" :class="nextDisabled ? 'next-button-invalid' : 'next-button'">
            Submit
        </button>
    </div>
</template>

<style scoped>

.previous-button {
    background-color: #bbbbbbd0;
    color: #000;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.next-button {
    background-color: #247cffd0;
    color: #fff;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.next-button-invalid {
    background-color: #c7dcfdd0;
    color: #fff;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    cursor: not-allowed;
}

</style>