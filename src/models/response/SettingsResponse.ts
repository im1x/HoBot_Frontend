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
}
