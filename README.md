# Little Lemon Food Ordering App

A full-featured mobile food ordering application for **Little Lemon**, a charming family-owned Mediterranean restaurant based in Chicago. Built with **React Native** and **Expo** as a Coursera Capstone project.

---

## Table of Contents

- [About The Application](#about-the-application)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Installation & Setup](#installation--setup)
- [Running the App](#running-the-app)
- [How to Test the Core Flows (Coursera Rubric)](#how-to-test-the-core-flows-coursera-rubric)
- [Wireframe](#wireframe)
- [Design Palette](#design-palette)

---

## About The Application

The **Little Lemon Food Ordering App** allows customers to discover traditional Mediterranean recipes served with a modern twist. The app provides a seamless user journey from initial onboarding, real-time menu exploration and category filtering, all the way to profile personalization and local persistence.

---

## Key Features

1. **User Onboarding & Validation:**
   - First-time user greeting with Little Lemon branding.
   - Collects first name, optional last name, and email address.
   - Form validation ensures email syntax is valid and required fields are filled before enabling the **Next** button.
   - Persists onboarding data to `@react-native-async-storage/async-storage`.

2. **Home Screen (Four Core Sections):**
   - **Header:** Features the official Little Lemon logo and user avatar. Tapping the avatar navigates to the Profile screen.
   - **Hero Section:** Highlights the restaurant's Chicago identity, signature imagery, and an interactive search input.
   - **Menu Breakdown:** Section titled **"ORDER FOR DELIVERY!"** with selectable category pills (`All`, `Starters`, `Mains`, `Desserts`, `Drinks`).
   - **Food Menu List:** Scrollable list showcasing authentic dishes (Greek Salad, Bruschetta, Grilled Fish, Pasta, Lemon Dessert, etc.) with prices, rich descriptions, and appetizing images.

3. **Real-Time Live Search:**
   - Case-insensitive search bar that filters the menu instantly as you type dish names or ingredients.

4. **Category Filtering:**
   - Interactive category pills that filter dishes by course.
   - Supports selecting `All` to restore the complete menu.
   - Works seamlessly in combination with text search.

5. **Profile Management & Persistence:**
   - Pre-populated with details provided during onboarding.
   - Editable fields: First Name, Last Name, Email, Phone Number.
   - Avatar management: Pick sample avatar photo, revert to user initials, or remove.
   - Email notification preferences (Order statuses, Password changes, Special offers, Newsletter).
   - **Save Changes:** Persists modifications immediately to AsyncStorage.
   - **Discard Changes:** Reverts inputs to the last saved state.
   - **Log Out:** Clears all stored user and onboarding data, resets navigation, and redirects back to Onboarding.

6. **Stack Navigation:**
   - Native stack navigation (`@react-navigation/native-stack`) managing `Onboarding -> Home -> Profile`.
   - Dedicated header back button on the Profile screen.

---

## Technology Stack

- **Framework:** [Expo](https://expo.dev/) (SDK 57)
- **Library:** React Native 0.86 (JavaScript, Hooks, Functional Components)
- **Navigation:** React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`)
- **Storage:** `@react-native-async-storage/async-storage`
- **Safe Area:** `react-native-safe-area-context`
- **Screens:** `react-native-screens`
- **Assets:** Fully self-contained local image assets (no flaky third-party external API dependencies)

---

## Folder Structure

```
├── assets/
│   ├── images/
│   │   ├── logo.png                   # Little Lemon brand logo
│   │   ├── hero.jpg                   # Hero banner dish image
│   │   ├── greek-salad.jpg            # Starter dish image
│   │   ├── bruschetta.jpg             # Starter dish image
│   │   ├── grilled-fish.jpg           # Main course dish image
│   │   ├── pasta.jpg                  # Main course dish image
│   │   ├── mediterranean-burger.jpg   # Main course dish image
│   │   ├── lemon-dessert.jpg          # Dessert dish image
│   │   ├── lemon-mint-juice.jpg       # Beverage image
│   │   └── avatar-placeholder.png     # Default profile avatar
│   ├── icon.png
│   ├── splash-icon.png
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── Avatar.js                  # Dynamic user avatar (image/initials)
│   │   ├── CategoryFilter.js          # Menu breakdown category buttons
│   │   ├── Header.js                  # Header with logo, back button, and avatar
│   │   ├── Hero.js                    # Hero banner with search input
│   │   └── MenuItemCard.js            # Food card with title, desc, price & image
│   ├── constants/
│   │   └── colors.js                  # Little Lemon color system
│   ├── context/
│   │   └── AuthContext.js             # Global state & authentication provider
│   ├── data/
│   │   └── menuItems.js               # Structured restaurant dishes and categories
│   ├── navigation/
│   │   └── RootNavigator.js           # Native stack navigator setup
│   ├── screens/
│   │   ├── HomeScreen.js              # 4-section home screen
│   │   ├── OnboardingScreen.js        # Onboarding greeting & form
│   │   └── ProfileScreen.js           # Profile view, edit, discard, and logout
│   └── storage/
│       └── storage.js                 # AsyncStorage helper functions
├── App.js                             # App root with SafeAreaProvider & AuthProvider
├── app.json                           # Expo app configuration
├── package.json                       # Project dependencies and scripts
├── wireframe.jpg                      # Visual UI/UX wireframe of all screens
├── wireframe.svg                      # Vector source wireframe
└── README.md                          # Project documentation
```

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (bundled with Node.js)
- [Expo Go](https://expo.dev/go) app installed on your physical mobile device (iOS or Android), or an iOS simulator / Android emulator.

### Step 1: Clone or Open the Workspace
Ensure your terminal is located in the project root directory:
```bash
cd "Coursera FSD"
```

### Step 2: Install Dependencies
Run the following command to install all project dependencies:
```bash
npm install
```

---

## Running the App

Start the Expo development server:
```bash
npx expo start
```
or
```bash
npm start
```

### Interactive Run Options:
- Press **`a`** to open in an Android Emulator / connected Android device.
- Press **`i`** to open in an iOS Simulator (macOS only).
- Press **`w`** to open in a web browser.
- Scan the displayed QR code using the **Expo Go** app on your physical iOS (Camera app) or Android device.

---

## How to Test the Core Flows (Coursera Rubric)

### Flow A: Fresh Launch & Onboarding
1. Start the app on a fresh device/session.
2. The **Onboarding** screen appears with Little Lemon branding.
3. Observe that the **Next** button is disabled by default.
4. Enter your First Name (e.g. `Alex`) and a valid email address (e.g. `alex@example.com`).
5. Notice the **Next** button becomes enabled (Little Lemon Yellow).
6. Tap **Next**. The app saves your data to `AsyncStorage` and navigates to the **Home** screen.

### Flow B: Search Functionality
1. On the **Home** screen, tap the search input inside the Hero section.
2. Type `"Pasta"`.
3. The menu list updates in real-time to show only *Little Lemon Pasta*.
4. Clear the search bar or tap the `✕` icon; all menu items return.

### Flow C: Category Filtering
1. Locate the **"ORDER FOR DELIVERY!"** section on the Home screen.
2. Tap the **Desserts** category pill.
3. Observe that only dessert items (*Lemon Dessert*) are displayed.
4. Tap **Starters** to view *Greek Salad* and *Bruschetta*.
5. Tap **All**; the full menu is restored.

### Flow D: Profile Editing & Persistence
1. Tap the user avatar in the top-right corner of the Home screen header.
2. The **Profile** screen opens with your details pre-populated from Onboarding.
3. Update the fields: enter a Last Name (e.g. `Taylor`), a Phone Number (e.g. `(555) 234-5678`), or toggle notification preferences.
4. Tap **Save changes**. A confirmation alert will appear.
5. Reload/restart the app (press `r` in the Expo terminal).
6. Tap the avatar to open Profile again: verify all saved changes persist.

### Flow E: Log Out
1. In the Profile screen, tap the yellow **Log out** button.
2. Confirm the logout prompt.
3. All local profile and onboarding data is wiped from `AsyncStorage`.
4. The app resets navigation and returns to the **Onboarding** screen with empty input fields.

### Flow F: Stack Navigation & Back Button
1. From the Home screen, tap the avatar to navigate to the Profile screen.
2. Tap the back arrow button (`‹`) in the top-left corner of the header.
3. Confirm that the app smoothly transitions back to the Home screen.

---

## Wireframe

The project includes an authentic, vector-grade wireframe diagram corresponding to all three core screens:
- **`wireframe.jpg`**: High-resolution image showing the device frames, header, hero, categories, menu items, and profile layout.
- **`wireframe.svg`**: Editable vector source file.

---

## Design Palette

| Element | Hex Code | Description |
|---|---|---|
| **Primary Green** | `#495E57` | Little Lemon dark teal/green |
| **Accent Yellow** | `#F4CE14` | Lemon yellow for buttons and accents |
| **Salmon / Peach** | `#EE9972` | Secondary accent |
| **Light Gray** | `#EDEFEE` | Card & button backgrounds |
| **Charcoal** | `#333333` | Primary text and headings |
| **White** | `#FFFFFF` | Canvas & cards |
