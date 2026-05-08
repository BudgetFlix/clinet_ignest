import "./pages/MovieForm";
import UploadForm from "./pages/MovieForm";
import Layout from "./layout/layout";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<UploadForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
