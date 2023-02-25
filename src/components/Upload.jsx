

import { useState, useRef } from 'react'

import { addSong, getHashLocal } from '../lib/songApi'

import addFiles from '../assets/addFiles.svg'
import copyLink from '../assets/copyLink.svg'
import logo from '../assets/SonorousFullv2.png'



export default function Upload_box({ node, albumList, playlist, setPlaylist, setActiveSongIndex }) { 
  const filePickerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
	
  return(
      <div className='container h-[calc(12vh)] mx-auto backdrop-blur-sm bg-white/30 rounded-md grid grid-cols-5 divide-x-2 px-2 '>	
        <div className='flex justify-center'>
			<button 
				type="button"
				onClick={ () => {
					filePickerRef.current.click();
				} }
			>
				<div className='rounded-full bg-white/90 hover:shadow-[4px_3px_18px_0px_#00000024] w-14 h-14 mx-auto grid place-items-center p-3 cursor-pointer'>
                    { !isLoading?
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              			   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"></path>
              		    </svg>
                      :
                        <img src={ addFiles } alt='Uploading...'></img>
                    }
              		
          		</div>
			</button>
			
			<input 
				type="file" 
				id="music-pick" 
				className="hidden" 
				ref={ filePickerRef }
				onChange={ async (e) => {
                    setIsLoading(true)
					const { files } = e.target;
					const [albumPath, songObj] = (await addSong(node, files[0], window.jsmediatags));
					albumList[songObj.album] = albumPath
					console.log(songObj)
					setPlaylist(playlist.concat(songObj));
					setActiveSongIndex(playlist.length);
                    setIsLoading(false)
					// setActiveSongIndex()
					// setAlbumArt(await getUrl(node, albumPath));
				} } 
			/> 
        </div>

		<div className='col-span-3 grid place-items-center pl-4 pr-7 '>
			<img src={ logo } alt='Logo' width="350" height="40"></img>
		</div>
        
        <div className='col-span-1 grid place-items-center pl-4 pr-7 '>

			<button 
					type="button"
					onClick={ async () =>  navigator.clipboard.writeText(`${window.location.host}/#${await getHashLocal()}`) }
			> 
				<div className='rounded-full bg-white/90 hover:shadow-[4px_3px_18px_0px_#00000024] w-14 h-14 mx-auto grid place-items-center p-3 cursor-pointer'>
					<img src={ copyLink } alt='Copy Hash' width="40" height="40"></img>
				</div>
			</button>

        </div>
        
      </div>
    );
}

// `${window.location.host}/#${await getHashLocal()}`