import React, { useEffect } from 'react'
import { useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad:false,
  theme:"default"
})
const clearMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .trim();

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const sanitizeLabel = (label) => {
  return label
    .replace(/[()]/g, "")     // remove brackets
    .replace(/:/g, "-")
    .replace(/,/g, " ")
    .replace(/"/g, "'")
    .trim();
};

const autoFixBadNodes = (diagram) => {
  let index = 0;

  return diagram.replace(/\[(.*?)\]/g, (_, label) => {
    index++;
    const safeLabel = sanitizeLabel(label);
    return `N${index}["${safeLabel}"]`; // wrap in quotes
  });
};

const MermaidSetUp = ({diagram}) => {
  const containerRef = useRef(null);

  useEffect(()=>{
    if(!diagram || !containerRef.current)return;

    const renderDiagram = async()=>{
      try {
        containerRef.current.innerHTML = "";
        const uniqueId = `mermaid-${Math.random().toString(36).substring(2,9)}`;

        const safeChart = autoFixBadNodes(clearMermaidChart(diagram));

        const {svg} = await mermaid.render(uniqueId, safeChart);
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.log("Mermaid render failed",error)
      }
    }
    renderDiagram();
  },[diagram])
  return (
    <div className='bg-gray-500 border rounded-lg p-4 overflow-x-auto'>
      <div ref={containerRef}/>
    </div>
  )
}

export default MermaidSetUp