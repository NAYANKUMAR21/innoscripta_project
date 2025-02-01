import { Route, Routes } from 'react-router';
import { HomePage2 } from './Page/HomePage2';

// interface EnvConfig {
//   GUARDIAN_API_KEY: string;
//   NYT_API_KEY: string;
//   NEWS_API_KEY: string;
// }

export default function App() {
  // const [key1, Getkey1] = useState(getEnvVar('VITE_GUARDIAN_API_KEY'));
  // const [key2, Getkey2] = useState(getEnvVar('VITE_NYT_API_KEY'));
  // const [key3, Getkey3] = useState(getEnvVar('VITE_NEWS_API_KEY'));
  // console.log(import.meta.env[`VITE_GUARDIAN_API_KEY`]);

  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<HomePage2 />} />
      </Routes>
    </div>
  );
}
