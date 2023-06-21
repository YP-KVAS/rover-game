import styles from '../../FormInput/FormInput.module.scss'
import { ChangeEvent, FC, useState, useEffect } from 'react'
import { useAppDispatch } from '../../../hooks/useStore'
import { onGetForumTopics } from '../../../store/thunks/forum-thunk'
import { useDebounce } from '../../../hooks/useDebounce'
import { setTopicSearchQuery } from '../../../store/slices/forum-slice'

export const SearchTopicItems: FC<{ categoryId: number }> = ({
  categoryId,
}) => {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce(searchValue)

  const handleChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value)
  }

  useEffect(() => {
    dispatch(setTopicSearchQuery(debouncedSearch))
    dispatch(onGetForumTopics({ categoryId, search: debouncedSearch }))
  }, [debouncedSearch])

  return (
    <input
      placeholder="Поиск темы"
      className={styles.input}
      style={{ minWidth: '300px' }}
      type="search"
      onChange={handleChange}
    />
  )
}
