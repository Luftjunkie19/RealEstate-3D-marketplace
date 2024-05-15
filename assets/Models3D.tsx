type Model3D={
    modelUrl:string,
    scale:number,
    position:[number, number, number],
    name:string
}

export const models3D: Model3D[] = [
    { modelUrl: "/bed_version_03.glb", scale:0.0055, position: [0, 0, 0], name:'Bed'},
    { modelUrl: "/chair.glb", scale:0.5, position: [0, 0, 0], name:'Chair'},
    { modelUrl: "/bed.glb", scale:0.5, position: [0, 0, 0], name:'Bed v2'},
    { modelUrl: "/eletric_desk.glb", scale:0.25, position: [0, 0, 0], name:'Desk'},
    { modelUrl: "/gaming_chair.glb", scale:0.0095, position: [0, 0, 0], name:'Gaming Chair'},
    { modelUrl: "/kitchen_sink.glb", scale:0.05, position: [0, 0, 0], name:'Kitchen Sink'},
    { modelUrl: "/scifi_desk.glb", scale:0.5, position: [0, 0, 0], name:'Desk v2'},
    { modelUrl: "/toilet.glb", scale:0.5, position: [0, 0, 0], name:'Toilet'},
    { modelUrl: "/office_chair.glb", scale:0.5, position: [0, 0, 0], name:'Office Chair'},
];