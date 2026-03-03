import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Person } from '../../schemas/people.schema';
import { CharacterCard } from './CharacterCard';

const mockPerson: Person = {
  name: 'Jango Fett',
  height: '183',
  mass: '79',
  hair_color: 'black',
  skin_color: 'tan',
  eye_color: 'brown',
  birth_year: '66BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-20T09:52:38.517000Z',
  edited: '2014-12-20T21:17:50.305000Z',
  url: 'https://swapi.dev/api/people/79/',
};

describe('CharacterCard', () => {
  it('renders the character name in the header', () => {
    render(<CharacterCard person={mockPerson} />);
    expect(screen.getByText('Jango Fett')).toBeInTheDocument();
  });

  it('renders all required data fields', () => {
    render(<CharacterCard person={mockPerson} />);

    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('183')).toBeInTheDocument();

    expect(screen.getByText('Mass')).toBeInTheDocument();
    expect(screen.getByText('79')).toBeInTheDocument();

    expect(screen.getByText('Hair colour')).toBeInTheDocument();
    expect(screen.getByText('black')).toBeInTheDocument();

    expect(screen.getByText('Birth year')).toBeInTheDocument();
    expect(screen.getByText('66BBY')).toBeInTheDocument();
  });

  it('renders the article with an accessible label', () => {
    render(<CharacterCard person={mockPerson} />);
    expect(
      screen.getByRole('article', { name: /character details for jango fett/i }),
    ).toBeInTheDocument();
  });
});
