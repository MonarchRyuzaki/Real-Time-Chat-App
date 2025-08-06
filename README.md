# Real-Time Chat Application

A high-performance, scalable real-time chat application built with Node.js, WebSocket, and modern database technologies. This application supports both one-to-one and group messaging with real-time presence tracking, offline message queuing, and comprehensive load testing capabilities.

## 🚀 Features

### Core Chat Features
- **Real-time Messaging**: Instant one-to-one and group chat functionality
- **User Authentication**: Secure JWT-based authentication system
- **Online/Offline Status**: Ping-pong mechanism to detect and track user online/offline status
- **Group Management**: Create, join, and manage group conversations
- **Message History**: Persistent message storage and retrieval
- **Offline Message Queue**: Messages delivered when users come back online

### Performance & Scalability
- **Multi-layered Caching**: Redis + Bloom filters for optimal performance
- **Database Sharding**: Cassandra for message storage, PostgreSQL for user data
- **Connection Pooling**: Efficient WebSocket connection management
- **Load Balancing**: Cluster mode support for horizontal scaling
- **Background Workers**: Queue-based offline message processing

### Developer Experience
- **Load Testing**: Comprehensive Artillery-based performance testing
- **Test Clients**: Multiple test clients for different scenarios
- **Docker Support**: Containerized deployment with Docker Compose
- **Monitoring**: Winston logging with structured log output
- **Type Safety**: Full TypeScript implementation

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **WebSocket**: ws library for real-time communication
- **HTTP Server**: Express.js
- **Authentication**: JWT + bcrypt

### Databases
- **PostgreSQL**: User management, friendships, groups (via Prisma ORM)
- **Apache Cassandra**: Message storage and chat history
- **Redis**: Caching, session management, and Bloom filters
- **BullMQ**: Job queue for offline message processing

### Infrastructure
- **Docker**: Containerization and orchestration
- **Clustering**: Multi-process scaling
- **Logging**: Winston with structured logging
- **Health Checks**: Built-in health monitoring

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL database
- Redis server
- Apache Cassandra database
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/MonarchRyuzaki/Real-Time-Chat-App
cd real-time-chat-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Then edit the `.env` file with your actual configuration values. See `.env.example` for all required environment variables and their descriptions.

**Key configuration items:**
- **JWT Secrets**: Generate strong, unique secrets for JWT tokens
- **Database URLs**: PostgreSQL connection string
- **Cassandra**: DataStax Astra DB credentials and keyspace
- **Redis**: Redis Cloud or local Redis configuration
- **CORS**: Configure allowed origins for your deployment

### 4. Database Setup

#### PostgreSQL Setup
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Seed with dummy data
npm run create-dummy-users
npm run create-chats
npm run create-groups
```

#### Cassandra Setup
Set up your DataStax Astra DB keyspace and tables using the configuration from your `.env` file. The application will automatically create the necessary tables on first connection.

### 5. Start the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm start
```

#### Docker Mode
```bash
npm run docker:up
```

## 🖥 Application Endpoints

### HTTP Server (Port 3000)
- `GET /health` - Health check endpoint
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout

### WebSocket Servers
- **Chat Server (Port 4000)**: Real-time messaging
- **Presence Server (Port 4001)**: Online/offline status detection via ping-pong mechanism

## 📱 Test Client Applications (For Development & Testing)

The project includes several test clients located in the `test/` folder for interactive testing and development purposes:

### Interactive Chat Client
```bash
npm run client
```
Full-featured chat client with authentication, messaging, and group chat capabilities. Best for manual testing and demonstration.

### Group Chat Test Client
```bash
npm run group-test-client
```
Specialized client for testing group chat functionality and multi-user interactions.

### Presence Test Client
```bash
npm run presence-test-client
```
Client for testing user presence tracking and connection handling features.

### Basic Test Client
```bash
npm run test-client
```
Simple client for basic functionality testing and quick validation of core features.

**Note**: These clients are development tools for testing the chat application functionality. Run them after starting the main application server to interact with the chat system.

