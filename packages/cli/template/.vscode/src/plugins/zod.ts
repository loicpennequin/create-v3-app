/**
 * This files creates a zod error map to enable you to translate zod error messages.
 * This is useful in case you would like to use it for client side for form validation
 * The translations are located in /locales/<lang>.json
 * You can also use a custom local error message for any error on any component using tje <i18n> blocks
 * see https://i18n.nuxtjs.org/per-component-translations
 */

import { z } from 'zod';
import { Composer } from 'vue-i18n';
import { ZodIssueCode, ZodParsedType, defaultErrorMap } from 'zod';

const jsonStringifyReplacer = (_: string, value: any): any => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};

const joinValues = <T extends any[]>(array: T, separator = ' | '): string =>
  array
    .map(val => (typeof val === 'string' ? `'${val}'` : val))
    .join(separator);

const createErrorMap =
  (t: Composer['t']): typeof defaultErrorMap =>
  (issue, ctx) => {
    let message: string;
    message = defaultErrorMap(issue, ctx).message;

    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = t('zod:errors.invalid_type_received_undefined', {
            defaultValue: message
          });
        } else {
          message = t('zod:errors.invalid_type', {
            expected: t(`zod:types.${issue.expected}`),
            received: t(`zod:types.${issue.received}`),
            defaultValue: message
          });
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = t('zod:errors.invalid_literal', {
          expected: JSON.stringify(issue.expected, jsonStringifyReplacer),
          defaultValue: message
        });
        break;
      case ZodIssueCode.unrecognized_keys:
        message = t('zod:errors.unrecognized_keys', {
          keys: joinValues(issue.keys, ', '),
          defaultValue: message
        });
        break;
      case ZodIssueCode.invalid_union:
        message = t('zod:errors.invalid_union', {
          defaultValue: message
        });
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = t('zod:errors.invalid_union_discriminator', {
          options: joinValues(issue.options),
          defaultValue: message
        });
        break;
      case ZodIssueCode.invalid_enum_value:
        message = t('zod:errors.invalid_enum_value', {
          options: joinValues(issue.options),
          received: issue.received,
          defaultValue: message
        });
        break;
      case ZodIssueCode.invalid_arguments:
        message = t('zod:errors.invalid_arguments', {
          defaultValue: message
        });
        break;
      case ZodIssueCode.invalid_return_type:
        message = t('zod:errors.invalid_return_type', {
          defaultValue: message
        });
        break;
      case ZodIssueCode.invalid_date:
        message = t('zod:errors.invalid_date', {
          defaultValue: message
        });
        break;
      case ZodIssueCode.invalid_string:
        if (typeof issue.validation === 'object') {
          if ('startsWith' in issue.validation) {
            message = t(`zod:errors.invalid_string.startsWith`, {
              startsWith: issue.validation.startsWith,
              defaultValue: message
            });
          } else if ('endsWith' in issue.validation) {
            message = t(`zod:errors.invalid_string.endsWith`, {
              endsWith: issue.validation.endsWith,
              defaultValue: message
            });
          }
        } else {
          message = t(`zod:errors.invalid_string.${issue.validation}`, {
            validation: t(`zod:validations.${issue.validation}`),
            defaultValue: message
          });
        }
        break;
      case ZodIssueCode.too_small:
        message = t(
          `zod:errors.too_small.${issue.type}.${
            issue.inclusive ? 'inclusive' : 'not_inclusive'
          }`,
          {
            minimum:
              issue.type === 'date' ? new Date(issue.minimum) : issue.minimum,
            defaultValue: message
          }
        );
        break;
      case ZodIssueCode.too_big:
        message = t(
          `zod:errors.too_big.${issue.type}.${
            issue.inclusive ? 'inclusive' : 'not_inclusive'
          }`,
          {
            maximum:
              issue.type === 'date' ? new Date(issue.maximum) : issue.maximum,
            defaultValue: message
          }
        );
        break;
      case ZodIssueCode.custom:
        message = t('zod:errors.custom', {
          defaultValue: message
        });
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = t('zod:errors.invalid_intersection_types', {
          defaultValue: message
        });
        break;
      case ZodIssueCode.not_multiple_of:
        message = t('zod:errors.not_multiple_of', {
          multipleOf: issue.multipleOf,
          defaultValue: message
        });
        break;
      default:
    }

    return { message };
  };

export default defineNuxtPlugin(app => {
  z.setErrorMap(createErrorMap(app.$i18n.t));
});
