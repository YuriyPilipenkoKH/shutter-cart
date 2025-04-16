import { CSSProperties } from "react";

export const options= {
  success: {
    duration: 4000,
    style: {
      background: 'green',
      border: '2px solid orange',
      color: '#eee',
    },
  },
  error: {
    duration: 4000,  
    style: {
      background: 'crimson',
      border: '2px solid black',
      color: '#eee',
    },
  },
}

export const containerOptions: CSSProperties = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'fixed',
};