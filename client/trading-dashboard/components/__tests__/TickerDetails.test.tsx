import React from 'react';
import { render, screen } from '@testing-library/react';
import { TickerDetails } from '../TickerDetails';

const ticker = {
  symbol: 'XYZ',
  name: 'X Y Z Corp',
  price: 99.99,
  previousClose: 100,
  change: -0.01,
  changePercent: -0.01,
  volume: 12345,
  high24h: 120,
  low24h: 80,
  lastUpdate: new Date().toISOString(),
};

describe('TickerDetails', () => {
  it('renders name, symbol and formatted price', () => {
    render(<TickerDetails ticker={ticker} isDarkMode={false} />);
    expect(screen.getByText('X Y Z Corp')).toBeInTheDocument();
    expect(screen.getByText('XYZ')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText(/-0\.01%/)).toBeInTheDocument();
  });
});
