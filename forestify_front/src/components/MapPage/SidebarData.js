import React from 'react'
import * as reactIcons from "react-icons/gr";
import * as reactIconsLu from "react-icons/lu";
import * as reactIconsFa from "react-icons/fa6";


export const SidebarData = [
    {
        title: 'Location',
        path: '/',
        icon: <reactIconsLu.LuSearch/>,
        cName: 'nav-text'
    },
    {
        title: 'Coordinates',
        path: '/',
        icon: <reactIconsFa.FaLocationCrosshairs/>,
        cName: 'nav-text'
    },
    {
        title: 'Intensity',
        path: '/',
        icon: <reactIconsFa.FaSliders/>,
        cName: 'nav-text'
    }
    ];