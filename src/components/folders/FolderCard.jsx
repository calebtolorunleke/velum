import { LucideFolder } from 'lucide-react'
import React from 'react'
import { ItemDropdown } from '../ui/ItemDropdown'

const FolderCard = ({ folder, onClick, onShare, onRename, onMove, onDelete }) => {
  return (
    <div 
      className='group relative bg-white border border-[#E8E2D9] hover:border-[#C49A6C] rounded-2xl p-4 transition-all duration-200 cursor-pointer flex items-center justify-between shadow-xs'
      onClick={() => onClick && onClick(folder)}
    >
      <div className='flex items-center gap-3 min-w-0 pr-2'>
        {/* Warm Caramel Icon Container */}
        <div className='p-2.5 rounded-xl bg-[#F8F4EF] text-[#C49A6C] shrink-0 border border-[#EFE8DF]'>
          <LucideFolder className='size-6 fill-[#C49A6C]/20' />
        </div>

        {/* Folder Name */}
        <h4 
          className='text-sm font-medium text-[#2B211B] truncate group-hover:text-[#C49A6C] transition-colors' 
          title={folder?.name}
        >  
          {folder?.name}
        </h4>
      </div>
      
      {/* Options Menu Dropdown (Stop Event Propagation) */}
      <div onClick={(e) => e.stopPropagation()}>
        <ItemDropdown 
          item={folder}  
          onShare={onShare} 
          onRename={onRename} 
          onMove={onMove} 
          onDelete={onDelete} 
        />
      </div>
    </div>
  )
}

export default FolderCard