**⚠️ Important**: These test clients may not be up to date with the latest API changes, as they were primarily created to ensure the core functionality was working during initial development. They serve as reference implementations but may require updates to work with newer features.

## 🔌 WebSocket API

### Authentication
All WebSocket connections require authentication via JWT token.

### Message Types

#### One-to-One Chat
```json
{
  "type": "ONE_TO_ONE_CHAT",
  "from": "username1",
  "to": "username2",
  "content": "Hello!",
  "chatId": "generated-chat-id"
}
```

#### Group Chat
```json
{
  "type": "GROUP_CHAT",
  "from": "username",
  "groupId": "group-id",
  "content": "Hello group!"
}
```

#### Get Chat History
```json
{
  "type": "GET_ONE_TO_ONE_HISTORY",
  "from": "username1",
  "to": "username2",
  "chatId": "chat-id"
}
```

## 🧪 Testing & Load Testing

### Load Testing with Artillery
The project includes comprehensive load testing capabilities:

```bash
cd benchmark

# Interactive load testing
./run-incremental-tests.sh "test_name"

# Automated load testing
./run-incremental-tests.sh "test_name" "" --auto

# Start from specific test level
./run-incremental-tests.sh "test_name" "05_stress"
```

### Test Phases
1. **Baseline**: 5 users, 20s duration
2. **Light Load**: 10 users, 30s duration  
3. **Medium Load**: 25 users, 60s duration
4. **Heavy Load**: 50 users, 90s duration
5. **Stress Test**: 100 users, 120s duration
6. **Peak Load**: 200 users, 150s duration
7. **Extreme Load**: 400 users, 180s duration
8. **Overload Test**: 600 users, 210s duration
9. **Breaking Point**: 800 users, 240s duration

Results are saved in `benchmark/results/{test_name}/` with JSON and HTML reports.

## 🗄 Database Schema

### PostgreSQL (Prisma)
- **Users**: Authentication and user management
- **Friendships**: One-to-one chat relationships
- **Groups**: Group chat metadata
- **GroupMembership**: User-group relationships
- **OfflineMessages**: Queue for offline message delivery

### Cassandra
- **Messages**: Chat message storage with partitioning
- **GroupMessages**: Group chat message storage

### Redis
- **User Sessions**: Active user session management
- **Message Cache**: Frequently accessed messages
- **Bloom Filters**: Efficient cache existence checks
- **Presence Data**: Real-time user status

## 🏗 Architecture

### 🚧 Coming Soon
Detailed architecture diagrams and explanations are being prepared, including:

- **System Architecture Overview**: Complete system design and component interactions
- **Database Schema Relationships**: Visual representation of PostgreSQL and Cassandra schemas
- **Message Flow Diagrams**: End-to-end message processing workflow
- **Multi-Layer Caching Strategy**: Redis caching and Bloom filter implementation
- **WebSocket Connection Lifecycle**: Connection management and presence detection
- **Load Balancing & Scaling**: Cluster mode and horizontal scaling approach

### ⚖️ Trade-offs

**🚧 Coming Soon**: Detailed analysis of architectural decisions and trade-offs, including:

Stay tuned for comprehensive architecture documentation! 📊

## 🔧 Development

### Available Scripts
```bash
# Development
npm run dev              # Start development server
npm run dev:watch        # Start with file watching

# Building
npm run build            # Compile TypeScript
npm run clean            # Clean dist folder

# Database
npm run db:migrate       # Run Prisma migrations
npm run db:generate      # Generate Prisma client
npm run db:studio        # Open Prisma Studio
npm run db:push          # Push schema changes

# Docker
npm run docker:build     # Build Docker images
npm run docker:up        # Start containers
npm run docker:down      # Stop containers

# Testing
npm run client           # Start interactive client
npm run test-client      # Start basic test client
npm run group-test-client # Start group chat client
npm run presence-test-client # Start presence client

# Data Generation
npm run create-dummy-users # Create test users
npm run create-chats      # Create test chats
npm run create-groups     # Create test groups
```

