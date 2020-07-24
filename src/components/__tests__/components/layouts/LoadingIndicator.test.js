import React from 'react'
import {render, cleanup} from '@testing-library/react'
import LoadingIndicator from '../../../layouts/LoadingIndicator';

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<LoadingIndicator />)
    
    expect(asFragment(<LoadingIndicator />)).toMatchSnapshot()
   })