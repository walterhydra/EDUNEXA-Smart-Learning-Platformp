import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export interface UseRealtimeOptions<T extends Record<string, any>> {
  table: string;
  schema?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string; // Example: 'user_id=eq.123'
  onData: (payload: RealtimePostgresChangesPayload<T>) => void;
}

/**
 * Custom React Hook to subscribe to real-time changes in a Supabase Postgres table.
 *
 * @example
 * useRealtimeSubscription<Notification>({
 *   table: 'notifications',
 *   event: 'INSERT',
 *   filter: `user_id=eq.${userId}`,
 *   onData: (payload) => setNotifications((prev) => [payload.new, ...prev]),
 * });
 */
export function useRealtimeSubscription<T extends Record<string, any>>({
  table,
  schema = 'public',
  event = '*',
  filter,
  onData,
}: UseRealtimeOptions<T>) {
  useEffect(() => {
    const channelName = `realtime:${schema}:${table}:${event}${filter ? `:${filter}` : ''}`;

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes' as any,
        {
          event,
          schema,
          table,
          filter,
        },
        (payload: RealtimePostgresChangesPayload<T>) => {
          onData(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, schema, event, filter, onData]);
}
