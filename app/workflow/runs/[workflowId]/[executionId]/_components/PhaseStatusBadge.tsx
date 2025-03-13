import { ExecutionPhaseStatus } from "@/types/workflow";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  CreativeCommonsIcon,
  Loader2Icon
} from "lucide-react";
import React from "react";

const PhaseStatusBadge: React.FC<{ readonly status: ExecutionPhaseStatus }> = ({
  status
}) => {
  switch (status) {
    case ExecutionPhaseStatus.PENDING:
      return <CircleDashedIcon size={20} className="stroke-muted-foreground" />;
    case ExecutionPhaseStatus.RUNNING:
      return (
        <Loader2Icon size={20} className="animate-spin stroke-yellow-500" />
      );
    case ExecutionPhaseStatus.FAILED:
      return <CircleXIcon size={20} className="stroke-destructive" />;
    case ExecutionPhaseStatus.COMPLETED:
      return <CircleCheckIcon size={20} className="stroke-primary" />;
    case ExecutionPhaseStatus.CREATED:
      return <CreativeCommonsIcon size={20} className="stroke-secondary" />;
    default:
      return <div className="rounded-full">{status}</div>;
  }
};

export default PhaseStatusBadge;
