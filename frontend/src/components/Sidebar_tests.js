import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
  it('should correctly handle props', () => {
    const testProps = {
      drawerIsOpen: true,
      sidebarList: [{ slug: '/home', title: 'Home', icon: 'homeIcon' }],
      onClick: jest.fn(),
    };

    const { getByText } = render(<Sidebar {...testProps} />);
    expect(getByText('Home')).toBeInTheDocument();
    // Add additional assertions here for other props if necessary
  });
});
