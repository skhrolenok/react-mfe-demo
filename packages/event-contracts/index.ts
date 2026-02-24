import type { User } from '@siemens-energy/types';

export interface AuthChangedEvent {
  type: 'auth:changed';
  payload: {
    user: User | null;
    isAuthenticated: boolean;
  };
}

export interface ThemeUpdatedEvent {
  type: 'theme:updated';
  payload: {
    theme: 'light' | 'dark';
  };
}

export interface NavigationEvent {
  type: 'navigation:request';
  payload: {
    path: string;
  };
}

export type PortalEvent = AuthChangedEvent | ThemeUpdatedEvent | NavigationEvent;

export function dispatchEvent<T extends PortalEvent>(event: T) {
  window.dispatchEvent(
    new CustomEvent(event.type, {
      detail: event.payload,
    })
  );
}

export function listenEvent<T extends PortalEvent['type']>(
  eventType: T,
  handler: (payload: Extract<PortalEvent, { type: T }>['payload']) => void
) {
  const listener = (e: Event) => {
    const customEvent = e as CustomEvent;
    handler(customEvent.detail);
  };
  window.addEventListener(eventType, listener);
  return () => window.removeEventListener(eventType, listener);
}
