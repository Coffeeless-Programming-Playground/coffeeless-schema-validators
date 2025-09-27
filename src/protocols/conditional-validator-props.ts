import { ConditionalValidator } from '@validators/conditional-validator'
import { ChildInputValidator } from './child-input-validator'

/**
 * Props that are passed to the {@link ConditionalValidator} which allows to perform conditional validations on a field
 * based on a targetField validation.
 */
export interface ConditionalValidatorProps {
  is: ChildInputValidator[]
  then: ChildInputValidator[]
  otherwise: ChildInputValidator[]
}
