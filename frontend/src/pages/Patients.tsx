import { Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { patientsApi } from '../services/api';
import { Patient } from '../types';
import { formatDate } from '../utils/date';

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadPatients(searchTerm = search) {
    setLoading(true);
    const response = await patientsApi.list(searchTerm);
    setPatients(response.data);
    setLoading(false);
  }

  async function removePatient(patient: Patient) {
    const confirmed = window.confirm(`Remover ${patient.name}?`);

    if (!confirmed) {
      return;
    }

    await patientsApi.remove(patient.id);
    await loadPatients();
  }

  useEffect(() => {
    loadPatients('');
  }, []);

  return (
    <section className="page-stack">
      <div className="page-header">
        <div>
          <p className="eyebrow">Gestao de pacientes</p>
          <h1>Pacientes cadastrados</h1>
        </div>
        <Link to="/patients/new" className="button primary">
          Novo paciente
        </Link>
      </div>

      <form
        className="search-bar"
        onSubmit={(event) => {
          event.preventDefault();
          loadPatients(search);
        }}
      >
        <Search size={18} aria-hidden />
        <input
          placeholder="Buscar paciente pelo nome"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button className="button" type="submit">
          Buscar
        </button>
      </form>

      {loading ? (
        <p className="empty-state">Carregando pacientes...</p>
      ) : patients.length === 0 ? (
        <p className="empty-state">Nenhum paciente encontrado.</p>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Nome e sobrenome</th>
                <th>Nascimento</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <Link to={`/patients/${patient.id}`} className="table-link">
                      {patient.name}
                    </Link>
                  </td>
                  <td>{formatDate(patient.birthDate)}</td>
                  <td>{patient.phone || '-'}</td>
                  <td>{patient.email || '-'}</td>
                  <td className="row-actions">
                    <Link to={`/patients/${patient.id}/edit`} className="button small">
                      Editar
                    </Link>
                    <button className="icon-button danger" type="button" onClick={() => removePatient(patient)}>
                      <Trash2 size={16} aria-label="Remover paciente" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
