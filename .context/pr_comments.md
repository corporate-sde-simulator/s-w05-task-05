# PR Review - CRM data sync adapter (by Sneha Jain)

## Reviewer: Pooja Reddy
---

**Overall:** Good foundation but critical bugs need fixing before merge.

### `CrmSyncAdapter.java`

> **Bug #1:** Last-write-wins conflict resolution uses local clock and clock skew causes data loss
> This is the higher priority fix. Check the logic carefully and compare against the design doc.

### `ConflictResolver.java`

> **Bug #2:** Sync direction is always upstream so changes from CRM are overwritten instead of merged
> This is more subtle but will cause issues in production. Make sure to add a test case for this.

---

**Sneha Jain**
> Acknowledged. I have documented the issues for whoever picks this up.
