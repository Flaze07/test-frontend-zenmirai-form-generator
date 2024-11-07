<script setup lang="ts">

import { ref, defineProps, watch } from 'vue';

const props = defineProps<{
    totalStep: number;
    currentStep: number;
}>();

const emit = defineEmits([
    'update-value'
]);

const stepJumpButton = ref<boolean[]>([]);
const stepJumpLineColorPercentage = ref<number>(0);

for (let i = 0; i < props.totalStep; i++) {
    stepJumpButton.value.push(false);
}

watch(() => props.currentStep, (newCurrentStep) => {
    adjustStepJumpButton(newCurrentStep);
})

function adjustStepJumpButton(newCurrentStep: number) {
    for(let i = 0; i < stepJumpButton.value.length; ++i) {
        if (i < props.currentStep) {
            stepJumpButton.value[i] = true;
        } else {
            stepJumpButton.value[i] = false;
        }
    }

    const percentage = (newCurrentStep) / props.totalStep * 100;
    stepJumpLineColorPercentage.value = percentage;
}

</script>

<template>
    <div class="jump-button-container">
        <div class="vertical flex-center jump-button-line-container">
            <div 
                class="jump-button-line"
                :style="{ 
                    background: `linear-gradient(to right, #247cff ${stepJumpLineColorPercentage}%, #000 ${stepJumpLineColorPercentage}%)` 
                }"
            >
            </div>
        </div>
        <div class="horizontal flex-center jump-button-internal-container">
            <button 
                v-for="(elem, index) in stepJumpButton" 
                :key="index" 
                @click="() => emit('update-value', index)"
                :class="(elem ? 'jump-button' : 'jump-button-disabled') + ' jump-button-base'"
                :disabled="!elem"
            >
                {{ index + 1 }}
            </button>
        </div>
    </div>
</template>

<style scoped>


.jump-button-container {
    width: var(--form-width);
    margin-top: 30px;
    position: relative;
}

.jump-button-line-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.jump-button-line {
    width: 100%;
    height: 3px;
}

.jump-button-internal-container {
    width: 100%;
    gap: 10px;
}

.jump-button-base {
    aspect-ratio: 1;
    width: 50px;
    border-radius: 999px;
    z-index: 2;
    position: relative;
}

.jump-button {
    background-color: #247cff;
    color: #fff;
}

.jump-button-disabled {
    background-color: #f1f1f1;
    color: #000;
    cursor: not-allowed;
}
</style>