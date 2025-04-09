// pages/index.js hoặc app/page.js
'use client';

import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.homeContainer}>
        <h1 className={styles.title}>Trang chủ</h1>    
        <div className={styles.buttonGroup}>
          <Link href="/login" className={styles.button}>
            Đăng nhập
          </Link>
        </div>
      </div>
    </main>
  );
}
