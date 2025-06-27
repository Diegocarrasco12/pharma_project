// src/pages/ContactPage.jsx
import React from 'react';
import ContactForm from '../components/ContactForm';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  return (
    <main className={styles.contactWrapper}>
      <ContactForm />
    </main>
  );
};

export default ContactPage;
