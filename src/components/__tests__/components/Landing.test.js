import React from 'react'
import { render, cleanup, fireEvent, waitFor, screen, getAllByLabelText, getAllByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Landing from '../../Landing';

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<Landing />)
    
    expect(asFragment(<Landing />)).toMatchSnapshot()
   })

