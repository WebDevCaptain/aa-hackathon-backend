# **API Documentation for AA Hackathon Backend**

## Base Routes

( Just for Testing GET requests )

-   ### GET `/`

### Returns

> A greeting `string`

HTTP Status Code: `200`

---

---

## User Routes

> **NOTE** : **UserPayload structure**

```json
{
  "age": Number,
  "_id": Unique ID(MongoDB ID),
  "name": String,
  "email": String,
  "createdAt": Date,
  "updatedAt": Date,
}
```

---

-   ### POST `/auth/users/login`

#### Payload:

```json
{
	"email": "String",
	"password": "String"
}
```

#### Return Value: `JSON`

```json
{
	"user": UserPayload,
	"token": JWT
}
```

HTTP Status Code: `200`

---

-   ### POST `/auth/users/signup`

#### Payload:

```json
{
	"email": "String",
	"password": "String",
	"name": String,
	"age": Number(Optional)
}
```

#### Return Value: `JSON`

```json
{
	"user": UserPayload,
	"token": JWT
}
```

HTTP Status Code: `201`

---

-   ### POST `/auth/users/logout`

#### Payload (Headers):

> Authorization: JWT Bearer Token

#### Return Value: `JSON`

```json
{
	"message": String
}
```

HTTP Status Code: `200`

---

### Revokes all User sessions i.e. "Logs out him/her from all active logins"

-   ### POST `/auth/users/revokeAll`

#### Payload (Headers):

> Authorization: JWT Bearer Token

#### Return Value: `JSON`

```json
{
	"message": String
}
```

HTTP Status Code: `200`

---

### Fetches User Profile

-   ### GET `/auth/users/me`

#### Payload (Headers):

> Authorization: JWT Bearer Token

#### Return Value: `JSON` User Payload

HTTP Status Code: `200`

---

### Deletes User Profile

-   ### DELETE `/auth/users/me`

#### Payload (Headers):

> Authorization: JWT Bearer Token

#### Return Value: `JSON` User Payload

HTTP Status Code: `200`

---

### Updates User Profile

-   ### PATCH `/auth/users/me`

#### Payload (Headers and Body):

> Authorization: JWT Bearer Token

> Body:

```json
  "name": String (Optional),
  "age": Number (Optional),
  "email": String (Optional),
  "password": String (Optional),
```

#### Return Value: `JSON` User Payload

HTTP Status Code: `200`
