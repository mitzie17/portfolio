import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createProject,
  createUserAccount,
  getRecentProjects,
  likeProject,
  signInAccount,
  signOutAccount,
} from "../appwrite/api";
import { INewProject, INewUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";
import { LucideArrowUpRightFromSquare } from "lucide-react";

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

export const useLikeProject = () => {
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
