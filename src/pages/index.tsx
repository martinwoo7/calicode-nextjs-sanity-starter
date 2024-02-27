import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getPosts,
  type Post,
  postsQuery,
  getProfile,
  type Profile,
  profileQuery,
  type Job,
  getJob,
  jobQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import JobComponent from '~/components/Job'

import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import Card from '~/components/Card'
import HeroSvg from '~/icons/HeroSvg'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    profile: Profile[]
    job: Job[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const profile = await getProfile(client)
  const job = await getJob(client)
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      profile,
      job,
    },
  }
}

// export const getStaticJobProps: GetStaticProps<
//   SharedPageProps & {
//     job: Job[]
//   }
// > = async ({ draftMode = false }) => {
//   const client = getClient(draftMode ? { token: readToken } : undefined)

//   const job = await getJob(client)

//   return {
//     props: {
//       draftMode,
//       token: draftMode ? readToken : '',
//       job,
//     },
//   }
// }

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
  // jobProps: InferGetStaticPropsType<typeof getStaticJobProps>,
) {
  const [profile] = useLiveQuery<Profile[]>(props.profile, profileQuery)
  console.log(props.job)
  // const [job] = useLiveQuery<Job[]>(jobProps.job, jobQuery)

  return (
    <main className="max-w-7xl mx-auto lg:px-16 px-6">
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className="lg:max-w-2xl max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                {data.headline}
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed">
                {data.shortBio}
              </p>
              <ul className="flex items-center gap-x-6 my-10">
                {Object.entries(data.socialLinks)
                  .sort()
                  .map(([key, value], id) => (
                    <li key={id}>
                      <a
                        href={value}
                        rel="noreferer noopener"
                        className="flex items-center gap-x-3 mb-5 hover:text-purple-400 duration-300"
                      >
                        {key[0].toUpperCase() + key.toLowerCase().slice(1)}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        <HeroSvg />
      </section>
      <JobComponent
        draftMode={props.draftMode}
        token={props.token}
        job={props.job}
      />
    </main>
  )
}
