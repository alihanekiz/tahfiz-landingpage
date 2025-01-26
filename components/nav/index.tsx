'use client';
import Image from 'next/image';
import './index.scss';
import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="logo col-4 col-lg-2">
            <Link href={'/'}>
              <Image
                src="/branding/logo-full-horizontal.svg"
                width={100}
                height={50}
                alt="Tahfiz Logo"
                priority={true}
              />
            </Link>
          </div>
          <div className={`navigation col-9 ${isOpen ? 'show' : ''}`}>
            <nav>
              <ul className="list-unstyled d-flex p-0 m-0">
                <li onClick={closeMenu}>
                  <a href="#location">Konum</a>
                </li>
                <li onClick={closeMenu}>
                  <a href="#seat">Oturma düzeni</a>
                </li>
                <li onClick={closeMenu}>
                  <a href="#parking">Park imkanlari</a>
                </li>
                <li onClick={closeMenu}>
                  <a href="#program">Program</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="hamburger col-2">
            <div
              className={`burger ${isOpen ? 'open' : ''}`}
              onClick={toggleMenu}
            >
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}