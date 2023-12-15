'use client';
import { Flip, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
  return <ToastContainer transition={Flip} autoClose={2000} />;
}
