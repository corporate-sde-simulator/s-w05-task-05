/**
 * Sync Engine — bidirectional CRM data synchronization.
 *
 * YOU MUST IMPLEMENT the methods marked with TODO.
 * ConflictResolver is working — use it for conflict resolution.
 */

import { ConflictResolver, CrmRecord, ConflictResult } from './conflictResolver';

interface SyncDelta {
  newRecords: CrmRecord[];
  modifiedRecords: CrmRecord[];
  deletedIds: string[];
}

interface SyncResult {
  localToRemote: SyncDelta;
  remoteToLocal: SyncDelta;
  conflicts: ConflictResult[];
  stats: { created: number; updated: number; deleted: number; conflicts: number };
}

class SyncEngine {
  private resolver: ConflictResolver;
  private syncLog: Array<{ action: string; recordId: string; timestamp: string }> = [];

  constructor(resolver: ConflictResolver) {
    this.resolver = resolver;
  }

  /**
   * Detect changes between local and remote record sets.
   *
   * TODO: Implement this method.
   * 1. Build maps of records by ID for both local and remote
   * 2. Find new records (exist on one side but not the other)
   * 3. Find modified records (exist on both but updatedAt differs)
   * 4. Find deleted records (exist in previousIds but not in current set)
   * 5. Return SyncDelta for each direction
   */
  detectChanges(
    localRecords: CrmRecord[],
    remoteRecords: CrmRecord[],
    previousLocalIds: Set<string>,
    previousRemoteIds: Set<string>,
  ): { localDelta: SyncDelta; remoteDelta: SyncDelta; conflicts: CrmRecord[][] } {
    // TODO: Detect bidirectional changes
    return {
      localDelta: { newRecords: [], modifiedRecords: [], deletedIds: [] },
      remoteDelta: { newRecords: [], modifiedRecords: [], deletedIds: [] },
      conflicts: [],
    };
  }

  /**
   * Perform bidirectional sync.
   *
   * TODO: Implement this method.
   * 1. Call detectChanges() to find deltas
   * 2. For conflicts, use this.resolver.resolve(local, remote)
   * 3. Apply non-conflicting changes to both sides
   * 4. Log all sync actions
   * 5. Return SyncResult with stats
   */
  sync(
    localRecords: CrmRecord[],
    remoteRecords: CrmRecord[],
    previousLocalIds: Set<string>,
    previousRemoteIds: Set<string>,
  ): SyncResult {
    // TODO: Implement full bidirectional sync
    return {
      localToRemote: { newRecords: [], modifiedRecords: [], deletedIds: [] },
      remoteToLocal: { newRecords: [], modifiedRecords: [], deletedIds: [] },
      conflicts: [],
      stats: { created: 0, updated: 0, deleted: 0, conflicts: 0 },
    };
  }

  getSyncLog() {
    return [...this.syncLog];
  }
}

export { SyncEngine, SyncDelta, SyncResult };
