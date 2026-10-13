import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const StateAnnotations = Annotation.Root({
  ...MessagesAnnotation.spec,
  revisionCnt: Annotation<number>,
  draft: Annotation<string>,
  feedback: Annotation<string>,
  question: Annotation<string>,
});
