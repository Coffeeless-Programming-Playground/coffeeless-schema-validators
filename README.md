# Coffeeless Schema Validator

Coffeeless Schema Validators is a package that allows JavaScript/TypeScript based applications to apply input validations
by leveraging the Builder and Composite pattern, similar to [joi](https://www.npmjs.com/package/joi) but in a simplified way, by leveraging the builder and pattern validations can be applied intuitively per input field, and by leveraging the composite pattern, you only need to call the composite validator and call `validate` and let the magic happen!

The following validations will be supported:
* Required field.
* Is email valid.
* Minimum length.
* Valid regex.
* Unix timestamp expiration.
* Min array length.
* Min array elements length.
* Array elements matching regex pattern.
* Field is boolean.