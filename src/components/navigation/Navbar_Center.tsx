import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import logo from '../../icons/logo.png'

import NavbarSlideRight from './Navbar_Slide_Right'
import ButtonMain from '../ButtonMain'

export default function NavbarCenter() {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => setShowMenu(!showMenu)

  return (
    <header className="py-6 md:px-16 border-b border-zinc-800 md:mb-28 mb-20 px-6 z-30">
      {/* hidden on desktop */}
      <div className="flex w-full justify-between relative md:hidden">
        <Link href="/">
          <Image src={logo} width={25} height={25} alt="logo" />
        </Link>
        <ButtonMain
          text={'Toggle Menu'}
          onClick={toggleMenu}
          className="justify-self-end"
        />
      </div>
      <NavbarSlideRight showMenu={showMenu} />

      {/* hidden on mobile */}
      <nav className="max-w-6xl mx-auto hidden md:flex items-center justify-between">
        <Link href="/">
          <Image src={logo} width={25} height={25} alt="logo" />
        </Link>
        <ul className="flex items-center gap-x-8">
          <li>
            <Link href="/about" className="hover:text-purple-400 duration-300">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/service"
              className="hover:text-purple-400 duration-300"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/project"
              className="hover:text-purple-400 duration-300"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-purple-400 duration-300">
              Blog
            </Link>
          </li>
        </ul>
        <ButtonMain text={'Explore'} icon={null} />
      </nav>
    </header>
  )
}
