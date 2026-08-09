export type StateKind =
  | 'default'
  | 'hover'
  | 'focus'
  | 'pressed'
  | 'active'
  | 'selected'
  | 'disabled'
  | 'loading'
  | 'empty'
  | 'partial'
  | 'error'
  | 'success'
  | 'offline'
  | 'unsupported'
  | 'playing'
  | 'paused'
  | 'queued';

export type EmptyStateCategory = 'first-use' | 'no-results' | 'no-items' | 'no-history' | 'no-playlists' | 'no-queue';

export type ErrorStateKind = 'generic' | 'network' | 'server' | 'permission' | 'not-found' | 'action-failed' | 'offline';