import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from '../pages/Home/Home';
import Tweets from '../pages/Tweets/Tweets';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tweets" element={<Tweets />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
