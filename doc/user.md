# User API Spec

## Register User

Endpoint: POST /api/users

Request Body:

```json
{
  "username": "nazwa213",
  "password": "rahasia",
  "name": "Nawza Alfa"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "nazwa213",
    "name": "Nazwa Alfa"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "username must not blank, ...."
}
```

## Login User

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "nazwa213",
  "password": "rahasia"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "nazwa213",
    "name": "Nazwa Alfa",
    "token": "uuid"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "username or password incorret"
}
```

## Get User

Endpoint: GET /api/users/current

Request Header:
- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": {
    "username": "nazwa213",
    "name": "Nazwa Alfa"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized,..."
}
```

## Update User

Endpoint: PATCH /api/users/current

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "password": "rahasia", // Tidak Wajib
  "name": "Nawza Alfa" // Tidak Wajib
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "nazwa213",
    "name": "Nazwa Alfa"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, ...."
}
```

## Logout User

Endpoint: DELETE /api/users/current

Request Header:
- X-API-TOKEN: token


Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, ...."
}
```
