import { ObjectKeyValueMatchesValidator } from '@validators/objects'
import { ChildInputValidator } from './child-input-validator'

/**
 * Props that are passed to the {@link ObjectKeyValueMatchesValidator} which validates object key names
 * match a pattern or are included in a list of strings, and values comply with a list of validators.
 */
export interface PatternValidatorProps {
  /**
   * Keys that are allowed to be present in the schema.
   */
  allowedKeys: RegExp | string[]
  /**
   * Values of object keys which are subject to validations.
   */
  allowedValues: ChildInputValidator[]
}
