import React from 'react'
import {render, cleanup} from '@testing-library/react'
import CustomerForm from '../../../modal_content/CustomerForm';

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<CustomerForm />)
    
    expect(asFragment(<CustomerForm />)).toMatchSnapshot()
   })