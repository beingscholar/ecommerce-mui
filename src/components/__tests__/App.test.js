import React from 'react'
import {render, cleanup} from '@testing-library/react';
import App from '../../App';
import Landing from '../../components/Landing';


 afterEach(cleanup)

 describe('app renders', ()=>{
   it('should show landing', () => {
      const { asFragment } = render(<Landing />)
      
      expect(asFragment(<App />)).toMatchSnapshot()
     })
 })
 
 /* it('should take a snapshot', () => {
    const { asFragment } = render(<App />)
    
    expect(asFragment(<App />)).toMatchSnapshot()
   }) */