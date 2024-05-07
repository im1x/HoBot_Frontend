export interface SettingsCommandsList {
  group: string;
  items: Item[];
}
interface Item {
  value: string;
  label: string;
}

export interface SettingsCommand {
  command: string | null;
  alias: string;
  description?: string;
  access_level: number | string | null;
  payload?: string;
}

export interface SettingsSongRequest {
  min_video_views: number;
  max_requests_per_user: number;
  max_duration_minutes: number;
}
