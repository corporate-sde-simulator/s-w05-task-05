/**
 * Conflict Resolver — resolves merge conflicts for bidirectional sync.
 *
 * This module is COMPLETE. Your task is in syncEngine.ts.
 *
 * Author: Anjali Nair (Integrations team)
 * Last Modified: 2026-03-05
 */

interface CrmRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  updatedAt: string;  // ISO timestamp
  source: 'local' | 'remote';
}

type MergeStrategy = 'local_wins' | 'remote_wins' | 'most_recent' | 'manual';

interface ConflictResult {
  recordId: string;
  resolved: boolean;
  winner: 'local' | 'remote';
  mergedRecord: CrmRecord;
  strategy: MergeStrategy;
}

class ConflictResolver {
  private strategy: MergeStrategy;

  constructor(strategy: MergeStrategy = 'most_recent') {
    this.strategy = strategy;
  }

  resolve(local: CrmRecord, remote: CrmRecord): ConflictResult {
    let winner: 'local' | 'remote';

    switch (this.strategy) {
      case 'local_wins':
        winner = 'local';
        break;
      case 'remote_wins':
        winner = 'remote';
        break;
      case 'most_recent':
        winner = new Date(local.updatedAt) >= new Date(remote.updatedAt) ? 'local' : 'remote';
        break;
      case 'manual':
        return { recordId: local.id, resolved: false, winner: 'local', mergedRecord: local, strategy: this.strategy };
      default:
        winner = 'most_recent' as any;
    }

    const merged = winner === 'local' ? { ...local } : { ...remote };
    return {
      recordId: local.id,
      resolved: true,
      winner,
      mergedRecord: merged,
      strategy: this.strategy,
    };
  }
}

export { ConflictResolver, CrmRecord, MergeStrategy, ConflictResult };
