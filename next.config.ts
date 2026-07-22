import type { NextConfig } from "next";

const isNetlifyDomain = process.env.URL?.includes("netlify.app");

const nextConfig: NextConfig = {
	turbopack: {
		root: __dirname,
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.panchshil.com',
				port: '',
				pathname: '/**'
			}
		]
	},

	allowedDevOrigins: ['192.168.0.197'],
	
	async headers() {
		const headers = [];
		
		if (isNetlifyDomain) {
			headers.push({
				source: "/(.*)",
				headers: [
					{
						key: "X-Robots-Tag",
						value: "noindex, nofollow"
					},
				],
			});
		}

    return headers;
  }
};

export default nextConfig;
