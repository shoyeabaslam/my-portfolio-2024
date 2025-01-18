# Project API Documentation

This document provides a detailed explanation of the API endpoints for managing projects in the portfolio. The API allows you to create, read, update, and delete projects.

## Base URL
```
/api/projects
```

## Endpoints

### 1. Create a Project

**Endpoint:** `POST /api/projects`

**Description:** Adds a new project to the portfolio.

**Request Body:**
```json
{
    "image": "base64EncodedImageString",
    "project_title": "Project Title",
    "project_description": "Project Description",
    "technologies_used": "Technologies Used",
    "repo_link": "https://github.com/username/repo",
    "site_link": "https://projectsite.com",
    "tags": ["tag1", "tag2"]
}
```

**Response:**
- Success: 
  ```json
  {
      "message": "Project added successfully",
      "project": [{ "id": "projectId" }]
  }
  ```
- Error:
  ```json
  {
      "error": "Error message"
  }
  ```

### 2. Get All Projects

**Endpoint:** `GET /api/projects`

**Description:** Retrieves all projects from the portfolio.

**Response:**
- Success:
  ```json
  {
      "projects": [
          {
              "id": "projectId",
              "project_title": "Project Title",
              "project_description": "Project Description",
              "technologies_used": "Technologies Used",
              "repo_link": "https://github.com/username/repo",
              "site_link": "https://projectsite.com",
              "project_image_url": "https://publicurl.com/image.jpeg",
              "tags": ["tag1", "tag2"]
          }
      ]
  }
  ```
- Error:
  ```json
  {
      "error": "Error message"
  }
  ```

### 3. Update a Project

**Endpoint:** `PUT /api/projects`

**Description:** Updates an existing project in the portfolio.

**Request Body:**
```json
{
    "id": "projectId",
    "image": "base64EncodedImageString", // Optional
    "project_title": "Updated Project Title",
    "project_description": "Updated Project Description",
    "technologies_used": "Updated Technologies Used",
    "repo_link": "https://github.com/username/repo",
    "site_link": "https://projectsite.com",
    "tags": ["tag1", "tag2"]
}
```

**Response:**
- Success:
  ```json
  {
      "message": "Project updated successfully",
      "project": [{ "id": "projectId" }]
  }
  ```
- Error:
  ```json
  {
      "error": "Error message"
  }
  ```

### 4. Delete a Project

**Endpoint:** `DELETE /api/projects`

**Description:** Deletes a project from the portfolio.

**Request Body:**
```json
{
    "id": "projectId"
}
```

**Response:**
- Success:
  ```json
  {
      "message": "Project deleted successfully"
  }
  ```
- Error:
  ```json
  {
      "error": "Error message"
  }
  ```

## Error Handling

All endpoints return appropriate HTTP status codes and error messages in case of failures. Common error responses include:
- `400 Bad Request`: Missing required fields.
- `500 Internal Server Error`: Server-side errors.

## Notes

- Ensure all required fields are provided in the request body.
- Images should be base64 encoded strings.
- The `id` field is required for updating and deleting projects.

This documentation should help you understand and use the API endpoints effectively.