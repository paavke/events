\# Eventure



\## Overview



Eventure is a full-stack event management platform designed to simplify the organization and management of events, tasks, participants, and users.



The application follows a \*\*microservices architecture\*\* and combines a \*\*React frontend\*\* with multiple \*\*Spring Boot backend services\*\*. It integrates \*\*Keycloak\*\* for authentication and authorization, \*\*Apiman\*\* as an API gateway, \*\*MongoDB\*\* for data persistence, and \*\*Docker\*\* for local infrastructure management.



This project demonstrates full-stack development, distributed architecture principles, REST API communication, authentication flows, API management, and containerized deployment.



\---



\## Features



\### Authentication \& Security

\- User authentication with Keycloak

\- Role-based access control

\- Protected API access

\- Token-based authentication



\### Event Management

\- Create events

\- Update event information

\- Manage event lifecycle

\- View event details



\### Task Management

\- Create and manage event-related tasks

\- Track responsibilities

\- Update task progress



\### Participant Management

\- Add participants to events

\- Manage participant information

\- Associate users with event activities



\### Microservices Architecture

\- Independent backend services

\- Separation of business domains

\- REST communication between components

\- API management using Apiman



\---



\## Technology Stack



\### Frontend

\- React

\- Tailwind CSS

\- JavaScript



\### Backend

\- Java 17

\- Spring Boot

\- Maven



\### Database

\- MongoDB



\### Authentication \& API Management

\- Keycloak

\- Apiman API Gateway



\### DevOps \& Tools

\- Docker

\- Docker Compose

\- Git

\- IntelliJ IDEA



\---



\## Architecture



The backend is divided into independent microservices, each responsible for a specific business domain.



\### Services



\- \*\*User Service\*\* → user management and profiles  

\- \*\*Event Service\*\* → event creation and management  

\- \*\*Task Service\*\* → task management  

\- \*\*Participant Service\*\* → participant handling  



The frontend communicates with backend services through APIs managed by \*\*Apiman\*\*, while \*\*Keycloak\*\* secures authentication and authorization flows.



\---



\## Project Structure



```text

events\_Danilo\_Pavicevic/

│

├── client/                     # React frontend

│

├── server/

│   ├── user-service/           # User service

│   ├── event-service/          # Event service

│   ├── task-service/           # Task service

│   └── participant-service/    # Participant service

│

├── docker-compose.yml          # Infrastructure setup

├── Dockerfile

└── README.md

```



\---



\## Running the Project Locally



\### Prerequisites



Before running the project, make sure the following tools are installed:



\- Java 17

\- Maven

\- Node.js + npm

\- Docker Desktop

\- Git



\---



\### 1. Clone the Repository



```bash

git clone https://github.com/paavke/events.git

cd events

```



\---



\### 2. Start Infrastructure



Start containers (MongoDB, Keycloak, Apiman, and dependencies if configured):



```bash

docker compose up -d

```



\---



\### 3. Start Backend Services



Open separate terminals and run:



\#### User Service



```bash

cd server/user-service

mvn spring-boot:run

```



\#### Event Service



```bash

cd server/event-service

mvn spring-boot:run

```



\#### Task Service



```bash

cd server/task-service

mvn spring-boot:run

```



\#### Participant Service



```bash

cd server/participant-service

mvn spring-boot:run

```



\---



\### 4. Start Frontend



Open another terminal:



```bash

cd client

npm install

npm run dev

```



The frontend will typically run on:



```text

http://localhost:5173

```



\---



\## Authentication \& API Gateway



\### Keycloak



Keycloak is used for:



\- User authentication

\- Role management

\- Token-based authorization

\- Securing protected endpoints



\### Apiman



Apiman is used as:



\- API Gateway

\- API management layer

\- Service exposure and routing

\- Centralized API access



\---



\## Screenshots



\### Dashboard



\_Add screenshot here\_



\### Event Management



\_Add screenshot here\_



\### Authentication



\_Add screenshot here\_



Example usage:



```md

!\[Dashboard](docs/screenshots/dashboard.png)

```



\---



\## Future Improvements



Possible future improvements include:



\- Real-time notifications

\- WebSocket integration

\- Advanced analytics dashboard

\- Enhanced filtering and search

\- Improved monitoring and logging



\---



\## Author



\*\*Danilo Pavicevic\*\*



Software Engineering / Full-Stack Development Project



