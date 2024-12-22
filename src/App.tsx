import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useUserContext } from "./state/UserContext";
import Signup from "./components/authentication/Signup";
import Signin from "./components/authentication/Signin";
import FaceDetector from "./components/FaceDetector";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { userData } = useUserContext();
  // const calculateFaceLocation = (data) => {
  //   const clarifaiFace =
  //     data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById("inputimage");
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   return {
  //     leftCol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - clarifaiFace.right_col * width,
  //     bottomRow: height - clarifaiFace.bottom_row * height,
  //   };
  // };

  // const displayFaceBox = (box) => {
  //   setUserData({
  //     ...userData,
  //     box: box,
  //   });
  // };

  // const onInputChange = (event) => {
  //   setUserData({
  //     ...userData,
  //     input: event.target.value,
  //   });
  // };

  // const onButtonSubmit = () => {
  //   setUserData({
  //     ...userData,
  //     imageUrl: userData.input,
  //   });
  //   // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
  //   // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
  //   // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
  //   // If that isn't working, then that means you will have to wait until their servers are back up.

  //   // app.models.predict('face-detection', this.state.input)
  //   //   .then(response => {
  //   //     console.log('hi', response)
  //   //     if (response) {
  //   //       fetch('http://localhost:3000/image', {
  //   //         method: 'put',
  //   //         headers: {'Content-Type': 'application/json'},
  //   //         body: JSON.stringify({
  //   //           id: this.state.user.id
  //   //         })
  //   //       })
  //   //         .then(response => response.json())
  //   //         .then(count => {
  //   //           this.setState(Object.assign(this.state.user, { entries: count}))
  //   //         })

  //   //     }
  //   //     this.displayFaceBox(this.calculateFaceLocation(response))
  //   //   })
  //   //   .catch(err => console.log(err));
  // };

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
      </Routes>
      {/* <Route path="*" element={<NoMatch />} /> */}
    </React.Fragment>
  );
}

export default App;
