const customStyleMap = {
  header: {
    fontWeight: '500',
    fontFamily: '\'Helvetica Neue\', sans-serif',
    color: 'rgba(17, 17, 17, 0.74)',
    letterSpacing: '1px',
    lineHeight: '1.5',
    fontSize: '64px'
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
};

const customEntityMap = {
  link: {},
  image: {},
  // TODO:
  // 'embed link': {
  //   color: 'rgba(0, 180, 0, 1.0)',
  // },
}

const cunstomButtonMap = Object.assign({},customStyleMap,customEntityMap)

export {cunstomButtonMap,customStyleMap,customEntityMap}