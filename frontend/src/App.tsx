import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import EditPatient from './pages/EditPatient';
import NewPatient from './pages/NewPatient';
import PatientDetails from './pages/PatientDetails';
import Patients from './pages/Patients';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/patients" replace />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/new" element={<NewPatient />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/patients/:id/edit" element={<EditPatient />} />
      </Routes>
    </Layout>
  );
}
