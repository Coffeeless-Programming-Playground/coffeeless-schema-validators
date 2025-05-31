import { ChildInputValidator } from './child-input-validator'
import type { CompositeValidator, InputValidatorBuilder } from '@validators/index'

/**
 * Schema that is passed to the {@link CompositeValidator} which maps each property of the interface given
 * to a {@link InputValidatorBuilder}.
 */
export type ValidationSchema<T> = {
  [K in keyof T]: ChildInputValidator[]
}
