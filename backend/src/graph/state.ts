import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const StateAnnotations = Annotation.Root({
  ...MessagesAnnotation.spec,
});
