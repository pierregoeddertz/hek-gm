"use client";

import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';

function getTimeString() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <span>© {new Date().getFullYear()} HEK GM</span>
      </div>
    </footer>
  );
} 