import type { Component } from "vue";

export type TabType = 'General' | 'Notifications' | 'Privacy';

export interface Tab {
    key: TabType;
    label: string;
    component: Component;
}