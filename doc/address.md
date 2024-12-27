# Address API Spec

## Create Address

Endpoint : POST /api/contact/:idContact/addresses

Request Header:

- X-API-TOKEN : token

Request Body:

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "11221"
}
```

Response Body (Succsess):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "11221"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "postal_code is required,..."
}
```

## Get Address

Endpoint : GET /api/contact/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN : token

Response Body (succsess):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "11221"
  }
}
```

## Update Address

Endpoint : PUT /api/contact/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN : token

Request Body:

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "11221"
}
```

Response Body (Succsess):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "11221"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "postal_code is required,..."
}
```

## Remove Address

Endpoint : DELETE /api/contact/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN : token

Response Body (Succsess):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Address is not found"
}
```

## List Address

Endpoint : Get /api/contact/:idContact/addresses

Request Header:

- X-API-TOKEN : token

Response Body (Succsess):

```json
{
  "data":[
     {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "11221"
  },
   {
    "id": 2,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "11221"
  }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "contact is not found,..."
}
```