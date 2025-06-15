import type { CompositeValidator } from '@validators/index'
import { ChildInputValidator } from './child-input-validator'

/**
 * Schema that is passed to the {@link CompositeValidator} which maps each property of the interface given
 * to a validator builder.
 */
export type ValidationSchema<T> = {
  [K in keyof T]: ChildInputValidator[]
}
