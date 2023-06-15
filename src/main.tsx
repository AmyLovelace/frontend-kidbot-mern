import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import StoryForm from './components/StoryForm.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <div className="form d-flex justify-content-center align-items-center vh-100">
    <StoryForm />
  </div>
</React.StrictMode>,
)
