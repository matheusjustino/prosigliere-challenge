<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]:
	https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# **Description**

The project is a basic API for blog management. The project was built with
**`Node.js`**, **`TypeScript`**, **`NestJS`**, and **`PostgreSQL`**. It also
uses **`Jest`** for testing and **`Docker`**.

# **API Documentation**

## **Swagger** - `/api/docs`

## **AUTH** - `/api/{version}/auth`

- ![POST](https://img.shields.io/badge/POST-49CC90?style=for-the-badge&logo=http)
  `/register`
- ![POST](https://img.shields.io/badge/POST-49CC90?style=for-the-badge&logo=http)
  `/login`

## **BLOG POST** - `/api/{version}/blog`

- ![POST](https://img.shields.io/badge/POST-49CC90?style=for-the-badge&logo=http)
  `/post`
- ![GET](https://img.shields.io/badge/GET-61AFEF?style=for-the-badge&logo=http)
  `/posts`
- ![GET](https://img.shields.io/badge/GET-61AFEF?style=for-the-badge&logo=http)
  `/posts/{id}`

## **POST COMMENT** - `/api/{version}/post-comment`

- ![POST](https://img.shields.io/badge/POST-49CC90?style=for-the-badge&logo=http)
  `/`

## **POST LIKE** - `/api/{version}/post-like`

- ![POST](https://img.shields.io/badge/POST-49CC90?style=for-the-badge&logo=http)
  `/`

# Scripts

- run `yarn start:dev`
- run in docker `docker compose up`
- test `yarn test`

# Points for improvement

- More tests
- Add more validations to the resource creation endpoints
- Add a Continuous Delivery (CD) pipeline
- Deploy to a cloud provider, such as AWS
