import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import {HexColorPicker, RgbColorPicker} from 'react-colorful';
import { FaCircleXmark } from 'react-icons/fa6';

type Props = {
    objectToEdit:any | null,
    saveChanges: (obj:any, isGltf:boolean)=>void,
    removeObject: (uuid:string,id:string, isGltf:boolean)=>void
}

function ElementManagment({objectToEdit, saveChanges, removeObject}: Props) {
    const textures=[
        '/brick.jpg',
      '/brick2.jpg',
       '/brick3.jpg',
       '/brick4.jpg',
     '/brick5.png',
       '/brick6.png',
        '/brick7.png',
        '/brick8.png',
       '/brick9.jpg',
       '/brick10.jpg',
        '/desk1.jpg',
        '/desk2.jpg',
        '/desk3.jpg'
      ];
    
  return (
    <div className={`sm:max-h-80 h-full rounded-t-xl border-2 border-darkGray lg:max-h-screen ${objectToEdit ? 'absolute' : 'hidden'} overflow-y-auto sm:max-w-3xl lg:max-w-sm -bottom-28 right-0 w-full z-50 bg-purple`}>
      <div className="flex justify-between items-center p-4">
            <p className="text-white text-2xl font-bold">VirtuEstate</p>
            <button><FaCircleXmark className='text-red-500 text-xl'/></button>
        </div>
        {objectToEdit && <div className="flex flex-col gap-4 px-2 py-2">
            <div className="flex flex-col gap-2">
                <p className='text-white'>Width</p>
                <input type="range" defaultValue={objectToEdit.scale.x} min={0} max="4" step={0.01} onChange={(e)=>{
                    objectToEdit.scale.x = +e.target.value;
                }}  className="range range-primary max-w-60" />
            </div>
            <div className="flex flex-col gap-2">
                <p className='text-white'>Height</p>
                <input  onChange={(e)=>{
                    objectToEdit.scale.y = +e.target.value;
                }}  defaultValue={objectToEdit.scale.y}  type="range" step={0.01} min={0} max="4"  className="range range-primary max-w-60" />
            </div>
            <div className="flex flex-col gap-2">
                <p className='text-white'>Depth</p>
                <input  onChange={(e)=>{
                    objectToEdit.scale.z = +e.target.value;
                }}  type="range" defaultValue={objectToEdit.scale.z} min={0} max="4" step={0.01}  className="range range-primary max-w-60" />
            </div>
            <div className="flex flex-col gap-2">
                <p className='text-white'>Rotation x</p>
                <input defaultValue={objectToEdit.rotation.x} onChange={(e)=>{
                    objectToEdit.rotation.x = +e.target.value;
                }}  type="range" min={-5} max="5" step={0.01}  className="range range-primary max-w-60" />
            </div>
            <div className="flex flex-col gap-2">
                <p className='text-white'>Rotation Y</p>
                <input defaultValue={objectToEdit.rotation.y}   onChange={(e)=>{
                    objectToEdit.rotation.y = +e.target.value;
                }}  type="range" min={-5} max="5" step={0.01}  className="range range-primary max-w-60" />
            </div>
            <div className="flex flex-col gap-2">
                <p className='text-white'>Rotation Z</p>
                <input defaultValue={objectToEdit.rotation.z}  onChange={(e)=>{
                    objectToEdit.rotation.z = +e.target.value;
                }}  type="range" min={-5} max="5" step={0.1}  className="range range-primary max-w-60" />
            </div>


            <div className="flex flex-col gap-2">
                <p className='text-white'>Position X</p>
                <input defaultValue={objectToEdit.position.x}  onChange={(e)=>{
                    objectToEdit.position.x = +e.target.value;
                }}  type="range" min={"-10"} max="10" step={0.05}  className="range range-primary max-w-60" />
            </div>

            <div className="flex flex-col gap-2">
                <p className='text-white'>Position Y</p>
                <input defaultValue={objectToEdit.position.y}  onChange={(e)=>{
                    objectToEdit.position.y = +e.target.value;
                }}  type="range" min={"-10"} max="10" step={0.05}  className="range range-primary max-w-60" />
            </div>

            <div className="flex flex-col gap-2">
                <p className='text-white'>Position Z</p>
                <input defaultValue={objectToEdit.position.z}  onChange={(e)=>{
                    objectToEdit.position.z = +e.target.value;
                }}  type="range" min={"-10"}  max="10" step={0.05}  className="range range-primary max-w-60" />
            </div>

{!objectToEdit.gltfObjectUrl && <>
    <div className="flex flex-col gap-2">
                <p className='text-white'>Wall Colour</p>
             
                <HexColorPicker className='max-w-44 max-h-32 w-full h-full' color={objectToEdit.colour} onChange={(value)=>{
                    console.log(objectToEdit);
                    objectToEdit.colour = value;
                }}/>
           
            </div>
            <div className="flex flex-col gap-2">
                <p className='text-white'>Wall Textures</p>
                <select defaultValue={objectToEdit.userData.mapPath} onChange={(e)=>{
                    objectToEdit.map.texturePath=e.target.value;
                    console.log(objectToEdit);
                }} className="select select-primary w-full max-w-xs">
                {textures.map((item, i)=>(<option key={i} value={item}>{item}</option>))}
</select>
            </div>
</>}


<div className="flex gap-4">
            <button onClick={()=>saveChanges(objectToEdit.gltfObjectUrl ? {scale:objectToEdit.scale, 
            rotation: objectToEdit.rotation, 
            position: objectToEdit.position, 
            matrix:objectToEdit.matrix, 
            matrixWorld:objectToEdit.matrixWorld, up: objectToEdit.up, 
            uuid:objectToEdit.uuid, modelPath:objectToEdit.gltfObjectUrl,
             id: objectToEdit.id ?  objectToEdit.id : null} : 
             {mesh:
                 {scale:objectToEdit.scale, 
                    rotation: objectToEdit.rotation,
                     position: objectToEdit.position, 
                     matrix:objectToEdit.matrix,
                matrixWorld:objectToEdit.matrixWorld, 
                material:objectToEdit.material,
                colour:objectToEdit.colour,
                map:objectToEdit.map,
                up: objectToEdit.up,
                 uuid:objectToEdit.uuid,}, 
                 geometry:objectToEdit.geometry ,
                  id: objectToEdit.id ?  objectToEdit.id : null}, 
                  objectToEdit.gltfObjectUrl ? true : false)} className='bg-darkGray p-2 rounded-xl text-white w-40 max-w-[80%]'>Submit</button>
            <button onClick={()=>removeObject(objectToEdit.gltfObjectUrl ? objectToEdit.uuid : objectToEdit.id, objectToEdit.id, objectToEdit.gltfObjectUrl ? true : false)} className='bg-red-500 p-2 text-white rounded-xl'>Remove</button>
</div>
        </div>}
    </div>
  )
}

export default ElementManagment