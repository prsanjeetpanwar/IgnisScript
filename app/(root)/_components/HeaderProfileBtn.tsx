"use client";
import { UserButton } from '@clerk/nextjs';
import { User2 } from 'lucide-react';
import React, { useState } from 'react';

const HeaderProfileBtn = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <UserButton
        onClick={() => setMenuOpen(!menuOpen)}
        appearance={{
          elements: { userButtonAvatarBox: 'size-4' },
        }}
      />
      {menuOpen && (
        <div className="menu">
          <a href="/profile" className="menu-item">
            <User2 className="size-4" /> Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default HeaderProfileBtn;
