import { Routes, Route } from "react-router-dom";

import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages/Home";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

import { Toaster } from "@/components/ui/toaster";
import AllUsers from "./_root/pages/AllUsers";
import Explore from "./_root/pages/Explore";
import CreateProject from "./_root/pages/CreateProject";
import ProjectDetails from "./_root/pages/ProjectDetails";
import CreateExperience from "./_root/pages/CreateExperience";
import ExperienceDetails from "./_root/pages/ExperienceDetails";
import CreateSkill from "./_root/pages/CreateSkill";
import SkillDetails from "./_root/pages/SkillDetails";
import Profile from "./_root/pages/Profile";
import UpdateProfile from "./_root/pages/UpdateProfile";
import EditProject from "./_root/pages/EditProject";
import EditExperience from "./_root/pages/EditExperience";
import EditSkill from "./_root/pages/EditSkill";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          {/* NOTE: The Home route could be place here?? */}
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          {/* NOTE: The Home route could be place here?? */}
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/update-project/:id" element={<EditProject />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/create-experience" element={<CreateExperience />} />
          <Route path="/update-experience/:id" element={<EditExperience />} />
          <Route path="/experiences/:id" element={<ExperienceDetails />} />
          <Route path="/create-skill" element={<CreateSkill />} />
          <Route path="/update-Skill/:id" element={<EditSkill />} />
          <Route path="/skills/:id" element={<SkillDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
