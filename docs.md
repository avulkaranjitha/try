## What is dto?

A DTO is an object that defines how the data will be sent over the network.
We can define DTO using Classes

# What are Pipes?

- Pipes are Injectable classes which basically runs before the desired method (route handler)

- It is mostly used for input transformation
- Request data validation (for ex: validating POST request body to match a schema).
- Nest comes with two standard pipes `ValidationPipe` and `ParseintPipe`

## What is Middleware

- Middleware is a function which is called before the route handler.
- Middleware functions have access to the `request` and `response` objects, and the `next()` middleware function in the application’s request-response cycle

<img src="https://docs.nestjs.com/assets/Middlewares_1.png"
     alt="Middleware Image"/>

## What Middleware functions can do

Middleware functions can perform the following tasks:

- execute any code.
- make changes to the request and the response objects.
- end the request-response cycle.
- call the next middleware function in the stack.
- if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

## Interceptors

<img src="https://docs.nestjs.com/assets/Interceptors_1.png" alt="Interceptors"/>

## Interceptors Use Cases

- bind extra logic before / after method execution
- transform the result returned from a function
- transform the exception thrown from a function
- extend the basic function behavior
- completely override a function depending on specific conditions (e.g., for caching purposes)

## What is context

- It is used to access the route handle and class about to be invoked

## What is next

- A reference to CallHandler which provides access to an Observable representing the response stream from the route handler

## What is NestInterceptor

- It is an interface to describe the implementation of an interceptor

## What is CallHandler

- Interface providing access to the response stream.

## Why intercept method?

- intercept method effectively wraps the request/response stream.

## What is pipe

- You can use pipes to link operators together.
- Pipes let you combine multiple functions into a single function.
- The pipe() function takes as its arguments the functions you want to combine, and returns a new function that, when executed, runs the composed functions in sequence

## What is TypeORM

- Object Relational Mapping (ORM) is the process of mapping between objects and relational database systems.
- It Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases.
