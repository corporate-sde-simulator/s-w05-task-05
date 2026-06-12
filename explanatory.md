# Beginner Explanatory Guide: FINSERV-4201: Build CRM data synchronization engine

> **Task Type**: Service Task  
> **Domain/Focus**: Backend Development, TypeScript, Data Synchronization

---

## 1. The Goal (In-Depth Beginner Explanation)

### The Core Problem
In the context of a Customer Relationship Management (CRM) system, maintaining accurate and up-to-date records across different platforms is crucial. The task at hand involves building a `SyncEngine` that ensures data consistency between local and remote CRM records. Currently, if changes are made to the same record in both the local and remote databases, it can lead to conflicts, where the system does not know which version of the record to keep. This can result in data loss or inconsistencies, which can severely impact user experience and decision-making.

The `SyncEngine` is designed to detect changes in records, such as new entries, modifications, and deletions, and synchronize these changes bidirectionally. This means that if a record is updated in the local database, the same update should reflect in the remote database and vice versa. Implementing this synchronization is vital for ensuring that users have access to the most current information, thereby enhancing the reliability of the CRM system.

### Jargon Buster (Key Terms Explained)
* **Bidirectional Sync**: This refers to the process of synchronizing data in both directions between two systems. For example, if a record is updated in the local database, that change should also be reflected in the remote database, and any updates made remotely should be pulled into the local database. This ensures that both systems have the same data.

* **Conflict Resolution**: This is the process of handling situations where the same data has been modified in two different places. For instance, if a user updates a contact's email address in the local database while another user updates the same contact's email address in the remote database, a conflict arises. The system must decide which change to keep, and this is where a conflict resolver comes into play.

* **Idempotent**: In the context of operations, an idempotent operation is one that can be applied multiple times without changing the result beyond the initial application. For example, if you synchronize data twice, the end state should remain the same as if you had only done it once. This is important for ensuring that repeated sync operations do not lead to unintended changes.

* **SyncDelta**: This term refers to the differences detected between two sets of records. It includes new records that exist in one set but not the other, modified records that have changed, and deleted records that are no longer present. The `SyncDelta` helps in identifying what needs to be synchronized between the local and remote databases.

### Expected Outcome
After implementing the `SyncEngine`, the system should be able to accurately detect and synchronize changes between local and remote CRM records. 

**Before**: 
- Users may experience data inconsistencies, with some records being outdated or conflicting due to simultaneous updates in different locations.

**After**: 
- The system will successfully identify new, modified, and deleted records, apply changes bidirectionally, and resolve any conflicts using the `ConflictResolver`. Users will have access to consistent and up-to-date information across both local and remote databases.

---

## 2. Related Coding Concepts & Syntax (50% Theory, 50% Practice)

### Concept 1: Data Structures and Maps
#### 📘 Theoretical Overview (50%)
* **Why it exists**: Data structures are essential for organizing and storing data efficiently. Maps, in particular, allow for quick lookups, insertions, and deletions based on unique keys. Without using appropriate data structures, operations on large datasets can become slow and cumbersome, leading to performance issues.

* **Key Mechanisms**: A map is a collection of key-value pairs where each key is unique. When you want to retrieve a value, you can do so in constant time (O(1)) by using the key. This is much faster than searching through an array, which would take linear time (O(n)).

#### 💻 Syntax & Practical Examples (50%)
* **Language Syntax**:
  ```typescript
  const map = new Map<string, CrmRecord>();
  map.set('123', { id: '123', name: 'John Doe', email: 'john@example.com', updatedAt: '2023-10-01T12:00:00Z', source: 'local' });
  const record = map.get('123'); // Retrieves the record with ID '123'
  ```

* **Real-World Application**:
  ```typescript
  function detectChanges(localRecords: CrmRecord[], remoteRecords: CrmRecord[]) {
      const localMap = new Map<string, CrmRecord>();
      const remoteMap = new Map<string, CrmRecord>();

      // Populate maps
      localRecords.forEach(record => localMap.set(record.id, record));
      remoteRecords.forEach(record => remoteMap.set(record.id, record));

      // Now you can easily check for new or modified records
      const newRecords = [...remoteMap.keys()].filter(id => !localMap.has(id));
      console.log('New Records:', newRecords);
  }
  ```

