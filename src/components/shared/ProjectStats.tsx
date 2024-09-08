import { Models } from "appwrite";

type ProjectStatsProps = {
  project: Models.Document;
  userId: string;
};

const ProjectStats = ({ project, userId }: ProjectStatsProps) => {
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src="/assets/icons/like.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">0</p>
      </div>
    </div>
  );
};

export default ProjectStats;
