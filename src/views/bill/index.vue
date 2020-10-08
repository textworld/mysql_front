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
    getBillData().then((resp) => {
      this.initializeBreadcrumbTrail();
      let billList = resp.data.data;
      let width = 640;
      let radius = width / 2;
      let mousearc = d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .innerRadius((d) => Math.sqrt(d.y0))
        .outerRadius(radius);
      let arc = d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle(1 / radius)
        .padRadius(radius)
        .innerRadius((d) => Math.sqrt(d.y0))
        .outerRadius((d) => Math.sqrt(d.y1) - 1);
      let color = d3
        .scaleOrdinal()
        .domain(["home", "product", "search", "account", "other", "end"])
        .range([
          "#5d85cf",
          "#7c6561",
          "#da7847",
          "#6fb971",
          "#9e70cf",
          "#bbbbbb",
        ]);
      let partition = (data) => {
        return d3.partition().size([2 * Math.PI, radius * radius])(
          d3
            .hierarchy(data)
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value)
        );
      };
      let csv_obj = billList
        .map((b) => {
          if (!b.category_path) {
            return null;
          }
          let r = [];
          r[0] = b.category_path.replace(/^\//, "").replace("/", "-");
          r[1] = parseFloat(b.price);
          return r;
        })
        .filter((b) => b != null)
        .reduce((accumulator, currentValue) => {
          let path = currentValue[0];
          let val = currentValue[1];
          if (path in accumulator) {
            accumulator[path] += val;
          } else {
            accumulator[path] = val;
          }
          return accumulator;
        }, {});
      let csv = [];
      for (let k in csv_obj) {
        csv.push([k, csv_obj[k]]);
      }

      let data = buildHierarchy(csv);
      const root = partition(data);
      const svg = d3.create("svg");
      // Make this into a view, so that the currently hovered sequence is available to the breadcrumb
      const element = svg.node();
      element.value = { sequence: [], percentage: 0.0 };

      const label = svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("fill", "#888")
        .style("visibility", "hidden");

      label
        .append("tspan")
        .attr("class", "percentage")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "-0.1em")
        .attr("font-size", "3em")
        .text("");

      label
        .append("tspan")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "1.5em")
        .text("of visits begin with this sequence");

      svg
        .attr("viewBox", `${-radius} ${-radius} ${width} ${width}`)
        .style("max-width", `${width}px`)
        .style("font", "12px sans-serif");

      const path = svg
        .append("g")
        .selectAll("path")
        .data(
          root.descendants().filter((d) => {
            // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
            return d.depth && d.x1 - d.x0 > 0.001;
          })
        )
        .join("path")
        .attr("fill", (d) => color(d.data.name))
        .attr("d", arc);

      svg
        .append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mouseleave", () => {
          path.attr("fill-opacity", 1);
          label.style("visibility", "hidden");
          // Update the value of this view
          element.value = { sequence: [], percentage: 0.0 };
          element.dispatchEvent(new CustomEvent("input"));
        })
        .selectAll("path")
        .data(
          root.descendants().filter((d) => {
            // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
            return d.depth && d.x1 - d.x0 > 0.001;
          })
        )
        .join("path")
        .attr("d", mousearc)
        .on("mouseenter", (event, d) => {
          // Get the ancestors of the current segment, minus the root
          const sequence = d.ancestors().reverse().slice(1);
          // Highlight the ancestors
          path.attr("fill-opacity", (node) =>
            sequence.indexOf(node) >= 0 ? 1.0 : 0.3
          );
          const percentage = ((100 * d.value) / root.value).toPrecision(3);
          label
            .style("visibility", null)
            .select(".percentage")
            .text(percentage + "%");
          // Update the value of this view with the currently hovered sequence and percentage
          element.value = { sequence, percentage };
          element.dispatchEvent(new CustomEvent("input"));
          var sequenceArray = _this.getAncestors(d);
          _this.updateBreadcrumbs(sequenceArray, percentage + "%");
        });

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
      console.log('nodeArray', nodeArray)
      let b = this.b
      var g = d3
        .select("#trail")
        .selectAll("g")
        .data(nodeArray, function (d) {
          console.log('trail', d)
          return d.data.name + d.depth;
        });

      // Add breadcrumb and label for entering nodes.
      var entering = g.enter().append("svg:g");

      entering
        .append("svg:polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", function (d) {
          return '#5687d1';
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