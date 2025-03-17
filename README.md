# nestjs-csrf-protection
Installs csrf protection module, controller, service and guard

This packages provides the module, the service, the controller and the guard to implement a correct csrf protection int a Nestjs context api

### Nestjs Csrf Protection

## Features

- Dynamic module allowing custom configuration (secret, cookie name, URL to retrieve the token, etc.).
- Controller exposing an endpoint to get the CSRF token.
- Service for generating and verifying tokens (based on [`csrf-csrf`](https://www.npmjs.com/package/csrf-csrf)).
- Guard to easily secure your NestJS routes against CSRF attacks.

## Prerequisites
This package requires that you load the following packages:

# @nestjs/config

```bash
    npm install @nestjs/config
```

# coockie parser:

```bash
    npm install cookie-parser
```

Then inside your .env file you must register these 3 required keys:
```yaml
    CSRF_SECRET = "L7xD1hBK09ksPSmfot6YFHkbfLcrBMH2uiivTgvJeoStkBFc"
    COOKIES_SECRET = "iIILzFGHr5qCJHsNzjHwnAz2p6PulwiGvJPUuoyY7506"

    # for production:
    # CSRF_COOKIE_NAME="__Host-dx.x-csrf-token"

    #for swagger testing:
    CSRF_COOKIE_NAME="Host-dx.x-csrf-token"
```


## Configuration

In the "main.ts file" : 
```javascript
    app.use(cookieParser(process.env.COOKIES_SECRET));
```

then in "app.module.ts" : 

```javascript
import { ConfigModule } from '@nestjs/config';
```
...

```javascript
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
//...
```

## Package installation

You may then install the package:

```bash
    npm install --save nest-csrf-protection
```

Then you may configure the module inside your app.module.ts: 

```javascript
CsrfModule.forRoot({
    secret: process.env.CSRF_SECRET,
    cookieName: process.env.CSRF_COOKIE_NAME,
    url: '/get-csrf-token', // define the url segment for the route where you request a token
})
```

When making a GET request to the csrf url you will define for the csrf module, you will receive the token in the response body AND a hash of the token in a cookie.


Your front app will have to retrieve the token and place it inside a header name; "x-csrf-token" before you can make a call to
a csrf protected route.

## Route protection

To protect a route, use the CsrfGuard:

```javascript
@UseGuards(CsrfGuard)
@Post('/test-csrf')
testCsrf(): { message: string } {
    return { message: 'CSRF token is valid' };
}
```

Happy coding !!