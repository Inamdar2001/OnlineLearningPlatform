# OnlineLearningPlatform
# Personalized Online Learning Platform

An interactive and dynamic platform for learners to explore courses, track progress, and engage in collaborative discussions. This project leverages **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** to deliver a scalable and feature-rich learning experience.

## Features

### 1. User Authentication and Authorization

- Secure user registration and login with JWT.
- Role-based access control (e.g., learners and admins).

### 2. Course Management (Admin Feature)

- Create, update, and delete courses.
- Manage course content, including videos, PDFs, and text lessons.

### 3. Enrollment and Progress Tracking

- Enroll in courses and track progress with detailed statistics.
- Mark lessons as completed and visualize overall progress.

### 4. Forum and Discussions

- Start and engage in discussion threads.
- Comment on threads to foster collaborative learning.

### 5. Search and Filters

- Search for courses or users by keyword.
- Filter courses by category, difficulty, and price.

### 6. Admin Dashboard

- View platform statistics: total users, active learners, and revenue insights.

## Technologies Used

| Technology | Purpose                                 |
| ---------- | --------------------------------------- |
| Node.js    | Backend runtime environment             |
| Express.js | Web framework for creating RESTful APIs |
| MongoDB    | Database for storing application data   |
| Mongoose   | ODM for modeling MongoDB data           |
| JWT        | Authentication and authorization        |

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system.
- **MongoDB**: Install and run MongoDB locally or use a cloud-based service like MongoDB Atlas.

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/learning-platform.git
   cd learning-platform
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-secret-key
     ```

4. **Run the application**:

   ```bash
   npm start
   ```

5. **Access the platform**:

   - Open your browser and visit `http://localhost:3000`.

## API Endpoints

### Authentication

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | Log in a user       |

### Courses

| Method | Endpoint       | Description                 |
| ------ | -------------- | --------------------------- |
| GET    | `/courses`     | Fetch all courses           |
| POST   | `/courses`     | Create a new course (Admin) |
| PUT    | `/courses/:id` | Update a course (Admin)     |
| DELETE | `/courses/:id` | Delete a course (Admin)     |

### Enrollments

| Method | Endpoint                | Description                             |
| ------ | ----------------------- | --------------------------------------- |
| POST   | `/enrollments`          | Enroll a user in a course               |
| GET    | `/enrollments/user/:id` | Get all enrollments for a specific user |

### Forum

| Method | Endpoint                     | Description                    |
| ------ | ---------------------------- | ------------------------------ |
| POST   | `/forums`                    | Create a new discussion thread |
| GET    | `/forums`                    | Get all discussion threads     |
| POST   | `/forums/:threadId/comments` | Add a comment to a thread      |

## Folder Structure

```
learning-platform/
├── controllers/         # Route controllers (business logic)
├── models/              # Mongoose schemas and models
├── routes/              # Express route definitions
├── middlewares/         # Custom middleware (auth, error handling)
├── utils/               # Utility functions and helpers
├── config/              # Configuration files (DB, env)
├── public/              # Static assets (optional)
├── views/               # Frontend templates (if using server-side rendering)
├── .env                 # Environment variables
├── server.js            # Entry point for the application
```

## Future Enhancements

- **Real-time Notifications**: Notify users of new replies in forums or course updates.
- **Payment Integration**: Add payment gateways for premium courses.
- **Gamification**: Introduce badges and leaderboards to increase engagement.
- **Mobile App**: Extend the platform with a mobile app.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please reach out:

- **Email**: [webdev8485@gmail.com](mailto\:webdev8485@gmail.com) 
- **GitHub**:Inamdar2001

