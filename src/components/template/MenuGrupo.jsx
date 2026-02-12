import React from 'react'
import {ChevronLeftIcon, ChevronRight, ChevronRightIcon} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu.jsx";

export default function MenuGrupo({ label, children, className = '' }) {
    return (
        <div
          className={`
          flex flex-col gap-2 mb-2
          border-b border-zinc-700 pb-4
          ${ className }
        `}>
          <NavigationMenu>
            <NavigationMenuList className="flex-wrap">
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="
                  px-4 py-2 items-center hover:bg-zinc-800
                  rounded-full w-32 h-10 border-b-1 border-transparent
                  hover:border-red-500 text-center
                  ">
                  {label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <span>
                    {children}
                  </span>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/*<span className="flex items-center text-zinc-300 font-semibold">*/}
          {/*  {label}*/}
          {/*  <ChevronRightIcon size={18} />*/}
          {/*</span>*/}
          {/*<span>*/}
          {/*  {children}*/}
          {/*</span>*/}
        </div>
    )
}

