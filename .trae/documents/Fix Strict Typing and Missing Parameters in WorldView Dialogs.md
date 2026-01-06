I will fix the strict typing issues and missing parameters in the API requests across all WorldView-related dialogs.

**Core Issues Identified:**
1.  **Lack of Strict Typing**: Dialog components use `reactive({...})` without explicit TypeScript interfaces, leading to implicit types.
2.  **Missing Parameters in Update Requests**: 
    - `Novel` update sends only `title` and `description` (2 fields), but the backend expects `worldViewId` as well.
    - `WorldEvent` update is missing `relatedCharacterSnapshotIds`.

**Implementation Plan:**

1.  **Update API Definitions (`src/api/novel.ts`)**:
    - Update `UpdateNovelRequest` interface to include `worldViewId` (and `userId` if strictly required by backend, but `worldViewId` is definitely needed).

2.  **Refactor Dialog Components**:
    - **`WorldViewDialog.vue`**:
        - Explicitly type `form` using `CreateWorldViewRequest`.
    - **`NovelDialog.vue`**:
        - Explicitly type `form` using `Omit<CreateNovelRequest, 'worldViewId'>`.
        - **Fix**: Include `worldViewId` in the `updateNovel` API call.
    - **`WorldEventDialog.vue`**:
        - Explicitly type `form` using `Omit<CreateWorldEventRequest, 'worldViewId'>`.
        - Add `relatedCharacterSnapshotIds` to the `form` object.
        - **Fix**: Include `relatedCharacterSnapshotIds` in the `updateWorldEvent` API call.
    - **`CharacterDialog.vue`**:
        - Explicitly type `form` using `Omit<CreateCharacterRequest, 'worldViewId'>`.
    - **`MiscDialog.vue`**:
        - Explicitly type `form` using `Omit<CreateMiscRequest, 'worldViewId'>`.

This ensures all forms are strictly typed and all required parameters are sent to the backend.