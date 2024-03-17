import React from 'react'
import * as reactIcons from "react-icons/gr";
import * as reactIconsLu from "react-icons/lu";



export const SidebarData = [
    {
        title: 'Location',
        path: '/',
        icon: <reactIconsLu.LuSearch/>,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/Login',
        icon: <reactIcons.GrLogin/>,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/Profile',
        icon: <reactIcons.GrUserSettings/>,
        cName: 'nav-text'
    }
    ];