import React from 'react'
import {render, cleanup} from '@testing-library/react'
import DeleteConfirm from '../../../customers/CustomerDeleteConfirm';

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<DeleteConfirm />)
    
    expect(asFragment(<DeleteConfirm />)).toMatchSnapshot()
   })