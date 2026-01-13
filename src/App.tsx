import './App.css'
import { Routes, Route, Outlet } from "react-router";
import IndexPage from "@/pages/index-page.tsx";
import SingInPage from "@/pages/sign-in-page.tsx";
import SingUpPage from "@/pages/sign-up-page.tsx";

function AuthLayout() {
  return (
    <div>
      <header>Auth</header>
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<IndexPage />}></Route>

      <Route element={<AuthLayout />}>
        <Route path={"/sign-in"} element={<SingInPage />}></Route>
        <Route path={"/sign-up"} element={<SingUpPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App
