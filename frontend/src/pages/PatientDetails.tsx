import { CalendarPlus, ClipboardPlus, Pencil } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { eventsApi, evolutionsApi, patientsApi } from '../services/api';
import { EventPayload, EvolutionPayload, Patient } from '../types';
import { formatDate } from '../utils/date';

const emptyEvent: EventPayload = {
  title: '',
  date: '',
  startTime: '',
  endTime: '',
};

const emptyEvolution: EvolutionPayload = {
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  description: '',
};

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [eventForm, setEventForm] = useState<EventPayload>(emptyEvent);
  const [evolutionForm, setEvolutionForm] = useState<EvolutionPayload>(emptyEvolution);

  async function loadPatient() {
    if (!id) {
      return;
    }

    const response = await patientsApi.get(id);
    setPatient(response.data);
  }

  async function createEvent(event: FormEvent) {
    event.preventDefault();

    if (!id) {
      return;
    }

    await eventsApi.create(id, eventForm);
    setEventForm(emptyEvent);
    await loadPatient();
  }

  async function createEvolution(event: FormEvent) {
    event.preventDefault();

    if (!id) {
      return;
    }

    await evolutionsApi.create(id, evolutionForm);
    setEvolutionForm(emptyEvolution);
    await loadPatient();
  }

  useEffect(() => {
    loadPatient();
  }, [id]);

  if (!patient) {
    return <p className="empty-state">Carregando detalhes...</p>;
  }

  return (
    <section className="page-stack">
      <div className="page-header">
        <div>
          <p className="eyebrow">Detalhes do paciente</p>
          <h1>{patient.name}</h1>
        </div>
        <Link to={`/patients/${patient.id}/edit`} className="button primary">
          <Pencil size={16} aria-hidden />
          Editar
        </Link>
      </div>

      <div className="details-grid">
        <Info label="Nascimento" value={formatDate(patient.birthDate)} />
        <Info label="Telefone" value={patient.phone} />
        <Info label="E-mail" value={patient.email} />
        <Info label="CPF" value={patient.cpf} />
        <Info label="Endereco" value={patient.address} />
        <Info label="Profissao" value={patient.profession} />
        <Info label="Origem" value={patient.origin} />
      </div>

      <div className="two-column">
        <section className="panel">
          <div className="section-title">
            <CalendarPlus size={20} aria-hidden />
            <h2>Eventos e consultas</h2>
          </div>

          <form className="compact-form" onSubmit={createEvent}>
            <input
              placeholder="Titulo"
              value={eventForm.title}
              onChange={(event) => setEventForm((current) => ({ ...current, title: event.target.value }))}
              required
            />
            <input
              type="date"
              value={eventForm.date}
              onChange={(event) => setEventForm((current) => ({ ...current, date: event.target.value }))}
              required
            />
            <input
              type="time"
              value={eventForm.startTime}
              onChange={(event) => setEventForm((current) => ({ ...current, startTime: event.target.value }))}
              required
            />
            <input
              type="time"
              value={eventForm.endTime}
              onChange={(event) => setEventForm((current) => ({ ...current, endTime: event.target.value }))}
              required
            />
            <button className="button primary" type="submit">
              Criar evento
            </button>
          </form>

          <div className="timeline">
            {patient.events?.length ? (
              patient.events.map((item) => (
                <article key={item.id} className="timeline-item">
                  <strong>{item.title}</strong>
                  <span>
                    {formatDate(item.date)} das {item.startTime} as {item.endTime}
                  </span>
                </article>
              ))
            ) : (
              <p className="empty-state compact">Nenhum evento criado.</p>
            )}
          </div>
        </section>

        <section className="panel">
          <div className="section-title">
            <ClipboardPlus size={20} aria-hidden />
            <h2>Evolucoes</h2>
          </div>

          <form className="compact-form" onSubmit={createEvolution}>
            <input
              placeholder="Titulo"
              value={evolutionForm.title}
              onChange={(event) => setEvolutionForm((current) => ({ ...current, title: event.target.value }))}
              required
            />
            <input
              type="date"
              value={evolutionForm.date}
              onChange={(event) => setEvolutionForm((current) => ({ ...current, date: event.target.value }))}
              required
            />
            <input
              type="time"
              value={evolutionForm.startTime}
              onChange={(event) => setEvolutionForm((current) => ({ ...current, startTime: event.target.value }))}
              required
            />
            <input
              type="time"
              value={evolutionForm.endTime}
              onChange={(event) => setEvolutionForm((current) => ({ ...current, endTime: event.target.value }))}
              required
            />
            <textarea
              placeholder="Descricao da evolucao"
              value={evolutionForm.description}
              onChange={(event) => setEvolutionForm((current) => ({ ...current, description: event.target.value }))}
              required
            />
            <button className="button primary" type="submit">
              Registrar evolucao
            </button>
          </form>

          <div className="timeline">
            {patient.evolutions?.length ? (
              patient.evolutions.map((item) => (
                <article key={item.id} className="timeline-item">
                  <strong>{item.title}</strong>
                  <span>
                    {formatDate(item.date)} das {item.startTime} as {item.endTime}
                  </span>
                  <p>{item.description}</p>
                </article>
              ))
            ) : (
              <p className="empty-state compact">Nenhuma evolucao registrada.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="info-item">
      <span>{label}</span>
      <strong>{value || '-'}</strong>
    </div>
  );
}
