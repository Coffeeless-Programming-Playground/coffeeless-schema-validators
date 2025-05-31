# Express with TypeScript example to use Coffeeless Schema Validator

## Seting up local testing:

### Option 1

1. Use npm link (Symlink for Development)

This method creates a symbolic link between the package and the examples/express folder, allowing you to test changes in real-time.

In the package root directory run:
```
npm link
```
This command creates a global symlink to the package.

2. In examples/express directory:
```
npm link coffeeless-schema-validators
```
This links the global symlink to your examples/express folder's node_modules.


3. Import the package in index.ts:
```
import { InputValidatorBuilder as Builder, email, valid, required, min } from 'coffeeless-schema-validators/dist';
```

### Option 2

1. Use npm pack (Simulate NPM Package)

This method creates a tarball of the package, simulating how it would be published to NPM.

In the package root directory run:
```
npm pack
```
This command generates a .tgz file, e.g., coffeeless-schema-validators-1.0.0.tgz.

2. In the examples/express directory:
```
npm install ../../coffeeless-schema-validators-1.0.0.tgz
```

3. Import then package in index.ts:
import { yourFunction } from 'coffeeless-schema-validators';


## Start the test:

```
npm run start
```