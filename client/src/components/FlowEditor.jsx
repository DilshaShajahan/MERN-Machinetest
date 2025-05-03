import React, { useCallback, useEffect, useState } from "react";
import 'reactflow/dist/style.css';
import axios from "axios";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
} from "react-flow-renderer";
import "./FlowEditor.css";

function FlowEditor() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [title, setTitle] = useState("");
  const [flowsList, setFlowsList] = useState([]); // list of saved flows
  const [selectedFlowId, setSelectedFlowId] = useState("");
  const token = localStorage.getItem("token");

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    setNodes((prev) => [...prev, newNode]);
  };

  // Fetch all flows and show in dropdown
  const fetchFlows = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/flow/load", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFlowsList(res.data);
    } catch (err) {
      console.error("Error fetching flows:", err);
    }
  };

  // Load flow data when user selects from dropdown
  const handleFlowSelect = (e) => {
    const flowId = e.target.value;
    setSelectedFlowId(flowId);

    const flow = flowsList.find((f) => f._id === flowId);
    if (flow) {
      setNodes(flow.nodes);
      setEdges(flow.edges);
      setTitle(flow.title);
    }
  };

  const saveFlow = async () => {
    if (!title.trim()) {
      alert("Please enter a title before saving.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/flow/save",
        { title, nodes, edges },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Flow saved!");
      setTitle("");
      fetchFlows(); // Refresh the dropdown
    } catch (err) {
      console.error("Error saving flow:", err);
    }
  };

  useEffect(() => {
    fetchFlows();
  }, []);

  return (
    <div className="flow-container">
      <h2>Flowchart Editor</h2>

      <div className="flow-button">
        <div className="flow-dropdown">
          <label>Select Saved Flow: </label>
          <select className="select" value={selectedFlowId} onChange={handleFlowSelect}>
            <option value="">-- Select Flow --</option>
            {flowsList.map((flow) => (
              <option key={flow._id} value={flow._id}>
                {flow.title}
              </option>
            ))}
          </select>
        </div>


        <input
          className="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter flow title"
        />


        <button onClick={saveFlow}>Save Flow</button>
      </div>
      <button onClick={addNode}>Add Node</button>

      <div className="flow-pane">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowEditor;
