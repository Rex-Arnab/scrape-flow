"use client";

import { Workflow } from "@prisma/client";
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import React from 'react'

import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";

function FlowEditor({ workflow }: { workflow: Workflow }) {
    const [nodes, setNotes, onNodesChange] = useNodesState([
        {
            id: "1",
            data: {
                label: "Example 1"
            },
            position: {x: 0, y: 0}
        }
    ]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  return (
      <main className="h-full w-full">
          <ReactFlow
              nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
          >
              <Controls position="top-left" />
              <Background variant={BackgroundVariant.Dots} gap={12} size={2} />
          </ReactFlow>
    </main>
  )
}

export default FlowEditor