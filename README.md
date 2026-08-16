# RentNest

RentNest is a property rental platform with role-based functionality for **Tenants, Landlords, and Admins**. The frontend provides property discovery, search/filtering, rental requests, booking, payments, property management, rental-request management, user management, and profile management.

## 🌐 Application URLs

| Service | URL |
|---|---|
| Frontend | https://p-hero-nl-assing-5-frontend.vercel.app |
| Backend API | https://backend-project-assignment-main.vercel.app/ |
| API Docs | https://docs.google.com/document/d/1y6mfS4iplBYiS7p77d8_ymSQTEXJtXbfGweCi8GZKqk/edit?usp=sharing |

### Authentication

Authentication is handled using **cookies**.
---
### Login 
- tenant: abc@example.com
- landlord: abc3@example.com
- admin: admin@example.com
- password(same for all):123456
---
# 📌 Features

## Public

- Browse all properties
- Search properties using partial matching
- Filter by city, bedrooms, and category
- Paginate property listings
- View property details, ratings, comments/reviews
- Register and authenticate users
- Browse property categories

## Tenant

- Create and view rental requests
- View and confirm booking details
- Cancel rental requests
- Complete rental payments
- View booking and payment history
- Edit profile
- Submit a review/rating after the rental request is completed by the landlord

## Landlord

- Access landlord dashboard
- Add, view, edit, and delete properties
- View tenant rental requests
- Update rental-request status
- View payment history
- Edit profile

## Admin

- Access admin dashboard
- View users
- Update user status and role
- View, search, edit, and delete properties
- View and manage rental requests
- View payment history
- Edit profile

---

# 🗂️ Frontend Routes

## Public Routes

| Route | Purpose |
|---|---|
| `/home` | Display all properties with search, filtering, and pagination |
| `/home?searchTerm=[something]` | Partial property search |
| `/home?city=[something]&bedrooms=[number]&category=[something]` | Property filtering |
| `/home?page=1` | Property pagination |
| `/properties/[property_id]` | View a single property with average rating and comments |

These routes map primarily to `GET /api/properties/all` and `GET /api/properties/[id]`. 
## Tenant Routes

| Route | Purpose |
|---|---|
| `/bookings/[rental-request_id]` | View/confirm booking details |
| `/payment/[rentRequestId]?success=true` | Payment-success page |
| `/profile` | View/edit profile and view booking/payment history |

The booking page uses the rental-request API, while payment uses the payment-session API.

## Landlord Routes

| Route | Purpose |
|---|---|
| `/landlord/dashboard` | Landlord dashboard |
| `/landlord/properties` | Manage owned properties |
| `/landlord/rent-requests` | Manage tenant rental requests |
| `/landlord/payments` | View payment history |

## Admin Routes

| Route | Purpose |
|---|---|
| `/admin/dashboard` | Admin dashboard with dummy charts |
| `/admin/users` | Manage users, roles, and statuses |
| `/admin/properties?searchTerm=[something]` | Search and manage properties |
| `/admin/payments` | View all payments |
| `/admin/rent-requests` | Manage all rental requests |
| `/profile` | View/edit admin profile |

No dedicated API endpoint for the admin dashboard is specified in the supplied documentation.

---

# 🔌 Backend API

Base URL:

```text
https://backend-project-assignment-main.vercel.app/
```

All endpoints below are relative to this base URL.

---

## 🔐 Authentication API

Base path: `/api/auth`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/login` | Login and return JWT access/refresh tokens | Public |
| POST | `/api/auth/refresh-token` | Issue a new access token using a refresh token | Public |

---

## 👥 User API

Base path: `/api/user`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/user/register` | Register a Tenant/Landlord | Public |
| GET | `/api/user/me` | Get authenticated user's profile | Admin, Landlord, Tenant |
| PUT | `/api/user/my-profile` | Update authenticated user's profile | Admin, Landlord, Tenant |

fileciteturn1file0L116-L129

---

## 🏘️ Properties API

Base path: `/api/properties`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/properties/all` | Get all properties | Public |
| GET | `/api/properties/:id` | Get a single property and reviews | Public |
| POST | `/api/properties/landlord/create` | Create property | Landlord, Admin |
| PUT | `/api/properties/landlord/update/:id` | Update property | Landlord, Admin |
| DELETE | `/api/properties/landlord/delete/:id` | Delete property | Landlord, Admin |
| GET | `/api/properties/landlord/requests` | Get landlord rental requests | Landlord |

fileciteturn1file0L131-L145

---

## 🏷️ Categories API

Base path: `/api/categories`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/categories/create` | Create category | Public |
| GET | `/api/categories` | Get all categories | Public |

fileciteturn1file0L146-L151

---

## 📝 Rental Request API

