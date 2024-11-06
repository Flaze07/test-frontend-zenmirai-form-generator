<script setup lang="ts">
import { defineProps } from 'vue';
import type FormInputValues from '@/interfaces/FormInputValues.interface';

const prop = defineProps<{
    formResult: FormInputValues[][];
}>();

const emit = defineEmits([
    'close'
]);

const flattenedFormResult = prop.formResult.flat();

function close() {
    emit('close');
}

</script>

<template>
    <main class="vertical flex-center">
        <div class="vertical title-container">
            <h1>
                Form Result    
            </h1>
        </div>
        <div class="vertical form-box">
            <div class="vertical" v-for="result in flattenedFormResult" :key="result.question">
                <h3>
                    {{ result.question }}
                </h3>
                <p>
                    {{ result.value }}
                </p>
            </div>
            <div class="horizontal">
                <button class="close-button" @click="close">
                    Close
                </button>
            </div>
        </div>
    </main>

</template>

<style scoped>
.title-container {
    width: var(--form-width);
    margin-left: -40px;
    margin-bottom: 30px;
    margin-top: 15vh;
}

.box {
    background-color: var(--form-background-color);
    width: var(--form-width);
}

.close-button {
    background-color: #dc3545;
    color: #fff;
    font-weight: bold;
    margin-top: 50px;
}
</style>