# Betpass Assessment Backend

Description: This is an API that connects to the MongoDB

## Technologies

- **Node.js**: Version 18.20.1
- **Express.js**: Version 4.21.0
- **Mongoose**: Version 8.6.3
- **CORS**: Version 2.8.5
- **DOTENV**: Version 16.4.5

## Installation

1. **Install the dependencies:**

```bash
   npm install
```

2. **Create a `.env` file** in the root directory and add the required environment variables. (Refer to `.env.example` for sample variables.)

3. **Start the application:**

```bash
   npm start
```

## Optional: Use Nodemon for Development

To enhance your development experience, you can use **Nodemon**, a utility that automatically restarts your application when file changes are detected.

### Nodemon

- **Install Nodemon globally:**

  ```bash
  npm install -g nodemon
  ```

### Usage

- Instead of running your application with `npm start`, you can use Nodemon to automatically restart the server when you make changes:

  ```bash
  nodemon api/index.js
  ```

This allows for a more efficient development process, as you won't need to manually stop and restart the server every time you update your code.

## API Endpoints

| Method | Endpoint        | Description                                             |
| ------ | --------------- | ------------------------------------------------------- |
| GET    | `/deals`        | Fetches a paginated list of deals with optional search. |
| POST   | `/deals`        | Creates a new deal.                                     |
| PUT    | `/deals/:id`    | Updates an existing deal by ID.                         |
| DELETE | `/deals/:id`    | Deletes a deal by ID.                                   |
| GET    | `/deals/search` | Searches for deals by house name.                       |
| GET    | `/house-values` | Fetches the latest house values.                        |

### Detailed Description

#### `GET /deals`

Fetches a paginated list of deals. Supports optional search filtering.

- **Query Parameters:**

  - `page`: The page number for pagination (default is 1).
  - `searchInput`: The string to search for in the house names (case-insensitive).

**Response:**

```json
{
  "page": 1,
  "limit": 6,
  "totalPages": 10,
  "totalDeals": 60,
  "deals": [
    {
      "id": "deal_id_1",
      "house": "Example House",
      "createdDate": "2023-01-01T00:00:00Z"
    }
    // Additional deal objects
  ]
}
```

#### `POST /deals`

Creates a new deal.

- **Request Body:**

  ```json
  {
    "house": "New House",
    "createdDate": "2023-01-01T00:00:00Z"
  }
  ```

**Response:**

```json
{
  "id": "new_deal_id",
  "house": "New House",
  "createdDate": "2023-01-01T00:00:00Z"
}
```

#### `PUT /deals/:id`

Updates an existing deal.

- **URL Parameters:**

  - `id`: The ID of the deal to update.

- **Request Body:**

  ```json
  {
    "house": "Updated House"
  }
  ```

**Response:**

```json
{
  "id": "deal_id",
  "house": "Updated House",
  "createdDate": "2023-01-01T00:00:00Z"
}
```

#### `DELETE /deals/:id`

Deletes a deal by ID.

- **URL Parameters:**

  - `id`: The ID of the deal to delete.

**Response:**

```json
{
  "message": "Deal deleted: deal_id"
}
```

#### `GET /deals/search`

Searches for deals by house name.

- **Query Parameters:**

  - `name`: The name to search for (case-insensitive).

**Response:**

```json
[
  {
    "id": "deal_id_1",
    "house": "Example House"
  }
  // Additional deal objects matching the search
]
```

#### `GET /house-values`

Fetches the latest house values.

**Response:**

```json
{
  "houseValues": [
    // Example data:
    1, 2, 3, 4, 5
  ]
}
```
