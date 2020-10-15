<template>
    <div>
        <div ref="sequence"></div>
        <div ref="d3" id="d3_ele" style="width: 600px; height: 600px"></div>
    </div>
</template>

<script>
    import * as d3 from "d3";
    let arcVisible = (d) => d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;

    export default {
        name: "index",
        mounted() {
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

            const root = d3
                .hierarchy(data)
                .sum((n) => n.value)
                .sort((a, b) => b.value - a.value);

            let color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
            const partition = d3.partition().size([2 * Math.PI, radius])(root);
            partition.each(d => d.current = d);
            const svg = d3
                .create("svg")
                .attr('width', width)
                .attr('height', height)
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
                const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                const y = (d.y0 + d.y1) / 2 * radius;
                return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
            }
            const label = g.append("g")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .style("user-select", "none")
                .selectAll("text")
                .data(root.descendants().slice(1))
                .join("text")
                .attr("dy", "0.35em")
                .attr("fill-opacity", d => +labelVisible(d.current))
                .attr("transform", d => labelTransform(d.current))
                .text(d => d.data.name);

            const element = svg.node();
            this.$refs.d3.appendChild(element);
        }
    }
</script>

<style scoped>

</style>
