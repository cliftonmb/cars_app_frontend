<template>
  <div>
    <VueMultiselect v-model="selected" :options="options">
    </VueMultiselect>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
export default {
  components: { VueMultiselect },
  data() {
    return {
      selected: null,
      options: ['list', 'of', 'options']
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css">
</style>

<VueMultiselect
  v-model="multiValue"
  :options="source"
  :multiple="true"
  :close-on-select="true"
  placeholder="Pick some"
  label="name"
  track-by="name"
/>