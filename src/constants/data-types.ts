export type DataTypes =
  | 'string'
  | 'number'
  | 'bigint'
  | 'function'
  | 'boolean'
  | 'object'
  | 'symbol'
  | 'undefined'

export const DATA_TYPES = {
  ARRAY: 'array',
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  DATE: 'date',
  TIMESTAMP: 'timestamp'
} as const
