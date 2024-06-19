
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FeaturesData from "../public/features_home.json";
import Home from "../src/pages/home/home";
import SignIn from "../src/pages/sign-in/sign-in";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home featuresData={FeaturesData} />} />
                <Route path="/sign-in" element={<SignIn />} />
                {/* Ajouter d'autres routes ici si nécessaire */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
