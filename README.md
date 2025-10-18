# 3 Pages Store

A React Native application built with TypeScript that demonstrates authentication, biometric security, and offline-first data persistence using the DummyJSON API.

## Features

- User authentication with session persistence
- Auto-lock functionality after 10 seconds of inactivity or when backgrounded
- Biometric unlock with password fallback
- Product browsing with pull-to-refresh
- Category-filtered product list
- Superadmin product deletion capability
- Offline support with persisted cache
- Network status indicator

## Technology Stack

- React Native 0.75.4
- TypeScript
- React Navigation (Bottom Tabs and Native Stack)
- TanStack React Query for data fetching and caching
- MMKV for fast, synchronous storage
- Redux Toolkit for state management
- Axios for HTTP requests
- React Native Biometrics
- React Native NetInfo for connectivity monitoring

## Installation

### Prerequisites

You need to have React Native development environment configured. Follow the [official setup guide](https://reactnative.dev/docs/environment-setup) if you haven't already.

### Steps
```bash
# Clone the repository
git clone <repository-url>
cd rn-3pages-store

# Install dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..

# Run the app
npm run android   # For Android
npm run ios       # For iOS
```

## Project Configuration

### Selected Category

The category screen displays products from the **smartphones** category.

### Superadmin Credentials

Username: `emilys`  
Password: `emilyspass`

When logged in as this user, delete functionality is enabled for all products.

### Test Accounts

You can use any user from the DummyJSON API. Some examples:

- emilys / emilyspass (has superadmin privileges)
- michaelw / michaelwpass
- sophiab / sophiabpass

Full list available at: https://dummyjson.com/users

## Project Structure
```
src/
├── api/              API client configuration and endpoints
├── components/       Reusable UI components
├── features/         Feature modules (auth, products)
├── hooks/            Custom React hooks
├── navigation/       Navigation configuration
├── store/            Redux store setup
├── types/            TypeScript type definitions
└── utils/            Helper functions and utilities
```

## Key Implementation Details

### Authentication Flow

The app uses DummyJSON's authentication endpoints. On successful login, the access token is stored using MMKV. On subsequent app launches, if a valid token exists, the biometric lock screen appears instead of the login screen.

### Auto-Lock System

The lock mechanism uses two triggers:
- An inactivity timer that counts 10 seconds without user interaction
- AppState listener that detects when the app moves to background

When either condition is met, a lock overlay appears over the current screen. The user must authenticate via biometrics to continue.

### Biometric Authentication

Uses the device's native biometric authentication (Face ID, Touch ID, or Fingerprint). If biometrics are unavailable or fail, the system falls back to the device passcode.

### Data Caching and Offline Mode

React Query handles all data fetching with automatic caching. The MMKV persister saves query results to disk, allowing the app to display cached data immediately on launch, even when offline. A network status indicator shows when the device is disconnected.

### Superadmin Delete

The delete feature is only visible when logged in as the designated superadmin user. It calls DummyJSON's DELETE endpoint, which returns a success response but doesn't actually remove the product from their database. The UI updates optimistically to reflect the deletion.

## Design Decisions

### React Query over Manual Caching

React Query provides automatic background refetching, request deduplication, and cache invalidation. This eliminates the need for manual cache management and reduces boilerplate.

### MMKV for Storage

MMKV offers synchronous read/write operations and significantly better performance compared to AsyncStorage. This results in faster app startup and improved user experience.

### Redux Toolkit for Auth State

While React Query handles server state, Redux manages client state like authentication status and user information. Redux Toolkit reduces boilerplate and provides better TypeScript support.

### Lock Overlay Approach

The lock screen is implemented as an overlay rather than a navigation screen. This preserves the user's location in the app and avoids navigation stack complications.

## Limitations and Future Improvements

### Current Limitations

- DummyJSON's DELETE endpoint is simulated and doesn't persist changes
- Limited error handling and retry logic
- No automated tests
- Single category screen (challenge requirement)

### Potential Enhancements

**Testing**
- Unit tests for utilities and business logic
- Component tests with React Native Testing Library
- Integration tests for authentication flow
- End-to-end tests with Detox

**User Experience**
- Skeleton loading states
- Screen transition animations
- Haptic feedback
- Dark mode support
- Product search functionality
- Advanced filtering options

**Technical Improvements**
- Stricter TypeScript configuration
- Error boundary implementation
- Accessibility improvements
- Code splitting for better performance
- More granular component composition

**Features**
- Detailed product view
- User profile management
- Multiple category tabs
- Favorites or wishlist
- Shopping cart functionality

## Known Issues

- Biometric prompt appears even if the stored token has expired
- No rate limiting on API calls
- Some TypeScript types could be more specific

## Available Scripts
```bash
npm start          # Start Metro bundler
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run clean      # Clean Android build artifacts
```

## API Reference

This app uses the DummyJSON API: https://dummyjson.com/docs

Main endpoints used:
- POST /auth/login - User authentication
- GET /auth/me - Session validation
- GET /products - Fetch all products
- GET /products/category/{category} - Fetch category products
- DELETE /products/{id} - Delete product (simulated)

## License

This project was created as a coding challenge submission.