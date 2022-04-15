const Button = ({ title, url, openInNewTab }) => {
  if (!title || !url) {
    return null
  }
  
  return (
    <a class="inline-block px-8 py-4 border border-black hover:border-red-600" href={url} target={openInNewTab ? '_blank' : ''} rel={openInNewTab ? 'noopener' : ''}>{title}</a>
  )
}

export default Button
