// app/signin/page.js
"use client";

import { useState } from 'react';
import supabase from '../../lib/supabase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      // นำทางไปยังหน้าแดชบอร์ดหรือหน้าอื่น ๆ ตามต้องการ
    }
  };

  return (
    <div>
      <h1>เข้าสู่ระบบ</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}