Base path: `/api/rent`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/rent/requests/:id` | Create rental request; `:id` is Property ID | Tenant |
| GET | `/api/rent/requests/:id` | Get a rental request; `:id` is rental-request ID | Tenant |
| PUT | `/api/rent/requests/cancel/:id` | Cancel rental request | Tenant |
| PATCH | `/api/rent/requests/update/:id` | Update rental-request status | Landlord, Admin |
| GET | `/api/rent/requests/all` | Get all rental requests | Admin |

fileciteturn1file0L152-L164

---

## 💳 Payment API

Base path: `/api/payment`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/payment/:id/create-payment-session` | Create payment session; `:id` is rental-request ID | Tenant |
| POST | `/api/payment/webhook` | Handle payment gateway webhook | Public (Webhook) |
| GET | `/api/payment/all` | Get payment history | Tenant, Landlord, Admin |

fileciteturn1file0L165-L178

---

## ⭐ Review API

Base path: `/api/review`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/review/create/:id` | Create a property/rental review | Tenant |

A tenant can submit a review only after the rental request has been marked **completed by the landlord**.

---

## 🛡️ Admin API

Base path: `/api/admin`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/admin/properties` | Get all properties | Admin |
| GET | `/api/admin/users` | Get all users | Admin |
| GET | `/api/admin/rental-requests` | Get all rental requests | Admin |
| PATCH | `/api/admin/update/status/:id` | Update user account status | Admin |
| PATCH | `/api/admin/update/role/:id` | Update user role | Admin |

---

# 🔗 Frontend → Backend Mapping

| Feature | Frontend Route | Backend API |
|---|---|---|
| Browse/search/filter/paginate | `/home` | `GET /api/properties/all` |
| Property details/reviews | `/properties/[property_id]` | `GET /api/properties/[id]` |
| Create rental request | Property → booking flow | `POST /api/rent/requests/[Property_Id]` |
| Booking details | `/bookings/[rental-request_id]` | `GET /api/rent/requests/[rental-request_id]` |
| Cancel request | Booking flow | `PUT /api/rent/requests/cancel/[rental-request_id]` |
| Start payment | Payment flow | `POST /api/payment/[rental_request_id]/create-payment-session` |
| Payment success | `/payment/[rentRequestId]?success=true` | Payment gateway return flow |
| Profile | `/profile` | `GET /api/user/me`, `PUT /api/user/my-profile` |
| Landlord properties | `/landlord/properties` | Property create/update/delete APIs |
| Landlord requests | `/landlord/rent-requests` | Landlord request + status APIs |
| Landlord payments | `/landlord/payments` | `GET /api/payment/all` |
| Admin users | `/admin/users` | Admin user APIs |
| Admin properties | `/admin/properties` | Admin property + property update/delete APIs |
| Admin requests | `/admin/rent-requests` | Admin request + status APIs |
| Admin payments | `/admin/payments` | `GET /api/payment/all` |
---

# 🔄 Main Application Flows

## Property Discovery

```text
User
  ↓
/home
  ↓
Search / Filter / Pagination
  ↓
GET /api/properties/all
  ↓
Property Listing
  ↓
/properties/[property_id]
  ↓
GET /api/properties/[id]
```

## Rental Request

```text
Tenant
  ↓
Property Details
  ↓
Create Rental Request
  ↓
POST /api/rent/requests/[Property_Id]
  ↓
/bookings/[rental-request_id]
  ↓
GET /api/rent/requests/[rental-request_id]
```

## Landlord Request Management

```text
Landlord
  ↓
/landlord/rent-requests
  ↓
GET /api/properties/landlord/requests
  ↓
View Requests
  ↓
PATCH /api/rent/requests/update/[id]
  ↓
Update Status
```

## Payment

```text
Tenant
  ↓
Booking
  ↓
Create Payment Session
  ↓
POST /api/payment/[rental_request_id]/create-payment-session
  ↓
Payment Gateway
  ↓
/payment/[rentRequestId]?success=true
  ↓
POST /api/payment/webhook
```

## Review

```text
Rental Request
  ↓
Landlord marks request completed
  ↓
Tenant becomes eligible to review
  ↓
POST /api/review/create/[property_id]
  ↓
Property Review
```

---

# 👮 Role-Based Access

| Role | Main Access |
|---|---|
| Public | Property browsing, search, filtering, categories, registration/authentication |
| Tenant | Bookings, rental requests, payments, reviews, profile |
| Landlord | Property management, rental requests, payments, profile |
| Admin | Users, properties, rental requests, payments, admin dashboard, profile |

---

# 🗄️ Database Relationships
<img width="1536" height="843" alt="ChatGPT Image Aug 16, 2026, 12_14_36 PM2" src="https://github.com/user-attachments/assets/af9b50c8-9bc0-440e-a816-dd37fcca2bc2" />


The documented application revolves around these main entities:

- **User**
- **Property**
- **Category**
- **RentalRequest**
- **Payment**
- **Review**

## Relationship Overview



### Tenant

A Tenant is primarily associated with:

```text
User
 ├── RentalRequest
 │     └── Payment
 └── Review
```

### Landlord

A Landlord is primarily associated with:

```text
User
 └── Property
       └── RentalRequest
             └── Payment
```

### Admin

The Admin operates across the system and manages:

```text
Users
Properties
Rental Requests
Payments
```


