<div align="center">
  <h1>🛍️ ShopFlow</h1>
  <p>A modern, highly performant, and beautifully designed e-commerce application built to demonstrate the capabilities of Expo and React Native.</p>
</div>

<br/>

## ✨ Features

- **Dynamic Theming System**: Seamlessly switch between Light and Dark modes. The entire UI is driven by a custom, reactive token system (`useTheme`) that updates instantly.
- **Robust State Management**: 
  - **Client State**: Powered by [Zustand](https://github.com/pmndrs/zustand) for lightning-fast cart updates, UI preferences, and authentication state.
  - **Server State**: Managed via [TanStack Query (React Query)](https://tanstack.com/query/latest) for intelligent caching, refetching, and loading states for products and orders.
- **File-based Routing**: Built entirely on **Expo Router**, enabling intuitive navigation, deep linking, and protected route logic (Auth Guard).
- **Fluid Animations**: Meaningful micro-interactions, pinch-to-zoom on products, and stagger-entrance lists powered by **Reanimated 3** and **React Native Gesture Handler**.
- **Data Persistence**: Securely stores authentication tokens using `expo-secure-store`, while utilizing `AsyncStorage` for non-sensitive data like the shopping cart and theme preferences.
- **Form Validation**: Type-safe forms with real-time error handling using **React Hook Form** combined with **Zod** schema validation.
- **Haptic Feedback**: Tactile responses to user actions (adding to cart, toggling switches, logging out) using `expo-haptics`.

---

## 🏗️ Architecture & Structure

ShopFlow is organized for scalability, strictly separating UI components from business logic:

```text
src/
├── api/          # Mock data and simulated network delays for Products, Orders, Auth
├── components/   # Reusable, dumb UI components (Buttons, Cards, Badges, SkeletonLoaders)
├── features/     # Feature-specific logic (e.g., Auth schemas, Login/Register forms)
├── hooks/        # Custom React hooks wrapping TanStack Query and Theme logic
├── lib/          # Global configurations (QueryClient, Storage adapters, Theme tokens)
├── stores/       # Zustand global stores (Auth, Cart, UI preferences)
└── types/        # TypeScript interfaces and type definitions
app/              
├── (auth)/       # Public routes (Login, Register)
├── (tabs)/       # Protected tab routes (Home, Cart, Orders, Profile)
├── product/      # Dynamic nested routes (Product Detail Screen)
└── settings/     # Nested profile configuration screens
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (LTS) installed and the [Expo CLI](https://docs.expo.dev/get-started/installation/) set up.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/naveedqadir/shopflow-expo.git
   cd shopflow-expo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   *Note: This project uses `expo-image` and `expo-secure-store`, which require native modules. If you are building outside of Expo Go, you will need to prebuild the app.*

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on a device**
   - **iOS Simulator:** Press `i` in the terminal.
   - **Android Emulator:** Press `a` in the terminal.
   - **Physical Device:** Download the **Expo Go** app on your phone and scan the QR code generated in the terminal.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Framework** | Expo SDK 56, React Native |
| **Routing** | Expo Router |
| **Client State** | Zustand |
| **Server State** | TanStack Query |
| **Forms & Validation** | React Hook Form + Zod |
| **Animations** | React Native Reanimated 3 |
| **Gestures** | React Native Gesture Handler |
| **Icons** | Lucide React Native |
| **Images** | Expo Image |

---

## 🎨 UI/UX Highlights

ShopFlow avoids standard native defaults in favor of a **premium, custom design system**. 

- **Custom Colors**: Carefully selected palettes (`bgElevated`, `primaryMuted`, `dangerBg`) to ensure perfect contrast in both Dark and Light environments.
- **Skeleton Loaders**: Custom shimmering skeletons provide a high-quality perception of speed while data is fetching.
- **Empty States**: Friendly, illustrated empty states guide the user rather than showing blank screens.
- **Dynamic CTAs**: Buttons are context-aware (e.g., the "Add to Cart" button seamlessly transitions to a "View Cart" navigation button once an item is added).

---

## 📜 License
© 2026 ShopFlow Inc. Built as a demonstration of modern Expo architectures.
