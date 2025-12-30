import React from 'react'
import {Dock ,Navbar , Welcome} from '#components'
import { Terminal } from '#windows';

import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);


const App = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
    </main>
  )
}

export default App

// Done till 1:49:02 in windowWrapper creating a new useGSAP function 