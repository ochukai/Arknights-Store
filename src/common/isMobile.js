export default function isMobile() {
  return /Android|iPhone|iPod|BlackBerry|Windows Phone|BB10|PlayBook|midp|ucweb/i
      .test(navigator.userAgent)
}
