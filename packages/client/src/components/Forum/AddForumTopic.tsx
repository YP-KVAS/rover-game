import styles from './Forum.module.scss'
import formStyles from '../../common-styles/Form.module.scss'
import { FC, useState } from 'react'
import { Button } from '../Button/Button'
import { Form } from '../Form/Form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addForumTopicValidationSchema } from '../../utils/validation'
import { FormInput } from '../FormInput/FormInput'
import { NewTopic } from '../../utils/types/forum'
import { ADD_FORUM_TOPIC_FORM_INPUTS } from '../../utils/const-variables/forms'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  onAddForumTopic,
  onGetForumTopics,
} from '../../store/thunks/forum-thunk'
import { useParams } from 'react-router-dom'
import { selectAddTopicState } from '../../store/selectors/forum-selector'

export const AddForumTopic: FC = () => {
  const dispatch = useAppDispatch()
  const [displayForm, setDisplayForm] = useState(false)
  const { categoryId = -1 } = useParams()

  const displayInputs = () => setDisplayForm(true)

  const { errorMessage } = useAppSelector(selectAddTopicState)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewTopic>({
    resolver: yupResolver(addForumTopicValidationSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    dispatch(onAddForumTopic(data)).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(onGetForumTopics(+categoryId))
        handleFormReset()
      }
    })
  })

  const handleFormReset = () => {
    reset()
    setDisplayForm(false)
  }

  return (
    <div className={styles.add_topic}>
      <div>
        <Button clickHandler={displayInputs}>Добавить новую тему</Button>
      </div>
      {displayForm && (
        <div className={styles.form}>
          <Form onSubmit={handleFormSubmit} onReset={handleFormReset}>
            <>
              {ADD_FORUM_TOPIC_FORM_INPUTS.map(input => (
                <FormInput
                  key={input.name}
                  label={input.label}
                  type={input.type}
                  placeholder={input.placeholder}
                  registerObj={{ ...register(input.name) }}
                  errorMsg={errors[input.name]?.message}
                  rows={input.rows}
                />
              ))}
            </>
            <div className={formStyles.form_actions}>
              <Button type="primary" htmlType="submit">
                Создать тему
              </Button>
              <Button type="secondary" htmlType="reset">
                Отменить
              </Button>
            </div>
            <>
              {errorMessage && (
                <p className={formStyles.form_error_message}>{errorMessage}</p>
              )}
            </>
          </Form>
        </div>
      )}
    </div>
  )
}
