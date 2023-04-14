import { FC } from 'react'
import { useParams } from 'react-router-dom'

export const ForumCategory: FC = () => {
  const { categoryId } = useParams()

  return <div>Категория {categoryId}</div>
}
