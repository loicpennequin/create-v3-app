import type { Directive } from 'vue';

export const vStableId: Directive = {
  created(el, binding) {
    el.setAttribute('id', el.id || binding.value);
  },
  getSSRProps(binding) {
    return {
      id: binding.value
    };
  }
};
