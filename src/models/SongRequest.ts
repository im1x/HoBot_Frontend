export interface SongRequestVideo {
  id: string;
  channel_id: string;
  by: string;
  requested: string;
  yt_id: string;
  title: string;
  length: number;
  views: number;
  start: number;
  end: number;
}

export interface SongRequestState {
  playlist: SongRequestVideo[];
  currentVideo: string;
  isPlaying: boolean;
  volume: number;
  progress: number;
  status: string;
}

export interface PlaylistAndHistory {
  playlist: SongRequestVideo[];
  history: SongRequestVideo[];
}
