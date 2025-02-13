# SLS NCC

**SLS NCC** is a [Serverless Framework](https://www.serverless.com/) plugin designed to optimize your AWS Lambda deployments by bundling your Node.js functions using [ncc](https://github.com/vercel/ncc). By compiling your code and its dependencies into a single file, SLS NCC minimizes package size and improves cold start performance.

## Features

- **Optimized Bundling:** Packages your Lambda function code and dependencies into one optimized file.
- **Faster Deployments:** Reduced deployment size leads to quicker uploads and faster function initialization.
- **Seamless Integration:** Works directly within your Serverless Framework projects.
- **Configurable Externals:** Easily exclude modules (like `aws-sdk`) that are already provided in the target environment.

## Installation

Install SLS NCC as a development dependency:

```bash
npm install --save-dev sls-ncc
```

## Usage

1. **Configure the Plugin**

   Add SLS NCC to your `serverless.yml` file:

   ```yaml
   service: my-service

   plugins:
     - sls-ncc

   custom:
     ncc:
       # List modules that should NOT be bundled (e.g., aws-sdk provided by AWS Lambda)
       externals:
         - aws-sdk
   ```

2. **Develop Your Function**

   Write your Lambda handler as usual. For example, create a `handler.js`:

   ```javascript
   module.exports.hello = async (event) => {
     return {
       statusCode: 200,
       body: JSON.stringify({ message: "Hello from SLS NCC!" }),
     };
   };
   ```

3. **Deploy**

   Deploy your service using the Serverless CLI:

   ```bash
   serverless deploy
   ```

   During deployment, SLS NCC automatically compiles your function using ncc, bundling it into a single file for optimized performance.

## Configuration Options

SLS NCC supports configuration under the `custom.ncc` key in your `serverless.yml`. For example:

- **externals:**  
  An array of package names to exclude from the bundle. This is particularly useful for packages that are available in the runtime environment (e.g., `aws-sdk` on AWS Lambda).

```yaml
custom:
  ncc:
    externals:
      - aws-sdk
      - some-other-module
```

Adjust these settings to fit the requirements of your deployment environment.

## Example

Here’s a minimal example of a Serverless service using SLS NCC:

- **serverless.yml**

  ```yaml
  service: my-service

  provider:
    name: aws
    runtime: nodejs14.x

  plugins:
    - sls-ncc

  custom:
    ncc:
      externals:
        - aws-sdk

  functions:
    hello:
      handler: handler.hello
  ```

- **handler.js**

  ```javascript
  module.exports.hello = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello from SLS NCC!" }),
    };
  };
  ```

Deploy with:

```bash
serverless deploy
```

After deployment, your Lambda function will be bundled and optimized using ncc.

## Contributing

Contributions are welcome! If you’d like to improve SLS NCC or report issues, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

Your help is appreciated in making SLS NCC better for everyone!

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [ncc](https://github.com/vercel/ncc) by Vercel – the powerful bundler behind this plugin.
- The Serverless Framework community – for inspiring solutions to streamline deployments.
