const customStyleMap = {
  title: {
    fontWeight: '500',
    fontFamily: `medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif`,
    color: 'rgba(17, 17, 17, 0.74)',
    lineHeight:'1.5',
    letterSpacing: '-.015em',
    fontSize: '32px',
    marginTop: '15px',
    textAlign:'center'
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
};

const customEntityMap = {
  link: {},
  image: {},
  break : {},
  log:{},
}

const customButtonMap = Object.assign({},customStyleMap,customEntityMap)

export {customButtonMap, customStyleMap, customEntityMap}