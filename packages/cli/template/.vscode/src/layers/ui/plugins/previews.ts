import { toFormValidator } from '@vee-validate/zod';
import { AnyObject } from '~~/src/utils/types';
import * as zod from 'zod';
import { Component } from 'vue';
import {
  PreviewsButton,
  PreviewsInput,
  PreviewsSwitch,
  PreviewsCheckbox,
  PreviewsRadio,
  PreviewsFormControl,
  PreviewsModal,
  PreviewsDrawer,
  PreviewsDropdown,
  PreviewsToastBar,
  PreviewsTabList
} from '#components';

export type ComponentPreviewOptions = {
  options: AnyObject;
  control?: Ref<any>;
  wip?: boolean;
  form?: {
    schema?: ReturnType<typeof toFormValidator>;
    onSubmit: (values: any) => void;
  };
};

const makeOptions = () =>
  ({
    button: {
      options: {
        variant: ['full', 'outlined', 'ghost', 'light'],
        size: ['sm', 'md', 'lg', 'xl'],
        disabled: false,
        leftIcon: false,
        rightIcon: false,
        iconButton: false
      }
    },
    input: {
      control: ref(''),
      options: {
        type: ['text', 'password'],
        size: ['sm', 'md', 'lg', 'xl'],
        disabled: false,
        leftIcon: false,
        rightIcon: false,
        isError: false
      }
    },
    switch: {
      control: ref(false),
      options: {
        size: ['sm', 'md', 'lg', 'xl'],
        withSlots: false,
        disabled: false,
        isError: false
      }
    },
    checkbox: {
      control: ref(false),
      options: {
        size: ['sm', 'md', 'lg', 'xl'],
        disabled: false,
        isError: false
      }
    },
    radio: {
      control: ref('apple'),
      options: {
        size: ['sm', 'md', 'lg', 'xl'],
        disabled: false,
        isError: false
      }
    },

    formControl: {
      options: {},
      form: {
        onSubmit(values) {
          console.log(values);
        },
        schema: toFormValidator(
          zod.object({
            text: zod.string().min(4)
          })
        )
      }
    },
    dropdown: {
      control: ref(false),
      options: {
        placement: [
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end',
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end'
        ],
        closeOnClick: true
      }
    },
    modal: {
      control: ref(false),
      options: {
        size: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        isClosable: true
      }
    },
    drawer: {
      control: ref(false),
      options: {
        size: ['auto', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        placement: ['left', 'right', 'top', 'bottom'],
        isClosable: true
      }
    },
    toastBar: {
      control: ref(true),
      options: {
        placement: ['left', 'right', 'top', 'bottom'],
        timeout: ['default', '1000', '3000', 'none'],
        customToast: false,
        hasProgressBar: true
      }
    },
    tabList: {
      wip: true,
      control: ref('one'),
      options: {}
    }
  } satisfies Record<string, ComponentPreviewOptions>);

export const componentMap: Record<
  keyof ReturnType<typeof makeOptions>,
  Component
> = {
  button: PreviewsButton,
  input: PreviewsInput,
  switch: PreviewsSwitch,
  checkbox: PreviewsCheckbox,
  radio: PreviewsRadio,
  dropdown: PreviewsDropdown,
  modal: PreviewsModal,
  drawer: PreviewsDrawer,
  formControl: PreviewsFormControl,
  toastBar: PreviewsToastBar,
  tabList: PreviewsTabList
};

declare module '#app' {
  interface NuxtApp {
    $componentsPreviews: ReturnType<typeof makeOptions>;
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      componentsPreviews: makeOptions()
    }
  };
});
