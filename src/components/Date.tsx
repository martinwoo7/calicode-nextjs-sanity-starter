import moment from 'moment'
const Date = ({ dateString }) => {
  if (!dateString) return null

  const date = moment(dateString)
  return <time dateTime={dateString}>{date.format('MMMM, D YYYY')}</time>
}

export default Date
