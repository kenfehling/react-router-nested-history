export function modifyLocation(location, pathname) {
  if (location.href && location.origin) {
    return {...location, pathname, href: location.origin + pathname}
  }
  else {
    return {...location, pathname}
  }
}