## 1. Update Z-Index Hierarchy

- [x] 1.1 Update BaseModal.svelte backdrop z-index from `z-40` to `z-30`
- [x] 1.2 Update BaseModal.svelte modal panel z-index to remain at `z-50`
- [x] 1.3 Update Navbar.svelte z-index from `z-30` to `z-40`

## 2. Fix Hero Text Wrapping

- [x] 2.1 Add `word-break: keep-all` CSS property to Hero.svelte description paragraph
- [x] 2.2 Verify character animation still functions correctly after CSS change

## 3. Verification

- [x] 3.1 Test modal opens with navbar visible and unblurred
- [x] 3.2 Test navbar links remain clickable when modal is open
- [x] 3.3 Test Hero description wraps at word boundaries only