const STORAGE_KEY = "agrolinks-opportunity-draft";

export function createOpportunityDraftId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `draft-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getOpportunityDrafts() {
  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (!storedValue) return [];

  const parsedValue = JSON.parse(storedValue);
  const drafts = Array.isArray(parsedValue) ? parsedValue : [parsedValue];

  return drafts
    .filter((draft) => draft && typeof draft === "object")
    .map((draft) => ({
      ...draft,
      id: draft.id || draft.draftId || "legacy-draft",
      status: draft.status || "draft",
    }))
    .filter((draft) => draft.status === "draft");
}

export function getOpportunityDraft(id) {
  return getOpportunityDrafts().find((draft) => draft.id === id);
}
export function saveOpportunityDraft(draft) {
  const drafts = getOpportunityDrafts();
  const updatedDrafts = [
    draft,
    ...drafts.filter((savedDraft) => savedDraft.id !== draft.id),
  ];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));
  return updatedDrafts;
}
