import { Route, Routes } from 'react-router';
import { HomePage2 } from './Page/HomePage2';

export default function App() {
  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<HomePage2 />} />
      </Routes>
    </div>
  );
}
