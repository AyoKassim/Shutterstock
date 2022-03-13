/** @type {import('next').NextConfig} */
module.exports = {
  //reactStrictMode: true,
  async rewrites()
  {
    return [
      {source: '/analyze', destination: '/api/analyze'},
    ]
  }
}