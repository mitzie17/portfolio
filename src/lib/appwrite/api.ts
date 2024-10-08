import { ID, Query } from "appwrite";
import { INewProject, INewUser, IUpdateProject } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function createProject(project: INewProject) {
  try {
    // Upload image to appwrite storage
    const uploadedFile = await uploadFile(project.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags in array
    const tags = project.tags?.replace(/ /g, "").split(",") || [];

    // Create project in database
    const newProject = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      ID.unique(),
      {
        creator: project.userId,
        title: project.title,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        responsibilities: project.responsibilities,
        tags: tags,
      }
    );

    if (!newProject) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newProject;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );
    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentProjects() {
  const projects = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.projectCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(20)]
  );
  if (!projects) throw Error;

  return projects;
}

export async function likeProject(projectId: string, likesArray: string[]) {
  try {
    const updatedProject = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      projectId,
      { likes: likesArray }
    );

    if (!updatedProject) throw Error;

    return updatedProject;
  } catch (error) {
    console.log(error);
  }
}

export async function getProjectById(projectId?: string) {
  if (!projectId) throw Error;

  try {
    const project = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      projectId
    );

    if (!project) throw Error;

    return project;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProject(project: IUpdateProject) {
  const hasFileToUpdate = project.file.length > 0;

  try {
    let image = {
      imageUrl: project.imageUrl,
      imageId: project.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(project.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = project.tags?.replace(/ /g, "").split(",") || [];

    //  Update project
    const updatedProject = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      project.projectId,
      {
        title: project.title,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        responsibilities: project.responsibilities,
        tags: tags,
      }
    );

    // Failed to update
    if (!updatedProject) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await deleteFile(project.imageId);
    }

    return updatedProject;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProject(projectId?: string, imageId?: string) {
  if (!projectId || !imageId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      projectId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}
