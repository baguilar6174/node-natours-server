# Natours Server

...

## Clean Architecture: TypeScript Express API

By employing clean architecture, you can design applications with very low coupling and independent of technical implementation details. That way, the application becomes easy to maintain and flexible to change. Clean architecture allows us to create architectural boundaries between dependencies which allows components to be swapped in and out and be intrinsically testable.

<table>
  <tr>
    <td align="center" valign="center"><img src="./media/api_structure.png" width="80%"></td>
  </tr>
</table>

## Installation

This project was generated with [Express](https://expressjs.com/)

Clone this repository

```bash
git clone https://github.com/baguilar6174/node-natours-server.git
```

Install dependencies

```bash
yarn
```

## Running the app

If you need local mongo database

- Install docker
- Run `docker-compose up -d` This command create a local volumen in root project to save data

- Rename `.env.template` to `.env` and add your environment variables
- Create initial data in your DB using the endpoint: _**GET**_ `http://localhost:3000/api/v1/tours/seed`
- Run `yarn dev`

If your want to create build production, run `yarn build`

## My process

### Built with

- Node
- Express
- Typescript
- MongoDB & Mongoose

### What I learned

- Fundamentals of Express (Node.js framework): routing, middleware, sending responses, etc.
- RESTful API design and development with advanced features: filtering, sorting, aliasing, pagination
- CRUD operations with MongoDB and Mongoose
- Fundamentals of Mongoose (MongoDB JS driver): Data models, CRUD operations, data validation, and middleware
- Using clean architecture
- How to work with data in NoSQL databases
- Use Mongo pipelines

## Development Features

- Clean Architecture
- Eslint and Prettier
- Good folder structure

## TODO:

- Make responses with same format
- Rename files, classes and methods
- Create adapter

## Natours Server

- TODO: add api documentation...

## Stay in touch

- Website - [www.bryan-aguilar.com](https://www.bryan-aguilar.com/)
- Medium - [baguilar6174](https://baguilar6174.medium.com/)
- LinkeIn - [baguilar6174](https://www.linkedin.com/in/baguilar6174)
