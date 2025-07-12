Team Name - Decepticons
Problem statement 1 - Skill Swap Platform
# SkillLink - Peer-to-Peer Skill Exchange Platform

A modern, responsive web application built with Next.js and Tailwind CSS (frontend) and NestJS with MongoDB (backend) that enables users to exchange skills with each other in a peer-to-peer learning environment.

## 🚀 Features

### Core Functionality
- **User Profiles**: Create and manage detailed profiles with skills offered and wanted
- **Skill Browsing**: Search and filter users by skills, availability, and match percentage
- **Swap Requests**: Send, accept, reject, and manage skill exchange requests
- **Rating System**: Rate and review completed skill exchanges
- **Match Algorithm**: Intelligent matching based on complementary skills
- **Admin Panel**: Comprehensive admin dashboard for user and swap management

### UI/UX Features
- **Responsive Design**: Fully responsive across all device sizes
- **Dark Mode**: Complete dark/light theme support with smooth transitions
- **Interactive Components**: Hover effects, animations, and smooth transitions
- **Loading States**: Skeleton loading and progress indicators
- **Toast Notifications**: Real-time feedback for user actions
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router) in `client/`
- **Styling**: Tailwind CSS with custom components
- **Language**: TypeScript (frontend & backend)
- **Backend**: NestJS (Node.js) in `server/`
- **Database**: MongoDB
- **HTTP Client**: Axios for API communication
- **Notifications**: React Hot Toast
- **Icons**: Heroicons (SVG icons)
- **Animations**: CSS transitions and custom keyframes

## 📁 Project Structure

```
skill-link/
├── client/                  # Next.js 15 frontend
│   ├── src/
│   │   ├── app/             # App Router pages (admin, browse, profile, swaps, etc.)
│   │   ├── components/      # Reusable React components
│   │   ├── utils/           # Utilities and API service
│   │   └── styles/          # Global and component CSS
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── tailwind.config.ts   # Tailwind configuration
├── server/                  # NestJS backend
│   ├── src/                 # Backend source code (controllers, modules, services)
│   ├── test/                # Backend tests
│   ├── package.json         # Backend dependencies
│   └── nest-cli.json        # NestJS config
├── README.md
└── ... (other root files)
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue to Purple gradient (`from-blue-500 to-purple-600`)
- **Secondary**: Indigo to Blue gradient (`from-indigo-500 to-blue-600`)
- **Success**: Green (`green-500`)
- **Warning**: Yellow (`yellow-500`)
- **Error**: Red (`red-500`)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Font weights 600-800
- **Body**: Font weight 400-500

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, hover animations
- **Forms**: Consistent styling, focus states
- **Badges**: Color-coded status indicators

## 🔧 API Integration

The application is designed to work with a REST API. All API functions are centralized in `client/src/utils/api.ts`:

### User Management
- `GET /api/users` - Get all users
- `GET /api/users/me` - Get current user
- `POST /api/users` - Create user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user

### Swap Management
- `GET /api/swaps` - Get user's swap requests
- `POST /api/swaps` - Create swap request
- `PUT /api/swaps/:id` - Update swap status
- `DELETE /api/swaps/:id` - Delete swap request

### Admin Functions
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/swaps` - Get all swaps (admin)
- `GET /api/admin/stats` - Get platform statistics
- `POST /api/admin/users/:id/ban` - Ban user

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skill-link
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```

3. **Set up environment variables**
   - For the frontend: `client/.env.local`
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3001/api
     ```
   - For the backend: `server/.env`
     ```env
     MONGODB_URI=mongodb://localhost:27017/skilllink
     JWT_SECRET=your_jwt_secret
     PORT=3001
     ```

4. **Run the backend (NestJS API)**
   ```bash
   cd server
   npm run start:dev
   ```

5. **Run the frontend (Next.js app)**
   ```bash
   cd client
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Scripts

**Frontend (client):**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

**Backend (server):**
```bash
npm run start:dev    # Start NestJS in development mode
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run backend tests
```

## 📱 Pages Overview (Frontend)

### Landing Page (`/`)
- Hero section with call-to-action buttons
- Feature highlights
- Platform statistics
- Popular skills showcase

### Profile Page (`/profile`)
- User profile creation and editing
- Skills management (offered/wanted)
- Availability settings
- Privacy controls

### Browse Page (`/browse`)
- User search and filtering
- Skill-based matching
- Match percentage display
- Swap request initiation

### Swaps Page (`/swaps`)
- Tabbed interface (Pending, Active, Completed)
- Swap request management
- Rating and feedback system
- Status tracking

### Admin Panel (`/admin`)
- User management
- Swap oversight
- Platform statistics
- Administrative actions

## 🎯 Key Features Detail

### Match Algorithm
The platform calculates compatibility between users based on:
- Skills offered by User A that User B wants to learn
- Skills offered by User B that User A wants to learn
- Weighted scoring system for better matches

### Rating System
- 5-star rating system
- Optional feedback comments
- Average rating display on profiles
- Rating history tracking

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Flexible grid layouts
- Touch-friendly interactions

## 🔒 Security Considerations

- Input validation on all forms
- XSS protection through React's built-in sanitization
- CSRF protection (to be implemented with backend)
- Rate limiting for API requests
- Secure authentication flow (JWT tokens)

## 🌟 Future Enhancements

- Real-time messaging between users
- Video call integration for skill sessions
- Skill verification system
- Community forums and groups
- Mobile app development
- Advanced analytics dashboard
- Multi-language support
- Payment integration for premium features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Heroicons for the beautiful icon set
- React Hot Toast for notifications
- All contributors and beta testers

---

**Built with ❤️ by the SkillLink team**
