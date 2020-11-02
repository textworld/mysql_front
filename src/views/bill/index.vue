<template>
  <div>
    <div ref="sequence"></div>
    <div ref="d3" id="d3_ele" style="width: 600px; height: 600px"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { getBillData, login } from "@/api/bill";
import request from "@/utils/request";
let arcVisible = (d) => d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
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
export default {
  name: "index",
  data(){
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    clickLogin() {

      login({
        username: this.username,
        password: this.password
      }).then(resp => {
        console.log(resp)
      })
    }
  },
  mounted() {
    getBillData().then((resp) => {
      let billList = resp.data.data;
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
      const width = 600;
      const height = 600;
      let radius = height / 2;
      let arc = d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius((d) => d.y0 + 5)
        .outerRadius((d) => d.y1);

      // const data = {
      //     name: "root",
      //     children: [
      //         {
      //             name: "a",
      //             value: 13,
      //             children: [
      //                 {
      //                     name: "b",
      //                     value: 1,
      //                 },
      //                 {
      //                     name: "c",
      //                     value: 2,
      //                 },
      //             ],
      //         },
      //         {
      //             name: "e",
      //             value: 14,
      //         },
      //     ],
      // };

      const root = d3
        .hierarchy(data)
        .sum((n) => n.value)
        .sort((a, b) => b.value - a.value);
      console.log("root", root);

      let color = d3.scaleOrdinal(
        d3.quantize(d3.interpolateRainbow, data.children.length + 1)
      );
      const partition = d3.partition().size([2 * Math.PI, radius])(root);
      partition.each((d) => (d.current = d));
      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .style("font", "10px sans-serif");
      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);
      const path = g
        .append("g")
        .selectAll("path")
        .data(partition.descendants().slice(1))
        .join("path")
        .attr("fill", (d) => {
          while (d.depth > 1) d = d.parent;
          return color(d.data.name);
        })
        // .attr("fill-opacity", (d) =>
        //     arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
        // )
        .attr("d", (d) => arc(d.current));
      function labelVisible(d) {
        //return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        return true;
      }
      function labelTransform(d) {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        //return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        return `rotate(${x - 90}) translate(${y}, 0) rotate(${
          x < 180 ? 0 : 180
        })`;
      }
      const label = g
        .append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(partition.descendants().slice(1))
        .join("text")
        .attr("dy", "0.35em")
        //.attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", (d) => labelTransform(d.current))
        .text((d) => d.data.name + d.value.toFixed(2));

      const element = svg.node();
      this.$refs.d3.appendChild(element);
    });
  },
};
</script>

<style scoped>
</style>
