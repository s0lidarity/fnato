import { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';

export interface MenuConfigItem {
    name: string;
    labelMsg?: MessageDescriptor;
    url: string;
    img: string;
}

export const MenuConfig: MenuConfigItem[] = [
    {
        name: 'Home',
        labelMsg: msg({
            message: 'Home'
        }),
        url: '/',
        img: '🏠',
    },
    {
        name: 'About',
        labelMsg: msg({
            message: 'About'
        }),
        url: '/about',
        img: '📖',
    },
    {
        name: 'The Crucible',
        labelMsg: msg({
            message: 'The Crucible'
        }),
        url: '/crucible',
        img: '🫠',
    },
    {
        name: 'Summary',
        labelMsg: msg({
            message: 'Summary'
        }),
        url: '/summary',
        img: '📊',
    },
]; 