import { ref, watch } from "vue";

type Visibility = 'public' | 'private';

interface GeneralSettings {
    username: string;
    email: string;
    about: string;
    gender: string;
    country: string;
}

interface NotificationsSettings {
    email: boolean;
    sms: boolean;
}

interface PrivacySettings {
    visibility: Visibility;
    searchEngineIndexing: boolean;
}

interface SettingsMap {
    general: GeneralSettings;
    notifications: NotificationsSettings;
    privacy: PrivacySettings;
}

type SettingsKey = keyof SettingsMap;

const init = <T extends SettingsKey>(key: T, defaultSettings: SettingsMap[T]) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultSettings;
}

const watcher = <T extends SettingsKey>(key: T) => (value: SettingsMap[T]) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const general = ref<GeneralSettings>(
    init('general', {
        username: '',
        email: '',
        about: '',
        gender: 'male',
        country: 'USA'
    })
);
watch(general, watcher('general'), {deep: true});

const notifications = ref<NotificationsSettings>(
    init('notifications', {
        email: false,
        sms: false
    })
);
watch(notifications, watcher('notifications'), {deep: true})

const privacy = ref<PrivacySettings>(
    init('privacy', {
        visibility: 'public',
        searchEngineIndexing: false
    })
)
watch(privacy, watcher('privacy'), {deep: true});


export function useSettings() {
    return {
        general,
        notifications,
        privacy
    }
}