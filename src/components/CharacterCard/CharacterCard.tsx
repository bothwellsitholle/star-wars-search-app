import type { Person } from '../../schemas/people.schema';

interface CharacterCardProps {
  person: Person;
}

const DISPLAY_FIELDS: { label: string; key: keyof Person }[] = [
  { label: 'Height', key: 'height' },
  { label: 'Mass', key: 'mass' },
  { label: 'Hair colour', key: 'hair_color' },
  { label: 'Skin colour', key: 'skin_color' },
  { label: 'Eye colour', key: 'eye_color' },
  { label: 'Birth year', key: 'birth_year' },
  { label: 'Gender', key: 'gender' },
];

export const CharacterCard = ({ person }: CharacterCardProps) => (
  <article
    aria-label={`Character details for ${person.name}`}
    className="w-full overflow-hidden rounded-2xl border border-theme bg-theme-card shadow-theme animate-fade-in"
  >
    <div className="border-b border-theme bg-[var(--theme-bg-elevated)] px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 ring-1 ring-brand-accent/25">
          <span className="font-sora text-sm font-bold text-brand-accent" aria-hidden="true">
            {person.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="font-sora text-base font-semibold text-theme-primary leading-tight">
            {person.name}
          </h2>
          <p className="text-xs text-theme-muted">Star Wars character</p>
        </div>
      </div>
    </div>

    <dl className="divide-y divide-[var(--theme-border)]">
      {DISPLAY_FIELDS.map(({ label, key }) => {
        const raw = person[key];
        const value = Array.isArray(raw) ? raw.join(', ') : String(raw);
        const isUnknown = value === 'unknown' || value === 'n/a';

        return (
          <div
            key={key}
            className="grid grid-cols-2 items-center gap-4 px-6 py-3 transition-colors hover-theme"
          >
            <dt className="text-[11px] font-semibold uppercase tracking-widest text-theme-muted">
              {label}
            </dt>
            <dd
              className={`text-sm capitalize ${isUnknown ? 'italic text-theme-muted opacity-60' : 'text-theme-primary'}`}
            >
              {value}
            </dd>
          </div>
        );
      })}
    </dl>
  </article>
);
