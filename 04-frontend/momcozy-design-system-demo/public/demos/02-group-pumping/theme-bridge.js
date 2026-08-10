(() => {
  const root = document.documentElement

  function applyTheme(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light'
    root.classList.toggle('dark', nextTheme === 'dark')
    root.dataset.theme = nextTheme
    window.dispatchEvent(
      new CustomEvent('momcozy-theme-change', { detail: { theme: nextTheme } }),
    )
  }

  const requestedTheme = new URLSearchParams(window.location.search).get('theme')
  const storedTheme = window.localStorage.getItem('momcozy-theme')
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  applyTheme(requestedTheme || storedTheme || systemTheme)

  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) return
    if (event.data?.type !== 'momcozy-theme') return

    window.localStorage.setItem('momcozy-theme', event.data.theme)
    applyTheme(event.data.theme)
  })
})()
