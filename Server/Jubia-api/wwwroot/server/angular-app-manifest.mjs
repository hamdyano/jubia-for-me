
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 491, hash: '89260a8037e1d203a220a43ec12ecce2582b8771f17862aecdd6fbf28ee71c25', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1004, hash: '0dfaa95285f39fd7ee11c2d77b45e0ff93de949558eb7e3ce7fdd02e812d14dc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 20832, hash: 'c5a65d039869f316a052b974aee31c4ba48a4fe31224222b05b16b0a6de1ce5a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
