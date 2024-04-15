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
    id: string;
    podcastId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
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
