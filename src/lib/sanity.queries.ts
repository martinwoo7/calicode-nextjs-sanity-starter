import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug, FileAsset } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const otherPostsQuery = groq`
  *[_type == "post" && defined(slug.current) && slug.current != $slug]
  | order(_createdAt desc)
`
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)][].slug.current`

export const projectQuery = groq`*[_type == "project"]{
  _id, 
  name,
  "slug": slug,
  tagline,
  "logo": logo.asset->url,
}`
export async function getProject(client: SanityClient): Promise<Project[]> {
  return await client.fetch(projectQuery)
}

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  name,
  projectUrl,
  coverImage { alt, "image": asset->url },
  tagline,
  description
}`

export async function getSingleProject(
  client: SanityClient,
  slug: string,
): Promise<Project> {
  return await client.fetch(projectBySlugQuery, {
    slug,
  })
}

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}
export async function getOtherPost(
  client: SanityClient,
  slug: string,
): Promise<Post[]> {
  return await client.fetch(otherPostsQuery, { slug })
}

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
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

export interface Project {
  _id: string
  name: string
  slug: Slug
  tagline: string
  projectUrl: string
  logo: string
  coverImage: {
    alt: string | null
    image: string
  }
  description: PortableTextBlock[]
}

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
