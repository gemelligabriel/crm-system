import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PatientForm from '../components/PatientForm';
import { patientsApi } from '../services/api';
import { Patient, PatientPayload } from '../types';

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    patientsApi.get(id).then((response) => setPatient(response.data));
  }, [id]);

  async function updatePatient(data: PatientPayload) {
    if (!id) {
      return;
    }

    await patientsApi.update(id, data);
    navigate(`/patients/${id}`);
  }

  if (!patient) {
    return <p className="empty-state">Carregando paciente...</p>;
  }

  return (
    <section className="page-stack narrow">
      <div className="page-header">
        <div>
          <p className="eyebrow">Editar cadastro</p>
          <h1>{patient.name}</h1>
        </div>
        <Link to={`/patients/${patient.id}`} className="button">
          Voltar
        </Link>
      </div>

      <PatientForm initialData={patient} submitLabel="Salvar alteracoes" onSubmit={updatePatient} />
    </section>
  );
}
