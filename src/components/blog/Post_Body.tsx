import { PortableText } from '@portabletext/react'
// import markdownStyles from "./markdown-styles.module.css";

export default function PostBody({ content }) {
  return (
    // <div className={`max-w-2xl mx-auto ${markdownStyles.markdown}`}>
    <div className={`max-w-2xl mx-auto`}>
      <PortableText value={content} />
    </div>
  )
}
