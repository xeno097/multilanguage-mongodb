# Multilanguage-proposal

<p align="center">
<a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/node--js-v12.x.x-green" alt="node-js" /></a>
<a href="https://nestjs.com/"><img src="https://img.shields.io/badge/nestjs-v8.x.x-red" alt="nestjs" /></a>
<a href="https://www.npmjs.com/package/apollo-server-express"><img src="https://img.shields.io/badge/apollo--server--express-v2.x.x-blueviolet" alt="apollo-server-express" /></a>
<a href="https://www.npmjs.com/package/typescript"><img src="https://img.shields.io/badge/typescript-v4.x.x-blue" alt="typescript" /></a>
<a href="https://www.npmjs.com/package/mongoose"><img src="https://img.shields.io/badge/mongoose-v5.13.5-green" alt="mongoose" /></a>
<a href="https://choosealicense.com/licenses/mit/" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" ></a>
</p>

## Description

This project aims to implement a multilanguage proposal to allow backend data internationalization. To achieve this goal, it uses MongoDB projections and aggregation framework to process the data and send it to the client in the desired language.

## Solution Description

In this branch the solution has been implemented using the populate feature offered by the mongoose library in order to fetch the linked entities in the desired language.

## How to run the project

With npm installed on your machine, install project dependencies running the following command:

```cmd
npm i
```

Create a `.env` file in the root of the project that holds the following variables:

- `PORT`: the port where the project will be running.
- `MONGO_DB_URI`: the mongodb uri used to connect the project to a mongodb database.

### Production mode

```cmd
npm run start:prod
```

### Development mode

The following command runs the project with hot reload enabled.

```cmd
npm run start:dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
