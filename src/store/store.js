import { create } from "zustand";

export const useAppStore = create((set) => ({
  projects: [],

  setProjects: (data) =>
    set((state) => ({
      projects: data,
    })),

  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
}));
