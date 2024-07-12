import { pageConfigGenerator } from 'vite-plugin-auto-mpa-html'

export default pageConfigGenerator((opt) => {
  return {
    "template": "../../templates/index.html",
    "data": {
      "title": "test title",
      "description": "test desc",
      "NODE_ENV": opt.sharedData.NODE_ENV,
    }
  }
})