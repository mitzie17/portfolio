import { INewProject, INewUser, IUpdateProject } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  createUserAccount,
  deleteProject,
  getCurrentUser,
  getProjectById,
  getRecentProjects,
  likeProject,
  signInAccount,
  signOutAccount,
  updateProject,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccountMutation = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: INewProject) => createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_PROJECTS],
      });
    },
  });
};

export const useGetRecentProjectsMutation = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_PROJECTS],
    queryFn: getRecentProjects,
  });
};

export const useLikeProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      likesArray,
    }: {
      projectId: string;
      likesArray: string[];
    }) => likeProject(projectId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_PROJECTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROJECTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetProjectById = (projectId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });
};

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: IUpdateProject) => updateProject(project),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, data?.$id],
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectId,
      imageId,
    }: {
      projectId?: string;
      imageId: string;
    }) => deleteProject(projectId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_PROJECTS],
      });
    },
  });
};
