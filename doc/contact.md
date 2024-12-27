# Contact API Spec

## Create Contact

Enpoint: POST /api/contacts

Request Header :

- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "Nazwa",
  "last_name": "Alfa",
  "email": "nazwa@example.com",
  "phone": "0899999999"
}
```

Request Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Nazwa",
    "last_name": "Alfa",
    "email": "nazwa@example.com",
    "phone": "0899999999"
  }
}
```

Request Body (Failed):

```json
{
  "errors": "first name must not blank,..."
}
```

## Get Contact

Enpoint: GET /api/contacts/:id

Request Header :

- X-API-TOKEN: token

Request Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Nazwa",
    "last_name": "Alfa",
    "email": "nazwa@example.com",
    "phone": "0899999999"
  }
}
```

Request Body (Failed):

```json
{
  "errors": "Contact Is Not Found,..."
}
```

## Update Contact

Enpoint: PUT /api/contacts/:id

Request Header :

- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "Nazwa",
  "last_name": "Alfa",
  "email": "nazwa@example.com",
  "phone": "0899999999"
}
```

Request Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Nazwa",
    "last_name": "Alfa",
    "email": "nazwa@example.com",
    "phone": "0899999999"
  }
}
```

Request Body (Failed):

```json
{
  "errors": "first name must not blank,..."
}
```

## Remove Contact

Enpoint: DELETE /api/contacts:id

Request Header :

- X-API-TOKEN: token

Request Body (Success):

```json
{
  "data": "OK"
}
```

Request Body (Failed):

```json
{
  "errors": "Contact Is Not Found,..."
}
```

## Search Contact

Enpoint: GET /api/contacts

Query Parameter:

- name: string, contact first name or last name, optional
- phhone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Request Header :

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Nazwa",
      "last_name": "Alfa",
      "email": "nazwa@example.com",
      "phone": "0899999999"
    }
    {
      "id": 2,
      "first_name": "Nazwa",
      "last_name": "Alfa",
      "email": "nazwa@example.com",
      "phone": "0899999999"
    }
  ],
  "paging":{
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized,..."
}
```
