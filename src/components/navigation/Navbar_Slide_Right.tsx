import { useState } from 'react'
import Link from 'next/link'
import ButtonMain from '../ButtonMain'
import {
  animated,
  useTransition,
  useSpring,
  useChain,
  config,
  useSpringRef,
} from '@react-spring/web'

const menuItems = [
  { name: 'About', link: '/about' },
  { name: 'Services', link: '/service' },
  { name: 'Projects', link: '/project' },
  { name: 'Blogs', link: '/post' },
]
const NavbarSlideRight = ({ showMenu }) => {
  const navRef = useSpringRef()
  const liRef = useSpringRef()

  const { height } = useSpring({
    config: config.default,
    from: { height: 0 },
    to: { height: showMenu ? 250 : 0 },
    ref: navRef,
  })

  const [transitions, transitionApi] = useTransition(
    showMenu ? menuItems : [],
    () => ({
      from: { opacity: 0, transform: 'translateY(20px)' },
      enter: { opacity: 1, transform: 'translateY(0)' },
      leave: { opacity: 0, transform: 'translateY(20px)' },
      trail: 400 / menuItems.length,
      ref: liRef,
    }),
  )

  // on showMenu, start with nav animation the nav items
  useChain(showMenu ? [navRef, liRef] : [liRef, navRef], [
    0,
    showMenu ? 0.4 : 0.6,
  ])

  return (
    <animated.nav
      style={{ height }}
      className="flex justify-center items-center"
    >
      <ul className="">
        {transitions((style, item) => (
          <animated.li style={style} className="my-3">
            <Link
              href={item.link}
              className="hover:text-purple-400 duration-300"
            >
              {item.name}
            </Link>
          </animated.li>
        ))}
      </ul>
    </animated.nav>
  )
}

export default NavbarSlideRight
