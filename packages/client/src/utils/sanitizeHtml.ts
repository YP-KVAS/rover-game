import sanitizeHtml from 'sanitize-html'

export const getSanitizedHtmlString = (htmlString: string) => {
  return sanitizeHtml(htmlString, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: { img: ['src'] },
    allowedSchemes: ['data', 'http', 'https'],
  })
}