---

## 3. Step-by-Step Logic & Walkthrough

1. **Step 1: Locate and Analyze the Target File**
   * Navigate to the `syncEngine.ts` file within the `s-w05-task-05` folder. This file contains the `SyncEngine` class where you will implement the required methods.
   * Focus on the `detectChanges` and `sync` methods, specifically the lines marked with TODO comments.

2. **Step 2: Input Verification & Validation**
   * Before processing, ensure that the input arrays `localRecords` and `remoteRecords` are not null or undefined. If they are, return an empty `SyncDelta` object to avoid errors.

3. **Step 3: Core Implementation / Modification**
   * In the `detectChanges` method, create maps for both local and remote records using their IDs as keys. This will allow for efficient lookups.
   * Identify new records by checking which IDs exist in one map but not the other.
   * Identify modified records by comparing the `updatedAt` timestamps of records that exist in both maps.
   * Identify deleted records by checking which IDs from the previous state are no longer present in the current state.

4. **Step 4: Output Verification & Testing**
   * After implementing the methods, run the unit tests provided in `CrmSyncAdapterTest.java` to ensure that your implementation works as expected. Check for both success and edge cases to validate the robustness of your solution.

---

## 4. Detailed Walkthrough of Test Cases

### Test Case 1: Standard / Success Case
* **Description**: This test checks if the `SyncEngine` can successfully detect changes when there are new and modified records.
* **Inputs**:
  ```json
  {
    "localRecords": [
      { "id": "1", "name": "Alice", "email": "alice@example.com", "updatedAt": "2023-10-01T12:00:00Z", "source": "local" },
      { "id": "2", "name": "Bob", "email": "bob@example.com", "updatedAt": "2023-10-01T12:00:00Z", "source": "local" }
    ],
    "remoteRecords": [
      { "id": "1", "name": "Alice", "email": "alice@newdomain.com", "updatedAt": "2023-10-02T12:00:00Z", "source": "remote" },
      { "id": "3", "name": "Charlie", "email": "charlie@example.com", "updatedAt": "2023-10-01T12:00:00Z", "source": "remote" }
    ],
    "previousLocalIds": ["1", "2"],
    "previousRemoteIds": ["1", "3"]
  }
  ```
* **Step-by-Step Execution Trace**:
  1. The `detectChanges` method receives the input values.
  2. It creates maps for both local and remote records.
  3. It identifies that record "2" is new in the local set, record "3" is new in the remote set, and record "1" has been modified.
  4. Returns the `SyncDelta` indicating new and modified records.

* **Expected Output**: 
  ```json
  {
    "localDelta": {
      "newRecords": [],
      "modifiedRecords": [{ "id": "1", "name": "Alice", "email": "alice@newdomain.com", "updatedAt": "2023-10-02T12:00:00Z", "source": "remote" }],
      "deletedIds": []
    },
    "remoteDelta": {
      "newRecords": [{ "id": "3", "name": "Charlie", "email": "charlie@example.com", "updatedAt": "2023-10-01T12:00:00Z", "source": "remote" }],
      "modifiedRecords": [],
      "deletedIds": []
    },
    "conflicts": []
  }
  ```

### Test Case 2: Edge Case / Validation Fail
* **Description**: This test checks how the `SyncEngine` handles null inputs for records.
* **Inputs**:
  ```json
  {
    "localRecords": null,
    "remoteRecords": null,
    "previousLocalIds": new Set(),
    "previousRemoteIds": new Set()
  }
  ```
* **Step-by-Step Execution Trace**:
  1. The `detectChanges` method receives null values for both local and remote records.
  2. It checks for null or undefined inputs and immediately returns an empty `SyncDelta` object.
  3. The execution is halted early to prevent further processing.

* **Expected Output**: 
  ```json
  {
    "localDelta": {
      "newRecords": [],
      "modifiedRecords": [],
      "deletedIds": []
    },
    "remoteDelta": {
      "newRecords": [],
      "modifiedRecords": [],
      "deletedIds": []
    },
    "conflicts": []
  }
  ``` 

This guide provides a comprehensive understanding of the task at hand, the concepts involved, and a clear path to implementation, ensuring that even beginners can follow along and grasp the necessary details.