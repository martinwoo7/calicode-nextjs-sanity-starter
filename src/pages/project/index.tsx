// app/projects/page.tsx

import Image from 'next/image'
import Link from 'next/link'

import { type Project, projectQuery, getProject } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    project: Project[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const project = await getProject(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      project,
    },
  }
}

export default function Project(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [project] = useLiveQuery<Project[]>(props.project, projectQuery)

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <section className="max-w-2xl mb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
          Featured projects I&apos;ve built over the years
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          I&apos;ve worked on tons of little projects over the years but these
          are the ones that I&apos;m most proud of. Many of them are
          open-source, so if you see something that piques your interest, check
          out the code and contribute if you have ideas for how it can be
          improved.
        </p>
      </section>

      <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
        {project.map((proj) => {
          // console.log(proj.slug)
          return (
            <Link
              href={`/project/${proj.slug.current}`}
              key={proj._id}
              className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
            >
              <Image
                src={proj.logo}
                width={60}
                height={60}
                alt={proj.name}
                className="bg-zinc-800 rounded-md p-2"
              />
              <div>
                <h2 className="font-semibold mb-1">{proj.name}</h2>
                <div className="text-sm text-zinc-400">{proj.tagline}</div>
              </div>
            </Link>
          )
        })}
      </section>
    </main>
  )
}
