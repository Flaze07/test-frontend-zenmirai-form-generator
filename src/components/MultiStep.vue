<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
import type FormConfig from '@/interfaces/FormConfig.interface';
import type FormStepData from '@/interfaces/FormStepData.interface';
import type FormInputValues from '@/interfaces/FormInputValues.interface';

import FormStep from '@/components/FormStep.vue';

const props = defineProps<{
    formStepData: FormStepData[]
}>();

const emit = defineEmits([
    'submit'
]);

/**
 * variabes related to form step count
 */
const totalStep = props.formStepData.length;
const currentStep = ref<number>(0);

/**
 * variables related to next button
 */
const buttonClassName = ref<string>('next-button-invalid');
const nextDisabled = ref<boolean>(true);

const inputValue = ref<FormInputValues[][]>([]);
const stepJumpButton = ref<boolean[]>([]);
const stepJumpLineColorPercentage = ref<number>(0);

props.formStepData.forEach((elem) => {
    const temp: FormInputValues[] = [];
    elem.fields.forEach((elem2) => {
        temp.push({
            question: elem2.label,
            required: elem2.required,
            value: ''
        })
    })

    stepJumpButton.value?.push(false);
    inputValue.value?.push(temp);
})


/**
 * perform checking on whether or not to enable next button
 * whenever currentStep changes
 */

watch(currentStep, (newCurrentStep) => {

    checkNextButton();
    checkStepJumpButton();

    const percentage = (newCurrentStep) / totalStep * 100;
    stepJumpLineColorPercentage.value = percentage;
})

/**
 * input functions
 */
function updateInputValue(index: number, value: string) {
    inputValue.value[currentStep.value][index].value = value;
    checkNextButton();
}

function checkNextButton() {
    let valid = true;
    inputValue.value[currentStep.value].forEach((elem) => {
        if (elem.required && elem.value === '') {
            valid = false;
        }
    })

    nextDisabled.value = !valid;
    buttonClassName.value = valid ? 'next-button' : 'next-button-invalid';
}

function checkStepJumpButton() {
    for(let i = 0; i < stepJumpButton.value.length; ++i) {
        if (i < currentStep.value) {
            stepJumpButton.value[i] = true;
        } else {
            stepJumpButton.value[i] = false;
        }
    }
}

function submit() {
    emit('submit', inputValue.value);
}

</script>

<template>
    <main class="vertical flex-center form-container">
        <div class="vertical title-container">
            <h1>
                {{ formStepData[currentStep].title }}
            </h1>
            <p>
                {{ formStepData[currentStep].description }}
            </p>
        </div>
        <div class="vertical form-box">
            <FormStep 
                v-for="(formStep, index) in props.formStepData[currentStep].fields" 
                :key="index" 
                :formConfig="formStep"
                :fieldValue="inputValue[currentStep][index].value"
                @update-value="(value: string) => updateInputValue(index, value)"
            />
            <!-- Navigation Buttons -->
            <div class="horizontal">
                <button 
                    v-if="currentStep > 0" 
                    @click="currentStep--"
                    class="previous-button"
                >
                    Previous
                </button>

                <button 
                    v-if="currentStep < totalStep - 1" 
                    @click="currentStep++"
                    :class="buttonClassName"
                    :disabled="nextDisabled"
                >
                    Next
                </button>

                <button 
                    v-else
                    :class="buttonClassName"
                    :disabled="nextDisabled"
                    @click="submit"
                >
                    Submit
                </button>
            </div>
        </div>
        <div class="jump-button-container">
            <div class="vertical flex-center jump-button-line-container">
                <div 
                    class="jump-button-line"
                    :style="{ background: `linear-gradient(to right, #247cff ${stepJumpLineColorPercentage}%, #000 ${stepJumpLineColorPercentage}%)` }"
                >
                </div>
            </div>
            <div class="horizontal flex-center jump-button-internal-container">
                <button 
                    v-for="(elem, index) in stepJumpButton" 
                    :key="index" 
                    @click="() => {
                        console.log(index)
                        currentStep = index
                    }"
                    :class="(elem ? 'jump-button' : 'jump-button-disabled') + ' jump-button-base'"
                    :disabled="!elem"
                >
                    {{ index + 1 }}
                </button>
            </div>
        </div>
    </main>    
</template>

<style scoped>

.form-container {
    width: 100%;
    margin-top: 15vh;
}

.title-container {
    width: var(--form-width);
    margin-left: -40px;
    margin-bottom: 50px;;
}

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
    width: 75px;
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