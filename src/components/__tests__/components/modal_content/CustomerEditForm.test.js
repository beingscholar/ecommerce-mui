import React from 'react'
import {render, cleanup} from '@testing-library/react'
import CustomerEditForm from '../../../modal_content/CustomerEditForm';

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<CustomerEditForm />)
    
    expect(asFragment(<CustomerEditForm />)).toMatchSnapshot()
   })