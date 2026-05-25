import { useNavigate } from 'react-router-dom';
import PatientForm from '../components/PatientForm';
import { patientsApi } from '../services/api';
import { PatientPayload } from '../types';

export default function NewPatient() {
  const navigate = useNavigate();

  async function createPatient(data: PatientPayload) {
    const response = await patientsApi.create(data);
    navigate(`/patients/${response.data.id}`);
  }

  return (
    <section className="page-stack narrow">
      <div className="page-header">
        <div>
          <p className="eyebrow">Novo cadastro</p>
          <h1>Cadastrar paciente</h1>
        </div>
      </div>

      <PatientForm submitLabel="Cadastrar paciente" onSubmit={createPatient} />
    </section>
  );
}