### Project Structure
```
src/
├── index.ts              # Application entry point
├── mockData.ts           # Test data generation
├── cassandra/            # Cassandra database operations
├── config/               # Configuration files
├── controllers/          # HTTP route controllers
├── middlewares/          # Express middlewares
├── prisma/               # Prisma schema and migrations
├── queue/                # Background job processing
├── routes/               # Express route definitions
├── server/               # HTTP and WebSocket servers
├── services/             # Database service layers
├── sockets/              # WebSocket message handlers
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and helpers
```

## 🚀 Deployment

Refer to `.env.example` for all required environment variables. Make sure to set `NODE_ENV=production` and use strong, unique secrets for production deployment.

## 📊 Monitoring & Logging

### Health Checks
- HTTP health endpoint: `GET /health`
- Docker health checks included
- Database connection monitoring

### Logging
- Structured JSON logging with Winston
- Request/response logging with Morgan
- Error tracking and debugging
- Performance metrics

### Performance Metrics & Benchmarking

### Tracked Metrics
Our comprehensive load testing with Artillery tracks the following key performance indicators:

- **Message Throughput**: Messages sent per second and WebSocket send rate
- **Connection Performance**: Handshake latency and connection establishment time
- **Response Latency**: Message delivery latency (P50, P95, P99 percentiles)
- **User Capacity**: Concurrent users supported with zero failures
- **Session Management**: User session length and stability

### Performance Evolution

| Phase | Implementation Stage | Description |
|-------|---------------------|-------------|
| **P1** (Baseline) | Everything in memory | *(not practical for production)* |
| **P2** (MVP Working) | Actual database integration | Real PostgreSQL and Cassandra implementation |
| **P3** (Redis Optimized) | Performance optimized with Redis caching | Multi-layer caching strategy |

**📊 Coming Soon**: Detailed performance graphs, comparison charts, and comprehensive metrics tables showing latency, throughput, and scalability improvements across each optimization phase.

### Key Improvements
- **Latency Optimization**: Maintained sub-millisecond average response times
- **Connection Stability**: Consistent handshake performance across load phases
- **Zero Failures**: 100% success rate across all test scenarios
- **Scalability**: Successfully handles 800+ concurrent users in stress tests

### Load Test Phases
1. **Baseline**: 5 users, 20s duration
2. **Light Load**: 10 users, 30s duration
3. **Medium Load**: 25 users, 60s duration
4. **Heavy Load**: 50 users, 90s duration
5. **Stress Test**: 100 users, 120s duration
6. **Peak Load**: 200 users, 150s duration
7. **Extreme Load**: 400 users, 180s duration
8. **Overload Test**: 600 users, 210s duration
9. **Breaking Point**: 800 users, 240s duration

Results are saved in `benchmark/results/{test_name}/` with detailed JSON and HTML reports.

## 🛡 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting capabilities
- Secure WebSocket connections

## 🔗 API Documentation

### WebSocket Events

#### Client → Server
- `ONE_TO_ONE_CHAT` - Send direct message
- `GROUP_CHAT` - Send group message
- `GET_ONE_TO_ONE_HISTORY` - Request chat history
- `GET_GROUP_CHAT_HISTORY` - Request group history
- `JOIN_GROUP` - Join a group chat
- `LEAVE_GROUP` - Leave a group chat
- `DISCONNECT` - Graceful disconnect

#### Server → Client
- `ONE_TO_ONE_CHAT` - Receive direct message
- `GROUP_CHAT` - Receive group message
- `ONE_TO_ONE_CHAT_HISTORY` - Chat history response
- `GROUP_CHAT_HISTORY` - Group history response
- `PRESENCE_UPDATE` - User status change
- `ERROR` - Error message
- `SUCCESS` - Success confirmation
- `INFO` - Information message

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with Node.js and TypeScript
- Powered by WebSocket technology
- Database management with Prisma ORM
- Load testing with Artillery
- Containerized with Docker

---