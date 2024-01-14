import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, id, ...props }, ref) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input ref={ref} id={id} name={id} required {...props} />
    </>
  );
});

export default Input;