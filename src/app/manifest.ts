import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: 'mock-notion',
        name: 'Notion',
        short_name: 'Notion',
        description: "Build Custom Agents, search across all your apps, and automate busywork. The AI workspace where teams get more done, faster.",
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/logo.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
            {
                src: '/mask-icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
            {
                src: '/maskable-icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/pwa-64x64.png',
                sizes: '64x64',
                type: 'image/png',
            },
            {
                src: '/pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}