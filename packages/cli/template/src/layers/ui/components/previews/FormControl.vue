<script setup lang="ts">
import { Form } from 'vee-validate';
defineProps<{
  options: Record<string, string | boolean>;
}>();

const components = useNuxtApp().$componentsPreviews;
</script>

<template>
  <Form
    class="form"
    :validation-schema="components.formControl.form.schema"
    @submit="components.formControl.form.onSubmit"
  >
    <UiFormControl
      id="form-control-text"
      v-slot="slotProps"
      name="text"
      label="First name"
    >
      <UiInputText v-bind="slotProps" />
    </UiFormControl>

    <UiButton>Submit</UiButton>
  </Form>
</template>

<style scoped>
.form {
  width: 20rem;
}
</style>
