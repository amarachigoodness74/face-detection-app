import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Signup from "./components/authentication/Signup";
import Signin from "./components/authentication/Signin";
import FaceDetector from "./components/FaceDetector";
import ProtectedRoute from "./ProtectedRoute";
import PublicFaceDetector from "./components/FaceDetector/PublicFaceDetector";
import NoMatch from "./NoMatch";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Navigation />
      <Routes>
        <Route index path="/" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="/face-detector"
          element={
            <ProtectedRoute>
              <FaceDetector />
            </ProtectedRoute>
          }
        />
        <Route path="/public-face-detector" element={<PublicFaceDetector />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
