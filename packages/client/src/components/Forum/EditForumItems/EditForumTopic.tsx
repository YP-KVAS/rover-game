import styles from './EditForumTopic.module.scss'
import { FC, useEffect, useState } from 'react'
import { FormInput } from '../../FormInput/FormInput'
import { FormInputNames } from '../../../utils/types/forms'
import { AddForumItemForm } from '../AddForumItems/AddForumItemForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addForumTopicTitleValidationSchema } from '../../../utils/validation'
import {
  onGetForumTopics,
  onUpdateForumTopic,
} from '../../../store/thunks/forum-thunk'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { useNavigate } from 'react-router-dom'
import { clearUpdateTopicState } from '../../../store/slices/forum-slice'
import { Loader } from '../../Loader/Loader'
import {
  selectForumCategories,
  selectForumUpdateTopicState,
} from '../../../store/selectors/forum-selector'
import { Dropdown } from '../../Dropdown/Dropdown'
import { RoutesEnum } from '../../../utils/const-variables/routes'
import { useIntegerParams } from '../../../hooks/useIntegerParams'

interface EditForumTopicProps {
  handleFormReset: () => void
  currentTopicName: string
}

export const EditForumTopic: FC<EditForumTopicProps> = ({
  handleFormReset,
  currentTopicName,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const categoryId = useIntegerParams('categoryId')
  const topicId = useIntegerParams('topicId')

  const { isLoading, errorMessage } = useAppSelector(
    selectForumUpdateTopicState
  )
  const categories = useAppSelector(selectForumCategories)?.map(category => ({
    id: category.id,
    name: category.name,
  }))

  const [newCategoryId, setNewCategoryId] = useState(categoryId)
  const updateCategoryId = (id: number) => {
    if (id !== newCategoryId) {
      setNewCategoryId(id)
    }
  }

  const { handleSubmit, register } = useForm<{
    [FormInputNames.FORUM_TOPIC_TITLE]: string
  }>({
    resolver: yupResolver(addForumTopicTitleValidationSchema),
  })

  useEffect(() => {
    return () => {
      if (errorMessage) {
        dispatch(clearUpdateTopicState())
      }
    }
  }, [dispatch])

  const handleFormSubmit = handleSubmit(data => {
    const name = data[FormInputNames.FORUM_TOPIC_TITLE]
    if (currentTopicName !== name || newCategoryId !== categoryId) {
      dispatch(onUpdateForumTopic({ id: topicId, newCategoryId, name })).then(
        res => {
          if (res.type.endsWith('fulfilled')) {
            handleFormReset()
            dispatch(onGetForumTopics({ categoryId }))
            navigate(
              RoutesEnum.FORUM_TOPIC.replace(
                ':categoryId',
                newCategoryId.toString()
              ).replace(':topicId', topicId.toString())
            )
          }
        }
      )
    }
  })

  return isLoading ? (
    <Loader />
  ) : (
    <AddForumItemForm
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      errorMessage={errorMessage}
      flexGrow={0}>
      <div className={styles.inputs}>
        <div className={styles.text_input_wrapper}>
          <FormInput
            defaultValue={currentTopicName}
            registerObj={{ ...register(FormInputNames.FORUM_TOPIC_TITLE) }}
            placeholder="Новое название темы"
          />
        </div>
        {categories && (
          <div className={styles.dropdown_wrapper}>
            <Dropdown
              options={categories}
              defaultOption={categories.find(cat => cat.id === categoryId)}
              onSelect={updateCategoryId}
            />
          </div>
        )}
      </div>
    </AddForumItemForm>
  )
}
