'use client'
import Image from 'next/image'
import Link from 'next/link'

export function BadgeImage({imageUrl,alt,url}:{imageUrl:string,url:string,alt:string}){

    console.debug("BadgeImage image url",imageUrl)
    return (
        <Link target='_blank' href = {url}>
            <Image unoptimized={true} className='hover:scale-105' width={300} height={300} src={imageUrl} alt={alt} />
        </Link>
        
    );
}