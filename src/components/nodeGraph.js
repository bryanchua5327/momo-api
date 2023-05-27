import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const NodeGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 980;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const graph = {
      // each nodes would be an account
      nodes: [
        { name: "Alice" },
        { name: "Bob" },
        { name: "Chen" },
        { name: "Dawg" },
        { name: "Ethan" },
        { name: "George" },
        { name: "Frank" },
        { name: "Hanes" },
      ],
      //   each link would be a transaction
      links: [
        { source: "Alice", target: "Bob" },
        { source: "Chen", target: "Bob" },
        { source: "Dawg", target: "Chen" },
        { source: "Hanes", target: "Frank" },
        { source: "Hanes", target: "George" },
        { source: "Dawg", target: "Ethan" },
      ],
    };

    const simulation = d3
      .forceSimulation(graph.nodes)
      .force(
        "link",
        d3
          .forceLink()
          .distance(45)
          .id((d) => d.name)
          .links(graph.links)
      )
      .force("charge", d3.forceManyBody().strength(-60))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("stroke-width", 3)
      .style("stroke", "red");

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("r", 12)
      .attr("fill", "red")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return () => {
        svg.selectAll(".links").remove();
        svg.selectAll(".nodes").remove();
      };
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default NodeGraph;
