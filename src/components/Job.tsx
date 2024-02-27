import Image from 'next/image'
import { getJobs, jobsQuery, type Job } from '~/lib/sanity.queries'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import type { GetStaticProps } from 'next'
import type { SharedPageProps } from '~/pages/_app'

import { useLiveQuery } from 'next-sanity/preview'
import { InferGetStaticPropsType } from 'next'

// import { getStaticProps } from '~/pages'

// export const getStaticProps: GetStaticProps<
//   SharedPageProps & {
//     job: Job[]
//   }
// > = async ({ draftMode = false }) => {
//   const client = getClient(draftMode ? { token: readToken } : undefined)

//   const job = await getJobs(client)

//   return {
//     props: {
//       draftMode,
//       token: draftMode ? readToken : '',
//       job,
//     },
//   }
// }

export default async function JobComponent(
  //   props: InferGetStaticPropsType<typeof getStaticProps>,
  jobs,
) {
  //   const [job] = useLiveQuery<Job[]>(props.job, jobsQuery)
  console.log(jobs)

  return (
    <section className="mt-32">
      <div className="mb-16">
        <h2 className="font-semibold text-4xl mb-4">Work Experience</h2>
      </div>

      <div className="flex flex-col gap-y-12">
        {jobs.map((data) => (
          <div
            key={data._id}
            className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative before:absolute before:bottom-0 before:top-[4.5rem] before:left-7 before:w-[1px] before:h-[calc(100%-50px)] before:bg-zinc-800"
          >
            <a
              href={data.url}
              rel="noreferrer noopener"
              className="min-h-[60px] min-w-[60px] rounded-md overflow-clip relative"
            >
              <Image
                src={data.logo}
                className="object-cover"
                alt={`${data.name} logo`}
                fill
              />
            </a>
            <div className="flex flex-col items-start">
              <h3 className="text-xl font-bold">{data.name}</h3>
              <p>{data.jobTitle}</p>
              <small className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                {data.startDate.toString()} - {data.endDate.toString()}
              </small>
              <p className="text-base text-zinc-400 my-4">{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
