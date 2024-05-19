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
    { modelUrl: "/kitchen_sink.glb", scale:0.1, position: [0, 0, 0], name:'Kitchen Sink'},
    { modelUrl: "/scifi_desk.glb", scale:0.5, position: [0, 0, 0], name:'Desk v2'},
    { modelUrl: "/toilet.glb", scale:0.5, position: [0, 0, 0], name:'Toilet'},
    { modelUrl: "/office_chair.glb", scale:0.5, position: [0, 0, 0], name:'Office Chair'},
    { modelUrl: "/mattress.glb", scale:0.0015, position: [0, 0, 0], name:'Mattress'},
    { modelUrl: "/coffee_table.glb", scale:0.5, position: [0, 0, 0], name:'Coffee Table'},
    { modelUrl: "/curved_chair.glb", scale:0.5, position: [0, 0, 0], name:'Curved Chair'},
    { modelUrl: "/corner_desk.glb", scale:0.5, position: [0, 0, 0], name:'Corner Desk'},
    { modelUrl: "/wardrobe.glb", scale:0.5, position: [0, 0, 0], name:'Wardrobe'},
    { modelUrl: "/fridge.glb", scale:0.5, position: [0, 0, 0], name:'Fridge'},
    { modelUrl: "/device.glb", scale:0.0085, position: [0, 0, 0], name:'Device'},
    { modelUrl: "/pc_object.glb", scale:0.009, position: [0, 0, 0], name:'PC'},
    { modelUrl: "/basic_keyboard.glb", scale:0.5, position: [0, 0, 0], name:'Keyboard'},
];