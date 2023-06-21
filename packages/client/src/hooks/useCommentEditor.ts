import { MutableRefObject, useState } from 'react'
import { EditorView } from 'prosemirror-view'

export const useCommentEditor = (
  editorRef: MutableRefObject<EditorView | null>
) => {
  const checkCommentIsEmpty = (): boolean => {
    const fragment = editorRef.current?.state.doc
    return !fragment || !fragment.textContent.trim()
  }
  const [commentIsEmpty, setCommentIsEmpty] = useState(false)
  const handleCommentEdit = () => setCommentIsEmpty(checkCommentIsEmpty())

  return {
    commentIsEmpty,
    setCommentIsEmpty,
    checkCommentIsEmpty,
    handleCommentEdit,
  }
}
