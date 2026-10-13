import type { TStateType } from "../types/types.ts";
import { MAX_REVISONS } from "../utils/utils.ts";

export const shouldContinue = (state: TStateType) => {
  const revisionCnt = state.revisionCnt;

  if (revisionCnt >= MAX_REVISONS) {
    return "end";
  }

  return "reflactor_node";
};
