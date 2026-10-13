import { END, MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { shouldContinue } from "./edges.ts";
import { reflactorNode } from "./nodes/reflactor.node.ts";
import { writerNode } from "./nodes/writer.node.ts";
import { StateAnnotations } from "./state.ts";

const checkpointer = new MemorySaver();

const graph = new StateGraph(StateAnnotations)
  .addNode("writer_node", writerNode)
  .addNode("reflactor_node", reflactorNode)
  .addEdge(START, "writer_node")
  .addConditionalEdges("writer_node", shouldContinue, {
    reflactor_node: "reflactor_node",
    end: END,
  })
  .addEdge("reflactor_node", "writer_node");

export const app = graph.compile({
  checkpointer,
});
