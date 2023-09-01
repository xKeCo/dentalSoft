// Local Components
'use client';
import { useState } from 'react';
import { Nav, Sidebar } from '../../components';

// Styles
import s from './Dashboard.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div className={s.flex}>
      <Sidebar open={open} hover={hover} />
      <div
        className={s.container}
        style={{
          width: !open ? 'calc(100% - 210px)' : '100%',
        }}
      >
        <Nav open={open} setOpen={setOpen} setHover={setHover} />

        {children}
      </div>
    </div>
  );
}
