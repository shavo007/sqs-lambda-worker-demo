# sqs-lambda-worker-demo

> Test drive sqs integration with aws lambda

## TODO

add event trigger for lambda worker fn
change iam role to add sqs service

This demo repo uses boilerplate project at [Serverless Node.js Starter](https://github.com/shavo007/serverless-nodejs-starter)

It supports:

-   **ES7 syntax in your handler functions**
    -   Use async/await
    -   And much more!
-   **Run API Gateway locally**
    -   Use `yarn serve`
-   **Support for unit tests**
    -   Run `yarn test:unit` to run your tests
-   **Sourcemaps for proper error messages**
    -   Error message show the correct line numbers
    -   Works in production with CloudWatch
-   **Automatic support for multiple handler files**
    -   No need to add a new entry to your `webpack.config.js`
-   **Add environment variables for your stages**

## Install

-   Yarn

1.  `curl -o- -L https://yarnpkg.com/install.sh | bash`
2.  `yarn bash completion` - https://github.com/dsifford/yarn-completion

```bash
# If you don't already have the serverless cli installed, do that
yarn global add serverless

# Install dependencies
yarn install
```

-   Terraform

1.  Create sqs queue on aws account
2.  cd terraform && terraform init
3.  terraform plan
4.  terraform apply

## Development

### Adding new functions/files to Webpack

When you add a new function to your serverless config, you don't need to also add it as a new entry
for Webpack. The `serverless-webpack` plugin allows us to follow a simple convention in our `serverless.yml`
file which is uses to automatically resolve your function handlers to the appropriate file:

```yaml
functions:
  hello:
    handler: src/hello.default
```

As you can see, the path to the file with the function has to explicitly say where the handler
file is. (If your function weren't the default export of that file, you'd do something like:
`src/hello.namedExport` instead.)

### Renovate

> Automated Dependency Updates

Renovate runs continuously to detect the latest available versions. And automagicaly creates PR on your github project with changelog and release notes.

For more info and how to authorise the github app check out [onboarding guide](https://renovateapp.com/docs/getting-started/configure-renovate)

## Deploy

1.  Create sqs queue via terraform
2.  Create config for sqs queue using ssm param store (value from terraform output)

```bash
aws ssm put-parameter --name "/dev/sqs-lambda/queue-name" --description "queue arn for demo"  --type SecureString --value \ "https://sqs.ap-southeast-2.amazonaws.com/xxxxxx/sqs-lambda-example-queue"
```

3.

Assuming you've already set up your default AWS credentials

`yarn deploy:dev` will deploy to "dev" environment. You can deploy to `stage` or `production`
with:

```bash
yarn deploy:stage

# -- or --

yarn deploy:production
```

## Resources

https://aws.amazon.com/blogs/aws/aws-lambda-adds-amazon-simple-queue-service-to-supported-event-sources/
