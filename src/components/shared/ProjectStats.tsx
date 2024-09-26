import { useLikeProjectMutation } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useState, useEffect } from "react";

type ProjectStatsProps = {
  project?: Models.Document;
  userId: string;
};

const ProjectStats = ({ project, userId }: ProjectStatsProps) => {
  const likesList = project?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);

  const { mutate: likeProject } = useLikeProjectMutation();

  //const { data: currentUser } = useGetCurrentUser();

  const handleLikeProject = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likeProject({ projectId: project?.$id || "", likesArray: newLikes });
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 ">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikeProject}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
    </div>
  );
};

export default ProjectStats;
