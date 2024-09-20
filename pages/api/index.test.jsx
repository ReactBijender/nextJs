// MyComponent.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import MyComponent from './index';

global.fetch = jest.fn();

describe('MyComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
    render(<MyComponent />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders fetched data', async () => {
    const mockData = [
      { id: 1, title: 'Todo 1' },
      { id: 2, title: 'Todo 23' },
    ];
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockData) }));

    render(<MyComponent />);

    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });
  });

  it('handles fetch errors', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch error')));

    render(<MyComponent />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
