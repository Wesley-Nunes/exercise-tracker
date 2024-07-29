![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white "Node.js")
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black "Javascript")
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white "Express")
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white "MongoDB")
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=Mongoose&logoColor=white "Mongoose")
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white "HTML5")
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white "CSS3")
![Cypress](https://img.shields.io/badge/Cypress-white?style=for-the-badge&logo=cypress&logoColor=69D3A7 "Cypress")

# Exercise tracker

The exercise tracker allows the creation of new users, adds exercises, and retrieves exercise logs.  
It provides a user-friendly web interface for interacting with the API endpoints and viewing results.  

## Table of Contents  

- [Requirements](#requirements)
- [How to use](#how-to-use)
- [Project structure](#project-structure)
- [Preview](#preview)
- [License](#license)
- [Author](#author)

## <a name="requirements"></a>Requirements
  
  - Node: >=20.0.0 <21
  - MongoDB >=7.0.0 <8

## How to Use
`Make sure the MongoDB is running or has a ready-to-go connection link.`  

1. Create a .env file, add a DB_URL variable with the value of the database connection link;  
2. **Install the packages:**
   ```sh
   npm install
   ```
3. **Initialize the server:**
   ```sh
   npm run dev
   ```


### Create a new user
Make a POST request to `http://localhost:{env.PORT}/api/users`  
Example payload:  
  ```json
    {
      "username": "lorem",
    }
  ```
Example response:  
  ```json
    {
      "username": "lorem",
      "_id": "66a800e4370fb1809f354cbc"
    }
  ```

### Get all users
Make a GET request to `http://localhost:{env.PORT}/api/users`  
Example response:  
  ```json
    [
      {
        "username": "Praesent",
        "_id": "66a7fe83370fb1809f354cb3"
      },
      {
        "username": "fermentum",
        "_id": "66a7fe83370fb1809f354cb5"
      },
      {
        "username": "tellus",
        "_id": "66a7fe84370fb1809f354cb7"
      },
      {
        "username": "vel",
        "_id": "66a7fe84370fb1809f354cb9"
      },
      {
        "username": "faucibus",
        "_id": "66a800e4370fb1809f354cbc"
      }
    ]
  ```  
### Create a new exercise for a user
Make a POST request to `http://localhost:{env.PORT}/api/users/:userId/exercises`
The date field is optional. If not provided, the current date will be used.  
Example payload:
```json
  {
    "description": "Jumping jack",
    "duration": "60",
    "date": "2024-06-01"
  }
```  
Example response:
```json
  {
    "username": "Praesent",
    "_id": "66a800e4370fb1809f354cbc",
    "description": "Jumping jack",
    "duration": "60",
    "date": "Fri May 31 2024"
  }
```
### Get all exercises of a user.  
Make a GET request to `http://localhost:{env.PORT}/api/users/:userId/logs?from="yyyy-mm-dd"&to="yyyy-mm-dd"&limit=n`  
Example response:
  ```json
    {
      "_id": "66a800e4370fb1809f354cbc",
      "username": "Praesent",
      "count": 3,
      "log": [
        {
          "description": "Push up",
          "duration": 120,
          "date": "Mon Jul 27 2024"
        },
        {
          "description": "Squat",
          "duration": 30,
          "date": "Mon Jul 29 2024"
        },
        {
          "description": "Jumping jack",
          "duration": 60,
          "date": "Fri May 31 2024"
        }
      ]
    }
  ```

### To test the project:
```sh
  npm run test
```

## <a name="project-structure"></a>Project Structure

```
src/
├── server.js
├── controllers/
│   └── ...
├── models/
│   └── ...
├── routes/
│   └── ...
├── views/
│   └── ...
cypress/
├── e2e/
│   └── ...
├── support/
│   └── ...
```  

## <a name="preview"></a>Preview
![exercise-traker-preview](https://github.com/user-attachments/assets/fa03d469-e9b2-480b-9d34-2c987dd00610)  

## <a name="license"></a>License

The code is under the [MIT License](./LICENSE).

## <a name="author"></a>Author

Developed by @Wesley-Nunes  
[![Connect](https://img.shields.io/badge/-Connect-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/dev-wesley-nunes/)](https://www.linkedin.com/in/dev-wesley-nunes/)
