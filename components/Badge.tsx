'use client'
import Image from 'next/image'
import Link from 'next/link'

export function BadgeImage({imageUrl,alt,url}:{imageUrl:string,url:string,alt:string}){

    return (
        <Link target='_blank' href = {url}>
            <Image  className='hover:scale-105' width={300} height={300} src={imageUrl} alt={alt} />
        </Link>
        
    );
}