<template>
  <div>
    <div ref="sequence"></div>
    <div ref="d3" id="d3_ele" style="width: 600px; height: 600px"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
const breadcrumbHeight = 30;
const breadcrumbWidth = 75;
function buildHierarchy(csv) {
  // Helper function that transforms the given CSV into a hierarchical format.
  const root = { name: "root", children: [] };
  for (let i = 0; i < csv.length; i++) {
    const sequence = csv[i][0];
    const size = +csv[i][1];
    if (isNaN(size)) {
      // e.g. if this is a header row
      continue;
    }
    const parts = sequence.split("-");
    let currentNode = root;
    for (let j = 0; j < parts.length; j++) {
      const children = currentNode["children"];
      const nodeName = parts[j];
      let childNode = null;
      if (j + 1 < parts.length) {
        // Not yet at the end of the sequence; move down the tree.
        let foundChild = false;
        for (let k = 0; k < children.length; k++) {
          if (children[k]["name"] == nodeName) {
            childNode = children[k];
            foundChild = true;
            break;
          }
        }
        // If we don't already have a child node for this branch, create it.
        if (!foundChild) {
          childNode = { name: nodeName, children: [] };
          children.push(childNode);
        }
        currentNode = childNode;
      } else {
        // Reached the end of the sequence; create a leaf node.
        childNode = { name: nodeName, value: size };
        children.push(childNode);
      }
    }
  }
  return root;
}

function breadcrumbPoints(d, i) {
  const tipWidth = 10;
  const points = [];
  points.push("0,0");
  points.push(`${breadcrumbWidth},0`);
  points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`);
  points.push(`${breadcrumbWidth},${breadcrumbHeight}`);
  points.push(`0,${breadcrumbHeight}`);
  if (i > 0) {
    // Leftmost breadcrumb; don't include 6th vertex.
    points.push(`${tipWidth},${breadcrumbHeight / 2}`);
  }
  return points.join(" ");
}

import { getBillData } from "@/api/bill";
export default {
  data() {
    return {
      b: {
        w: 75,
        h: 30,
        s: 3,
        t: 10,
      },
    };
  },
  created() {},
  mounted() {
    let _this = this;
    const width = 600,
      height = 600;
    getBillData().then((resp) => {
      const data = {
        name: "root",
        children: [
          {
            name: "a",
            value: 13,
            children: [
              {
                name: "b",
                value: 1,
              },
              {
                name: "c",
                value: 2,
              },
            ],
          },
          {
            name: "e",
            value: 14,
          },
        ],
      };
      let radius = width / 6;
      let arc = d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius((d) => d.y0 * radius)
        .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));
      let arcVisible = (d) => d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      let format = d3.format(",d");
      let color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
      const root = d3
        .hierarchy(data)
        .sum((n) => n.value)
        .sort((a, b) => b.value - a.value);
      root.each(d => d.current = d);
      const partition = d3.partition().size([2 * Math.PI, root.height + 1])(
        root
      );
      console.log(partition);
      console.log(root);
      const svg = d3
        .create("svg")
        .attr("viewbox", [0, 0, width, height])
        .style("font", "10px sans-serif");
      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${width / 2})`);
      const path = g
        .append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("fill", (d) => {
          while (d.depth > 1) d = d.parent;
          return color(d.data.name);
        })
        .attr("fill-opacity", (d) =>
          arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
        )
        .attr("d", (d) => arc(d.current));
      path.append("title").text(
        (d) =>
          `${d
            .ancestors()
            .map((d) => d.data.name)
            .reverse()
            .join("/")}\n${format(d.value)}`
      );
      const element = svg.node();
      this.$refs.d3.appendChild(element);
    });
  },
  methods: {
    // Given a node in a partition layout, return an array of all of its ancestor
    // nodes, highest first, but excluding the root.
    getAncestors(node) {
      var path = [];
      var current = node;
      while (current.parent) {
        path.unshift(current);
        current = current.parent;
      }
      return path;
    },
    initializeBreadcrumbTrail() {
      // Add the svg area.
      var trail = d3
        .select(this.$refs.sequence)
        .append("svg:svg")
        .attr("width", 980)
        .attr("height", 50)
        .attr("id", "trail");
      // Add the label at the end, for the percentage.
      trail.append("svg:text").attr("id", "endlabel").style("fill", "#000");
    },
    updateBreadcrumbs(nodeArray, percentageString) {
      // Data join; key function combines name and depth (= position in sequence).
      console.log("nodeArray", nodeArray);
      let b = this.b;
      var g = d3
        .select("#trail")
        .selectAll("g")
        .data(nodeArray, function (d) {
          console.log("trail", d);
          return d.data.name + d.depth;
        });

      // Add breadcrumb and label for entering nodes.
      var entering = g.enter().append("svg:g");

      entering
        .append("svg:polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", function (d) {
          return "#5687d1";
        });

      entering
        .append("svg:text")
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
          return d.data.name;
        });

      // Set position for entering and updating nodes.
      g.attr("transform", function (d, i) {
        return "translate(" + i * (b.w + b.s) + ", 0)";
      });

      // Remove exiting nodes.
      g.exit().remove();

      // Now move and update the percentage at the end.
      d3.select(this.$refs.sequence)
        .select("#trail")
        .select("#endlabel")
        .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(percentageString);

      // Make the breadcrumb trail visible, if it's hidden.
      d3.select("#trail").style("visibility", "");
    },
  },
};
</script>

<style scoped>
</style>