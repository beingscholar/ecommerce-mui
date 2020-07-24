import React from 'react'
import {render, cleanup} from '@testing-library/react'
import Footer from '../../../layouts/Footer';

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<Footer />)
    
    expect(asFragment(<Footer />)).toMatchSnapshot()
   })