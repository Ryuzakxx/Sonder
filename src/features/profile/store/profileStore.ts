export type ProfileStore = {
  editingProfile: boolean;
  selectedModuleId?: string;
};

export const initialProfileStore: ProfileStore = {
  editingProfile: false
};
