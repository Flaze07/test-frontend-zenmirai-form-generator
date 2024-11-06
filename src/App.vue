<script setup lang="ts">
import { ref } from "vue";
import type FormInputValues from "./interfaces/FormInputValues.interface";

import MultiStep from "@/components/MultiStep.vue";
import FormResult from "@/components/FormResult.vue";

import response from "@/input/response.json";

const display = ref<string>("form");
const formResult = ref<FormInputValues[][]>();

function submitForm(input: FormInputValues[][]) {
    formResult.value = input;
    display.value = "result";
}

function closeResponse() {
    display.value = "form";
}

</script>

<template>
    <MultiStep :formStepData="response" @submit="submitForm" v-if="display == 'form'"/>
    <FormResult :formResult="formResult as FormInputValues[][]" @close="closeResponse" v-else-if="display == 'result'"/>
</template>

<style scoped>
</style>
