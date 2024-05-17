import React from 'react'
import { FaCircleXmark } from 'react-icons/fa6'

type Props = {
    objectToEdit:any | null,
    saveChanges: (obj:any)=>void
}

function ElementManagment({objectToEdit, saveChanges}: Props) {
    
  return (
    <div className={`h-screen ${objectToEdit ? 'fixed' : 'hidden'} max-w-sm top-0 right-0 w-full z-50 bg-purple`}>
      <div className="flex justify-between items-center p-4">
            <p>VirtuEstate</p>
            <button><FaCircleXmark className='text-red-500'/></button>
        </div>
        {objectToEdit && <div className="flex flex-col gap-4 px-2 py-2">
            <div className="flex flex-col gap-2">
                <p className='text-white'>Width</p>
                <input type="range" defaultValue={objectToEdit.scale.x} min={0} max="10" step={0.01} onChange={(e)=>{
                    objectToEdit.scale.x = +e.target.value;
                }}  className="range range-primary max-w-60" />
            </div>
            <div className="flex flex-col gap-2">
                <p className='text-white'>Height</p>
                <input  onChange={(e)=>{
                    objectToEdit.scale.y = +e.target.value;
                }}  defaultValue={objectToEdit.scale.y} type="range" step={0.01} min={0} max="10"  className="range range-primary max-w-60" />
            </div>
            <div className="flex flex-col gap-2">
                <p className='text-white'>Depth</p>
                <input  onChange={(e)=>{
                    objectToEdit.scale.z = +e.target.value;
                }}  type="range" min={0} max="10" step={0.01}  className="range range-primary max-w-60" />
            </div>
            <button onClick={()=>saveChanges({scale:objectToEdit.scale, rotation: objectToEdit.rotation, position: objectToEdit.position, matrix:objectToEdit.matrix, matrixWorld:objectToEdit.matrixWorld, up: objectToEdit.up, uuid:objectToEdit.uuid, modelPath:objectToEdit.gltfObjectUrl})} className='bg-darkGray p-2 rounded-xl text-white w-40 max-w-[80%]'>Submit</button>
        </div>}
    </div>
  )
}

export default ElementManagment