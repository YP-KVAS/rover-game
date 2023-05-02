import './TextEditor.scss'
import { FC, MutableRefObject, useEffect, useRef } from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema } from 'prosemirror-model'
import { DOMParser as ProseDOMParser } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'
import { exampleSetup } from 'prosemirror-example-setup'
import sanitizeHtml from 'sanitize-html'

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks,
})

const plugins = exampleSetup({ schema: mySchema })

export interface TextEditorProps {
  editorId: string
  editorRef: MutableRefObject<EditorView | null>
  htmlString: string
  handleCommentEdit: () => void
}

export const TextEditor: FC<TextEditorProps> = ({
  editorId,
  editorRef,
  htmlString,
  handleCommentEdit,
}) => {
  const editorDomRef = useRef(null)

  useEffect(() => {
    const editor = document.getElementById(editorId)

    const doc = document.createElement('div')
    doc.innerHTML = sanitizeHtml(htmlString)

    editorRef.current = new EditorView(editorDomRef.current, {
      state: EditorState.create({
        doc: ProseDOMParser.fromSchema(mySchema).parse(doc),
        plugins,
      }),
      dispatchTransaction(tr) {
        editorRef.current?.updateState(editorRef.current?.state.apply(tr))
        handleCommentEdit()
      },
    })

    return () => {
      if (editor) {
        editor.innerHTML = ''
      }
    }
  }, [editorRef, htmlString])

  return <div id={editorId} ref={editorDomRef} className="editor" />
}
