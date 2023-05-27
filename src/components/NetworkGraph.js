import React from 'react';
import { DecompositionTreeGraph } from '@ant-design/graphs';

export default function DemoDecompositionTreeGraph({ data }) {
    const stroke = '#EA2F97';
    const config = {
        data,
        nodeCfg: {
            size: [140, 25],
            percent: {
                position: 'bottom',
                size: 4,
                style: (arg) => {

                    return {
                        radius: [0, 0, 0, 2],
                        fill: arg.value.percent > 0.3 ? stroke : '#1f8fff',
                    };
                },
            },
            items: {
                containerStyle: {
                    fill: '#fff',
                },
                padding: 6,
                style: (cfg, group, type) => {
                    const styles = {
                        icon: {
                            width: 12,
                            height: 12,
                        },
                        value: {
                            fill: '#f00',
                        },
                        text: {
                            fill: '#aaa',
                        },
                    };
                    return styles[type];
                },
            },
            nodeStateStyles: {
                hover: {
                    lineWidth: 2,
                },
            },
            title: {
                containerStyle: {
                    fill: 'transparent',
                },
                style: {
                    fill: '#000',
                    fontSize: 12,
                },
            },
            style: (arg) => {
                return {
                    fill: '#fff',
                    radius: 2,
                    stroke: arg.value.percent > 0.3 ? stroke : '#1f8fff',
                };
            },
        },
        edgeCfg: {
            label: {
                style: {
                    fill: '#aaa',
                    fontSize: 12,
                    fillOpacity: 1,
                },
            },
            style: (edge) => {
                return {
                    stroke: '#518AD3',
                    strokeOpacity: 0.5,
                };
            },
            endArrow: {
                fill: '#518AD3',
            },
            edgeStateStyles: {
                hover: {
                    strokeOpacity: 1,
                },
            },
        },
        markerCfg: (cfg) => {
            return {
                position: 'right',
                show: cfg.children?.length,
                style: (arg) => {
                    return {
                        stroke: arg.value.percent > 0.3 ? stroke : '#1f8fff',
                    };
                },
            };
        },
    };

    return <DecompositionTreeGraph {...config} />;
};

