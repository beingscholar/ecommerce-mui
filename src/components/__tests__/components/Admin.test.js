import React from 'react'
import {screen, render, cleanup, queryByTestId} from '@testing-library/react'

import Admin from '../../Admin';

 afterEach(cleanup)
 
 describe('Admin component', ()=>{

    it('should render Drawer',()=>{
      const drawer = screen.getByTestId("test-drawer")
    })
 })
 
 /* it('should take a snapshot', () => {
    const { asFragment } = render(<Admin />)
    
    expect(asFragment(<Admin />)).toMatchSnapshot()
   }) */