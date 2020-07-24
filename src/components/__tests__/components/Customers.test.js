import React from 'react'
import { render, cleanup, fireEvent, waitFor, screen, getAllByLabelText, getAllByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Customers from '../../Customers';

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<Customers />)
    
    expect(asFragment(<Customers />)).toMatchSnapshot()
   })

