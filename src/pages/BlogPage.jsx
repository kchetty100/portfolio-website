import React, { useState } from 'react';
import { FaBlog, FaArrowLeft, FaHome, FaExternalLinkAlt, FaTimes, FaCalendar, FaClock, FaTag } from 'react-icons/fa';

const BlogPage = ({ onBack, onHome }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable Microservices with Spring Boot",
      excerpt: "Learn how to design and implement microservices architecture using Spring Boot, covering service discovery, API gateways, and distributed systems patterns.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Backend Development",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      link: "#",
      color: "from-blue-50 to-blue-100",
      content: `# Building Scalable Microservices with Spring Boot

Microservices architecture has become the de facto standard for building large-scale, distributed applications. In this comprehensive guide, we'll explore how to leverage Spring Boot to create robust, scalable microservices.

## Understanding Microservices Architecture

Microservices architecture is an approach where a single application is built as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often HTTP REST APIs.

### Key Benefits

- **Independent Deployment**: Each service can be deployed independently without affecting others
- **Technology Diversity**: Different services can use different technology stacks
- **Scalability**: Scale individual services based on demand
- **Fault Isolation**: Failures in one service don't bring down the entire system

## Spring Boot for Microservices

Spring Boot simplifies microservices development with:

- **Spring Cloud**: Provides tools for developers to quickly build distributed systems
- **Service Discovery**: Eureka, Consul, or Zookeeper integration
- **API Gateway**: Spring Cloud Gateway for routing and load balancing
- **Configuration Management**: Centralized configuration with Spring Cloud Config
- **Circuit Breakers**: Resilience patterns with Hystrix or Resilience4j

## Implementation Strategy

### 1. Service Discovery

Implement service discovery using Spring Cloud Eureka:

\`\`\`java
@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
\`\`\`

### 2. API Gateway Pattern

Use Spring Cloud Gateway to route requests:

\`\`\`yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
\`\`\`

### 3. Distributed Configuration

Centralize configuration management:

\`\`\`java
@RefreshScope
@RestController
public class ConfigController {
    @Value("\${app.message}")
    private String message;
}
\`\`\`

## Best Practices

1. **Database per Service**: Each microservice should have its own database
2. **API Versioning**: Implement versioning strategies for API evolution
3. **Monitoring**: Use distributed tracing with Zipkin or Jaeger
4. **Security**: Implement OAuth2/JWT for service-to-service authentication
5. **Testing**: Write integration tests for service interactions

## Conclusion

Building microservices with Spring Boot requires careful planning and understanding of distributed systems principles. By following these patterns and best practices, you can create scalable, maintainable microservices architectures that grow with your business needs.`
    },
    {
      id: 2,
      title: "Modern React Patterns and Best Practices",
      excerpt: "Exploring advanced React patterns including custom hooks, context optimization, and performance techniques for large-scale applications.",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Frontend Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      link: "#",
      color: "from-green-50 to-green-100",
      content: `# Modern React Patterns and Best Practices

React has evolved significantly since its introduction, and with it, new patterns and best practices have emerged. This article explores advanced React patterns that can help you build more maintainable and performant applications.

## Custom Hooks for Reusability

Custom hooks allow you to extract component logic into reusable functions:

\`\`\`javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
\`\`\`

## Context Optimization

Avoid unnecessary re-renders with context splitting:

\`\`\`javascript
// Instead of one large context, split into smaller contexts
const UserContext = createContext();
const ThemeContext = createContext();
const SettingsContext = createContext();
\`\`\`

## Performance Optimization Techniques

### React.memo for Component Memoization

\`\`\`javascript
const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
}, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});
\`\`\`

### useMemo and useCallback

\`\`\`javascript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

## Component Composition Patterns

### Compound Components

\`\`\`javascript
const Tabs = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  );
};
\`\`\`

## State Management Patterns

### Reducer Pattern for Complex State

\`\`\`javascript
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
}
\`\`\`

## Conclusion

Mastering these React patterns will help you build more scalable, maintainable applications. Always consider the trade-offs and choose patterns that fit your specific use case.`
    },
    {
      id: 3,
      title: "DevOps Automation: CI/CD Pipeline Optimization",
      excerpt: "A comprehensive guide to setting up efficient CI/CD pipelines, container orchestration, and infrastructure as code practices.",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "DevOps",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop",
      link: "#",
      color: "from-purple-50 to-purple-100",
      content: `# DevOps Automation: CI/CD Pipeline Optimization

Continuous Integration and Continuous Deployment (CI/CD) are fundamental practices in modern software development. This guide covers strategies for optimizing your CI/CD pipelines for speed, reliability, and efficiency.

## Pipeline Architecture Best Practices

### 1. Parallel Job Execution

Run independent jobs in parallel to reduce total pipeline time:

\`\`\`yaml
# GitHub Actions example
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run tests
        run: npm test
  
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Run linter
        run: npm run lint
  
  build:
    needs: [test, lint]
    runs-on: ubuntu-latest
    steps:
      - name: Build application
        run: npm run build
\`\`\`

### 2. Caching Dependencies

Cache dependencies to speed up builds:

\`\`\`yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
\`\`\`

## Container Orchestration

### Docker Multi-Stage Builds

Optimize Docker images with multi-stage builds:

\`\`\`dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/index.js"]
\`\`\`

## Infrastructure as Code

### Terraform for Cloud Resources

\`\`\`hcl
resource "aws_ecs_cluster" "main" {
  name = "production-cluster"
  
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}
\`\`\`

## Monitoring and Observability

Implement comprehensive monitoring:

- **Application Metrics**: Prometheus + Grafana
- **Log Aggregation**: ELK Stack or Loki
- **Distributed Tracing**: Jaeger or Zipkin
- **Alerting**: PagerDuty or Opsgenie

## Security in CI/CD

- Scan dependencies for vulnerabilities
- Use secrets management (AWS Secrets Manager, HashiCorp Vault)
- Implement least-privilege access policies
- Regular security audits of pipeline configurations

## Conclusion

Optimizing CI/CD pipelines requires continuous improvement and monitoring. Focus on reducing build times, improving reliability, and maintaining security throughout the deployment process.`
    },
    {
      id: 4,
      title: "Cybersecurity in Modern Web Applications",
      excerpt: "Essential security practices for web developers, covering authentication, authorization, data protection, and common vulnerabilities.",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Security",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      link: "#",
      color: "from-red-50 to-red-100",
      content: `# Cybersecurity in Modern Web Applications

Security is not an afterthought—it's a fundamental requirement for any web application. This article covers essential security practices every developer should implement.

## Authentication and Authorization

### JWT Best Practices

\`\`\`javascript
// Use secure token storage
const token = localStorage.getItem('token'); // ❌ Vulnerable to XSS
const token = httpOnlyCookie.get('token'); // ✅ More secure

// Implement token refresh
async function refreshToken() {
  const response = await fetch('/api/refresh', {
    method: 'POST',
    credentials: 'include'
  });
  return response.json();
}
\`\`\`

### Role-Based Access Control (RBAC)

\`\`\`javascript
const roles = {
  ADMIN: ['read', 'write', 'delete', 'manage'],
  USER: ['read', 'write'],
  GUEST: ['read']
};

function hasPermission(userRole, action) {
  return roles[userRole]?.includes(action);
}
\`\`\`

## Common Vulnerabilities and Mitigations

### 1. SQL Injection Prevention

Always use parameterized queries:

\`\`\`javascript
// ❌ Vulnerable
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// ✅ Secure
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
\`\`\`

### 2. Cross-Site Scripting (XSS)

Sanitize user input:

\`\`\`javascript
import DOMPurify from 'dompurify';

const cleanHTML = DOMPurify.sanitize(userInput);
\`\`\`

### 3. Cross-Site Request Forgery (CSRF)

Implement CSRF tokens:

\`\`\`javascript
// Generate CSRF token on server
const csrfToken = crypto.randomBytes(32).toString('hex');

// Include in requests
fetch('/api/data', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});
\`\`\`

## Data Protection

### Encryption at Rest and in Transit

- Use HTTPS/TLS for all communications
- Encrypt sensitive data in databases
- Implement proper key management
- Use environment variables for secrets

### Password Security

\`\`\`javascript
import bcrypt from 'bcrypt';

// Hash passwords
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Verify passwords
const isValid = await bcrypt.compare(password, hashedPassword);
\`\`\`

## Security Headers

Implement security headers:

\`\`\`javascript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});
\`\`\`

## Conclusion

Security requires a multi-layered approach. Stay updated with OWASP Top 10 vulnerabilities and implement defense in depth strategies. Regular security audits and penetration testing are essential for maintaining application security.`
    },
    {
      id: 5,
      title: "Database Design Patterns for High-Performance Applications",
      excerpt: "Understanding database optimization, indexing strategies, and query performance tuning for enterprise-level applications.",
      date: "2023-12-20",
      readTime: "9 min read",
      category: "Database",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
      link: "#",
      color: "from-yellow-50 to-yellow-100",
      content: `# Database Design Patterns for High-Performance Applications

Database performance is critical for application scalability. This article explores design patterns and optimization techniques for building high-performance database systems.

## Indexing Strategies

### Composite Indexes

Create indexes on frequently queried column combinations:

\`\`\`sql
-- Index for queries filtering by status and date
CREATE INDEX idx_status_date ON orders(status, created_at);

-- Index for sorting and filtering
CREATE INDEX idx_user_status ON orders(user_id, status);
\`\`\`

### Covering Indexes

Include all required columns in the index:

\`\`\`sql
CREATE INDEX idx_covering ON orders(user_id, status, total)
INCLUDE (order_date, shipping_address);
\`\`\`

## Query Optimization

### Avoid N+1 Queries

\`\`\`javascript
// ❌ N+1 Problem
users.forEach(user => {
  const orders = await getOrders(user.id);
});

// ✅ Batch Loading
const userIds = users.map(u => u.id);
const allOrders = await getOrdersBatch(userIds);
\`\`\`

### Use Query Explain Plans

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM orders 
WHERE user_id = 123 
AND status = 'completed'
ORDER BY created_at DESC;
\`\`\`

## Database Sharding

### Horizontal Sharding Strategy

\`\`\`javascript
function getShard(userId) {
  const shardCount = 4;
  return userId % shardCount;
}

function routeQuery(userId, query) {
  const shard = getShard(userId);
  return executeOnShard(shard, query);
}
\`\`\`

## Caching Strategies

### Redis for Query Caching

\`\`\`javascript
async function getCachedUser(userId) {
  const cacheKey = \`user:\${userId}\`;
  const cached = await redis.get(cacheKey);
  
  if (cached) return JSON.parse(cached);
  
  const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  return user;
}
\`\`\`

## Connection Pooling

Optimize database connections:

\`\`\`javascript
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'mydb',
  waitForConnections: true,
  queueLimit: 0
});
\`\`\`

## Normalization vs Denormalization

- **Normalize** for write-heavy applications
- **Denormalize** for read-heavy applications
- Use materialized views for complex aggregations
- Consider read replicas for scaling reads

## Conclusion

Database performance optimization requires understanding your application's access patterns. Monitor query performance, use appropriate indexing strategies, and implement caching where beneficial. Regular performance testing and optimization are key to maintaining high-performance databases.`
    },
    {
      id: 6,
      title: "Cloud-Native Architecture: From Monolith to Microservices",
      excerpt: "A practical journey of migrating legacy applications to cloud-native architecture using modern containerization and orchestration tools.",
      date: "2023-12-15",
      readTime: "12 min read",
      category: "Cloud Computing",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      link: "#",
      color: "from-indigo-50 to-indigo-100",
      content: `# Cloud-Native Architecture: From Monolith to Microservices

Migrating from monolithic to cloud-native microservices architecture is a significant undertaking. This article provides a practical roadmap for this transformation.

## Migration Strategy

### Strangler Fig Pattern

Gradually replace monolithic functionality:

1. **Identify Bounded Contexts**: Find natural service boundaries
2. **Extract Services**: Migrate one service at a time
3. **Maintain Compatibility**: Keep APIs compatible during transition
4. **Decommission**: Remove old code once migration is complete

### Example Migration Path

\`\`\`
Monolith → Modular Monolith → Microservices
\`\`\`

## Containerization

### Docker Best Practices

\`\`\`dockerfile
FROM node:18-alpine AS base
WORKDIR /app

FROM base AS dependencies
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

## Kubernetes Orchestration

### Deployment Configuration

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
\`\`\`

## Service Mesh

Implement service mesh for:

- **Service Discovery**: Automatic service registration
- **Load Balancing**: Intelligent traffic distribution
- **Security**: mTLS between services
- **Observability**: Distributed tracing and metrics

## Cloud-Native Patterns

### Circuit Breaker

\`\`\`javascript
const circuitBreaker = new CircuitBreaker(apiCall, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
});
\`\`\`

### Retry with Exponential Backoff

\`\`\`javascript
async function retryWithBackoff(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
\`\`\`

## Monitoring and Observability

- **Metrics**: Prometheus for time-series data
- **Logging**: Centralized logging with ELK stack
- **Tracing**: Distributed tracing with Jaeger
- **Alerting**: Proactive issue detection

## Conclusion

Cloud-native migration is a journey, not a destination. Start small, measure progress, and iterate. Focus on building resilient, observable, and scalable services that can evolve with your business needs.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={onBack} 
                className="text-xl sm:text-3xl font-bold text-netflixRed tracking-tight font-netflix text-arc-effect hover:text-red-400 transition-colors cursor-pointer"
              >
                KEEGAN CHETTY
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={onHome} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button onClick={onBack} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Back</button>
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back to Profile Selection"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  📝
                </div>
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={onBack}
                className="text-white text-2xl hover:text-gray-300 transition-colors"
              >
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={onHome}
              className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
            >
              Home
            </button>
            <button 
              onClick={onBack}
              className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
            >
              Back
            </button>
            <div className="pt-4 border-t border-gray-700">
              <button 
                onClick={onBack}
                className="flex items-center space-x-3 text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  📝
                </div>
                <span>Back to Profile Selection</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <FaBlog className="text-blue-500 text-3xl mr-4" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                <span className="text-red-500">Technical</span> Blog
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on software development, architecture, and technology trends.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${post.color} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col`}>
                  {/* Post Image */}
                  <div className="mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  
                  {/* Post Details */}
                  <div className="text-gray-800 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <span>Read More</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-16">
            <p className="text-gray-400 text-lg">
              "Sharing knowledge is the first step to humanity." - Unknown
            </p>
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-90" onClick={() => setSelectedPost(null)}>
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-700 text-white`}>
                    <FaTag className="inline mr-1" />
                    {selectedPost.category}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <FaCalendar className="mr-1" />
                      {selectedPost.date}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-8 overflow-y-auto max-h-[calc(100vh-200px)]">
                <div className="mb-6">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {selectedPost.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-6">
                    {selectedPost.excerpt}
                  </p>
                </div>

                {/* Blog Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  <div className="text-gray-300 leading-relaxed">
                    {(() => {
                      const lines = selectedPost.content.split('\n');
                      const elements = [];
                      let inCodeBlock = false;
                      let codeBlockContent = [];
                      let codeBlockLanguage = '';
                      let key = 0;

                      for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        
                        if (line.startsWith('```')) {
                          if (inCodeBlock) {
                            // End code block
                            elements.push(
                              <pre key={key++} className="bg-gray-800 rounded-lg p-4 overflow-x-auto my-4 border border-gray-700">
                                <code className={`text-sm text-green-400 font-mono`}>
                                  {codeBlockContent.join('\n')}
                                </code>
                              </pre>
                            );
                            codeBlockContent = [];
                            codeBlockLanguage = '';
                            inCodeBlock = false;
                          } else {
                            // Start code block
                            codeBlockLanguage = line.substring(3).trim();
                            inCodeBlock = true;
                          }
                          continue;
                        }

                        if (inCodeBlock) {
                          codeBlockContent.push(line);
                          continue;
                        }

                        if (line.startsWith('# ')) {
                          elements.push(
                            <h1 key={key++} className="text-3xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">
                              {line.substring(2)}
                            </h1>
                          );
                        } else if (line.startsWith('## ')) {
                          elements.push(
                            <h2 key={key++} className="text-2xl font-bold text-white mt-6 mb-3">
                              {line.substring(3)}
                            </h2>
                          );
                        } else if (line.startsWith('### ')) {
                          elements.push(
                            <h3 key={key++} className="text-xl font-bold text-white mt-4 mb-2">
                              {line.substring(4)}
                            </h3>
                          );
                        } else if (line.trim().startsWith('- ')) {
                          elements.push(
                            <li key={key++} className="ml-6 mb-2 list-disc">
                              {line.substring(2)}
                            </li>
                          );
                        } else if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                          const text = line.trim().slice(2, -2);
                          elements.push(
                            <p key={key++} className="mb-4">
                              <strong className="text-white font-bold">{text}</strong>
                            </p>
                          );
                        } else if (line.trim() === '') {
                          elements.push(<br key={key++} />);
                        } else {
                          // Handle inline code
                          const parts = line.split(/(`[^`]+`)/g);
                          const paragraph = (
                            <p key={key++} className="mb-4">
                              {parts.map((part, partIndex) => {
                                if (part.startsWith('`') && part.endsWith('`')) {
                                  const code = part.slice(1, -1);
                                  return (
                                    <code key={partIndex} className="bg-gray-800 px-2 py-1 rounded text-red-400 font-mono text-sm">
                                      {code}
                                    </code>
                                  );
                                }
                                return <span key={partIndex}>{part}</span>;
                              })}
                            </p>
                          );
                          elements.push(paragraph);
                        }
                      }

                      // Close any remaining code block
                      if (inCodeBlock && codeBlockContent.length > 0) {
                        elements.push(
                          <pre key={key++} className="bg-gray-800 rounded-lg p-4 overflow-x-auto my-4 border border-gray-700">
                            <code className={`text-sm text-green-400 font-mono`}>
                              {codeBlockContent.join('\n')}
                            </code>
                          </pre>
                        );
                      }

                      return elements;
                    })()}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-700 px-6 py-4 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
