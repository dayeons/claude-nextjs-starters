"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { isActivePath, type NavItem } from "@/config/nav"

// 데스크톱 상단 메뉴 (md 이상에서만 표시)
export function MainNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              active={!item.external && isActivePath(pathname, item.href)}
              render={
                item.external ? (
                  <a href={item.href} target="_blank" rel="noreferrer" />
                ) : (
                  <Link href={item.href} />
                )
              }
            >
              {item.title}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
