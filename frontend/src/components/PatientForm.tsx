import { FormEvent, useState } from 'react';
import { Patient, PatientPayload } from '../types';
import { toDateInputValue } from '../utils/date';

type PatientFormProps = {
  initialData?: Patient;
  submitLabel: string;
  onSubmit: (data: PatientPayload) => Promise<void>;
};

const emptyForm: PatientPayload = {
  name: '',
  birthDate: '',
  phone: '',
  email: '',
  cpf: '',
  address: '',
  profession: '',
  origin: '',
};

export default function PatientForm({ initialData, submitLabel, onSubmit }: PatientFormProps) {
  const [form, setForm] = useState<PatientPayload>(() =>
    initialData
      ? {
          name: initialData.name,
          birthDate: toDateInputValue(initialData.birthDate),
          phone: initialData.phone ?? '',
          email: initialData.email ?? '',
          cpf: initialData.cpf ?? '',
          address: initialData.address ?? '',
          profession: initialData.profession ?? '',
          origin: initialData.origin ?? '',
        }
      : emptyForm,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof PatientPayload, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    await onSubmit(form);
    setIsSubmitting(false);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label>
        Nome e sobrenome *
        <input value={form.name} onChange={(event) => updateField('name', event.target.value)} required />
      </label>

      <label>
        Data de nascimento *
        <input
          type="date"
          value={form.birthDate}
          onChange={(event) => updateField('birthDate', event.target.value)}
          required
        />
      </label>

      <label>
        Telefone
        <input value={form.phone ?? ''} onChange={(event) => updateField('phone', event.target.value)} />
      </label>

      <label>
        E-mail
        <input type="email" value={form.email ?? ''} onChange={(event) => updateField('email', event.target.value)} />
      </label>

      <label>
        CPF
        <input value={form.cpf ?? ''} onChange={(event) => updateField('cpf', event.target.value)} />
      </label>

      <label>
        Profissao
        <input value={form.profession ?? ''} onChange={(event) => updateField('profession', event.target.value)} />
      </label>

      <label className="span-2">
        Endereco
        <input value={form.address ?? ''} onChange={(event) => updateField('address', event.target.value)} />
      </label>

      <label className="span-2">
        Origem do paciente
        <input value={form.origin ?? ''} onChange={(event) => updateField('origin', event.target.value)} />
      </label>

      <div className="form-actions span-2">
        <button className="button primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
