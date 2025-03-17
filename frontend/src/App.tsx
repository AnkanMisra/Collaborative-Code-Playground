import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Unauthorized from './components/auth/Unauthorized';
import LandingPage from "./components/landing/LandingPage.tsx";
import NotFound from './components/NotFound';
import Profile from './components/profile/Profile';
// import Editor from "./components/editor/Editor.tsx";
// socket io setup is yet to be done so this is commented out for now
function App() {
  const { isSignedIn } = useUser();

  return (
    <div className="w-full min-h-screen bg-[#0A0F1E]">
      <Routes>
        <Route path="/" element={<LandingPage connected={false} />} />
        <Route path="/sign-in" element={
          isSignedIn ? <Navigate to="/editor" replace /> : <SignIn />

        } />
        <Route path="/sign-up" element={
          isSignedIn ? <Navigate to="/editor" replace /> : <SignUp />
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/editor" element={
          isSignedIn ? (
            <></>
          ) : (
            <Navigate to="/unauthorized" state={{ from: '/editor' }} replace />
          )
        } />
        <Route path="/profile" element={
          isSignedIn ? (
            <Profile />
          ) : (
            <Navigate to="/unauthorized" state={{ from: '/profile' }} replace />
          )
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
