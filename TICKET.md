# FINSERV-4201: Build CRM data synchronization engine

**Status:** In Progress · **Priority:** High
**Sprint:** Sprint 27 · **Story Points:** 5
**Reporter:** Anjali Nair (Integrations Lead) · **Assignee:** You (Intern)
**Due:** End of sprint (Friday)
**Labels:** `backend`, `typescript`, `integrations`, `sync`
**Task Type:** Feature Ship

---

## Description

The `ConflictResolver` handles merge conflicts when the same record is modified on both sides. Build the `SyncEngine` that compares local and remote CRM records, detects changes, and synchronizes bidirectionally. Implement TODOs in `syncEngine.ts`.

## Acceptance Criteria

- [ ] `detectChanges()` finds new, modified, and deleted records on both sides
- [ ] `sync()` applies changes bidirectionally
- [ ] Conflicts (same record modified on both sides) use ConflictResolver
- [ ] Sync is idempotent — running twice produces same state
- [ ] All unit tests pass
