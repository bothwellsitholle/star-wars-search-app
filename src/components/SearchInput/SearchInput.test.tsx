import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { SearchInput } from './SearchInput';

const defaultProps = {
  value: '',
  onChange: vi.fn(),
  onKeyDown: vi.fn(),
  onClear: vi.fn(),
  onOpen: vi.fn(),
  isDropdownOpen: false,
  activeDescendantId: undefined,
  listboxId: 'test-listbox',
  inputRef: createRef<HTMLInputElement | null>(),
};

describe('SearchInput', () => {
  it('renders a combobox with the correct placeholder', () => {
    render(<SearchInput {...defaultProps} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\. Luke/i)).toBeInTheDocument();
  });

  it('calls onChange for each character typed', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchInput {...defaultProps} onChange={onChange} />);

    await user.type(screen.getByRole('combobox'), 'Lu');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, 'L');
    expect(onChange).toHaveBeenNthCalledWith(2, 'u');
  });

  it('shows a clear button only when there is a value', () => {
    const { rerender } = render(<SearchInput {...defaultProps} value="" />);
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();

    rerender(<SearchInput {...defaultProps} value="Luke" />);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('calls onClear when the clear button is clicked', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<SearchInput {...defaultProps} value="Luke" onClear={onClear} />);

    await user.click(screen.getByRole('button', { name: /clear/i }));

    expect(onClear).toHaveBeenCalledOnce();
  });

  it('sets aria-expanded correctly based on isDropdownOpen', () => {
    const { rerender } = render(<SearchInput {...defaultProps} isDropdownOpen={false} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');

    rerender(<SearchInput {...defaultProps} isDropdownOpen={true} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });
});
