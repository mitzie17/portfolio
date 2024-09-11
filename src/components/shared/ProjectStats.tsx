import { useUserContext } from "@/context/AuthContext";
import { useLikeProject } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useState, useEffect } from "react";

type ProjectStatsProps = {
  project: Models.Document;
  userId: string;
};

const ProjectStats = ({ project, userId }: ProjectStatsProps) => {
  const likesList = project.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);

  const { mutate: likeProject } = useLikeProject();

  const { data: currentUser } = useUserContext();

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 ">
        <img
          src="/assets/icons/like.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">80</p>
      </div>
    </div>
  );
};

export default ProjectStats;
