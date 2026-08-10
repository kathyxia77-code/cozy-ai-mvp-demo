(() => {
  const root = document.documentElement
  const themeColor = document.querySelector('meta[name="theme-color"]')
  const themeToggle = document.querySelector('#voiceLogThemeToggle')

  root.classList.toggle('is-embedded', window.parent !== window)

  function updateThemeToggle(theme) {
    const isDark = theme === 'dark'
    const nextTheme = isDark ? 'light' : 'dark'
    const label = `Switch to ${nextTheme} mode`

    themeToggle?.setAttribute('aria-pressed', String(isDark))
    themeToggle?.setAttribute('aria-label', label)
    themeToggle?.setAttribute('title', label)
  }

  function applyTheme(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light'
    root.classList.toggle('dark', nextTheme === 'dark')
    root.dataset.theme = nextTheme
    root.style.colorScheme = nextTheme
    themeColor?.setAttribute(
      'content',
      nextTheme === 'dark' ? '#000000' : '#F9F7F5',
    )
    updateThemeToggle(nextTheme)
  }

  const requestedTheme = new URLSearchParams(window.location.search).get('theme')
  const storedTheme = window.localStorage.getItem('momcozy-theme')
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  applyTheme(requestedTheme || storedTheme || systemTheme)

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.classList.contains('dark') ? 'light' : 'dark'
    window.localStorage.setItem('momcozy-theme', nextTheme)
    applyTheme(nextTheme)
  })

  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) return
    if (event.data?.type !== 'momcozy-theme') return

    window.localStorage.setItem('momcozy-theme', event.data.theme)
    applyTheme(event.data.theme)
  })
})()
