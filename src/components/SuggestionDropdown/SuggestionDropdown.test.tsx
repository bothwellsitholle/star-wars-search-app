import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Person } from '../../schemas/people.schema';
import { SuggestionDropdown } from './SuggestionDropdown';

const luke: Person = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: '',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
  url: 'https://swapi.dev/api/people/1/',
};

const defaultProps = {
  suggestions: [luke],
  isLoading: false,
  isError: false,
  activeIndex: -1,
  query: 'lu',
  listboxId: 'test-listbox',
  onSelect: vi.fn(),
  getOptionId: (i: number) => `option-${i}`,
};

describe('SuggestionDropdown', () => {
  it('renders a listbox with suggestions', () => {
    render(<SuggestionDropdown {...defaultProps} />);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText(/Skywalker/)).toBeInTheDocument();
  });

  it('shows skeleton rows while loading', () => {
    render(<SuggestionDropdown {...defaultProps} isLoading={true} suggestions={[]} />);
    expect(screen.getByLabelText(/loading suggestions/i)).toBeInTheDocument();
  });

  it('shows an error message when isError is true', () => {
    render(
      <SuggestionDropdown {...defaultProps} isError={true} isLoading={false} suggestions={[]} />,
    );
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });

  it('shows a no-results message for an empty result set', () => {
    render(<SuggestionDropdown {...defaultProps} suggestions={[]} isLoading={false} />);
    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  it('calls onSelect with the correct person when an option is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<SuggestionDropdown {...defaultProps} onSelect={onSelect} />);

    await user.click(screen.getByRole('option', { name: /luke skywalker/i }));

    expect(onSelect).toHaveBeenCalledWith(luke);
  });

  it('marks the active option as aria-selected', () => {
    render(<SuggestionDropdown {...defaultProps} activeIndex={0} />);
    const option = screen.getByRole('option', { name: /luke skywalker/i });
    expect(option).toHaveAttribute('aria-selected', 'true');
  });
});
