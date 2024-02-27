import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug, FileAsset } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const jobQuery = groq`*[_type == "job"]{
  _id,
  name,
  jobTitle,
  "logo": logo.asset->url,
  url,
  description,
  startDate,
  endDate,
}`

export async function getJob(client: SanityClient): Promise<Job[]> {
  return await client.fetch(jobQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const profileQuery = groq`*[_type == "profile"]{
  _id,
  fullName,
  headline,
  profileImage {alt, "image": asset->url},
  shortBio,
  location,
  fullBio,
  email,
  "resumeURL": resumeURL.asset->url,
  socialLinks,
  skills
}`
export async function getProfile(client: SanityClient): Promise<Profile[]> {
  return await client.fetch(profileQuery)
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export interface Job {
  _id: string
  name: string
  jobTitle: string
  logo: string
  url: string
  description: string
  startDate: Date
  endDate: Date
}

export interface Profile {
  _type: 'profile'
  _id: string
  fullName?: string
  headline: string
  profileImage: {
    alt: string
    image: string
  }
  shortBio: string
  email: string
  location: string
  fullBio: PortableTextBlock[]
  resumeURL?: string
  socialLinks: string[]
  skills?: string[]
}

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}
