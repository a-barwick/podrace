export type User = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
};

export type Podcast = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    publishedAt: string;
};

export type Plan = {
    id?: string | null;
    title: string;
    podcastId?: string | null;
    description?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
};

export type PlanList = {
    id: string;
    podcastId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
};

export type PlanListItem = {
    id: string;
    planId: string;
    content: string;
    checked: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
};
