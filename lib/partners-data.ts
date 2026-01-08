export interface Partner {
    id: string
    name: string
    category: "Accommodation" | "Transport" | "Tours" | "Food"
    description: string
    location: string
    rating: number
    reviews: number
    image: string
    verified: boolean
}

export const partners: Partner[] = [
    {
        id: "1",
        name: "Pop Ilashe Beach House",
        category: "Accommodation",
        description: "Premium 4-bedroom beach house with private pool and ocean view.",
        location: "Ilashe Private Beach",
        rating: 4.9,
        reviews: 128,
        image: "/images/ilashe.jpg", // Placeholder
        verified: true
    },
    {
        id: "2",
        name: "Islander Boat Services",
        category: "Transport",
        description: "Reliable speedboat transfers from Falsomo/VI to Ilashe.",
        location: "Falsomo Jetty",
        rating: 4.8,
        reviews: 342,
        image: "/images/boat.jpg", // Placeholder
        verified: true
    },
    {
        id: "3",
        name: "Lagoon Kayak Tours",
        category: "Tours",
        description: "Guided kayak expeditions through the mangroves.",
        location: "Snake Island",
        rating: 4.7,
        reviews: 89,
        image: "/images/kayak.jpg", // Placeholder
        verified: true
    }
]
